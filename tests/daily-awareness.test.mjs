import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

const html = readFileSync(new URL('../LOOOVE-demo.html', import.meta.url), 'utf8');

test('daily entry is named 每日身心觉察', () => {
  assert.match(html, />每日身心觉察<\/button>/);
  assert.doesNotMatch(html, />每日情绪调频<\/button>/);
});

test('demo starts directly in daily awareness with onboarding disabled', () => {
  assert.match(html, /<!--\s*<button[^>]+data-mode="onboarding"[\s\S]*?<\/button>\s*-->/);
  assert.match(html, /\/\* 打开页面即进入每日身心觉察 \*\/[\s\S]*?try\{openBodyAwareness\(\);\}catch\(e\)\{\}/);
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
