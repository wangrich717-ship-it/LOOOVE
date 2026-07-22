const assert = require('node:assert/strict');
const os = require('node:os');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  });
  const page = await browser.newPage({ viewport: { width: 1180, height: 980 } });
  const pageErrors = [];
  page.on('pageerror', error => pageErrors.push(error.message));
  await page.goto(pathToFileURL(path.resolve(__dirname, '..', 'LOOOVE-demo.html')).href, { waitUntil: 'networkidle' });
  await page.evaluate(() => switchTab('t-diary'));
  await page.locator('.growth-tab[data-growth="interaction"]').click();
  await page.waitForTimeout(250);

  const visibleInteractionCards = page.locator('.growth-card[data-growth="interaction"]:not(.hide)');
  assert.equal(await visibleInteractionCards.count(), 3, '互动筛选应显示绘画、抽卡和心法三条记录');
  assert.equal(await page.locator('.growth-card[data-growth="interaction"]:not(.hide) .growth-interaction-media.cards img').count(), 3, '抽卡列表应展示三张卡');
  assert.equal(await page.locator('.growth-card[data-growth="interaction"]:not(.hide) .growth-interaction-media.painting img').count(), 1, '绘画列表应展示用户作品');
  const cardListWidth = await page.locator('.growth-card[data-growth="interaction"]:not(.hide) .growth-interaction-media.cards').evaluate(element => element.getBoundingClientRect().width / element.parentElement.getBoundingClientRect().width);
  const paintingListWidth = await page.locator('.growth-card[data-growth="interaction"]:not(.hide) .growth-interaction-media.painting').evaluate(element => element.getBoundingClientRect().width / element.parentElement.getBoundingClientRect().width);
  assert.ok(cardListWidth > .45 && cardListWidth < .55, '抽卡列表图片组应约占卡片宽度的一半');
  assert.ok(paintingListWidth > .20 && paintingListWidth < .26, '绘画列表图片应约占卡片宽度的四分之一');
  const mantraListCard = page.locator('.growth-card[data-growth="interaction"]', { hasText: '互动·心法' });
  const mantraSpacing = await mantraListCard.evaluate(card => {
    const journey = card.querySelector('.growth-interaction-journey');
    const cardBox = card.getBoundingClientRect();
    const journeyBox = journey.getBoundingClientRect();
    return { minHeight:getComputedStyle(card).minHeight, bottomGap:cardBox.bottom - journeyBox.bottom };
  });
  assert.equal(mantraSpacing.minHeight, '0px', '只有一句表达的心法卡不应继承通用卡片最小高度');
  assert.ok(mantraSpacing.bottomGap <= 18, `心法内容下方留白应收紧，当前为 ${mantraSpacing.bottomGap}px`);
  await page.screenshot({ path: path.join(os.tmpdir(), 'looove-trajectory-interactions-list.png'), fullPage: false });

  for (const key of ['drawingBreath', 'cardReflection', 'mantraMoment']) {
    await page.evaluate(recordKey => openGrowthRecord(recordKey), key);
    const rows = page.locator('#growthRecordContent .growth-summary-row');
    const expectedLabels = key === 'drawingBreath'
      ? ['你说','你的画作','LOOOVE 总结']
      : key === 'cardReflection'
        ? ['你说','你的探索','LOOOVE 总结']
        : ['你说','LOOOVE 总结'];
    assert.equal(await rows.count(), expectedLabels.length, `${key} 详情只应保留真实存在的关键内容`);
    assert.deepEqual(await rows.locator('.growth-summary-label').allTextContents(), expectedLabels, `${key} 应使用更亲近且符合内容的称谓`);
    assert.equal(await page.locator('#growthRecordContent .growth-interaction-turn').count(), 0, `${key} 不应继续复刻聊天气泡`);
    if (key === 'cardReflection') {
      assert.equal(await page.locator('#growthRecordContent .growth-interaction-media.cards img').count(), 3);
      assert.equal(await page.locator('#growthRecordContent .growth-card-result-item').count(), 3, '抽卡产出应保留三个关键问答');
      assert.doesNotMatch(await page.locator('#growthRecordContent').innerText(), /因此我推荐一次三张卡/);
    }
    if (key === 'drawingBreath') {
      assert.equal(await page.locator('#growthRecordContent .growth-interaction-media.painting img').count(), 1);
      assert.doesNotMatch(await page.locator('#growthRecordContent').innerText(), /完成了三轮呼吸画线/);
      assert.match(await page.locator('#growthRecordContent').innerText(), /经过刚刚的疗愈/);
      assert.doesNotMatch(await page.locator('#growthRecordContent').innerText(), /我推荐一次绘画疗愈/);
    }
    if (key === 'mantraMoment') {
      assert.doesNotMatch(await page.locator('#growthRecordContent').innerText(), /用户|产出|我气的是方案没有被认真讨论/);
      assert.doesNotMatch(await page.locator('#growthRecordContent').innerText(), /我没有继续安排任务/);
    }
    await page.screenshot({ path: path.join(os.tmpdir(), `looove-trajectory-${key}.png`), fullPage: false });
    await page.evaluate(() => closeGrowthRecord());
  }

  for (const key of ['signalHighlight', 'signalLow', 'morningReport', 'weeklyReport']) {
    await page.evaluate(recordKey => openGrowthRecord(recordKey), key);
    const summary = page.locator('#growthRecordContent .growth-ai-record');
    assert.equal(await summary.count(), 1, `${key} 的 LOOOVE 总结应使用无内框样式`);
    const summaryStyle = await summary.evaluate(element => ({ background:getComputedStyle(element).backgroundImage, color:getComputedStyle(element).backgroundColor, padding:getComputedStyle(element).padding, shadow:getComputedStyle(element).boxShadow }));
    assert.deepEqual(summaryStyle, { background:'none', color:'rgba(0, 0, 0, 0)', padding:'0px', shadow:'none' }, `${key} 的总结不应再嵌套一层卡片`);
    await page.evaluate(() => closeGrowthRecord());
  }

  assert.deepEqual(pageErrors, [], '轨迹互动列表与详情不应产生脚本错误');
  await browser.close();
  console.log(path.join(os.tmpdir(), 'looove-trajectory-interactions-list.png'));
})().catch(error => {
  console.error(error);
  process.exit(1);
});
