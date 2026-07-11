import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const url = pathToFileURL(path.join(root, 'LOOOVE-demo.html')).href;

const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
await page.addInitScript(() => { Math.random = () => 0.4; });
const errors = [];
page.on('pageerror', error => errors.push(String(error)));
page.on('console', msg => { if (msg.type() === 'error' && !msg.text().includes('Failed to load resource')) errors.push(msg.text()); });
await page.goto(url);
await page.waitForLoadState('networkidle');

await page.locator('#ov-body-awareness').waitFor({ state: 'visible' });
if (await page.getByRole('button', { name: 'Onboarding' }).count()) throw new Error('Onboarding 入口仍然显示');
await page.waitForTimeout(900);
const overlayDebug = await page.locator('#ov-body-awareness').evaluate(el => ({
  rect: el.getBoundingClientRect().toJSON(), display: getComputedStyle(el).display,
  z: getComputedStyle(el).zIndex,
  parents: [...function*(){ let p=el.parentElement; while(p){ yield `${p.tagName}.${p.className}#${p.id}:${getComputedStyle(p).zIndex}/${getComputedStyle(p).display}`; p=p.parentElement; } }()]
}));
const firstTitle = await page.locator('#awarenessTitle').innerText();
const firstBg = await page.locator('#awarenessBg').evaluate(el => getComputedStyle(el).backgroundImage);
const firstPalette = await page.locator('.awareness-scene').evaluate(el => ({
  score: getComputedStyle(el.querySelector('.awareness-score')).backgroundColor,
  primary: getComputedStyle(el.querySelector('.awareness-btn.primary')).backgroundImage,
  secondary: getComputedStyle(el.querySelector('.awareness-btn:not(.primary)')).borderColor,
  title: getComputedStyle(el.querySelector('.awareness-title')).color,
  body: getComputedStyle(el.querySelector('.awareness-poem')).color,
  blur: getComputedStyle(el.querySelector('.awareness-btn.primary')).backdropFilter,
  shadow: getComputedStyle(el.querySelector('.awareness-btn.primary')).boxShadow
}));
const buttonPair = await page.locator('.awareness-scene').evaluate(el => {
  const read = button => {
    const style = getComputedStyle(button);
    return {
      background: style.backgroundImage,
      border: style.borderStyle,
      blur: style.backdropFilter,
      shadow: style.boxShadow,
      color: style.color
    };
  };
  return [...el.querySelectorAll('.awareness-btn')].map(read);
});
if (buttonPair.some(button => button.border !== 'none')) throw new Error('觉察按钮仍显示外框');
if (JSON.stringify(buttonPair[0]) !== JSON.stringify(buttonPair[1])) throw new Error('左右按钮毛玻璃样式不一致');
const actions = await page.locator('.awareness-actions').evaluate(el => ({
  bottom: el.getBoundingClientRect().bottom,
  question: el.querySelector('.awareness-question').getBoundingClientRect().bottom,
  buttons: el.querySelector('.awareness-buttons').getBoundingClientRect().top,
  sceneBottom: el.closest('.awareness-scene').getBoundingClientRect().bottom
}));
await page.locator('.phone').screenshot({ path: path.join(root, 'daily-awareness-preview.png') });

const stateLayouts = [];
for (let i = 0; i < 8; i += 1) {
  await page.evaluate(index => {
    Math.random = () => (index + 0.01) / 8;
    lastAwarenessIndex = -1;
    closeBodyAwareness(false);
    openBodyAwareness();
  }, i);
  await page.waitForTimeout(40);
  const layout = await page.locator('.awareness-scene').evaluate(el => ({
    title: el.querySelector('.awareness-title').textContent,
    copyBottom: el.querySelector('.awareness-copy').getBoundingClientRect().bottom,
    actionsTop: el.querySelector('.awareness-actions').getBoundingClientRect().top
  }));
  if (layout.copyBottom > layout.actionsTop - 8) throw new Error(`文案与操作区重叠：${JSON.stringify(layout)}`);
  stateLayouts.push(layout);
}

