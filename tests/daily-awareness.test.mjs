import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

const html = readFileSync(new URL('../LOOOVE-demo.html', import.meta.url), 'utf8');

test('realtime awareness and daily tabs control the popup', () => {
  assert.match(html, /<div class="flow-picker" id="flowPicker"[^>]*role="tablist"/);
  assert.match(html, /<button[^>]+class="fp-btn on"[^>]+data-flow="awareness"[^>]+onclick="selectHomeFlow\('awareness'\)"[^>]*>实时身心觉察<\/button>/);
  assert.match(html, /<button[^>]+class="fp-btn"[^>]+data-flow="daily"[^>]+onclick="selectHomeFlow\('daily'\)"[^>]*>日常<\/button>/);
  const flow = html.match(/function selectHomeFlow\(flow\)\{([\s\S]*?)\n\}/)?.[1] ?? '';
  assert.match(flow, /if\(flow==='awareness'\)\{openBodyAwareness\(\);return;\}/);
  assert.match(flow, /closeBodyAwareness\(false\)/);
  assert.match(flow, /tune\.style\.display='none'/);
});

test('closing realtime awareness selects the daily tab', () => {
  const closeBody = html.match(/function closeBodyAwareness\(playSound=true\)\{([\s\S]*?)\n\}/)?.[1] ?? '';
  assert.match(closeBody, /if\(playSound\)\{_setHomeFlowActive\('daily'\);Audio\$\.soft\(\);\}/);
});

test('body status uses the Loooveness language system', () => {
  const sphere = html.match(/<div class="hs-center">([\s\S]*?)<\/div>\s*<div class="hs-ring">/)?.[1] ?? '';
  assert.match(sphere, /<div class="hsc-status">身心安适<\/div>/);
  assert.match(sphere, /<div class="hsc-sub">Loooveness: 44<\/div>/);
  assert.doesNotMatch(sphere, /综合状态|>良好</);
});

test('emotion drawing record stays focused on the drawing task', () => {
  const record = html.match(/tuneToday:\{([\s\S]*?)\n\s*\},\n\s*bodyToday:/)?.[1] ?? '';
  assert.match(record, /粉橙|绿色|线条|绘画/);
  assert.doesNotMatch(record, /整理桌面|边界很清楚的小任务/);
  const drawingReply = html.match(/function finishMindDrawing\(\)\{([\s\S]*?)\n\}/)?.[1] ?? '';
  assert.match(drawingReply, /颜色|线条|呼吸/);
  assert.doesNotMatch(drawingReply, /整理桌面|出门走五分钟/);
});

test('demo starts in realtime awareness with onboarding disabled', () => {
  assert.doesNotMatch(html, /<button[^>]+data-mode="onboarding"/);
  assert.match(html, /\/\* 打开页面即进入实时身心觉察 \*\/[\s\S]*?try\{selectHomeFlow\('awareness'\);\}catch\(e\)\{\}/);
  assert.doesNotMatch(html, /\/\* 打开页面即进入 onboarding \*\/[\s\S]*?try\{onbShow\(\);\}catch\(e\)\{\}/);
});

