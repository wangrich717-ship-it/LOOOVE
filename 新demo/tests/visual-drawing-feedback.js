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
  await page.evaluate(() => openHomeAwarenessPlaceholder());
  const searchButton = page.locator('#homeAwarenessPlaceholder .consultant-search-btn');
  assert.equal(await searchButton.count(), 1, '互动页右上角应显示搜索入口');
  const searchStyle = await searchButton.evaluate(element => ({ background: getComputedStyle(element).backgroundColor, width: getComputedStyle(element).width, height: getComputedStyle(element).height }));
  assert.deepEqual(searchStyle, { background: 'rgba(0, 0, 0, 0)', width: '28px', height: '36px' }, '搜索入口应为无底框的轻量图标按钮');
  const voiceButton = page.locator('#consultantVoiceBtn');
  const inlineNoticeCount = await page.locator('#consultantAgentFeed .consultant-inline-agent').count();
  await voiceButton.click();
  assert.equal(await voiceButton.getAttribute('aria-label'), '正在听你说', '麦克风点击后应表达 App 正在收听用户语音');
  assert.equal(await page.locator('#consultantAgentInput').getAttribute('placeholder'), '正在听你说…', '录音时输入框应显示语音输入状态');
  await page.waitForTimeout(1450);
  assert.equal(await voiceButton.getAttribute('aria-label'), '语音输入', '语音识别完成后应恢复输入入口标签');
  assert.equal(await page.locator('#consultantAgentInput').inputValue(), '我最近有点累，也有点说不上来的烦。', '识别结果应进入输入框供用户确认与发送');
  assert.equal(await page.locator('#consultantAgentFeed .consultant-inline-agent').count(), inlineNoticeCount, '语音输入不应直接生成戒指分析或 LOOOVE 回复');
  await page.locator('#consultantAgentInput').fill('hi');
  await page.locator('.consultant-send-btn').click();
  await page.waitForTimeout(850);
  const inlineReply = page.locator('#consultantAgentFeed .consultant-inline-agent').last();
  const evidenceCopy = page.locator('#consultantAgentFeed .consultant-evidence-item span').first();
  const inlineStyle = await inlineReply.evaluate(element => ({ family: getComputedStyle(element).fontFamily, size: getComputedStyle(element).fontSize, weight: getComputedStyle(element).fontWeight, lineHeight: getComputedStyle(element).lineHeight }));
  const evidenceStyle = await evidenceCopy.evaluate(element => ({ family: getComputedStyle(element).fontFamily, size: getComputedStyle(element).fontSize, weight: getComputedStyle(element).fontWeight, lineHeight: getComputedStyle(element).lineHeight }));
  assert.deepEqual(inlineStyle, evidenceStyle, '主动发送后的 AI 回复应与声音线索正文使用完全一致的字体规范');
  const feedback = page.locator('.consultant-breath-feedback-message');
  await feedback.waitFor({ state: 'visible' });
  await feedback.evaluate(element => element.scrollIntoView({ block: 'center' }));
  await page.waitForTimeout(300);

  const drawingBox = await page.locator('.consultant-drawing-bubble').boundingBox();
  const feedbackBox = await feedback.boundingBox();
  const tasteBox = await page.locator('.consultant-taste-message').boundingBox();
  assert.ok(drawingBox && feedbackBox && tasteBox, '新增消息应在互动页中渲染');
  assert.ok(drawingBox.y + drawingBox.height <= feedbackBox.y, '用户画作不应与 LOOOVE 回复重叠');
  assert.ok(feedbackBox.y + feedbackBox.height <= tasteBox.y, '调息反馈不应与下一条探索消息重叠');
  const keywords = page.locator('#consultantAgentFeed .consultant-keyword');
  assert.ok(await keywords.count() >= 12, '互动页应渲染足够但克制的关键词高亮');
  const keywordStyle = await keywords.first().evaluate(element => ({ color: getComputedStyle(element).color, weight: getComputedStyle(element).fontWeight, display: getComputedStyle(element).display, marginTop: getComputedStyle(element).marginTop }));
  assert.equal(keywordStyle.weight, '400', '橙色关键词不应加粗');
  assert.equal(keywordStyle.color, 'rgb(255, 127, 99)', '关键词应使用互动页橙色');
  assert.equal(keywordStyle.display, 'inline', '关键词不能变成块级元素破坏原文换行');
  assert.equal(keywordStyle.marginTop, '0px', '关键词不应继承正文段落间距');
  const titleSelectors = ['.consultant-mantra-card p','.consultant-proactive-title','.consultant-sleep-music-name','.consultant-breath-line-title','.consultant-breath-feedback-card h3','.consultant-taste-recommendation h3','.consultant-card-draw-title'];
  const reportTitleStyle = await page.locator('.consultant-report-title').evaluate(element => ({ color:getComputedStyle(element).color,family:getComputedStyle(element).fontFamily,size:getComputedStyle(element).fontSize,weight:getComputedStyle(element).fontWeight,lineHeight:getComputedStyle(element).lineHeight,letterSpacing:getComputedStyle(element).letterSpacing }));
  for (const selector of titleSelectors) {
    const style = await page.locator(selector).first().evaluate(element => ({ color:getComputedStyle(element).color,family:getComputedStyle(element).fontFamily,size:getComputedStyle(element).fontSize,weight:getComputedStyle(element).fontWeight,lineHeight:getComputedStyle(element).lineHeight,letterSpacing:getComputedStyle(element).letterSpacing }));
    assert.deepEqual(style, reportTitleStyle, `${selector} 应与早间报告标题使用同一字体规范`);
  }
  assert.equal(await page.getByText('基于昨夜戒指数据').count(), 0, '互动页不应显示早间数据来源小字');
  assert.deepEqual(pageErrors, [], '页面不应产生脚本运行错误');

  const preview = path.join(os.tmpdir(), 'looove-interaction-drawing-feedback-preview.png');
  await page.screenshot({ path: preview, fullPage: false });
  await browser.close();
  console.log(preview);
})().catch(error => {
  console.error(error);
  process.exit(1);
});