const titleBeforeTune = await page.locator('#awarenessTitle').innerText();
const awarenessTypeSizes = await page.locator('.awareness-scene').evaluate(el => ({
  copy: getComputedStyle(el.querySelector('.awareness-poem')).fontSize,
  question: getComputedStyle(el.querySelector('.awareness-question')).fontSize
}));
if (awarenessTypeSizes.copy !== '15px' || awarenessTypeSizes.question !== '15px') throw new Error(`觉察字号未统一：${JSON.stringify(awarenessTypeSizes)}`);
await page.locator('#awarenessAdjust').click();
await page.locator('#ov-emotion-tune').waitFor({ state: 'visible' });
const tuneEntryAnimation = await page.locator('#ov-emotion-tune').evaluate(el => getComputedStyle(el).animationName);
if (tuneEntryAnimation !== 'tunePageIn') throw new Error(`调整感受仍触发弹窗上拉：${tuneEntryAnimation}`);
await page.locator('#ov-body-awareness').waitFor({ state: 'hidden' });
if (!await page.locator('.tune-controls').isVisible()) throw new Error('四维调频控件未显示');
await page.locator('.tune-back').click();
await page.waitForTimeout(120);
const returnMidpoint = await page.evaluate(() => ({
  awarenessOpacity: getComputedStyle(document.getElementById('ov-body-awareness')).opacity,
  tuneDisplay: getComputedStyle(document.getElementById('ov-emotion-tune')).display
}));
if (returnMidpoint.awarenessOpacity !== '1') throw new Error(`返回时觉察页未完全遮住底层：首页可能透出 ${JSON.stringify(returnMidpoint)}`);
if (returnMidpoint.tuneDisplay !== 'flex') throw new Error('觉察页尚未就位时调频页已提前隐藏');
await page.waitForTimeout(160);
if (await page.locator('#ov-emotion-tune').evaluate(el => getComputedStyle(el).display) !== 'flex') throw new Error('返回动画结束前调频页已隐藏');
await page.locator('#ov-body-awareness').waitFor({ state: 'visible' });
if (await page.locator('#awarenessTitle').innerText() !== titleBeforeTune) throw new Error('返回后身心觉察状态被重新随机');
await page.locator('#ov-emotion-tune').waitFor({ state: 'hidden' });
await page.locator('#awarenessAdjust').click();
await page.locator('#ov-emotion-tune').waitFor({ state: 'visible' });
await page.waitForTimeout(360);
await page.locator('.phone').screenshot({ path: path.join(root, 'tune-return-preview.png') });
await page.locator('.tune-confirm').click();
await page.locator('#tuneResult.show').waitFor({ state: 'visible' });
if (await page.locator('#tuneResultChip').innerText() !== 'AI 解读') throw new Error('AI 反馈未显示');
await page.locator('.tune-close').click();

await page.getByRole('button', { name: '每日身心觉察' }).click();
const secondTitle = await page.locator('#awarenessTitle').innerText();
const secondBg = await page.locator('#awarenessBg').evaluate(el => getComputedStyle(el).backgroundImage);
const secondPalette = await page.locator('.awareness-scene').evaluate(el => ({
  score: getComputedStyle(el.querySelector('.awareness-score')).backgroundColor,
  primary: getComputedStyle(el.querySelector('.awareness-btn.primary')).backgroundImage,
  secondary: getComputedStyle(el.querySelector('.awareness-btn:not(.primary)')).borderColor,
  title: getComputedStyle(el.querySelector('.awareness-title')).color,
  body: getComputedStyle(el.querySelector('.awareness-poem')).color,
  blur: getComputedStyle(el.querySelector('.awareness-btn.primary')).backdropFilter,
  shadow: getComputedStyle(el.querySelector('.awareness-btn.primary')).boxShadow
}));
if (firstTitle === secondTitle || firstBg === secondBg) throw new Error('连续打开未切换随机状态');
if (JSON.stringify(firstPalette) === JSON.stringify(secondPalette)) throw new Error('不同图片仍使用相同按钮配色');
if (firstPalette.title === secondPalette.title || firstPalette.body === secondPalette.body) throw new Error('不同图片仍使用相同文字颜色');
if (!firstPalette.blur.includes('blur(24px)') || firstPalette.shadow === 'none') throw new Error('主按钮没有形成清晰毛玻璃表面');
await page.locator('#awarenessCare').click();
if (!await page.locator('#homeMindState').evaluate(el => el.classList.contains('on'))) throw new Error('未进入情绪调节详情');

if (actions.bottom > actions.sceneBottom) throw new Error(`操作区溢出：${actions.bottom}/${actions.sceneBottom}`);
if (actions.buttons - actions.question > 14) throw new Error('问题与按钮距离过远');
if (errors.length) throw new Error(`浏览器错误：${errors.join(' | ')}`);
console.log(JSON.stringify({ firstTitle, secondTitle, firstPalette, secondPalette, stateLayouts, actions, overlayDebug, errors }, null, 2));
await browser.close();