test('daily tune opens an eight-state awareness scene', () => {
  assert.match(html, /id="ov-body-awareness"/);
  assert.match(html, /const BODY_AWARENESS_STATES\s*=\s*\[/);
  const paths = [...html.matchAll(/assets\/身心觉察\/(\d+)\.png/g)].map(([, n]) => n);
  assert.deepEqual([...new Set(paths)].sort(), ['1','2','3','4','5','6','7','8']);
  for (let i = 1; i <= 8; i++) {
    assert.ok(existsSync(new URL(`../assets/身心觉察/${i}.png`, import.meta.url)));
  }
});

test('awareness copy omits the discarded AI drawing sentence', () => {
  assert.doesNotMatch(html, /根据你最近的身体节律[，,]\s*AI为你绘/);
  assert.match(html, /这像此刻的你吗？/);
});

test('awareness actions preserve the requested routes', () => {
  assert.match(html, /id="awarenessAdjust"[^>]+onclick="adjustAwarenessFeeling\(\)"/);
  const adjustBody = html.match(/function adjustAwarenessFeeling\(\)\{([\s\S]*?)\n\}/)?.[1] ?? '';
  assert.match(adjustBody, /switchAwarenessToTune\(\)/);
  assert.doesNotMatch(adjustBody, /closeBodyAwareness|openEmotionTune/);
  assert.match(html, /function switchAwarenessToTune\(\)[\s\S]*tunePageIn/);
  assert.match(html, /id="awarenessCare"[^>]+onclick="startAwarenessCare\(\)"/);
  assert.match(html, /function startAwarenessCare\(\)[\s\S]*openHomeMindState\(\)/);
});

test('all awareness titles are short and the copy uses plain language', () => {
  const stateBlock = html.match(/const BODY_AWARENESS_STATES\s*=\s*\[([\s\S]*?)\n\];/)?.[1] ?? '';
  const titles = [...stateBlock.matchAll(/title:'([^']+)'/g)].map(([, title]) => title);
  const poems = [...stateBlock.matchAll(/poem:'([^']+)'/g)].map(([, poem]) => poem);
  assert.equal(titles.length, 8);
  assert.ok(titles.every(title => [...title].length <= 4), titles.join('、'));
  assert.equal(poems.length, 8);
  assert.doesNotMatch(stateBlock, /没睡够|做一件简单的小事|今天少安排一件事/);
  assert.ok(poems.every(poem => (poem.match(/。/g) || []).length === 3));
  assert.ok(poems.every(poem => (poem.match(/\\n/g) || []).length === 2));
  assert.ok(poems.every(poem => /身体|睡眠|恢复|精力|注意力|心里/.test(poem)));
  assert.ok(poems.every(poem => !/HRV|血氧|心率\d|压力\d|夜醒\d|体温\d/.test(poem)));
});

test('each awareness image has its own score and button palette', () => {
  const stateBlock = html.match(/const BODY_AWARENESS_STATES\s*=\s*\[([\s\S]*?)\n\];/)?.[1] ?? '';
  const palettes = [...stateBlock.matchAll(/palette:\{score:'(#[0-9a-fA-F]{6})',primary:'(#[0-9a-fA-F]{6})',secondary:'(#[0-9a-fA-F]{6})'/g)];
  assert.equal(palettes.length, 8);
  assert.equal(new Set(palettes.map(match => match[2])).size, 8);
  assert.match(html, /style\.setProperty\('--awareness-score',state\.palette\.score\)/);
  assert.match(html, /style\.setProperty\('--awareness-primary',state\.palette\.primary\)/);
  assert.match(html, /style\.setProperty\('--awareness-secondary',state\.palette\.secondary\)/);
});

test('Loooveness score links directly to the body status page', () => {
  assert.match(html, /class="awareness-score-link"[^>]+onclick="openAwarenessBodyState\(\)"[^>]+aria-label="查看身体状态"/);
  assert.match(html, /class="awareness-score-link"[\s\S]*?id="awarenessScore"[\s\S]*?<svg class="awareness-score-arrow"/);
  assert.doesNotMatch(html, /class="awareness-score-go"/);
  const route = html.match(/function openAwarenessBodyState\(\)\{([\s\S]*?)\n\}/)?.[1] ?? '';
  assert.match(route, /closeBodyAwareness\(false\)/);
  assert.match(route, /toggleHomeBodyState\(\)/);
});

test('Loooveness arrow is optically centered with its label', () => {
  assert.match(html, /\.awareness-score-arrow\{[^}]*transform:translateY\(1px\)/);
  assert.match(html, /\.awareness-score-link:hover \.awareness-score-arrow\{transform:translate\(1px,0\)\}/);
});

test('each image also changes the full text palette', () => {
  const stateBlock = html.match(/const BODY_AWARENESS_STATES\s*=\s*\[([\s\S]*?)\n\];/)?.[1] ?? '';
  const textPalettes = [...stateBlock.matchAll(/ink:'(#[0-9a-fA-F]{6})',body:'(#[0-9a-fA-F]{6})'/g)];
  assert.equal(textPalettes.length, 8);
  assert.equal(new Set(textPalettes.map(match => match[1])).size, 8);
  assert.match(html, /style\.setProperty\('--awareness-ink',state\.palette\.ink\)/);
  assert.match(html, /style\.setProperty\('--awareness-body',state\.palette\.body\)/);
  assert.match(html, /\.awareness-title\{[^}]*var\(--awareness-ink\)/);
  assert.match(html, /\.awareness-poem\{[^}]*var\(--awareness-body\)/);
});

test('tune screen can return to the same awareness page', () => {
  assert.match(html, /class="tune-back"[^>]+onclick="returnEmotionTuneToAwareness\(\)"[^>]*>返回<\/button>/);
  const returnBody = html.match(/function returnEmotionTuneToAwareness\(\)\{([\s\S]*?)\n\}/)?.[1] ?? '';
  assert.match(returnBody, /ov-body-awareness/);
  assert.doesNotMatch(returnBody, /openBodyAwareness|Math\.random/);
});

test('awareness copy and question use the same readable size', () => {
  assert.match(html, /\.awareness-poem\{[^}]*font-size:15px/);
  assert.match(html, /\.awareness-question\{[^}]*font-size:15px/);
});

test('awareness main title is scaled to 85 percent of its original size', () => {
  assert.match(html, /\.awareness-title\{font-size:clamp\(28\.9px,8\.5vw,39\.1px\)/);
});

test('awareness and emotion tuning share a closable three-quarters-height sheet', () => {
  assert.match(html, /--wellbeing-sheet-top:\s*25%/);
  assert.match(html, /#ov-body-awareness,#ov-emotion-tune\{[^}]*top:var\(--wellbeing-sheet-top\)!important[^}]*bottom:0!important/);
  assert.match(html, /#ov-body-awareness,#ov-emotion-tune\{[^}]*border-radius:30px 30px 0 0/);
  assert.match(html, /\.tune-panel\.result-mode\{[^}]*overflow-y:auto/);
});

test('each body metric section shares the AI insight glass material', () => {
  const rule = html.match(/:is\(#ov-activity,#ov-heartrate,#ov-stress,#ov-spo2,#ov-temp\) \.sr-scroll > :is\(\.card,\.sr-ai-insight\)\{([^}]*)\}/)?.[1] ?? '';
  assert.match(rule, /background:linear-gradient\(145deg,rgba\(255,248,243,\.76\),rgba\(255,235,228,\.54\)\)!important/);
  assert.match(rule, /border:0!important/);
  assert.match(rule, /box-shadow:0 5px 12px rgba\(142,102,82,\.1\),0 1px 3px rgba\(142,102,82,\.05\),inset 0 1px 0 rgba\(255,255,255,\.88\)!important/);
  assert.match(rule, /backdrop-filter:blur\(26px\) saturate\(155%\) brightness\(1\.03\)/);
  assert.match(html, /:is\(#ov-activity,#ov-heartrate,#ov-stress,#ov-spo2,#ov-temp\) \.sr-scroll\{gap:20px\}/);
  assert.doesNotMatch(html, /:is\(#ov-activity,#ov-heartrate,#ov-stress,#ov-spo2,#ov-temp\) \.sr-scroll > \.sr-ai-insight\{/);
});

test('body metric detail structures never collapse into a white strip', () => {
  assert.match(html, /:is\(#ov-activity,#ov-heartrate,#ov-stress,#ov-spo2,#ov-temp\) \.sr-scroll > \*\{flex-shrink:0\}/);
});
