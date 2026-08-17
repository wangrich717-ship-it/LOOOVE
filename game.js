const root = document.documentElement;
const deploymentConfig = {
  homeUrl: root.dataset.loooveHomeUrl,
  gameUrl: root.dataset.loooveGameUrl,
  demoZhUrl: root.dataset.loooveDemoZhUrl,
  demoEnUrl: root.dataset.loooveDemoEnUrl,
  reportEndpoint: root.dataset.loooveReportEndpoint,
  reportNonce: root.dataset.loooveReportNonce,
  ...(window.LOOOVE_CONFIG || {}),
};
const releaseToolkitQuery = new URLSearchParams(window.location.search);
const releaseToolkitMode = releaseToolkitQuery.get('toolkit') === '1';
const releaseToolkitEntryMode = releaseToolkitQuery.get('mode');
const releaseToolkitLanguage = releaseToolkitQuery.get('lang') === 'en' ? 'en' : 'zh';
function releaseToolkitDemoUrl() {
  if (releaseToolkitLanguage === 'en') return deploymentConfig.demoEnUrl || '新demo/LOOOVE-demo-shell%20-%20en.html';
  return deploymentConfig.demoZhUrl || '新demo/LOOOVE-demo-shell%20-%20cn.html';
}
function returnToReleaseDemo() {
  try {
    const referrer = new URL(document.referrer);
    const cameFromDemoShell = referrer.origin === window.location.origin
      && /\/新demo\/LOOOVE-demo-shell - (?:cn|en)\.html$/.test(decodeURIComponent(referrer.pathname));
    if (cameFromDemoShell) {
      window.history.back();
      return;
    }
  } catch {
    // A missing or malformed referrer falls through to the language-matched shell.
  }
  window.location.href = releaseToolkitDemoUrl();
}
const gameBackLinks = [...document.querySelectorAll('.game-back')];
gameBackLinks.forEach((link) => {
  link.href = releaseToolkitMode ? releaseToolkitDemoUrl() : (deploymentConfig.homeUrl || 'index.html');
});
const readyButton = document.querySelector('#readyButton');
const languageToggle = document.querySelector('#gameLanguageToggle');
const soundToggle = document.querySelector('#soundToggle');
const welcomeTitle = document.querySelector('#welcomeTitle');
const welcomeLead = document.querySelector('#welcomeLead');
const weatherTitle = document.querySelector('#weatherTitle');
const weatherArtwork = document.querySelector('#weatherArtwork');
const weatherName = document.querySelector('#weatherName');
const weatherDescription = document.querySelector('#weatherDescription');
const weatherTuner = document.querySelector('#weatherTuner');
const tunerTrackWrap = document.querySelector('.tuner-track-wrap');
const weatherStateLabels = [...document.querySelectorAll('.weather-state')];
const continueButton = document.querySelector('#continueButton');
const stressStepBack = document.querySelector('#stressStepBack');
const stressStage = document.querySelector('#stressStage');
const releaseDetailHeader = document.querySelector('#releaseDetailHeader');
const releaseDetailBack = document.querySelector('#releaseDetailBack');
const releaseDetailTitle = document.querySelector('#releaseDetailTitle');
const pressureSponge = document.querySelector('#pressureSponge');
const pressureSpongeBody = document.querySelector('.pressure-sponge-shape--body');
const pressureSpongeTexture = document.querySelector('.pressure-sponge-shape--texture');
const pressureSpongeContour = document.querySelector('.pressure-sponge-shape--contour');
const pressureReset = document.querySelector('#pressureReset');
const pressureField = document.querySelector('#pressureField');
const stressSourceArea = document.querySelector('#stressSourceArea');
const stressSourceList = document.querySelector('#stressSourceList');
const stressOtherField = document.querySelector('#stressOtherField');
const stressOtherInput = document.querySelector('#stressOtherInput');
const confirmSources = document.querySelector('#confirmSources');
const confirmResponses = document.querySelector('#confirmResponses');
const intensityContinue = document.querySelector('#intensityContinue');
const pressureSelection = document.querySelector('#pressureSelection');
const responseList = document.querySelector('#responseList');
const copingList = document.querySelector('#copingList');
const copingOtherInput = document.querySelector('#copingOtherInput');
const copingExperience = document.querySelector('#copingExperience');
const copingExperienceScene = document.querySelector('#copingExperienceScene');
const copingExperiencePrompt = document.querySelector('#copingExperiencePrompt');
const copingExperienceProgress = document.querySelector('#copingExperienceProgress');
const completeCopingExperienceButton = document.querySelector('#completeCopingExperience');
const experiencePressureValue = document.querySelector('#experiencePressureValue');
const rhythmSpeed = document.querySelector('#rhythmSpeed');
const rhythmSpeedValue = document.querySelector('#rhythmSpeedValue');
const rhythmStage = document.querySelector('#rhythmStage');
const rhythmNoteField = document.querySelector('#rhythmNoteField');
const rhythmLaneButtons = [...document.querySelectorAll('[data-rhythm-lane]')];
const rhythmCombo = document.querySelector('#rhythmCombo');
const rhythmStatus = document.querySelector('#rhythmStatus');
const rhythmJudgement = document.querySelector('#rhythmJudgement');
const rhythmCompletionMessage = document.querySelector('#rhythmCompletionMessage');
const storePressureText = document.querySelector('#storePressureText');
const storePressureButton = document.querySelector('#storePressureButton');
const sealExperience = document.querySelector('.experience-seal');
const pressureChamber = document.querySelector('.pressure-dispersal-shell');
const pressureFragments = [...document.querySelectorAll('.pressure-fragment')];
const motionStatus = copingExperiencePrompt;
const dandelionBreathButton = document.querySelector('#dandelionBreathButton');
const dandelionSimulateButton = document.querySelector('#dandelionSimulateButton');
const dandelionBreathStatus = document.querySelector('#dandelionBreathStatus');
const dandelionExperience = document.querySelector('.experience-breathe');
const DANDELION_SEEDS_PER_FLOWER = 18;
document.querySelectorAll('.dandelion-seeds').forEach((crown, flowerIndex) => {
  for (let seedIndex = 0; seedIndex < DANDELION_SEEDS_PER_FLOWER; seedIndex += 1) {
    const seed = document.createElement('i');
    seed.className = 'dandelion-seed';
    seed.style.setProperty('--seed-index', seedIndex);
    seed.style.setProperty('--flower-index', flowerIndex);
    crown.append(seed);
  }
});
const dandelionSeeds = [...document.querySelectorAll('.dandelion-seed')];
const pressureValue = document.querySelector('#pressureValue');
const stressInstruction = document.querySelector('#stressInstruction');
const stressResult = document.querySelector('#stressResult');
const stressContinue = document.querySelector('#stressContinue');
const stressSourceButtons = [...document.querySelectorAll('[data-stress-source]')];
const stressResponseButtons = [...document.querySelectorAll('[data-stress-response]')];
const copingModeButtons = [...document.querySelectorAll('[data-coping-mode]')];
const relationshipPanel = document.querySelector('#relationshipPanel');
const relationshipStage = document.querySelector('#relationshipStage');
const relationshipTitle = document.querySelector('#relationshipTitle');
const relationshipPeople = [...document.querySelectorAll('[data-relationship-person]')];
const relationshipTray = document.querySelector('#relationshipTray');
const relationshipDistanceContinue = document.querySelector('#relationshipDistanceContinue');
const relationshipExpressionLines = document.querySelector('#relationshipExpressionLines');
const relationshipExpressionPanel = document.querySelector('#relationshipExpressionPanel');
const relationshipRecipientButtons = [...document.querySelectorAll('[data-relationship-recipient]')];
const relationshipMessageFields = [...document.querySelectorAll('[data-relationship-message-field]')];
const relationshipMessageInputs = [...document.querySelectorAll('[data-relationship-message]')];
const relationshipStarterButtons = [...document.querySelectorAll('[data-message-starter]')];
const relationshipSaveMessages = document.querySelector('#relationshipSaveMessages');
const relationshipReportPanel = document.querySelector('#relationshipReportPanel');
const relationshipReportForm = document.querySelector('#relationshipReportForm');
const relationshipReportEmail = document.querySelector('#relationshipReportEmail');
const relationshipReportConsent = document.querySelector('#relationshipReportConsent');
const relationshipReportSubmit = document.querySelector('#relationshipReportSubmit');
const relationshipReportStatus = document.querySelector('#relationshipReportStatus');
const relationshipSaved = document.querySelector('#relationshipSaved');
const relationshipFinish = document.querySelector('#relationshipFinish');
const relationshipStatus = document.querySelector('#relationshipStatus');
const relationshipBack = document.querySelector('#relationshipBack');
const dailyPanel = document.querySelector('.daily-panel');
const dailySections = [...document.querySelectorAll('[data-daily-section]')];
const dailyPhaseDots = [...document.querySelectorAll('[data-phase-dot]')];
const dailyBack = document.querySelector('#dailyBack');
const foodButtons = [...document.querySelectorAll('[data-food-category]')];
const foodPantry = document.querySelector('#foodPantry');
const foodBowl = document.querySelector('#foodBowl');
const foodPercent = document.querySelector('#foodPercent');
const foodUndo = document.querySelector('#foodUndo');
const foodContinue = document.querySelector('#foodContinue');
const customFoodInput = document.querySelector('#customFoodInput');
const customFoodAdd = document.querySelector('#customFoodAdd');
const movementButtons = [...document.querySelectorAll('[data-movement-type]')];
const movementBody = document.querySelector('#movementBody');
const movementPercent = document.querySelector('#movementPercent');
const movementSkip = document.querySelector('#movementSkip');
const movementUndo = document.querySelector('#movementUndo');
const movementContinue = document.querySelector('#movementContinue');
const customMovementInput = document.querySelector('#customMovementInput');
const customMovementAdd = document.querySelector('#customMovementAdd');
const sleepArc = document.querySelector('#sleepArc');
const sleepArcTrack = document.querySelector('#sleepArcTrack');
const sleepArcProgress = document.querySelector('#sleepArcProgress');
const sleepTimeTicks = document.querySelector('#sleepTimeTicks');
const sleepWakeNodes = document.querySelector('#sleepWakeNodes');
const sleepBedtimeHandle = document.querySelector('#sleepBedtimeHandle');
const sleepWakeHandle = document.querySelector('#sleepWakeHandle');
const sleepBedtime = document.querySelector('#sleepBedtime');
const sleepWake = document.querySelector('#sleepWake');
const sleepRestoration = document.querySelector('#sleepRestoration');
const sleepBedtimeValue = document.querySelector('#sleepBedtimeValue');
const sleepWakeValue = document.querySelector('#sleepWakeValue');
const sleepRestorationValue = document.querySelector('#sleepRestorationValue');
const sleepDuration = document.querySelector('#sleepDuration');
const sleepInterruptionText = document.querySelector('#sleepInterruptionText');
const sleepClearNodes = document.querySelector('#sleepClearNodes');
const sleepContinue = document.querySelector('#sleepContinue');
const atlasClueGrid = document.querySelector('#atlasClueGrid');
const dailyReportForm = document.querySelector('#dailyReportForm');
const dailyReportEmail = document.querySelector('#dailyReportEmail');
const dailyReportConsent = document.querySelector('#dailyReportConsent');
const dailyReportSubmit = document.querySelector('#dailyReportSubmit');
const dailyReportStatus = document.querySelector('#dailyReportStatus');
const dailySaved = document.querySelector('#dailySaved');

let language = 'zh';
let sequenceToken = 0;
let weatherQuestionToken = 0;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const gameState = {
  playerName: '',
  choiceHistory: [],
  bodyWeather: 'clear',
  weatherIndex: 0,
  stress: { step: 'source', selectedSources: [], otherSource: '', intensity: 0, holdMs: 0, stressResponse: null, stressResponses: [], copingMode: null, otherCoping: '', experienceProgress: 0, remainingPressure: 0, completed: false },
  relationship: { phase: 'distance', selectedRecipients: [], messages: {}, people: [], email: '', reportId: null, recorded: false },
  daily: {
    phase: 'food', foodPercent: 0, foodServings: [], foodCounts: {},
    movementPercent: 0, movementChoices: [], movementSkipped: false,
    bedtime: 23, wake: 7, sleepInterruptions: [], restoration: 55,
    email: '', reportId: null
  }
};
const releaseDetailTitles = {
  rhythm: { zh: '音游释放', en: 'Rhythm release' },
  breathe: { zh: '呼吸调整', en: 'Breath regulation' },
  shake: { zh: '摇散压力', en: 'Disperse pressure' },
  seal: { zh: '压力寄存', en: 'Store pressure' }
};

function updateReleaseDetailHeader(mode = gameState.stress.copingMode || releaseToolkitEntryMode) {
  if (!releaseDetailTitle) return;
  const copy = releaseDetailTitles[mode] || releaseDetailTitles.rhythm;
  releaseDetailTitle.textContent = copy[language];
  releaseDetailTitle.dataset.zh = copy.zh;
  releaseDetailTitle.dataset.en = copy.en;
  releaseDetailBack?.setAttribute('aria-label', language === 'zh' ? '返回 Demo' : 'Back to Demo');
}

const RHYTHM_SPEED_MIN = .65;
const RHYTHM_SPEED_MAX = 1.15;
const RHYTHM_LANE_FREQ = [392, 440, 523.25, 659.25];
const RHYTHM_KEY_MAP = { KeyD: 0, KeyF: 1, KeyJ: 2, KeyK: 3 };
const RHYTHM_TRAVEL_STEPS = 8;
const RHYTHM_JUDGE_WINDOWS = { perfect: .075, good: .2 };
const RHYTHM_SONG_END_PADDING = 4;
const rhythmSeq = (start, gap, lanes) => lanes.map((lane, index) => [start + index * gap, lane]);
const rhythmDouble = (step, firstLane, secondLane) => [[step, firstLane], [step, secondLane]];
const rhythmLong = (step, lane) => [[step, lane, 4]];
const RHYTHM_MOTIFS = {
  arch: [[0,1],[2,2],[4,3],[6,2]], fall: [[0,2],[2,1],[4,0]], wave: [[0,0],[2,1],[4,2],[6,1]],
  leap: [[0,0],[2,3],[4,1]], zig: [[0,1],[1,2],[2,1],[3,2]], run: [[0,0],[1,1],[2,2],[3,3]],
  rd: [[0,3],[1,2],[2,1],[3,0]], pair: [[0,1],[1,1],[2,2],[3,2]]
};
const rhythmAt = (step, motif, laneOffset = 0) => motif.map(([offset, lane]) => [step + offset, Math.max(0, Math.min(3, lane + laneOffset))]);
const RHYTHM_SONG = {
  name: '急曲子', voice: 'pipa', bpm: 136,
  chart: [
    ...rhythmDouble(0,0,2), ...rhythmSeq(4,1,[1,2,3]), ...rhythmSeq(8,2,[2]), ...rhythmSeq(10,1,[1,0]), ...rhythmLong(12,1),
    ...rhythmSeq(16,1,[2,3,2,1]), ...rhythmSeq(20,2,[0]), ...rhythmSeq(22,2,[1]), ...rhythmDouble(24,1,3), ...rhythmSeq(26,2,[2,1,0]),
    ...rhythmSeq(32,1,[3,2,1,0]), ...rhythmSeq(36,2,[1,2]), ...rhythmLong(40,3), ...rhythmSeq(44,1,[2,3,2]), ...rhythmSeq(48,1,[1,2,1,0]),
    ...rhythmDouble(52,0,2), ...rhythmSeq(56,1,[1,2,3]), ...rhythmSeq(60,1,[3,2,1]), ...rhythmSeq(64,2,[0]), ...rhythmSeq(66,1,[1,2,3]),
    ...rhythmSeq(70,1,[2,3]), ...rhythmLong(72,2), ...rhythmSeq(76,1,[1,2,1,0]), ...rhythmDouble(80,1,2), ...rhythmSeq(84,2,[3,2,1,0,1]),
    ...rhythmLong(94,0), ...rhythmDouble(104,1,3), ...rhythmAt(108,RHYTHM_MOTIFS.rd), ...rhythmAt(112,RHYTHM_MOTIFS.run), ...rhythmAt(116,RHYTHM_MOTIFS.zig),
    ...rhythmAt(120,RHYTHM_MOTIFS.zig), ...rhythmLong(126,2), ...rhythmAt(136,RHYTHM_MOTIFS.leap), ...rhythmAt(144,RHYTHM_MOTIFS.run,-1),
    ...rhythmAt(148,RHYTHM_MOTIFS.rd,1), ...rhythmDouble(152,0,2), ...rhythmAt(156,RHYTHM_MOTIFS.pair), ...rhythmAt(160,RHYTHM_MOTIFS.pair,1),
    ...rhythmLong(166,3), ...rhythmAt(176,RHYTHM_MOTIFS.zig), ...rhythmAt(180,RHYTHM_MOTIFS.zig,-1), ...rhythmAt(184,RHYTHM_MOTIFS.leap),
    ...rhythmAt(192,RHYTHM_MOTIFS.arch), ...rhythmAt(200,RHYTHM_MOTIFS.fall), ...rhythmDouble(206,1,3), ...rhythmAt(212,RHYTHM_MOTIFS.run),
    ...rhythmAt(216,RHYTHM_MOTIFS.rd), ...rhythmAt(220,RHYTHM_MOTIFS.wave), ...rhythmAt(228,RHYTHM_MOTIFS.leap), ...rhythmAt(236,RHYTHM_MOTIFS.fall,1),
    ...rhythmSeq(242,2,[2,1]), ...rhythmLong(248,0)
  ]
};
const rhythmState = {
  speed: .8,
  playing: false,
  positionSteps: -RHYTHM_TRAVEL_STEPS,
  lastTimestamp: 0,
  frame: null,
  notes: [],
  combo: 0,
  judgements: { perfect: 0, good: 0, miss: 0 },
  lastStatus: '',
  pipaBuffers: new Map()
};

let pressureFrame = null;
let pressureStartedAt = 0;
let pressureHolding = false;
let sealFrame = null;
let bubbleTimer = null;
let tunerPointerId = null;
let breathStream = null;
let breathSource = null;
let breathAnalyser = null;
let breathData = null;
let breathFrame = null;
let breathSeedIndex = 0;
let lastBreathSeedAt = 0;
let simulatedBreathTimer = null;
let microphoneRequestId = 0;
let dispersalPointerSample = null;
let motionControlActive = false;
const MICROPHONE_TIMEOUT_MS = 4500;
const dispersalPhysics = { tilt: 0, velocity: 0, target: 0, phase: 0, lastTime: 0, lastDirection: 0, lastReleaseAt: 0, frame: null };
const bubbleField = { particles: [], frame: null, lastTime: 0 };
let relationshipDrag = null;

const ScreenManager = {
  current: 'welcomeScreen',
  history: [],
  show(id, direction = 'forward') {
    if (id === this.current) return;
    const previousId = this.current;
    const previous = document.getElementById(previousId);
    const next = document.getElementById(id);
    if (!next) return;

    previous.style.animation = direction === 'forward'
      ? 'slideOutLeft .35s var(--ease-smooth) forwards'
      : 'slideOutRight .35s var(--ease-smooth) forwards';

    window.setTimeout(() => {
      previous.hidden = true;
      previous.classList.remove('is-active');
      previous.style.animation = '';
      next.hidden = false;
      next.classList.add('is-active');
      next.style.animation = direction === 'forward'
        ? 'slideInRight .55s var(--ease-out) both'
        : 'slideInLeft .55s var(--ease-out) both';
    }, reduceMotion ? 0 : 350);

    if (direction === 'forward') this.history.push(previousId);
    this.current = id;
  },
  back() {
    const previous = this.history.pop();
    if (previous) this.show(previous, 'back');
  }
};

function createSoftPopWavDataUri() {
  const sampleRate = 12000;
  const duration = .19;
  const samples = Math.floor(sampleRate * duration);
  const bytes = new Uint8Array(44 + samples * 2);
  const view = new DataView(bytes.buffer);
  const writeText = (offset, value) => [...value].forEach((character, index) => view.setUint8(offset + index, character.charCodeAt(0)));
  writeText(0, 'RIFF'); view.setUint32(4, 36 + samples * 2, true); writeText(8, 'WAVE'); writeText(12, 'fmt ');
  view.setUint32(16, 16, true); view.setUint16(20, 1, true); view.setUint16(22, 1, true); view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true); view.setUint16(32, 2, true); view.setUint16(34, 16, true); writeText(36, 'data'); view.setUint32(40, samples * 2, true);
  let lowNoise = 0;
  for (let index = 0; index < samples; index += 1) {
    const time = index / sampleRate;
    const envelope = Math.pow(1 - index / samples, 4.2);
    lowNoise = lowNoise * .72 + (Math.random() * 2 - 1) * .28;
    const air = lowNoise * envelope * .38;
    const membrane = Math.sin(2 * Math.PI * (420 - time * 1050) * time) * Math.exp(-time * 25) * .32;
    const sample = Math.max(-1, Math.min(1, air + membrane));
    view.setInt16(44 + index * 2, sample * 32767, true);
  }
  let binary = '';
  bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
  return `data:audio/wav;base64,${btoa(binary)}`;
}

const softPopDataUri = createSoftPopWavDataUri();

function playSoftPopMedia() {
  if (Audio$.muted) return;
  try {
    const player = new Audio(softPopDataUri);
    player.volume = .32;
    player.play().catch(() => {});
  } catch (error) { /* Sound is a progressive enhancement. */ }
}

const Audio$ = {
  context: null,
  contextUnavailable: false,
  master: null,
  bgmBus: null,
  weatherBus: null,
  delay: null,
  enabled: false,
  muted: false,
  bgmTimer: null,
  pianoStep: 0,
  weatherNoise: null,
  weatherGain: null,
  thunderTimer: null,
  insectTimer: null,
  pressureVoice: null,
  ensureContext() {
    if (this.context) return this.context;
    if (this.contextUnavailable) return null;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return null;
    try { this.context = new AudioContextClass(); }
    catch (error) { this.contextUnavailable = true; return null; }
    this.master = this.context.createGain();
    this.master.gain.value = .72;
    this.bgmBus = this.context.createGain();
    this.weatherBus = this.context.createGain();
    this.bgmBus.gain.value = .2;
    this.weatherBus.gain.value = 1.18;
    this.delay = this.context.createDelay(.8);
    const echoGain = this.context.createGain();
    this.delay.delayTime.value = .34;
    echoGain.gain.value = .16;
    this.delay.connect(echoGain);
    echoGain.connect(this.bgmBus);
    this.bgmBus.connect(this.master);
    this.weatherBus.connect(this.master);
    this.master.connect(this.context.destination);
    return this.context;
  },
  async unlock() {
    try {
      const context = this.ensureContext();
      if (!context) return;
      if (context.state === 'suspended') await context.resume();
      this.enabled = true;
      this.startBgm();
      soundToggle.textContent = '◉';
      soundToggle.setAttribute('aria-label', language === 'zh' ? '关闭声音' : 'Mute sound');
    } catch (error) { /* Audio remains a progressive enhancement. */ }
  },
  typeTick(character = '') {
    if (!this.enabled || this.muted || /\s/.test(character)) return;
    const context = this.ensureContext();
    if (!context) return;
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.value = 610 + (character.charCodeAt(0) % 7) * 26;
    gain.gain.setValueAtTime(.012, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(.0001, context.currentTime + .035);
    oscillator.connect(gain);
    gain.connect(this.master);
    oscillator.start();
    oscillator.stop(context.currentTime + .04);
  },
  playPianoNote(frequency = 220, duration = 3.2, volume = .028) {
    if (!this.enabled || this.muted) return;
    const context = this.ensureContext();
    if (!context) return;
    const now = context.currentTime;
    const gain = context.createGain();
    const filter = context.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 1650;
    gain.gain.setValueAtTime(.0001, now);
    gain.gain.exponentialRampToValueAtTime(volume, now + .045);
    gain.gain.exponentialRampToValueAtTime(.0001, now + duration);
    gain.connect(filter);
    filter.connect(this.bgmBus);
    filter.connect(this.delay);
    [1, 2.003].forEach((ratio, index) => {
      const oscillator = context.createOscillator();
      oscillator.type = index ? 'sine' : 'triangle';
      oscillator.frequency.value = frequency * ratio;
      oscillator.detune.value = index ? -5 : 0;
      oscillator.connect(gain);
      oscillator.start(now);
      oscillator.stop(now + duration + .08);
    });
  },
  startBgm() {
    if (this.bgmTimer || !this.enabled) return;
    const notes = [146.83, 220, 174.61, 261.63, 196, 293.66, 220, 164.81];
    this.playPianoNote(notes[this.pianoStep], 4.4, .025);
    this.bgmTimer = window.setInterval(() => this.playPianoNote(notes[++this.pianoStep % notes.length], 4.4, .025), 4800);
  },
  stopWeatherNoise() {
    if (this.weatherNoise) {
      try { this.weatherNoise.stop(); } catch (error) { /* Already stopped. */ }
      this.weatherNoise.disconnect();
      this.weatherNoise = null;
    }
    if (this.weatherGain) {
      this.weatherGain.disconnect();
      this.weatherGain = null;
    }
    if (this.thunderTimer) {
      window.clearTimeout(this.thunderTimer);
      this.thunderTimer = null;
    }
    if (this.insectTimer) {
      window.clearTimeout(this.insectTimer);
      this.insectTimer = null;
    }
  },
  startWeatherNoise(weatherKey) {
    if (!this.enabled || this.muted) return;
    this.stopWeatherNoise();
    const context = this.ensureContext();
    if (!context) return;
    const profile = {
      clear: { volume: 0, low: 120, high: 920, noiseColor: 'pink', texture: 'air', accent: 'insects' },
      breeze: { volume: .068, low: 70, high: 760, noiseColor: 'pink', texture: 'breeze' },
      'low-cloud': { volume: .045, low: 65, high: 620, noiseColor: 'brown', texture: 'cloud' },
      drizzle: { volume: .06, low: 900, high: 5200, noiseColor: 'pink', texture: 'drizzle' },
      storm: { volume: .075, low: 110, high: 6500, noiseColor: 'brown', texture: 'storm' },
      fog: { volume: .105, low: 32, high: 360, noiseColor: 'brown', texture: 'fog' }
    }[weatherKey];
    if (profile.volume > 0) {
      const frameCount = context.sampleRate * 2;
      const buffer = context.createBuffer(1, frameCount, context.sampleRate);
      const data = buffer.getChannelData(0);
      let brown = 0;
      let pink = 0;
      let droplet = 0;
      for (let index = 0; index < frameCount; index += 1) {
        const white = Math.random() * 2 - 1;
        brown = (brown + .02 * white) / 1.02;
        pink = pink * .985 + white * .015;
        const time = index / context.sampleRate;
        let sample = profile.noiseColor === 'brown' ? brown * 3.2 : pink * 6.4;
        if (profile.texture === 'breeze') {
          const breeze = .28 + .1 * Math.sin(time * Math.PI / 4.7) + .035 * Math.sin(time * Math.PI * .72);
          sample *= Math.max(.12, breeze);
        } else if (profile.texture === 'drizzle') {
          if (Math.random() < .0022) droplet = .5 + Math.random() * .38;
          droplet *= .94;
          sample = sample * .24 + white * droplet * .42;
        } else if (profile.texture === 'cloud') {
          sample *= .58 + .18 * Math.sin(time * Math.PI / 4.8);
        } else if (profile.texture === 'fog') {
          sample *= .48 + .22 * Math.sin(time * Math.PI / 6.5);
        }
        data[index] = Math.max(-1, Math.min(1, sample));
      }
      const source = context.createBufferSource();
      const lowpass = context.createBiquadFilter();
      const highpass = context.createBiquadFilter();
      const gain = context.createGain();
      source.buffer = buffer;
      source.loop = true;
      lowpass.type = 'lowpass';
      lowpass.frequency.value = profile.high;
      highpass.type = 'highpass';
      highpass.frequency.value = profile.low;
      gain.gain.setValueAtTime(.0001, context.currentTime);
      gain.gain.exponentialRampToValueAtTime(profile.volume, context.currentTime + .8);
      source.connect(lowpass);
      lowpass.connect(highpass);
      highpass.connect(gain);
      gain.connect(this.weatherBus);
      source.start();
      this.weatherNoise = source;
      this.weatherGain = gain;
    }
    if (profile.accent === 'insects') {
      this.insectTimer = window.setTimeout(() => this.playInsectChirp(), 680);
    } else if (weatherKey === 'storm') {
      this.thunderTimer = window.setTimeout(() => {
        this.playThunder();
        if (gameState.bodyWeather === 'storm') this.scheduleThunder();
      }, 760);
    }
  },
  playInsectChirp() {
    if (!this.enabled || this.muted || gameState.bodyWeather !== 'clear') return;
    const context = this.ensureContext();
    if (!context) return;
    const now = context.currentTime;
    const carrier = context.createOscillator();
    const undertone = context.createOscillator();
    const tremolo = context.createOscillator();
    const tremoloDepth = context.createGain();
    const gain = context.createGain();
    const filter = context.createBiquadFilter();
    carrier.type = 'sine';
    carrier.frequency.value = 2380 + Math.random() * 180;
    undertone.type = 'sine';
    undertone.frequency.value = carrier.frequency.value * .67;
    tremolo.type = 'sine';
    tremolo.frequency.value = 18 + Math.random() * 5;
    tremoloDepth.gain.value = .0017;
    filter.type = 'bandpass';
    filter.frequency.value = 2360;
    filter.Q.value = 1.2;
    gain.gain.setValueAtTime(.0001, now);
    gain.gain.exponentialRampToValueAtTime(.0036, now + .06);
    gain.gain.exponentialRampToValueAtTime(.0001, now + .48);
    tremolo.connect(tremoloDepth);
    tremoloDepth.connect(gain.gain);
    carrier.connect(filter);
    undertone.connect(filter);
    filter.connect(gain);
    gain.connect(this.weatherBus);
    carrier.start(now);
    undertone.start(now);
    tremolo.start(now);
    carrier.stop(now + .5);
    undertone.stop(now + .5);
    tremolo.stop(now + .5);
    this.insectTimer = window.setTimeout(() => this.playInsectChirp(), 1450 + Math.random() * 1250);
  },
  startBubbleAmbience() {
    this.stopBubbleAmbience();
    if (!this.enabled || this.muted) return;
    this.playBubbleGurgle();
    bubbleTimer = window.setInterval(() => this.playBubbleGurgle(), 560);
  },
  stopBubbleAmbience() {
    if (bubbleTimer) window.clearInterval(bubbleTimer);
    bubbleTimer = null;
  },
  playBubbleGurgle() {
    if (!this.enabled || this.muted) return;
    const context = this.ensureContext();
    if (!context) return;
    const now = context.currentTime;
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(118 + Math.random() * 26, now);
    oscillator.frequency.exponentialRampToValueAtTime(64 + Math.random() * 18, now + .21);
    gain.gain.setValueAtTime(.0001, now);
    gain.gain.exponentialRampToValueAtTime(.018, now + .035);
    gain.gain.exponentialRampToValueAtTime(.0001, now + .24);
    oscillator.connect(gain);
    gain.connect(this.weatherBus);
    oscillator.start(now);
    oscillator.stop(now + .25);
  },
  scheduleThunder() {
    this.thunderTimer = window.setTimeout(() => {
      this.playThunder();
      if (gameState.bodyWeather === 'storm') this.scheduleThunder();
    }, 3600 + Math.random() * 3200);
  },
  playThunder() {
    if (!this.enabled || this.muted) return;
    const context = this.ensureContext();
    if (!context) return;
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const filter = context.createBiquadFilter();
    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(62, context.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(28, context.currentTime + 1.8);
    filter.type = 'lowpass';
    filter.frequency.value = 160;
    gain.gain.setValueAtTime(.0001, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(.16, context.currentTime + .06);
    gain.gain.exponentialRampToValueAtTime(.0001, context.currentTime + 2.3);
    oscillator.connect(filter);
    filter.connect(gain);
    gain.connect(this.weatherBus);
    oscillator.start();
    oscillator.stop(context.currentTime + 2.4);
  },
  startPressureTone() {
    if (!this.enabled || this.muted || this.pressureVoice) return;
    const context = this.ensureContext();
    if (!context) return;
    const now = context.currentTime;
    const gain = context.createGain();
    const filter = context.createBiquadFilter();
    gain.gain.setValueAtTime(.0001, now);
    gain.gain.exponentialRampToValueAtTime(.012, now + .16);
    filter.type = 'lowpass';
    filter.frequency.value = 180;
    const oscillators = [
      { frequency: 54, type: 'sine', volume: 1 },
      { frequency: 91, type: 'triangle', volume: .32 }
    ].map((voice) => {
      const oscillator = context.createOscillator();
      const voiceGain = context.createGain();
      oscillator.type = voice.type;
      oscillator.frequency.value = voice.frequency;
      voiceGain.gain.value = voice.volume;
      oscillator.connect(voiceGain);
      voiceGain.connect(filter);
      oscillator.start(now);
      return oscillator;
    });
    filter.connect(gain);
    gain.connect(this.weatherBus);
    this.pressureVoice = { gain, filter, oscillators };
  },
  updatePressureTone(intensity) {
    if (!this.pressureVoice || !this.context) return;
    const now = this.context.currentTime;
    this.pressureVoice.gain.gain.setTargetAtTime(.012 + intensity * .00046, now, .08);
    this.pressureVoice.filter.frequency.setTargetAtTime(180 + intensity * 6.4, now, .08);
    this.pressureVoice.oscillators[0].frequency.setTargetAtTime(54 + intensity * .12, now, .1);
    this.pressureVoice.oscillators[1].frequency.setTargetAtTime(91 + intensity * .28, now, .1);
  },
  stopPressureTone() {
    if (!this.pressureVoice || !this.context) return;
    const voice = this.pressureVoice;
    const now = this.context.currentTime;
    voice.gain.gain.cancelScheduledValues(now);
    voice.gain.gain.setTargetAtTime(.0001, now, .05);
    voice.oscillators.forEach((oscillator) => {
      try { oscillator.stop(now + .3); } catch (error) { /* Already stopped. */ }
    });
    window.setTimeout(() => {
      try { voice.gain.disconnect(); } catch (error) { /* Already disconnected. */ }
    }, 360);
    this.pressureVoice = null;
  },
  playSoftBubblePop(intensity = 50) {
    if (this.muted) return;
    playSoftPopMedia();
    if (!this.enabled) return;
    let context = null;
    try { context = this.ensureContext(); } catch (error) { return; }
    if (!context) return;
    const now = context.currentTime;
    const strength = Math.max(.35, Math.min(1, intensity / 100));

    const frameCount = Math.floor(context.sampleRate * .18);
    const buffer = context.createBuffer(1, frameCount, context.sampleRate);
    const data = buffer.getChannelData(0);
    for (let index = 0; index < frameCount; index += 1) {
      const envelope = Math.pow(1 - index / frameCount, 3.8);
      data[index] = (Math.random() * 2 - 1) * envelope * .6;
    }
    const noise = context.createBufferSource();
    const noiseFilter = context.createBiquadFilter();
    const noiseGain = context.createGain();
    noise.buffer = buffer;
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.value = 920;
    noiseFilter.Q.value = .7;
    noiseGain.gain.setValueAtTime(.0001, now);
    noiseGain.gain.exponentialRampToValueAtTime(.008 + strength * .009, now + .012);
    noiseGain.gain.exponentialRampToValueAtTime(.0001, now + .18);
    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(this.weatherBus);
    noise.start(now);

    const pop = context.createOscillator();
    const popGain = context.createGain();
    pop.type = 'sine';
    pop.frequency.setValueAtTime(440 + strength * 85, now);
    pop.frequency.exponentialRampToValueAtTime(185, now + .16);
    popGain.gain.setValueAtTime(.0001, now);
    popGain.gain.exponentialRampToValueAtTime(.018, now + .012);
    popGain.gain.exponentialRampToValueAtTime(.0001, now + .18);
    pop.connect(popGain);
    popGain.connect(this.weatherBus);
    pop.start(now);
    pop.stop(now + .2);
  },
  playParticleScatter(strength = .5) {
    if (!this.enabled || this.muted) return;
    const context = this.ensureContext();
    if (!context) return;
    const now = context.currentTime;
    const duration = .16;
    const frames = Math.floor(context.sampleRate * duration);
    const buffer = context.createBuffer(1, frames, context.sampleRate);
    const data = buffer.getChannelData(0);
    for (let index = 0; index < frames; index += 1) {
      const envelope = Math.pow(1 - index / frames, 2.2);
      const grain = Math.random() * 2 - 1;
      data[index] = grain * envelope * (.13 + Math.min(1, strength) * .16);
    }
    const source = context.createBufferSource();
    const filter = context.createBiquadFilter();
    const gain = context.createGain();
    source.buffer = buffer;
    filter.type = 'bandpass';
    filter.frequency.value = 1450 + strength * 1150;
    filter.Q.value = .9;
    gain.gain.setValueAtTime(.0001, now);
    gain.gain.exponentialRampToValueAtTime(.021, now + .012);
    gain.gain.exponentialRampToValueAtTime(.0001, now + duration);
    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.weatherBus);
    source.start(now);
  },
  playCopingEffect(mode, intensity = 50) {
    if (!this.enabled || this.muted) return;
    if (mode === 'rhythm') {
      [392, 523.25, 659.25].forEach((frequency, index) => playPipaNote(frequency, index * .07, .7));
      return;
    }
    const context = this.ensureContext();
    if (!context) return;
    const now = context.currentTime;
    const gain = context.createGain();
    const filter = context.createBiquadFilter();
    gain.connect(this.weatherBus);
    filter.connect(gain);

    if (mode === 'breathe') {
      const frames = Math.floor(context.sampleRate * 1.35);
      const buffer = context.createBuffer(1, frames, context.sampleRate);
      const data = buffer.getChannelData(0);
      let flow = 0;
      for (let index = 0; index < frames; index += 1) {
        flow = flow * .82 + (Math.random() * 2 - 1) * .18;
        data[index] = flow * Math.sin(Math.PI * index / frames) * .38;
      }
      const source = context.createBufferSource();
      source.buffer = buffer;
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1180, now);
      filter.frequency.exponentialRampToValueAtTime(260, now + 1.25);
      filter.Q.value = .45;
      gain.gain.setValueAtTime(.0001, now);
      gain.gain.exponentialRampToValueAtTime(.035, now + .12);
      gain.gain.exponentialRampToValueAtTime(.0001, now + 1.32);
      source.connect(filter);
      source.start(now);
      return;
    }

    if (mode === 'shake') {
      filter.type = 'bandpass';
      filter.frequency.value = 760;
      filter.Q.value = 1.3;
      [0,.12,.24,.38,.54,.72].forEach((offset,index) => {
        const oscillator = context.createOscillator();
        const pulse = context.createGain();
        oscillator.type = index % 2 ? 'triangle' : 'sine';
        oscillator.frequency.value = 170 + index * 31;
        pulse.gain.setValueAtTime(.0001, now + offset);
        pulse.gain.exponentialRampToValueAtTime(.038, now + offset + .018);
        pulse.gain.exponentialRampToValueAtTime(.0001, now + offset + .11);
        oscillator.connect(pulse);
        pulse.connect(filter);
        oscillator.start(now + offset);
        oscillator.stop(now + offset + .13);
      });
      gain.gain.value = 1;
      return;
    }

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1100, now);
    filter.frequency.exponentialRampToValueAtTime(150, now + 1.3);
    gain.gain.setValueAtTime(.0001, now);
    gain.gain.exponentialRampToValueAtTime(.045, now + .08);
    gain.gain.exponentialRampToValueAtTime(.0001, now + 1.45);
    [220,330,440].forEach((frequency,index) => {
      const oscillator = context.createOscillator();
      oscillator.type = 'sine';
      oscillator.frequency.value = frequency;
      oscillator.connect(filter);
      oscillator.start(now + index * .035);
      oscillator.stop(now + 1.5);
    });
  },
  tone(frequency = 440, duration = .12, volume = .026) {
    if (!this.enabled || this.muted) return;
    const context = this.ensureContext();
    if (!context) return;
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(volume, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(.0001, context.currentTime + duration);
    oscillator.connect(gain);
    gain.connect(this.master);
    oscillator.start();
    oscillator.stop(context.currentTime + duration);
  },
  toggleMute() {
    this.muted = !this.muted;
    if (this.master && this.context) {
      this.master.gain.setTargetAtTime(this.muted ? 0 : .72, this.context.currentTime, .04);
    }
    return this.muted;
  }
};

function createPipaBuffer(frequency) {
  const context = Audio$.ensureContext();
  if (!context) return null;
  const cacheKey = `${context.sampleRate}:${frequency.toFixed(2)}`;
  if (rhythmState.pipaBuffers.has(cacheKey)) return rhythmState.pipaBuffers.get(cacheKey);
  const duration = 1.9;
  const frameCount = Math.floor(context.sampleRate * duration);
  const period = Math.max(2, Math.round(context.sampleRate / frequency));
  const ring = new Float32Array(period);
  for (let index = 0; index < period; index += 1) ring[index] = Math.random() * 2 - 1;
  for (let index = 1; index < period; index += 1) ring[index] = ring[index] * .6 + ring[index - 1] * .4;
  const buffer = context.createBuffer(1, frameCount, context.sampleRate);
  const data = buffer.getChannelData(0);
  const damping = .9962 - Math.min(.0035, frequency / 220000);
  let peak = .0001;
  for (let index = 0; index < frameCount; index += 1) {
    const ringIndex = index % period;
    const nextIndex = (ringIndex + 1) % period;
    const sample = ring[ringIndex];
    ring[ringIndex] = (ring[ringIndex] + ring[nextIndex]) * .5 * damping;
    const attack = Math.min(1, index / Math.max(1, context.sampleRate * .004));
    data[index] = sample * attack;
    peak = Math.max(peak, Math.abs(data[index]));
  }
  const fadeFrames = Math.floor(context.sampleRate * .08);
  for (let index = 0; index < frameCount; index += 1) {
    const fade = index >= frameCount - fadeFrames ? (frameCount - index) / fadeFrames : 1;
    data[index] = data[index] / peak * .85 * fade;
  }
  rhythmState.pipaBuffers.set(cacheKey, buffer);
  return buffer;
}

function playPipaNote(frequency, delaySeconds = 0, volume = .48) {
  if (!Audio$.enabled || Audio$.muted) return;
  const context = Audio$.ensureContext();
  const buffer = createPipaBuffer(frequency);
  if (!context || !buffer) return;
  const when = context.currentTime + Math.max(0, delaySeconds);
  const source = context.createBufferSource();
  const filter = context.createBiquadFilter();
  const gain = context.createGain();
  source.buffer = buffer;
  filter.type = 'lowpass';
  filter.frequency.value = 3600;
  filter.Q.value = .28;
  gain.gain.setValueAtTime(.0001, when);
  gain.gain.exponentialRampToValueAtTime(.12 * volume, when + .008);
  gain.gain.exponentialRampToValueAtTime(.0001, when + 1.35);
  source.connect(filter);
  filter.connect(gain);
  gain.connect(Audio$.weatherBus);
  source.start(when);
  source.stop(when + 1.5);
}

function rhythmStepDuration() {
  return 30 / (RHYTHM_SONG.bpm * rhythmState.speed);
}

function setRhythmSpeed(value) {
  const numeric = Number(value);
  rhythmState.speed = Math.max(RHYTHM_SPEED_MIN, Math.min(RHYTHM_SPEED_MAX, Number.isFinite(numeric) ? numeric : .8));
  if (rhythmSpeed) rhythmSpeed.value = rhythmState.speed.toFixed(2);
  if (rhythmSpeedValue) rhythmSpeedValue.textContent = `${rhythmState.speed.toFixed(2)}×`;
}

function setRhythmStatus(zh, en = zh) {
  if (!rhythmStatus) return;
  rhythmState.lastStatus = language === 'zh' ? zh : en;
  rhythmStatus.textContent = rhythmState.lastStatus;
}

function showRhythmJudgement(judgement) {
  if (!rhythmJudgement) return;
  rhythmJudgement.textContent = judgement;
  rhythmJudgement.dataset.judgement = judgement.toLowerCase();
  rhythmJudgement.classList.remove('is-visible');
  void rhythmJudgement.offsetWidth;
  rhythmJudgement.classList.add('is-visible');
}

function registerRhythmMiss() {
  rhythmState.combo = 0;
  rhythmState.judgements.miss += 1;
  if (rhythmCombo) rhythmCombo.textContent = '0';
  showRhythmJudgement('MISS');
  setRhythmStatus('MISS', 'MISS');
}

function pulseRhythmLane(lane) {
  const button = rhythmLaneButtons[lane];
  if (!button) return;
  button.classList.remove('is-struck');
  void button.offsetWidth;
  button.classList.add('is-struck');
  window.setTimeout(() => button.classList.remove('is-struck'), 190);
}

function renderRhythmFrame(timestamp) {
  if (!rhythmState.playing) return;
  if (!rhythmState.lastTimestamp) rhythmState.lastTimestamp = timestamp;
  const deltaSeconds = Math.min(.05, Math.max(0, (timestamp - rhythmState.lastTimestamp) / 1000));
  rhythmState.lastTimestamp = timestamp;
  rhythmState.positionSteps += deltaSeconds / rhythmStepDuration();
  const missWindowSteps = RHYTHM_JUDGE_WINDOWS.good / rhythmStepDuration();
  const audioLookAhead = .075;

  rhythmState.notes.forEach((note) => {
    const distanceSteps = note.step - rhythmState.positionSteps;
    const y = 86 - distanceSteps / RHYTHM_TRAVEL_STEPS * 96;
    note.element.style.setProperty('--note-y', `${y.toFixed(2)}%`);
    note.element.style.visibility = y < -16 || y > 112 ? 'hidden' : 'visible';
    if (!note.audioPlayed && distanceSteps >= 0 && distanceSteps * rhythmStepDuration() <= audioLookAhead) {
      note.audioPlayed = true;
      playPipaNote(RHYTHM_LANE_FREQ[note.lane], distanceSteps * rhythmStepDuration(), note.duration > 1 ? .6 : .48);
    }
    if (!note.resolved && distanceSteps < -missWindowSteps) {
      note.resolved = true;
      note.element.classList.add('is-missed');
      registerRhythmMiss();
    }
  });

  const finalStep = RHYTHM_SONG.chart[RHYTHM_SONG.chart.length - 1][0];
  const songProgress = Math.max(0, Math.min(100, 100 * (rhythmState.positionSteps + RHYTHM_TRAVEL_STEPS) / (finalStep + RHYTHM_TRAVEL_STEPS + RHYTHM_SONG_END_PADDING)));
  updateCopingProgress(songProgress);
  if (rhythmState.positionSteps > finalStep + RHYTHM_SONG_END_PADDING) {
    rhythmState.playing = false;
    rhythmState.frame = null;
    completeCopingExperienceButton.hidden = false;
    completeCopingExperienceButton.style.removeProperty('visibility');
    const result = rhythmState.judgements;
    setRhythmStatus(
      `曲子完整弹完了 · PERFECT ${result.perfect} · GOOD ${result.good} · MISS ${result.miss}`,
      `Full tune complete · PERFECT ${result.perfect} · GOOD ${result.good} · MISS ${result.miss}`
    );
    rhythmStage.classList.add('is-complete');
    rhythmCompletionMessage.hidden = false;
    rhythmCompletionMessage.textContent = language === 'zh'
      ? '这一曲结束了。你不必一直紧绷，慢慢呼吸，你已经在照顾自己。'
      : 'The tune is over. You do not have to stay braced—breathe slowly; you are already caring for yourself.';
    return;
  }
  if (rhythmState.playing) rhythmState.frame = window.requestAnimationFrame(renderRhythmFrame);
}

function startRhythmRelease() {
  stopRhythmRelease(false);
  if (!rhythmNoteField) return;
  rhythmNoteField.replaceChildren();
  rhythmStage.classList.remove('is-complete');
  rhythmCompletionMessage.hidden = true;
  rhythmCompletionMessage.textContent = '';
  rhythmState.positionSteps = -RHYTHM_TRAVEL_STEPS;
  rhythmState.lastTimestamp = 0;
  rhythmState.combo = 0;
  rhythmState.judgements = { perfect: 0, good: 0, miss: 0 };
  rhythmState.notes = RHYTHM_SONG.chart.map(([step, lane, duration = 1], index) => {
    const element = document.createElement('i');
    element.className = 'rhythm-note';
    element.dataset.noteIndex = String(index);
    element.dataset.lane = String(lane);
    element.style.setProperty('--lane', String(lane));
    rhythmNoteField.append(element);
    return { step, lane, duration, element, resolved: false, audioPlayed: false };
  });
  if (rhythmCombo) rhythmCombo.textContent = '0';
  if (rhythmJudgement) {
    rhythmJudgement.textContent = '';
    rhythmJudgement.removeAttribute('data-judgement');
    rhythmJudgement.classList.remove('is-visible');
  }
  setRhythmSpeed(rhythmSpeed?.value || .8);
  setRhythmStatus('看准落点，用 D F J K 或直接触碰四弦。', 'Use D F J K, or touch the four strings as notes land.');
  rhythmState.playing = true;
  if (Audio$.bgmBus && Audio$.context) Audio$.bgmBus.gain.setTargetAtTime(.0001, Audio$.context.currentTime, .12);
  rhythmState.frame = window.requestAnimationFrame(renderRhythmFrame);
}

function stopRhythmRelease(clearNotes = true) {
  rhythmState.playing = false;
  if (rhythmState.frame) window.cancelAnimationFrame(rhythmState.frame);
  rhythmState.frame = null;
  rhythmState.lastTimestamp = 0;
  if (clearNotes && rhythmNoteField) rhythmNoteField.replaceChildren();
  rhythmState.notes = clearNotes ? [] : rhythmState.notes;
  if (Audio$.bgmBus && Audio$.context) Audio$.bgmBus.gain.setTargetAtTime(.2, Audio$.context.currentTime, .16);
}

function hitRhythmLane(lane, pointerInput = false) {
  if (!rhythmState.playing || gameState.stress.copingMode !== 'rhythm') return false;
  pulseRhythmLane(lane);
  let target = null;
  let nearestSeconds = Infinity;
  rhythmState.notes.forEach((note) => {
    if (note.lane !== lane || note.resolved) return;
    const distanceSeconds = Math.abs(note.step - rhythmState.positionSteps) * rhythmStepDuration();
    if (distanceSeconds < nearestSeconds) {
      nearestSeconds = distanceSeconds;
      target = note;
    }
  });
  if (!target || nearestSeconds > RHYTHM_JUDGE_WINDOWS.good) {
    registerRhythmMiss();
    return false;
  }
  target.resolved = true;
  target.element.classList.add('is-hit');
  rhythmState.combo += 1;
  if (rhythmCombo) rhythmCombo.textContent = String(rhythmState.combo);
  if (nearestSeconds <= RHYTHM_JUDGE_WINDOWS.perfect) {
    rhythmState.judgements.perfect += 1;
    showRhythmJudgement('PERFECT');
    setRhythmStatus('PERFECT', 'PERFECT');
  } else {
    rhythmState.judgements.good += 1;
    showRhythmJudgement('GOOD');
    setRhythmStatus('GOOD', 'GOOD');
  }
  return true;
}

const weatherStates = [
  {
    key: 'clear',
    name: { zh: '晴空', en: 'Clear sky' },
    description: { zh: '视野澄澈，身体里有松弛而明亮的空间。', en: 'Clear, spacious and quietly bright inside.' }
  },
  {
    key: 'breeze',
    name: { zh: '微风', en: 'Breeze' },
    description: { zh: '气息正在流动，身体还有转身和呼吸的余地。', en: 'Breath is moving; your body still has room to turn.' }
  },
  {
    key: 'low-cloud',
    name: { zh: '低云', en: 'Low cloud' },
    description: { zh: '空气有一点沉，身体像背着一层薄云。', en: 'The air feels heavy, like a thin cloud resting on you.' }
  },
  {
    key: 'drizzle',
    name: { zh: '细雨', en: 'Drizzle' },
    description: { zh: '细小的感受持续落下，敏感而绵延。', en: 'Small feelings keep falling—sensitive and continuous.' }
  },
  {
    key: 'storm',
    name: { zh: '骤雨', en: 'Storm' },
    description: { zh: '压力翻涌得很快，身体正在用力撑住。', en: 'Pressure is surging; your body is working hard to hold.' }
  },
  {
    key: 'fog',
    name: { zh: '浓雾', en: 'Deep fog' },
    description: { zh: '感觉被雾包住，一时很难辨认方向。', en: 'Feeling wrapped in fog, with direction hard to find.' }
  }
];

function wait(milliseconds) {
  return new Promise((resolve) => window.setTimeout(resolve, reduceMotion ? 0 : milliseconds));
}

function runIntroSequence() {
  sequenceToken += 1;
  welcomeTitle.textContent = welcomeTitle.dataset[language];
  welcomeLead.textContent = welcomeLead.dataset[language];
  readyButton.textContent = readyButton.dataset[language];
}

function runWeatherQuestion() {
  weatherQuestionToken += 1;
  sequenceToken += 1;
  weatherTitle.textContent = weatherTitle.dataset[language];
  document.querySelector('.weather-panel').classList.add('is-weather-ready');
  Audio$.startWeatherNoise(gameState.bodyWeather);
}

function renderWeather(index, withSound = false) {
  const continuousIndex = Math.max(0, Math.min(weatherStates.length - 1, Number(index)));
  const safeIndex = Math.round(continuousIndex);
  const state = weatherStates[safeIndex];
  const previousWeather = gameState.bodyWeather;
  gameState.weatherIndex = safeIndex;
  gameState.bodyWeather = state.key;
  if (previousWeather !== state.key) {
    weatherArtwork.classList.remove('is-weather-shifting');
    void weatherArtwork.offsetWidth;
    weatherArtwork.classList.add('is-weather-shifting');
    window.setTimeout(() => weatherArtwork.classList.remove('is-weather-shifting'), reduceMotion ? 0 : 720);
  }
  weatherArtwork.dataset.weather = state.key;
  weatherName.textContent = state.name[language];
  weatherDescription.textContent = state.description[language];
  if (!withSound) weatherTuner.value = String(safeIndex);
  const progress = (continuousIndex / (weatherStates.length - 1)) * 100;
  weatherTuner.style.setProperty('--tuner-progress', `${progress}%`);
  document.querySelector('.tuner-track-wrap').style.setProperty('--tuner-progress', `${progress}%`);
  weatherStateLabels.forEach((label, labelIndex) => {
    label.textContent = weatherStates[labelIndex].name[language];
    label.classList.toggle('is-active', labelIndex === safeIndex);
  });
  weatherTuner.setAttribute('aria-valuetext', `${state.name[language]}：${state.description[language]}`);
  if (withSound && previousWeather !== state.key) Audio$.startWeatherNoise(state.key);
}

function updateWeatherFromPointer(event) {
  const bounds = tunerTrackWrap.getBoundingClientRect();
  const ratio = Math.max(0, Math.min(1, (event.clientX - bounds.left) / Math.max(1, bounds.width)));
  weatherTuner.value = String(ratio * (weatherStates.length - 1));
  renderWeather(weatherTuner.value, true);
}

function releaseWeatherPointer(event) {
  if (tunerPointerId !== event.pointerId) return;
  if (tunerTrackWrap.hasPointerCapture?.(event.pointerId)) tunerTrackWrap.releasePointerCapture(event.pointerId);
  tunerPointerId = null;
  tunerTrackWrap.classList.remove('is-dragging');
  weatherTuner.value = String(gameState.weatherIndex);
}

function setLanguage(nextLanguage, rerunSequence = true) {
  language = nextLanguage;
  root.dataset.language = language;
  root.lang = language === 'zh' ? 'zh-CN' : 'en';
  document.querySelectorAll('[data-zh][data-en]').forEach((element) => {
    if ([welcomeTitle, welcomeLead].includes(element)) return;
    element.textContent = element.dataset[language];
  });
  document.querySelectorAll('[data-placeholder-zh][data-placeholder-en]').forEach((element) => {
    element.placeholder = element.dataset[`placeholder${language === 'zh' ? 'Zh' : 'En'}`];
  });
  welcomeTitle.setAttribute('aria-label', welcomeTitle.dataset[language]);
  languageToggle.querySelector('.language-current').textContent = language === 'zh' ? '中' : 'EN';
  languageToggle.querySelector('.language-next').textContent = language === 'zh' ? 'EN' : '中';
  languageToggle.setAttribute('aria-label', language === 'zh' ? 'Switch to English' : '切换到中文');
  soundToggle.setAttribute('aria-label', language === 'zh' ? '开启或关闭声音' : 'Toggle sound');
  renderWeather(gameState.weatherIndex);
  renderStressResponseSelection();
  renderFoodState();
  if (releaseToolkitMode) updateReleaseDetailHeader();
  if (!rerunSequence) return;
  if (ScreenManager.current === 'welcomeScreen') runIntroSequence();
  if (ScreenManager.current === 'weatherScreen') runWeatherQuestion();
}

const stressSourceNames = {
  work: { zh: '工作任务', en: 'workload' },
  workplace: { zh: '职场关系', en: 'work relationships' },
  relationship: { zh: '亲密关系', en: 'close relationships' },
  family: { zh: '家庭责任', en: 'family duties' },
  self: { zh: '对自己的要求', en: 'your expectations of yourself' },
  body: { zh: '身体与精力', en: 'body and energy' },
  money: { zh: '金钱与生活', en: 'money and living' },
  uncertainty: { zh: '未来不确定', en: 'future uncertainty' },
  other: { zh: '其他', en: 'something else' }
};

const stressResponseNames = {
  fight: { zh: '迎上去', en: 'fighting through' }, flight: { zh: '先离开', en: 'stepping away' },
  regulate: { zh: '先稳住自己', en: 'regulating first' }, fawn: { zh: '先照顾别人', en: 'caring for others first' },
  suppress: { zh: '把感受压下去', en: 'holding feelings down' }, connect: { zh: '找人聊聊', en: 'reaching out' }
};

const copingModes = {
  rhythm: {
    zh: '你倾向于把紧绷交给节奏，在一接一放之间重新找回掌控感。',
    en: 'You prefer giving tension to rhythm and regaining agency one note at a time.'
  },
  breathe: {
    zh: '你倾向于借助呼吸调节，让紧绷随着每次呼气慢慢散开。',
    en: 'You prefer breath regulation that lets tension loosen with each exhale.'
  },
  shake: {
    zh: '你倾向于用走动、呼吸和小幅调整，把压力一点点摇松。',
    en: 'You prefer movement, breath, and small adjustments that loosen pressure gradually.'
  },
  seal: {
    zh: '你倾向于暂时设下一道边界，等更安全、更有精力时再处理。',
    en: 'You prefer to set a temporary boundary and return when it feels safer.'
  }
};

const relationshipRoles = [
  { key: 'colleague', name: { zh: '同事', en: 'Colleague' } },
  { key: 'partner', name: { zh: '伴侣', en: 'Partner' } },
  { key: 'friend', name: { zh: '朋友', en: 'Friend' } },
  { key: 'family', name: { zh: '家人', en: 'Family' } }
];

const relationshipZones = {
  near: { zh: '很近', en: 'very close' },
  middle: { zh: '可以靠近', en: 'close enough' },
  far: { zh: '保持距离', en: 'at some distance' }
};

function relationshipPersonName(key) {
  return relationshipRoles.find((role) => role.key === key)?.name[language] || key;
}

function renderRelationshipCopy() {
  if (!relationshipPanel) return;
  relationshipTitle.textContent = language === 'zh'
    ? '把他们放到你觉得舒服的位置。'
    : 'Place everyone where the distance feels right.';
  renderRelationshipRecipientState();
}

function showStressStep(step) {
  gameState.stress.step = step;
  stressStage.dataset.step = step;
  if (step !== 'experience' || gameState.stress.copingMode !== 'rhythm') stopRhythmRelease();
  if (step !== 'experience' || gameState.stress.copingMode !== 'breathe') stopDandelionBreath();
  stressStage.classList.remove('is-released', 'is-mode-rhythm', 'is-mode-breathe', 'is-mode-shake', 'is-mode-seal', 'is-experience-complete');
  stressSourceArea.hidden = step !== 'source';
  pressureField.hidden = step !== 'intensity';
  stressFeedback.hidden = step !== 'result';
  responseList.hidden = step !== 'response';
  copingList.hidden = step !== 'release';
  copingExperience.hidden = step !== 'experience';
  confirmSources.hidden = step !== 'source';
  confirmResponses.hidden = step !== 'response';
  intensityContinue.hidden = step !== 'intensity';
  completeCopingExperienceButton.hidden = step !== 'experience' || gameState.stress.remainingPressure >= Math.max(16, gameState.stress.intensity * .35);
  stressContinue.hidden = true;
  stressResult.textContent = '';
  const copy = {
    source: {
      kicker: { zh: '', en: '' },
      title: { zh: '最近，你的压力来自于哪里？', en: 'Where has your stress been coming from lately?' }
    },
    intensity: {
      kicker: { zh: '', en: '' },
      title: { zh: '这份压力有多强？', en: 'How strong is this pressure?' }
    },
    response: {
      kicker: { zh: '', en: '' },
      title: { zh: '你最常用哪几种方式应对压力？', en: 'Which ways do you most often use to cope with stress?' }
    },
    release: {
      kicker: { zh: '', en: '' },
      title: { zh: '请选择一种释放压力的方式，体验一下吧~', en: 'Choose one way to release pressure and try it out.' }
    },
    experience: {
      kicker: { zh: '', en: '' },
      title: { zh: '跟着急曲子，完整弹完这一曲', en: 'Play the full Quick Tune' }
    },
    result: {
      kicker: { zh: '', en: '' },
      title: { zh: '', en: '' }
    }
  }[step];
  const kicker = stressStage.querySelector('.stress-kicker');
  kicker.textContent = copy.kicker[language];
  kicker.dataset.zh = copy.kicker.zh;
  kicker.dataset.en = copy.kicker.en;
  const title = stressStage.querySelector('#nextTitle');
  title.textContent = copy.title[language];
  title.dataset.zh = copy.title.zh;
  title.dataset.en = copy.title.en;
  if (step === 'response') renderStressResponseSelection();
  if (step === 'intensity') {
    intensityContinue.textContent = language === 'zh' ? '确认这个强度' : 'Confirm this intensity';
    setPressureVisual(gameState.stress.completed ? gameState.stress.intensity : 0);
    pressureSelection.textContent = gameState.stress.completed
      ? (language === 'zh' ? `你选择的强度：${gameState.stress.intensity}` : `Selected intensity: ${gameState.stress.intensity}`)
      : (language === 'zh' ? '尚未确认强度' : 'No intensity set yet');
    intensityContinue.disabled = !gameState.stress.completed;
  }
  if (step === 'experience') {
    const experienceTitles = {
      rhythm: { zh: '跟着急曲子，完整弹完这一曲', en: 'Play the full Quick Tune' },
      breathe: { zh: '跟着呼气，让蒲公英散开', en: 'Exhale and let the dandelion drift' },
      shake: { zh: '摇散压力，让凝结慢慢松开', en: 'Shake the pressure loose' },
      seal: { zh: '把压力写下，暂时寄存在这里', en: 'Write it down and store it here for now' }
    };
    const modeTitle = experienceTitles[gameState.stress.copingMode] || experienceTitles.rhythm;
    title.textContent = modeTitle[language];
    title.dataset.zh = modeTitle.zh;
    title.dataset.en = modeTitle.en;
    renderCopingExperience();
  }
}

function setPressureVisual(intensity) {
  const numericIntensity = Number(intensity);
  const value = Number.isFinite(numericIntensity) ? Math.max(0, Math.min(100, numericIntensity)) : 0;
  gameState.stress.intensity = Math.round(value);
  stressStage.style.setProperty('--pressure', value.toFixed(2));
  updateSpongeShape(value);
  pressureValue.textContent = String(Math.round(value));
  pressureSponge.setAttribute('aria-valuenow', String(Math.round(value)));
  pressureReset.disabled = value <= 0;
}

function updateSpongeShape(intensity) {
  const centerDent = Math.max(0, Math.min(100, intensity)) * .3;
  const topCenter = 24 + centerDent;
  const bottomCenter = 156 - centerDent;
  const path = `M58 24 C116 12 160 ${topCenter.toFixed(1)} 200 ${topCenter.toFixed(1)} C240 ${topCenter.toFixed(1)} 284 12 342 24 Q382 30 382 74 L382 106 Q382 150 342 156 C284 168 240 ${bottomCenter.toFixed(1)} 200 ${bottomCenter.toFixed(1)} C160 ${bottomCenter.toFixed(1)} 116 168 58 156 Q18 150 18 106 L18 74 Q18 30 58 24 Z`;
  pressureSpongeBody?.setAttribute('d', path);
  pressureSpongeTexture?.setAttribute('d', path);
  pressureSpongeContour?.setAttribute('d', path);
}

function resetPressureScene(keepSource = true) {
  if (pressureFrame) window.cancelAnimationFrame(pressureFrame);
  pressureFrame = null;
  pressureHolding = false;
  Audio$.stopPressureTone();
  stopDandelionBreath();
  stressStage.classList.remove('is-holding', 'is-released', 'is-mode-rhythm', 'is-mode-breathe', 'is-mode-shake', 'is-mode-seal');
  gameState.stress.intensity = 0;
  gameState.stress.holdMs = 0;
  gameState.stress.completed = false;
  setPressureVisual(0);
  stressResult.textContent = '';
  stressContinue.hidden = true;
  intensityContinue.disabled = true;
  pressureSelection.textContent = language === 'zh' ? '尚未确认强度' : 'No intensity set yet';
  if (!keepSource) {
    gameState.stress.selectedSources = [];
    gameState.stress.otherSource = '';
    stressOtherInput.value = '';
    stressSourceButtons.forEach((button) => button.classList.remove('is-selected'));
  }
}

function updatePressureFrame(timestamp) {
  if (!pressureHolding) return;
  const elapsed = timestamp - pressureStartedAt;
  const intensity = Math.min(100, Math.pow(elapsed / 3200, .78) * 100);
  setPressureVisual(intensity);
  Audio$.updatePressureTone(intensity);
  pressureSelection.textContent = intensity < 32
    ? (language === 'zh' ? '正在感受这份力…' : 'Feeling the weight…')
    : intensity < 68
      ? (language === 'zh' ? '继续按住，或现在松手' : 'Keep holding, or release now')
      : (language === 'zh' ? '够了，就松手' : 'When it is enough, release');
  pressureFrame = window.requestAnimationFrame(updatePressureFrame);
}

function startSpongePress(event) {
  event?.preventDefault?.();
  if (pressureHolding) return;
  const currentIntensity = Math.max(0, Math.min(100, gameState.stress.intensity));
  const accumulatedMs = currentIntensity > 0
    ? 3200 * Math.pow(currentIntensity / 100, 1 / .78)
    : 0;
  pressureHolding = true;
  pressureStartedAt = performance.now() - accumulatedMs;
  gameState.stress.completed = false;
  intensityContinue.disabled = true;
  stressStage.classList.add('is-holding');
  stressStage.classList.remove('is-released', 'needs-source');
  if (Number.isInteger(event.pointerId) && event.pointerId >= 0) {
    try { pressureSponge.setPointerCapture?.(event.pointerId); } catch (error) { /* Synthetic or interrupted pointers may not be capturable. */ }
  }
  Audio$.stopWeatherNoise();
  Audio$.startPressureTone();
  pressureFrame = window.requestAnimationFrame(updatePressureFrame);
}

function releaseSpongePress(event) {
  event?.preventDefault?.();
  if (!pressureHolding) return;
  pressureHolding = false;
  if (pressureFrame) window.cancelAnimationFrame(pressureFrame);
  pressureFrame = null;
  const holdMs = Math.max(0, performance.now() - pressureStartedAt);
  const elapsedIntensity = Math.min(100, Math.pow(holdMs / 3200, .78) * 100);
  const intensity = Math.max(0, gameState.stress.intensity, elapsedIntensity);
  setPressureVisual(intensity);
  gameState.stress.holdMs = Math.round(holdMs);
  gameState.stress.completed = true;
  stressStage.classList.remove('is-holding');
  stressStage.classList.add('is-released');
  Audio$.stopPressureTone();
  Audio$.tone(392, .24, .02);
  pressureSelection.textContent = language === 'zh' ? `你选择的强度：${Math.round(intensity)}` : `Selected intensity: ${Math.round(intensity)}`;
  intensityContinue.disabled = false;
  const pressureChoice = {
    scene: 'stress-intensity',
    sources: [...gameState.stress.selectedSources],
    otherSource: gameState.stress.otherSource,
    intensity: Math.round(intensity),
    holdMs: Math.round(holdMs)
  };
  let previousChoiceIndex = -1;
  gameState.choiceHistory.forEach((choice, index) => {
    if (choice.scene === 'stress-intensity') previousChoiceIndex = index;
  });
  if (previousChoiceIndex >= 0) gameState.choiceHistory[previousChoiceIndex] = pressureChoice;
  else gameState.choiceHistory.push(pressureChoice);
}

function selectCopingMode(mode) {
  gameState.stress.copingMode = mode;
  copingModeButtons.forEach((button) => button.classList.toggle('is-selected', button.dataset.copingMode === mode));
  if (mode === 'shake') {
    prepareMotionControl(true);
  }
  window.setTimeout(() => startCopingExperience(mode), reduceMotion ? 0 : 280);
}

function renderStressResponseSelection() {
  const selected = new Set(gameState.stress.stressResponses);
  stressResponseButtons.forEach((button) => {
    const isSelected = selected.has(button.dataset.stressResponse);
    button.classList.toggle('is-selected', isSelected);
    button.setAttribute('aria-pressed', String(isSelected));
  });
  if (!confirmResponses) return;
  const count = selected.size;
  confirmResponses.disabled = count < 1;
  confirmResponses.textContent = count > 0
    ? (language === 'zh' ? '继续' : 'Continue')
    : (language === 'zh' ? `继续（${count}/3）` : `Continue (${count}/3)`);
}

function selectStressResponse(response) {
  const selected = new Set(gameState.stress.stressResponses);
  if (selected.has(response)) selected.delete(response);
  else if (selected.size < 3) selected.add(response);
  else return;
  gameState.stress.stressResponses = [...selected];
  renderStressResponseSelection();
  Audio$.tone(selected.has(response) ? 392 : 330, .16, .018);
}

function confirmStressResponses() {
  if (gameState.stress.stressResponses.length < 1 || gameState.stress.stressResponses.length > 3) return;
  gameState.stress.stressResponse = gameState.stress.stressResponses[0];
  const responseChoice = { scene: 'stress-response', values: [...gameState.stress.stressResponses] };
  const existingChoiceIndex = gameState.choiceHistory.findIndex((choice) => choice.scene === 'stress-response');
  if (existingChoiceIndex >= 0) gameState.choiceHistory[existingChoiceIndex] = responseChoice;
  else gameState.choiceHistory.push(responseChoice);
  Audio$.tone(392, .16, .018);
  ScreenManager.show('dailyScreen');
  showDailyPhase('food');
}

const dailyPhaseOrder = ['food', 'movement', 'sleep', 'report'];
const foodCategoryNames = {
  meat: { zh: '肉类', en: 'meat' }, egg: { zh: '蛋白', en: 'protein' }, dairy: { zh: '奶类', en: 'dairy' },
  vegetable: { zh: '蔬菜', en: 'vegetables' }, mushroom: { zh: '菌菇', en: 'mushrooms' }, fruit: { zh: '水果', en: 'fruit' },
  staple: { zh: '主食', en: 'staples' }, custom: { zh: '自定义食物', en: 'custom foods' }
};

function showDailyPhase(phase) {
  gameState.daily.phase = phase;
  dailyPanel.dataset.dailyPhase = phase;
  dailyPanel.scrollTo?.({ top: 0, left: 0, behavior: 'auto' });
  dailySections.forEach((section) => { section.hidden = section.dataset.dailySection !== phase; });
  dailyPhaseDots.forEach((dot) => {
    const dotIndex = dailyPhaseOrder.indexOf(dot.dataset.phaseDot);
    const phaseIndex = dailyPhaseOrder.indexOf(phase);
    dot.classList.toggle('is-active', dotIndex === phaseIndex);
    dot.classList.toggle('is-complete', dotIndex < phaseIndex);
  });
  const activeSection = dailySections.find((section) => section.dataset.dailySection === phase);
  const actionBar = activeSection?.querySelector('.daily-actions');
  if (actionBar) actionBar.prepend(dailyBack);
  else dailyPanel.append(dailyBack);
  dailyBack.hidden = phase === 'report';
  gameBackLinks.forEach((link) => { link.hidden = false; });
  if (phase === 'report') renderAtlasClues();
  window.scrollTo?.({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
}

function renderFoodState() {
  foodPercent.textContent = String(gameState.daily.foodPercent);
  foodBowl.style.setProperty('--food-fill', `${gameState.daily.foodPercent}%`);
  foodUndo.disabled = gameState.daily.foodServings.length === 0;
  foodContinue.hidden = gameState.daily.foodPercent < 100;
}

function addFood(button) {
  if (!button || gameState.daily.foodPercent >= 100) return;
  const category = button.dataset.foodCategory;
  const item = button.dataset.foodItem;
  gameState.daily.foodServings.push({ category, item });
  gameState.daily.foodCounts[category] = (gameState.daily.foodCounts[category] || 0) + 1;
  gameState.daily.foodPercent = Math.min(100, gameState.daily.foodPercent + 5);
  button.classList.remove('is-pulsing'); void button.offsetWidth; button.classList.add('is-pulsing');
  foodBowl.classList.remove('is-fed'); void foodBowl.offsetWidth; foodBowl.classList.add('is-fed');
  renderFoodState();
  Audio$.tone(440 + gameState.daily.foodPercent * 2, .12, .014);
}

function addCustomFood() {
  const item = customFoodInput.value.trim();
  if (!item || gameState.daily.foodPercent >= 100) {
    customFoodInput.focus();
    return;
  }
  customFoodAdd.dataset.foodCategory = 'custom';
  customFoodAdd.dataset.foodItem = item;
  addFood(customFoodAdd);
  customFoodInput.value = '';
}

function undoFood() {
  const serving = gameState.daily.foodServings.pop();
  if (!serving) return;
  gameState.daily.foodCounts[serving.category] = Math.max(0, (gameState.daily.foodCounts[serving.category] || 1) - 1);
  gameState.daily.foodPercent = Math.max(0, gameState.daily.foodPercent - 5);
  renderFoodState();
}

function renderMovementState() {
  const percent = gameState.daily.movementPercent;
  movementPercent.textContent = String(percent);
  movementBody.style.setProperty('--movement-fill', `${percent}%`);
  movementBody.classList.toggle('has-choices', percent > 0);
  movementUndo.disabled = percent === 0;
  movementContinue.hidden = percent === 0;
}

function addMovement(button) {
  if (!button || gameState.daily.movementPercent >= 100) return;
  const movement = button.dataset.movementType;
  gameState.daily.movementChoices.push(movement);
  gameState.daily.movementPercent = Math.min(100, gameState.daily.movementPercent + 5);
  gameState.daily.movementSkipped = false;
  button.classList.remove('is-pulsing'); void button.offsetWidth; button.classList.add('is-pulsing');
  movementBody.classList.remove('is-moving'); void movementBody.offsetWidth; movementBody.classList.add('is-moving');
  renderMovementState();
  Audio$.tone(330 + gameState.daily.movementPercent * 2, .13, .015);
}

function addCustomMovement() {
  const item = customMovementInput.value.trim();
  if (!item) {
    customMovementInput.focus();
    return;
  }
  customMovementAdd.dataset.movementType = `custom:${item}`;
  addMovement(customMovementAdd);
  customMovementInput.value = '';
}

function undoMovement() {
  if (!gameState.daily.movementChoices.pop()) return;
  gameState.daily.movementPercent = Math.max(0, gameState.daily.movementPercent - 5);
  renderMovementState();
}

function attachTokenInteraction(button, target, onDrop) {
  let pointer = null;
  let moved = false;
  let ghost = null;
  button.addEventListener('click', () => { if (!moved) onDrop(button); moved = false; });
  button.addEventListener('pointerdown', (event) => {
    pointer = { id: event.pointerId, x: event.clientX, y: event.clientY };
    moved = false;
    button.setPointerCapture?.(event.pointerId);
  });
  button.addEventListener('pointermove', (event) => {
    if (!pointer || pointer.id !== event.pointerId) return;
    if (!moved && Math.hypot(event.clientX - pointer.x, event.clientY - pointer.y) < 8) return;
    moved = true;
    if (!ghost) {
      ghost = document.createElement('span');
      ghost.className = 'daily-drag-ghost';
      const icon = button.querySelector('.daily-option-icon')?.cloneNode(true);
      if (icon) ghost.append(icon);
      document.body.append(ghost);
    }
    ghost.style.transform = `translate3d(${event.clientX}px,${event.clientY}px,0)`;
  });
  const finish = (event) => {
    if (!pointer || pointer.id !== event.pointerId) return;
    if (moved) {
      const bounds = target.getBoundingClientRect();
      if (event.clientX >= bounds.left && event.clientX <= bounds.right && event.clientY >= bounds.top && event.clientY <= bounds.bottom) onDrop(button);
    }
    ghost?.remove(); ghost = null; pointer = null;
    window.setTimeout(() => { moved = false; }, 0);
  };
  button.addEventListener('pointerup', finish);
  button.addEventListener('pointercancel', finish);
}

function formatClock(value) {
  const totalMinutes = Math.round(Number(value) * 60);
  const hour = ((Math.floor(totalMinutes / 60) % 24) + 24) % 24;
  const minute = ((totalMinutes % 60) + 60) % 60;
  return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
}

const SLEEP_TIMELINE_START = 18;
const SLEEP_TIMELINE_END = 36;
const SLEEP_TIME_STEP = .25;

function sleepTimelineValue(kind) {
  if (kind === 'bedtime') return Number(sleepBedtime.value);
  const wake = Number(sleepWake.value);
  return wake < SLEEP_TIMELINE_START ? wake + 24 : wake;
}

function sleepProgressFromTimeline(value) {
  return Math.max(0, Math.min(1, (value - SLEEP_TIMELINE_START) / (SLEEP_TIMELINE_END - SLEEP_TIMELINE_START)));
}

function sleepPointAtProgress(progress) {
  const length = sleepArcTrack.getTotalLength();
  return sleepArcTrack.getPointAtLength(length * Math.max(0, Math.min(1, progress)));
}

function renderSleepTimeTicks() {
  if (sleepTimeTicks.childElementCount) return;
  const svgNamespace = 'http://www.w3.org/2000/svg';
  for (let hour = SLEEP_TIMELINE_START; hour <= SLEEP_TIMELINE_END; hour += 2) {
    const progress = sleepProgressFromTimeline(hour);
    const length = sleepArcTrack.getTotalLength();
    const point = sleepArcTrack.getPointAtLength(length * progress);
    const before = sleepArcTrack.getPointAtLength(length * Math.max(0, progress - .006));
    const after = sleepArcTrack.getPointAtLength(length * Math.min(1, progress + .006));
    const tangentLength = Math.hypot(after.x - before.x, after.y - before.y) || 1;
    const normalX = (after.y - before.y) / tangentLength;
    const normalY = -(after.x - before.x) / tangentLength;
    const tick = document.createElementNS(svgNamespace, 'line');
    tick.setAttribute('x1', String(point.x + normalX * 6));
    tick.setAttribute('y1', String(point.y + normalY * 6));
    tick.setAttribute('x2', String(point.x + normalX * 14));
    tick.setAttribute('y2', String(point.y + normalY * 14));
    const label = document.createElementNS(svgNamespace, 'text');
    label.setAttribute('x', String(point.x + normalX * 28));
    label.setAttribute('y', String(point.y + normalY * 28 + 4));
    label.textContent = formatClock(hour);
    sleepTimeTicks.append(tick, label);
  }
}

function positionSleepHandle(handle, timelineValue, label) {
  const progress = sleepProgressFromTimeline(timelineValue);
  const point = sleepPointAtProgress(progress);
  handle.setAttribute('transform', `translate(${point.x} ${point.y})`);
  handle.dataset.progress = String(progress);
  handle.setAttribute('aria-valuenow', label);
}

function closestSleepArcProgress(clientX, clientY) {
  const matrix = sleepArc.getScreenCTM();
  if (!matrix) return 0;
  const cursor = sleepArc.createSVGPoint();
  cursor.x = clientX;
  cursor.y = clientY;
  const local = cursor.matrixTransform(matrix.inverse());
  const length = sleepArcTrack.getTotalLength();
  let closestProgress = 0;
  let closestDistance = Number.POSITIVE_INFINITY;
  for (let index = 0; index <= 240; index += 1) {
    const progress = index / 240;
    const point = sleepArcTrack.getPointAtLength(length * progress);
    const distance = ((point.x - local.x) ** 2) + ((point.y - local.y) ** 2);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestProgress = progress;
    }
  }
  return closestProgress;
}

function updateSleepHandleFromPointer(kind, event) {
  const rawTimeline = SLEEP_TIMELINE_START + closestSleepArcProgress(event.clientX, event.clientY) * (SLEEP_TIMELINE_END - SLEEP_TIMELINE_START);
  const snappedTimeline = Math.round(rawTimeline / SLEEP_TIME_STEP) * SLEEP_TIME_STEP;
  if (kind === 'bedtime') {
    const latestBedtime = Math.min(30, sleepTimelineValue('wake') - 1);
    sleepBedtime.value = String(Math.max(18, Math.min(latestBedtime, snappedTimeline)));
  } else {
    const earliestWake = Math.max(28, sleepTimelineValue('bedtime') + 1);
    const wakeTimeline = Math.max(earliestWake, Math.min(36, snappedTimeline));
    sleepWake.value = String(wakeTimeline >= 24 ? wakeTimeline - 24 : wakeTimeline);
  }
  renderSleepState();
}

let activeSleepHandle = null;

function beginSleepHandleDrag(kind, event) {
  event.preventDefault();
  event.stopPropagation();
  activeSleepHandle = { kind, pointerId: event.pointerId, target: event.currentTarget };
  event.currentTarget.setPointerCapture?.(event.pointerId);
  event.currentTarget.classList.add('is-dragging');
  updateSleepHandleFromPointer(kind, event);
}

function moveSleepHandle(event) {
  if (!activeSleepHandle || activeSleepHandle.pointerId !== event.pointerId) return;
  event.preventDefault();
  updateSleepHandleFromPointer(activeSleepHandle.kind, event);
}

function endSleepHandleDrag(event) {
  if (!activeSleepHandle || activeSleepHandle.pointerId !== event.pointerId) return;
  event.preventDefault();
  activeSleepHandle.target.releasePointerCapture?.(event.pointerId);
  activeSleepHandle.target.classList.remove('is-dragging');
  activeSleepHandle = null;
  Audio$.tone(587.33, .1, .01);
}

function nudgeSleepHandle(kind, event) {
  if (!['ArrowLeft', 'ArrowDown', 'ArrowRight', 'ArrowUp'].includes(event.key)) return;
  event.preventDefault();
  const direction = ['ArrowRight', 'ArrowUp'].includes(event.key) ? 1 : -1;
  const currentTimeline = sleepTimelineValue(kind);
  const syntheticProgress = sleepProgressFromTimeline(currentTimeline + direction * SLEEP_TIME_STEP);
  const point = sleepPointAtProgress(syntheticProgress);
  const screenPoint = sleepArc.createSVGPoint();
  screenPoint.x = point.x;
  screenPoint.y = point.y;
  const transformed = screenPoint.matrixTransform(sleepArc.getScreenCTM());
  updateSleepHandleFromPointer(kind, { clientX: transformed.x, clientY: transformed.y });
}

function renderSleepState() {
  gameState.daily.bedtime = Number(sleepBedtime.value);
  gameState.daily.wake = Number(sleepWake.value);
  gameState.daily.restoration = Number(sleepRestoration.value);
  const duration = Math.max(0, 24 - gameState.daily.bedtime + gameState.daily.wake);
  sleepBedtimeValue.textContent = formatClock(gameState.daily.bedtime);
  sleepWakeValue.textContent = formatClock(gameState.daily.wake);
  sleepRestorationValue.textContent = String(gameState.daily.restoration);
  renderSleepTimeTicks();
  const bedtimeTimeline = sleepTimelineValue('bedtime');
  const wakeTimeline = sleepTimelineValue('wake');
  positionSleepHandle(sleepBedtimeHandle, bedtimeTimeline, formatClock(gameState.daily.bedtime));
  positionSleepHandle(sleepWakeHandle, wakeTimeline, formatClock(gameState.daily.wake));
  const arcLength = sleepArcTrack.getTotalLength();
  const selectionStart = sleepProgressFromTimeline(bedtimeTimeline);
  const selectionLength = sleepProgressFromTimeline(wakeTimeline) - selectionStart;
  sleepArcProgress.style.strokeDasharray = `${Math.max(0, selectionLength) * arcLength} ${arcLength}`;
  sleepArcProgress.style.strokeDashoffset = String(-selectionStart * arcLength);
  sleepDuration.textContent = duration.toFixed(duration % 1 ? 1 : 0);
  const count = gameState.daily.sleepInterruptions.length;
  sleepInterruptionText.textContent = language === 'zh' ? (count ? `夜里标记了 ${count} 次醒来` : '夜里没有标记醒来') : (count ? `${count} wake-up${count > 1 ? 's' : ''} marked` : 'No wake-ups marked');
  sleepWakeNodes.replaceChildren(...gameState.daily.sleepInterruptions.map((point) => {
    const arcPoint = Number.isFinite(point.progress) ? sleepPointAtProgress(point.progress) : point;
    const node = document.createElementNS('http://www.w3.org/2000/svg', 'circle'); node.setAttribute('cx', arcPoint.x); node.setAttribute('cy', arcPoint.y); node.setAttribute('r', '6'); return node;
  }));
}

function addSleepInterruption(event) {
  if (event.target.closest?.('.sleep-time-handle')) return;
  if (gameState.daily.sleepInterruptions.length >= 5) return;
  const progress = closestSleepArcProgress(event.clientX, event.clientY);
  const bedtimeProgress = sleepProgressFromTimeline(sleepTimelineValue('bedtime'));
  const wakeProgress = sleepProgressFromTimeline(sleepTimelineValue('wake'));
  if (progress <= bedtimeProgress || progress >= wakeProgress) return;
  const point = sleepPointAtProgress(progress);
  gameState.daily.sleepInterruptions.push({ progress, x: point.x, y: point.y });
  renderSleepState();
  Audio$.tone(523.25, .14, .012);
}

let restorationPointerId = null;

function updateRestorationFromPointer(event) {
  const bounds = sleepRestoration.getBoundingClientRect();
  if (!bounds.width) return;
  const progress = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width));
  sleepRestoration.value = String(Math.round(progress * 100));
  renderSleepState();
}

function beginRestorationDrag(event) {
  restorationPointerId = event.pointerId;
  sleepRestoration.setPointerCapture?.(event.pointerId);
  updateRestorationFromPointer(event);
}

function moveRestorationDrag(event) {
  if (restorationPointerId !== event.pointerId) return;
  event.preventDefault();
  updateRestorationFromPointer(event);
}

function endRestorationDrag(event) {
  if (restorationPointerId !== event.pointerId) return;
  sleepRestoration.releasePointerCapture?.(event.pointerId);
  restorationPointerId = null;
}

function renderAtlasClues() {
  const dominantFood = Object.entries(gameState.daily.foodCounts).sort((a, b) => b[1] - a[1])[0]?.[0];
  const sleepHours = Math.max(0, 24 - gameState.daily.bedtime + gameState.daily.wake);
  const weatherState = weatherStates[gameState.weatherIndex];
  const weather = weatherState.name[language];
  const sourceLabels = gameState.stress.selectedSources.map((key) => stressSourceNames[key]?.[language]).filter(Boolean);
  const responseLabels = gameState.stress.stressResponses.map((key) => stressResponseNames[key]?.[language]).filter(Boolean);
  const foodVariety = Object.values(gameState.daily.foodCounts).filter((count) => count > 0).length;
  const movementLabels = gameState.daily.movementChoices.map((key) => {
    if (key.startsWith('custom:')) return language === 'zh' ? '自定义运动' : 'custom movement';
    const button = movementButtons.find((item) => item.dataset.movementType === key);
    return button?.querySelector('strong')?.textContent?.trim() || key;
  });
  const cards = language === 'zh' ? [
    ['身体天气', weather, weatherState.description.zh],
    ['压力现场', sourceLabels.slice(0, 2).join('、') || '尚未命名', responseLabels.length ? `你会先${responseLabels.join('，也会')}；这些反应首先是在保护你。` : '辨认来源本身，已经是在把压力从混乱里分出来。'],
    ['饮食', dominantFood ? `${(foodCategoryNames[dominantFood] || foodCategoryNames.custom).zh}更常出现` : '偏好尚未突出', `记录里出现了 ${foodVariety} 类食物线索；这不是营养评估，而是你熟悉的供能样子。`],
    ['运动', gameState.daily.movementSkipped ? '最近暂时没有运动' : (movementLabels.slice(0, 3).join('、') || '活动线索尚少'), gameState.daily.movementSkipped ? '暂时不运动也是真实信息：身体可能更需要休息，或还没找到合适入口。' : '活动不是完成度；更值得观察的是，哪一种移动之后身体会松一点。'],
    ['睡眠', `${sleepHours} 小时 · 恢复感 ${gameState.daily.restoration}%`, gameState.daily.sleepInterruptions.length ? `你标记了 ${gameState.daily.sleepInterruptions.length} 次夜醒；时长与恢复感可以分别观察。` : '没有标记夜醒；仍可以留意醒来后的精力是否与时长一致。']
  ] : [
    ['Body weather', weather, weatherState.description.en],
    ['Pressure scene', sourceLabels.slice(0, 2).join(', ') || 'Not yet named', responseLabels.length ? `You may begin by ${responseLabels.join(' and ')}; these responses are trying to protect you first.` : 'Naming pressure is already a way of separating it from the blur.'],
    ['Food', dominantFood ? `${(foodCategoryNames[dominantFood] || foodCategoryNames.custom).en} appeared more often` : 'No strong preference yet', `${foodVariety} food categories appeared. This is not a nutrition score, only a view of familiar fuel.`],
    ['Movement', gameState.daily.movementSkipped ? 'No recent movement' : (movementLabels.slice(0, 3).join(', ') || 'Few movement clues'), gameState.daily.movementSkipped ? 'Not moving is real information too: rest may matter more, or the right entry point may still be missing.' : 'Movement is not a completion score; notice what leaves the body slightly looser.'],
    ['Sleep', `${sleepHours} h · ${gameState.daily.restoration}% restored`, gameState.daily.sleepInterruptions.length ? `${gameState.daily.sleepInterruptions.length} night waking moments were marked; duration and restoration can be observed separately.` : 'No waking moments were marked; notice whether morning energy matches the duration.']
  ];
  atlasClueGrid.replaceChildren(...cards.map(([label, value, note], index) => {
    const article = document.createElement('article'); article.style.setProperty('--clue-index', index); article.innerHTML = `<small>${label}</small><strong>${value}</strong><p>${note}</p>`; return article;
  }));
}

function buildAtlasReportPayload() {
  return {
    schemaVersion: 2,
    source: 'body-mind-atlas',
    player: { name: gameState.playerName.slice(0, 80) },
    body: { weather: gameState.bodyWeather, weatherIndex: gameState.weatherIndex },
    stress: {
      sources: [...gameState.stress.selectedSources],
      otherSource: gameState.stress.otherSource,
      response: gameState.stress.stressResponse,
      responses: [...gameState.stress.stressResponses]
    },
    relationship: {
      people: gameState.relationship.people.map(({ key, distance, openness, support }) => ({ key, distance, openness, support })),
      supportSignals: [...(gameState.relationship.signals || [])]
    },
    daily: { ...gameState.daily, email: undefined, reportId: undefined }
  };
}

async function submitDailyAtlas(event) {
  event.preventDefault();
  if (!dailyReportForm.reportValidity() || !dailyReportConsent.checked) return;
  if (!deploymentConfig.reportEndpoint || !deploymentConfig.reportNonce) {
    dailyReportStatus.textContent = language === 'zh' ? '本地预览不会保存；上传到 WordPress 后即可真实收集邮箱与图鉴数据。' : 'Local preview is not saved; WordPress will collect the email and atlas data.';
    return;
  }
  const email = dailyReportEmail.value.trim();
  const honeypot = dailyReportForm.querySelector('[name="website"]');
  const payload = new URLSearchParams({ action: 'looove_submit_map_report', nonce: deploymentConfig.reportNonce, email, language, source: 'body-mind-atlas', consent: '1', website: honeypot?.value || '', report: JSON.stringify(buildAtlasReportPayload()) });
  dailyReportForm.setAttribute('aria-busy', 'true'); dailyReportSubmit.disabled = true;
  dailyReportStatus.textContent = language === 'zh' ? '正在收好你的图鉴线索…' : 'Saving your atlas clues…';
  try {
    const response = await fetch(deploymentConfig.reportEndpoint, { method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }, body: payload.toString() });
    const result = await response.json().catch(() => null);
    if (!response.ok || !result?.success) throw new Error(result?.data?.message || (language === 'zh' ? '暂时无法保存，请稍后再试。' : 'Unable to save right now.'));
    gameState.daily.email = email; gameState.daily.reportId = result.data?.reportId || null;
    dailyReportForm.hidden = true; dailyReportStatus.hidden = true; dailySaved.hidden = false; dailyBack.hidden = true;
    Audio$.tone(783.99, .34, .022);
  } catch (error) { dailyReportStatus.textContent = error.message; }
  finally { dailyReportForm.removeAttribute('aria-busy'); dailyReportSubmit.disabled = false; }
}

function startCopingExperience(mode) {
  gameState.stress.copingMode = mode;
  gameState.stress.experienceProgress = 0;
  gameState.stress.remainingPressure = Math.max(1, gameState.stress.intensity);
  copingExperience.dataset.copingExperience = mode;
  updateReleaseDetailHeader(mode);
  completeCopingExperienceButton.hidden = true;
  completeCopingExperienceButton.style.removeProperty('visibility');
  copingExperienceScene.classList.remove('is-complete', 'is-reacting');
  dandelionSeeds.forEach((seed) => {
    seed.classList.remove('is-flying');
    seed.style.removeProperty('--fly-x');
    seed.style.removeProperty('--fly-y');
    seed.style.removeProperty('--fly-r');
    seed.style.removeProperty('--seed-delay');
  });
  breathSeedIndex = 0;
  storePressureText.value = '';
  sealExperience?.classList.remove('is-storing');
  updateCopingProgress(0);
  if (mode === 'shake') {
    dispersalPhysics.tilt = 0;
    dispersalPhysics.velocity = 0;
    dispersalPhysics.target = 0;
    dispersalPhysics.phase = 0;
    dispersalPhysics.lastDirection = 0;
    motionStatus.textContent = typeof DeviceMotionEvent !== 'undefined'
      ? (language === 'zh' ? '左右晃动手机，把凝结的压力慢慢摇散' : 'Sway your phone side to side and loosen the clustered pressure')
      : (language === 'zh' ? '在压力舱上方左右摆动指针，把压力慢慢摇散' : 'Move the pointer side to side above the chamber to disperse pressure');
    startDispersalPhysics();
  }
  showStressStep('experience');
  if (mode === 'shake') prepareMotionControl();
  if (mode === 'rhythm') startRhythmRelease();
  else Audio$.tone({ breathe: 246, shake: 320, seal: 150 }[mode], .22, .018);
}

function renderCopingExperience() {
  const mode = gameState.stress.copingMode;
  copingExperience.dataset.copingExperience = mode;
  const prompts = {
    rhythm: { zh: '看准落点弹响四弦；可随时调慢，曲子结束后查看结果。', en: 'Play the four strings as notes land. Slow it anytime; results appear when the tune ends.' },
    breathe: { zh: '允许麦克风，跟着呼吸轻轻吹散蒲公英。', en: 'Allow the microphone and gently breathe the dandelion away.' },
    shake: { zh: '左右晃动手机，或在桌面端左右摆动指针，把凝结的压力慢慢摇散。', en: 'Sway your phone, or move the pointer side to side on desktop, to disperse the clustered pressure.' },
    seal: { zh: '把压力写下来，暂时寄存在一个安全的地方。', en: 'Write the pressure down and store it somewhere safe for now.' }
  };
  copingExperiencePrompt.textContent = prompts[mode][language];
}

function seedBubbleField() {
  const scene = document.querySelector('.experience-burst');
  if (!scene) return;
  const width = scene.clientWidth || 640;
  const height = scene.clientHeight || 352;
  bubbleField.particles = burstBalls.map((element, index) => {
    const style = getComputedStyle(element);
    const size = parseFloat(style.width) || 42;
    const column = index % 10;
    const row = Math.floor(index / 10);
    return {
      element,
      size,
      x: width * (.055 + column * .099) + (row - 1) * (column % 2 ? -5 : 5),
      y: height - ((index * 73 + row * 31) % Math.max(140, height - 35)),
      speed: [22, 43, 31, 26, 48, 19, 35, 24, 45, 29][column],
      phase: index * 1.71,
      sway: 5 + (index % 4) * 2.5
    };
  });
  resolveBubbleCollisions(width, height);
  renderBubbleParticles(width);
}

function resolveBubbleCollisions(width, height) {
  const active = bubbleField.particles.filter((particle) => !particle.element.classList.contains('is-burst'));
  for (let pass = 0; pass < 4; pass += 1) {
    for (let firstIndex = 0; firstIndex < active.length; firstIndex += 1) {
      for (let secondIndex = firstIndex + 1; secondIndex < active.length; secondIndex += 1) {
        const first = active[firstIndex];
        const second = active[secondIndex];
        const dx = second.x - first.x;
        const dy = second.y - first.y;
        const distance = Math.max(.01, Math.hypot(dx, dy));
        const minimum = (first.size + second.size) * .57 + 7;
        if (distance >= minimum) continue;
        const push = (minimum - distance) * .52;
        const nx = dx / distance;
        const ny = dy / distance;
        first.x -= nx * push; first.y -= ny * push;
        second.x += nx * push; second.y += ny * push;
        first.x = Math.max(first.size / 2 + 2, Math.min(width - first.size / 2 - 2, first.x));
        second.x = Math.max(second.size / 2 + 2, Math.min(width - second.size / 2 - 2, second.x));
        first.y = Math.max(first.size / 2 + 2, Math.min(height - first.size / 2 - 2, first.y));
        second.y = Math.max(second.size / 2 + 2, Math.min(height - second.size / 2 - 2, second.y));
      }
    }
  }
}

function renderBubbleParticles(width) {
  bubbleField.particles.forEach((particle) => {
    if (particle.element.classList.contains('is-burst')) return;
    const drift = Math.sin(particle.phase) * particle.sway;
    const x = Math.max(particle.size / 2 + 2, Math.min(width - particle.size / 2 - 2, particle.x + drift));
    particle.element.style.setProperty('left', `${x.toFixed(1)}px`, 'important');
    particle.element.style.setProperty('top', `${particle.y.toFixed(1)}px`, 'important');
  });
}

function animateBubbleField(timestamp) {
  if (gameState.stress.copingMode !== 'burst') { bubbleField.frame = null; return; }
  const scene = document.querySelector('.experience-burst');
  const width = scene?.clientWidth || 640;
  const height = scene?.clientHeight || 352;
  const elapsed = bubbleField.lastTime ? Math.min(40, timestamp - bubbleField.lastTime) / 1000 : 0;
  bubbleField.lastTime = timestamp;
  bubbleField.particles.forEach((particle) => {
    if (particle.element.classList.contains('is-burst')) return;
    particle.y -= particle.speed * elapsed;
    particle.phase += elapsed * (.75 + particle.speed / 70);
    if (particle.y < -particle.size) particle.y = height + particle.size * .7;
  });
  resolveBubbleCollisions(width, height);
  renderBubbleParticles(width);
  bubbleField.frame = requestAnimationFrame(animateBubbleField);
}

function startBubbleField() {
  if (bubbleField.frame) cancelAnimationFrame(bubbleField.frame);
  bubbleField.lastTime = 0;
  seedBubbleField();
  bubbleField.frame = requestAnimationFrame(animateBubbleField);
}

function updateCopingProgress(value) {
  gameState.stress.experienceProgress = Math.max(0, Math.min(100, value));
  copingExperience.style.setProperty('--experience-progress', gameState.stress.experienceProgress);
  copingExperience.style.setProperty('--dispersal-progress', (gameState.stress.experienceProgress / 100).toFixed(3));
  copingExperienceProgress.style.width = `${gameState.stress.experienceProgress}%`;
  experiencePressureValue.textContent = String(Math.max(0, Math.round(gameState.stress.remainingPressure)));
}

function reduceExperiencePressure(amount) {
  if (gameState.stress.remainingPressure <= 0) return;
  gameState.stress.remainingPressure = Math.max(0, gameState.stress.remainingPressure - amount);
  const progress = 100 * (1 - gameState.stress.remainingPressure / Math.max(1, gameState.stress.intensity));
  updateCopingProgress(progress);
  if (gameState.stress.copingMode === 'shake') {
    const canContinue = gameState.stress.remainingPressure < Math.max(16, gameState.stress.intensity * .35);
    completeCopingExperienceButton.hidden = !canContinue;
    completeCopingExperienceButton.style.removeProperty('visibility');
  }
  if (gameState.stress.remainingPressure < Math.max(16, gameState.stress.intensity * .35)) {
    completeCopingExperienceButton.hidden = false;
    if (gameState.stress.copingMode !== 'rhythm') {
      copingExperiencePrompt.textContent = language === 'zh'
        ? '已经轻一些了。你可以继续，也可以再停留一会。'
        : 'It feels lighter. Continue now, or stay a little longer.';
    }
  }
  if (gameState.stress.remainingPressure <= 0) completeCopingExperience();
}

function renderPressureDispersal() {
  if (!pressureChamber || !pressureFragments.length) return;
  const progress = Math.max(0, Math.min(1, gameState.stress.experienceProgress / 100));
  const pressureRatio = Math.max(0, Math.min(1, gameState.stress.remainingPressure / Math.max(1, gameState.stress.intensity)));
  const tilt = Math.max(-24, Math.min(24, dispersalPhysics.tilt));
  const velocity = Math.max(-18, Math.min(18, dispersalPhysics.velocity));
  const chamberTilt = Math.max(-4.5, Math.min(4.5, tilt * .13 + velocity * .1));
  const chamberShift = Math.max(-3.5, Math.min(3.5, velocity * .22));
  const gelEnergy = Math.min(1, Math.abs(velocity) / 18);
  const elasticWave = Math.sin(dispersalPhysics.phase * 1.35) * (.008 + gelEnergy * .014);
  const gelStretchX = 1 + gelEnergy * .085 + elasticWave;
  const gelStretchY = 1 - gelEnergy * .055 - elasticWave * .58;
  const gelShear = Math.max(-4.2, Math.min(4.2, velocity * .21));
  const gelHighlightShift = Math.max(-13, Math.min(13, velocity * .72));
  pressureChamber.style.setProperty('--chamber-tilt', `${chamberTilt.toFixed(2)}deg`);
  pressureChamber.style.setProperty('--chamber-shift', `${chamberShift.toFixed(2)}px`);
  pressureChamber.style.setProperty('--gel-stretch-x', gelStretchX.toFixed(3));
  pressureChamber.style.setProperty('--gel-stretch-y', gelStretchY.toFixed(3));
  pressureChamber.style.setProperty('--gel-shear', `${gelShear.toFixed(2)}deg`);
  pressureChamber.style.setProperty('--gel-highlight-shift', `${gelHighlightShift.toFixed(2)}px`);
  pressureChamber.style.setProperty('--gel-energy', (.08 + gelEnergy * .92).toFixed(3));
  pressureFragments.forEach((fragment, index) => {
    const angle = index * 2.399 + dispersalPhysics.phase * (index % 2 ? 1 : -1);
    const spread = progress * (14 + (index % 5) * 5.2);
    const shakeX = tilt * (.08 + (index % 3) * .018);
    const x = Math.cos(angle) * spread + shakeX;
    const y = Math.sin(angle) * spread - progress * (7 + (index % 4) * 2.4);
    const rotation = (index * 31 + dispersalPhysics.phase * 32) % 360;
    const fadeThreshold = (index % 6) * .075;
    const visibleRatio = Math.max(0, Math.min(1, (pressureRatio - fadeThreshold) / Math.max(.01, 1 - fadeThreshold)));
    const scale = .28 + visibleRatio * .72;
    const trail = 1 + gelEnergy * (.18 + (index % 4) * .06);
    fragment.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) rotate(${rotation.toFixed(1)}deg) scale(${scale.toFixed(2)}) scaleX(${trail.toFixed(2)})`;
    fragment.style.opacity = visibleRatio.toFixed(2);
  });
}

function updateDispersalPhysics(timestamp) {
  const elapsed = dispersalPhysics.lastTime ? Math.min(34, timestamp - dispersalPhysics.lastTime) / 16.67 : 1;
  dispersalPhysics.lastTime = timestamp;
  const spring = (dispersalPhysics.target - dispersalPhysics.tilt) * .075 * elapsed;
  dispersalPhysics.velocity = (dispersalPhysics.velocity + spring) * Math.pow(.87, elapsed);
  dispersalPhysics.tilt += dispersalPhysics.velocity * elapsed;
  dispersalPhysics.target *= Math.pow(.9, elapsed);
  dispersalPhysics.phase += (.045 + Math.min(.12, Math.abs(dispersalPhysics.velocity) * .01)) * elapsed;
  renderPressureDispersal();
  if (gameState.stress.copingMode === 'shake' || Math.abs(dispersalPhysics.tilt) > .1 || Math.abs(dispersalPhysics.velocity) > .1) {
    dispersalPhysics.frame = requestAnimationFrame(updateDispersalPhysics);
  } else {
    dispersalPhysics.frame = null;
  }
}

function startDispersalPhysics() {
  dispersalPhysics.lastTime = 0;
  if (!dispersalPhysics.frame) dispersalPhysics.frame = requestAnimationFrame(updateDispersalPhysics);
  renderPressureDispersal();
}

function pulseDispersalHaptics(strength = .5) {
  if (document.hidden || typeof navigator.vibrate !== 'function') return false;
  const pulse = Math.round(8 + Math.max(0, Math.min(1, strength)) * 12);
  try {
    return navigator.vibrate(pulse);
  } catch (error) {
    return false;
  }
}

function applyDispersalImpulse(value, source = 'pointer') {
  if (gameState.stress.copingMode !== 'shake') return;
  const force = Math.max(-18, Math.min(18, Number(value) || 0));
  if (Math.abs(force) < 1.4) return;
  const direction = Math.sign(force);
  dispersalPhysics.target = force * 1.45;
  dispersalPhysics.velocity += force * .18;
  const now = performance.now();
  if (dispersalPhysics.lastDirection && direction !== dispersalPhysics.lastDirection && now - dispersalPhysics.lastReleaseAt > 140) {
    reduceExperiencePressure(Math.min(3.2, 1.1 + Math.abs(force) * .105));
    Audio$.playParticleScatter(Math.min(1, Math.abs(force) / 18));
    if (source === 'motion') pulseDispersalHaptics(Math.abs(force) / 18);
    dispersalPhysics.lastReleaseAt = now;
  }
  dispersalPhysics.lastDirection = direction;
  startDispersalPhysics();
}

function handleDeviceMotion(event) {
  const acceleration = event.acceleration?.x ?? event.accelerationIncludingGravity?.x ?? 0;
  applyDispersalImpulse(acceleration * 2.4, 'motion');
}

function prepareMotionControl(userInitiated = false) {
  if (motionControlActive || typeof DeviceMotionEvent === 'undefined') return;
  if (typeof DeviceMotionEvent.requestPermission === 'function' && !userInitiated) {
    motionStatus.textContent = language === 'zh'
      ? '轻触压力舱开启晃动感应，再左右摇散压力'
      : 'Tap the chamber to enable motion, then sway side to side';
    return;
  }
  enableMotionControl();
}

async function enableMotionControl() {
  try {
    if (typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function') {
      const permission = await DeviceMotionEvent.requestPermission();
      if (permission !== 'granted') throw new Error('motion-denied');
    }
    if (!motionControlActive) window.addEventListener('devicemotion', handleDeviceMotion, { passive: true });
    motionControlActive = true;
    motionStatus.textContent = language === 'zh' ? '晃动感应已开启，请左右摇散压力' : 'Motion enabled—sway side to side to disperse pressure';
  } catch (error) {
    motionStatus.textContent = language === 'zh' ? '未能开启感应；可在压力舱上方左右摆动指针' : 'Motion unavailable; move the pointer above the pressure chamber';
  }
}

function pulseCopingScene() {
  copingExperienceScene.classList.remove('is-reacting');
  void copingExperienceScene.offsetWidth;
  copingExperienceScene.classList.add('is-reacting');
}

function releaseDandelionSeed(strength = 1) {
  if (!dandelionSeeds.length || breathSeedIndex >= dandelionSeeds.length) return;
  const seed = dandelionSeeds[breathSeedIndex++];
  const seedPressure = gameState.stress.intensity / dandelionSeeds.length;
  const direction = breathSeedIndex % 2 ? 1 : -1;
  seed.style.setProperty('--fly-x', `${(8 + strength * 8 + Math.random() * 5).toFixed(1)}rem`);
  seed.style.setProperty('--fly-y', `${(-4 + direction * Math.random() * 3).toFixed(1)}rem`);
  seed.style.setProperty('--fly-r', `${Math.round(90 + Math.random() * 190)}deg`);
  seed.style.setProperty('--seed-delay', `${(Math.random() * .12).toFixed(2)}s`);
  seed.classList.add('is-flying');
  const remainingSeeds = dandelionSeeds.length - breathSeedIndex;
  gameState.stress.remainingPressure = remainingSeeds > 0 ? seedPressure * remainingSeeds : 0;
  updateCopingProgress((breathSeedIndex / dandelionSeeds.length) * 100);
  if (breathSeedIndex >= dandelionSeeds.length) {
    gameState.stress.remainingPressure = 0;
    updateCopingProgress(100);
    completeCopingExperience();
  }
}

function releaseDandelionSeeds(count = 4, strength = 1) {
  const available = Math.max(0, dandelionSeeds.length - breathSeedIndex);
  const releaseCount = Math.min(count, available);
  for (let index = 0; index < releaseCount; index += 1) {
    window.setTimeout(() => releaseDandelionSeed(strength), index * 28);
  }
}

function analyseDandelionBreath(timestamp) {
  if (!breathAnalyser || !breathData || gameState.stress.copingMode !== 'breathe') return;
  breathAnalyser.getByteTimeDomainData(breathData);
  let sum = 0;
  for (const sample of breathData) {
    const centered = (sample - 128) / 128;
    sum += centered * centered;
  }
  const volume = Math.sqrt(sum / breathData.length);
  const breathStrength = Math.max(0, Math.min(1, (volume - .025) / .16));
  dandelionExperience.style.setProperty('--breath-strength', breathStrength.toFixed(3));
  if (breathStrength > .12 && timestamp - lastBreathSeedAt > 230) {
    releaseDandelionSeeds(Math.round(3 + breathStrength * 4), breathStrength);
    lastBreathSeedAt = timestamp;
  }
  breathFrame = requestAnimationFrame(analyseDandelionBreath);
}

async function beginDandelionBreath() {
  if (breathStream) return;
  const requestId = ++microphoneRequestId;
  delete dandelionBreathButton.dataset.fallback;
  if (location.protocol === 'file:') {
    setMicrophoneFallback(language === 'zh'
      ? '本地文件模式无法开启麦克风，请按住“模拟吹气”'
      : 'Microphone access needs localhost—hold “Simulate breath” instead');
    return;
  }
  if (!navigator.mediaDevices?.getUserMedia) {
    setMicrophoneFallback();
    return;
  }
  dandelionBreathStatus.textContent = language === 'zh' ? '正在等待麦克风…' : 'Waiting for microphone…';
  dandelionBreathButton.textContent = language === 'zh' ? '正在请求权限' : 'Requesting permission';
  try {
    let timedOut = false;
    const microphonePromise = navigator.mediaDevices.getUserMedia({ audio: { autoGainControl: false, echoCancellation: false, noiseSuppression: false } });
    microphonePromise.then((lateStream) => {
      if (requestId !== microphoneRequestId) lateStream.getTracks().forEach((track) => track.stop());
    }).catch(() => {});
    const timeoutPromise = new Promise((resolve, reject) => window.setTimeout(() => {
      timedOut = true;
      reject(new Error('microphone-timeout'));
    }, MICROPHONE_TIMEOUT_MS));
    const stream = await Promise.race([microphonePromise, timeoutPromise]);
    if (requestId !== microphoneRequestId || timedOut) {
      stream.getTracks().forEach((track) => track.stop());
      return;
    }
    breathStream = stream;
    let context = null;
    try { context = Audio$.ensureContext(); } catch (error) { throw new Error('audio-context-unavailable'); }
    if (!context) throw new Error('audio-context-unavailable');
    if (context.state === 'suspended') await context.resume();
    breathSource = context.createMediaStreamSource(breathStream);
    breathAnalyser = context.createAnalyser();
    breathAnalyser.fftSize = 1024;
    breathAnalyser.smoothingTimeConstant = .68;
    breathData = new Uint8Array(breathAnalyser.fftSize);
    breathSource.connect(breathAnalyser);
    dandelionExperience.classList.add('is-listening');
    delete dandelionBreathButton.dataset.fallback;
    dandelionBreathButton.textContent = language === 'zh' ? '正在聆听呼吸' : 'Listening to your breath';
    dandelionBreathStatus.textContent = language === 'zh' ? '慢慢吸气，再对着屏幕轻轻呼气' : 'Inhale slowly, then breathe gently toward the screen';
    breathFrame = requestAnimationFrame(analyseDandelionBreath);
  } catch (error) {
    stopDandelionBreath();
    setMicrophoneFallback(error?.message === 'microphone-timeout'
      ? (language === 'zh' ? '麦克风响应超时，请按住“模拟吹气”' : 'Microphone timed out—hold “Simulate breath” instead')
      : undefined);
  }
}

function setMicrophoneFallback(message) {
  dandelionBreathStatus.textContent = message || (language === 'zh'
    ? '麦克风不可用，可以按住“模拟吹气”'
    : 'Microphone unavailable—hold “Simulate breath” instead');
  dandelionBreathButton.textContent = language === 'zh' ? '重试麦克风' : 'Retry microphone';
  dandelionBreathButton.dataset.fallback = 'true';
  dandelionSimulateButton.classList.add('is-recommended');
}

function stopDandelionBreath() {
  microphoneRequestId += 1;
  if (breathFrame) cancelAnimationFrame(breathFrame);
  breathFrame = null;
  if (simulatedBreathTimer) clearInterval(simulatedBreathTimer);
  simulatedBreathTimer = null;
  if (breathSource) {
    try { breathSource.disconnect(); } catch (error) { /* Already disconnected. */ }
  }
  breathSource = null;
  breathAnalyser = null;
  breathData = null;
  if (breathStream) breathStream.getTracks().forEach((track) => track.stop());
  breathStream = null;
  dandelionExperience?.classList.remove('is-listening');
}

function beginSimulatedBreath() {
  if (simulatedBreathTimer) return;
  dandelionExperience?.classList.add('is-simulating');
  releaseDandelionSeeds(5, .82);
  simulatedBreathTimer = window.setInterval(() => releaseDandelionSeeds(4, .82), 320);
}

function endSimulatedBreath() {
  if (simulatedBreathTimer) window.clearInterval(simulatedBreathTimer);
  simulatedBreathTimer = null;
  dandelionExperience?.classList.remove('is-simulating');
}

function completeCopingExperience() {
  if (copingExperienceScene.classList.contains('is-complete')) return;
  copingExperienceScene.classList.add('is-complete');
  completeCopingExperienceButton.hidden = false;
  completeCopingExperienceButton.style.visibility = 'visible';
  copingExperiencePrompt.textContent = language === 'zh' ? '已经清空，可以继续。' : 'Cleared. You can continue.';
  Audio$.playCopingEffect(gameState.stress.copingMode, gameState.stress.intensity);
  if (gameState.stress.copingMode === 'rhythm') stopRhythmRelease(false);
}

function sourceSummary() {
  const labels = gameState.stress.selectedSources
    .filter((source) => source !== 'other')
    .map((source) => stressSourceNames[source][language]);
  if (gameState.stress.otherSource) labels.push(gameState.stress.otherSource);
  return labels.join(language === 'zh' ? '、' : ', ');
}

function finishCopingExperience() {
  gameState.stress.completed = true;
  copingExperienceScene.classList.add('is-complete');
  completeCopingExperienceButton.hidden = true;
  gameState.choiceHistory.push({ scene: 'stress-coping', sources: [...gameState.stress.selectedSources], otherSource: gameState.stress.otherSource, intensity: gameState.stress.intensity, stressResponse: gameState.stress.stressResponse, copingMode: gameState.stress.copingMode, otherCoping: gameState.stress.otherCoping });
  stopRhythmRelease();
  stopDandelionBreath();
  if (releaseToolkitMode) {
    returnToReleaseDemo();
    return;
  }
  ScreenManager.show('dailyScreen');
  showDailyPhase('food');
}

function setRelationshipPhase(phase) {
  gameState.relationship.phase = phase;
  relationshipPanel.dataset.phase = phase;
  relationshipVisitor.hidden = phase === 'support' || phase === 'result';
  expressionRibbon.hidden = phase !== 'expression';
  supportSignals.hidden = phase !== 'support';
  relationshipResult.hidden = phase !== 'result';
  relationshipSignalContinue.hidden = phase !== 'support';
  relationshipContinue.hidden = phase !== 'result';
  relationshipStatus.textContent = '';
  renderRelationshipCopy();
}

function updateRelationshipApproach(now) {
  if (ScreenManager.current !== 'relationshipScreen' || gameState.relationship.phase !== 'approach') return;
  const elapsed = Math.max(0, now - relationshipApproachStartedAt);
  const progress = Math.min(.9, .08 + (elapsed / RELATIONSHIP_APPROACH_MS) * .82);
  gameState.relationship.approachProgress = progress;
  relationshipStage.style.setProperty('--approach', progress.toFixed(3));
  if (progress < .9) relationshipApproachFrame = requestAnimationFrame(updateRelationshipApproach);
  else stopRelationshipApproach();
}

function startRelationshipPerson(index, useSavedValues = false) {
  if (relationshipApproachFrame) cancelAnimationFrame(relationshipApproachFrame);
  relationshipApproachFrame = null;
  gameState.relationship.currentIndex = Math.max(0, Math.min(relationshipRoles.length - 1, index));
  const person = currentRelationshipPerson();
  const savedDistance = useSavedValues && Number.isFinite(person?.distance) ? person.distance : .08;
  gameState.relationship.approachProgress = savedDistance;
  gameState.relationship.expressionProgress = useSavedValues && Number.isFinite(person?.openness) ? person.openness : .04;
  relationshipStage.style.setProperty('--approach', savedDistance.toFixed(3));
  setRelationshipPhase('approach');
  if (reduceMotion || useSavedValues) {
    if (!useSavedValues) {
      gameState.relationship.approachProgress = .46;
      relationshipStage.style.setProperty('--approach', '.46');
    }
    return;
  }
  relationshipApproachStartedAt = performance.now();
  relationshipApproachFrame = requestAnimationFrame(updateRelationshipApproach);
}

function stopRelationshipApproach() {
  if (gameState.relationship.phase !== 'approach') return;
  if (relationshipApproachFrame) cancelAnimationFrame(relationshipApproachFrame);
  relationshipApproachFrame = null;
  const person = currentRelationshipPerson();
  if (!person) return;
  person.distance = gameState.relationship.approachProgress;
  setRelationshipPhase('expression');
  setExpressionProgress(Number.isFinite(person.openness) ? person.openness : .04);
  relationshipStatus.textContent = language === 'zh'
    ? `你让${relationshipPersonName(person.key)}停在了这里。`
    : `You let ${relationshipPersonName(person.key)} stop here.`;
  Audio$.tone(392, .18, .018);
}

function setExpressionProgress(value) {
  const progress = Math.max(.04, Math.min(1, Number(value) || .04));
  gameState.relationship.expressionProgress = progress;
  relationshipStage.style.setProperty('--expression', progress.toFixed(3));
  expressionRibbon.setAttribute('aria-valuenow', String(Math.round(progress * 100)));
  const expression = relationshipExpression(progress);
  expressionRibbon.setAttribute('aria-valuetext', expression[language]);
  expressionPhrase.textContent = expression[language];
}

function updateExpressionFromPointer(event) {
  const bounds = expressionRibbon.getBoundingClientRect();
  const progress = 1 - ((event.clientY - bounds.top) / Math.max(1, bounds.height));
  setExpressionProgress(progress);
}

function finishExpressionChoice() {
  if (gameState.relationship.phase !== 'expression') return;
  const person = currentRelationshipPerson();
  person.openness = gameState.relationship.expressionProgress;
  relationshipStatus.textContent = language === 'zh'
    ? `你把“${relationshipExpression(person.openness).zh}”递给了${relationshipPersonName(person.key)}。`
    : `You shared “${relationshipExpression(person.openness).en}” with ${relationshipPersonName(person.key)}.`;
  Audio$.tone(523.25 + gameState.relationship.currentIndex * 55, .2, .018);
  window.setTimeout(() => {
    if (gameState.relationship.phase !== 'expression') return;
    if (gameState.relationship.currentIndex < relationshipRoles.length - 1) startRelationshipPerson(gameState.relationship.currentIndex + 1);
    else startRelationshipSupport();
  }, reduceMotion ? 0 : 460);
}

function renderRelationshipPeople() {
  const xPositions = { colleague: 13, partner: 87, friend: 38, family: 62 };
  relationshipPeople.forEach((button) => {
    const person = gameState.relationship.people.find((entry) => entry.key === button.dataset.relationshipPerson);
    if (!person) return;
    const y = 27 + (Number.isFinite(person.distance) ? person.distance : .42) * 43;
    button.style.setProperty('--person-x', `${xPositions[person.key]}%`);
    button.style.setProperty('--person-y', `${y.toFixed(1)}%`);
    button.classList.toggle('is-supported', person.support);
    button.setAttribute('aria-pressed', String(person.support));
  });
}

function startRelationshipSupport() {
  if (relationshipApproachFrame) cancelAnimationFrame(relationshipApproachFrame);
  relationshipApproachFrame = null;
  setRelationshipPhase('support');
  renderRelationshipPeople();
  supportSignalButtons.forEach((button, index) => {
    button.classList.toggle('is-sent', index < gameState.relationship.signals.length);
    button.classList.remove('is-dragging');
    button.style.transform = '';
  });
  relationshipSignalContinue.disabled = gameState.relationship.signals.length === 0;
}

function deliverSupportSignal(role, signalButton) {
  if (gameState.relationship.phase !== 'support') return false;
  const person = gameState.relationship.people.find((entry) => entry.key === role);
  if (!person || person.support || gameState.relationship.signals.length >= supportSignalButtons.length) return false;
  const availableSignal = signalButton || supportSignalButtons.find((button) => !button.classList.contains('is-sent'));
  if (!availableSignal) return false;
  person.support = true;
  gameState.relationship.signals.push(role);
  availableSignal.classList.remove('is-dragging');
  availableSignal.classList.add('is-sent');
  availableSignal.style.transform = '';
  renderRelationshipPeople();
  relationshipSignalContinue.disabled = false;
  relationshipStatus.textContent = language === 'zh'
    ? `信号送给了${relationshipPersonName(role)}。${gameState.relationship.signals.length < 2 ? '还可以再送出一枚。' : '两枚信号都被接住了。'}`
    : `Signal sent to ${relationshipPersonName(role)}.${gameState.relationship.signals.length < 2 ? ' You can send one more.' : ' Both signals were received.'}`;
  Audio$.tone(659.25 + gameState.relationship.signals.length * 80, .24, .02);
  return true;
}

function beginSupportSignalDrag(event) {
  if (gameState.relationship.phase !== 'support' || event.currentTarget.classList.contains('is-sent')) return;
  if (event.button !== undefined && event.button !== 0) return;
  const signal = event.currentTarget;
  relationshipSignalDrag = { signal, pointerId: event.pointerId, startX: event.clientX, startY: event.clientY };
  signal.setPointerCapture?.(event.pointerId);
  signal.classList.add('is-dragging');
  event.preventDefault();
}

function moveSupportSignal(event) {
  if (!relationshipSignalDrag || relationshipSignalDrag.pointerId !== event.pointerId) return;
  const { signal, startX, startY } = relationshipSignalDrag;
  signal.style.transform = `translate(${event.clientX - startX}px,${event.clientY - startY}px) scale(1.08)`;
}

function endSupportSignalDrag(event) {
  if (!relationshipSignalDrag || relationshipSignalDrag.pointerId !== event.pointerId) return;
  const { signal } = relationshipSignalDrag;
  const target = relationshipPeople.find((button) => {
    const bounds = button.getBoundingClientRect();
    return event.clientX >= bounds.left && event.clientX <= bounds.right && event.clientY >= bounds.top && event.clientY <= bounds.bottom;
  });
  signal.releasePointerCapture?.(event.pointerId);
  signal.classList.remove('is-dragging');
  const delivered = target && deliverSupportSignal(target.dataset.relationshipPerson, signal);
  if (!delivered) signal.style.transform = '';
  relationshipSignalDrag = null;
}

function renderRelationshipResult() {
  if (gameState.relationship.phase !== 'support') return;
  setRelationshipPhase('result');
  renderRelationshipPeople();
  const people = gameState.relationship.people;
  const closest = [...people].sort((a, b) => b.distance - a.distance)[0];
  const mostOpen = [...people].sort((a, b) => b.openness - a.openness)[0];
  const supportNames = gameState.relationship.signals.map(relationshipPersonName);
  relationshipResultTitle.textContent = language === 'zh'
    ? `你的求助信号先飞向了${supportNames.join('和')}。`
    : `Your support signals went first to ${supportNames.join(' and ')}.`;
  relationshipResultCopy.textContent = language === 'zh'
    ? `${relationshipPersonName(closest.key)}站得离你最近；面对${relationshipPersonName(mostOpen.key)}，你更容易把真实感受递出去。距离会变，表达也可以慢慢练习。`
    : `${relationshipPersonName(closest.key)} stands closest. With ${relationshipPersonName(mostOpen.key)}, it feels easier to share what is real. Distance can change, and openness can grow.`;
  relationshipResultLines.replaceChildren();
  people.forEach((person, index) => {
    const line = document.createElement('i');
    line.style.setProperty('--line-angle', `${[-151, -29, 151, 29][index]}deg`);
    line.style.setProperty('--line-length', `${18 + person.distance * 22}rem`);
    line.style.setProperty('--line-opacity', (.14 + person.openness * .68).toFixed(2));
    relationshipResultLines.append(line);
  });
  if (!gameState.relationship.recorded) {
    gameState.choiceHistory.push({
      scene: 'relationship-room',
      people: people.map(({ key, distance, openness, support }) => ({ key, distance, openness, support })),
      supportSignals: [...gameState.relationship.signals]
    });
    gameState.relationship.recorded = true;
  }
  Audio$.tone(783.99, .34, .022);
}

function beginRelationshipChapter() {
  if (relationshipApproachFrame) cancelAnimationFrame(relationshipApproachFrame);
  gameState.relationship = {
    phase: 'approach', currentIndex: 0, approachProgress: .08, expressionProgress: .04,
    signals: [], recorded: false,
    people: relationshipRoles.map((role) => ({ key: role.key, distance: null, openness: null, support: false }))
  };
  relationshipPeople.forEach((button) => {
    button.classList.remove('is-supported');
    button.removeAttribute('aria-pressed');
  });
  supportSignalButtons.forEach((button) => {
    button.classList.remove('is-sent', 'is-dragging');
    button.style.transform = '';
  });
  relationshipResultLines.replaceChildren();
  ScreenManager.show('relationshipScreen');
  window.setTimeout(() => startRelationshipPerson(0), reduceMotion ? 0 : 420);
  Audio$.tone(349.23, .25, .018);
}

function goBackRelationshipStep() {
  const phase = gameState.relationship.phase;
  if (phase === 'result') {
    startRelationshipSupport();
  } else if (phase === 'support') {
    const lastIndex = relationshipRoles.length - 1;
    startRelationshipPerson(lastIndex, true);
    stopRelationshipApproach();
  } else if (phase === 'expression') {
    startRelationshipPerson(gameState.relationship.currentIndex, true);
  } else if (gameState.relationship.currentIndex > 0) {
    startRelationshipPerson(gameState.relationship.currentIndex - 1, true);
  } else {
    if (relationshipApproachFrame) cancelAnimationFrame(relationshipApproachFrame);
    relationshipApproachFrame = null;
    ScreenManager.back();
  }
}

// Relationship room V2: place everyone once, then choose one contact and one phrase.
function setRelationshipPhase(phase) {
  gameState.relationship.phase = phase;
  relationshipPanel.dataset.phase = phase;
  relationshipDistanceContinue.hidden = phase !== 'distance';
  relationshipPhraseChoices.hidden = phase !== 'phrase';
  relationshipResult.hidden = phase !== 'result';
  relationshipContinue.hidden = phase !== 'result';
  relationshipStatus.textContent = '';
  relationshipPeople.forEach((button) => {
    const person = gameState.relationship.people.find((entry) => entry.key === button.dataset.relationshipPerson);
    button.classList.toggle('is-contact', person?.key === gameState.relationship.contact);
    button.setAttribute('aria-pressed', String(person?.key === gameState.relationship.contact));
  });
  renderRelationshipCopy();
}

function relationshipPersonPosition(button, x, y, animate = true) {
  if (!animate) button.style.transition = 'none';
  button.style.setProperty('--person-x', `${x.toFixed(2)}%`);
  button.style.setProperty('--person-y', `${y.toFixed(2)}%`);
  if (!animate) requestAnimationFrame(() => button.style.removeProperty('transition'));
}

function relationshipZoneForRadius(radiusRatio) {
  if (radiusRatio <= .19) return 'near';
  if (radiusRatio <= .34) return 'middle';
  return 'far';
}

function snapRelationshipPerson(button, clientX, clientY) {
  const bounds = relationshipStage.getBoundingClientRect();
  const centerX = bounds.left + bounds.width * .5;
  const centerY = bounds.top + bounds.height * .47;
  const unit = Math.min(bounds.width, bounds.height);
  let dx = clientX - centerX;
  let dy = clientY - centerY;
  let radius = Math.hypot(dx, dy);
  if (radius < 4) {
    const index = relationshipPeople.indexOf(button);
    const angle = (-145 + index * 97) * Math.PI / 180;
    dx = Math.cos(angle);
    dy = Math.sin(angle);
    radius = 1;
  }
  const rawRatio = radius / unit;
  const zone = relationshipZoneForRadius(rawRatio);
  const snapRatio = { near: .14, middle: .27, far: .41 }[zone];
  const targetRadius = unit * snapRatio;
  const x = Math.max(8, Math.min(92, ((centerX + dx / radius * targetRadius - bounds.left) / bounds.width) * 100));
  const y = Math.max(9, Math.min(79, ((centerY + dy / radius * targetRadius - bounds.top) / bounds.height) * 100));
  const person = gameState.relationship.people.find((entry) => entry.key === button.dataset.relationshipPerson);
  person.x = x;
  person.y = y;
  person.zone = zone;
  person.radius = snapRatio;
  button.classList.add('is-placed');
  button.dataset.zone = zone;
  relationshipPersonPosition(button, x, y);
  const placedCount = gameState.relationship.people.filter((entry) => entry.zone).length;
  relationshipDistanceContinue.disabled = placedCount < relationshipRoles.length;
  relationshipStatus.textContent = language === 'zh'
    ? `${relationshipPersonName(person.key)}：${relationshipZones[zone].zh}。${placedCount < relationshipRoles.length ? `还剩 ${relationshipRoles.length - placedCount} 人。` : '四个人都放好了。'}`
    : `${relationshipPersonName(person.key)}: ${relationshipZones[zone].en}. ${placedCount < relationshipRoles.length ? `${relationshipRoles.length - placedCount} left.` : 'Everyone is placed.'}`;
  Audio$.tone({ near: 659.25, middle: 523.25, far: 392 }[zone], .16, .016);
}

function beginRelationshipDrag(event) {
  if (gameState.relationship.phase !== 'distance') return;
  if (event.button !== undefined && event.button !== 0) return;
  const button = event.currentTarget;
  relationshipDrag = { button, pointerId: event.pointerId };
  button.setPointerCapture?.(event.pointerId);
  button.classList.add('is-dragging');
  event.preventDefault();
}

function moveRelationshipDrag(event) {
  if (!relationshipDrag || relationshipDrag.pointerId !== event.pointerId) return;
  const bounds = relationshipStage.getBoundingClientRect();
  const x = Math.max(7, Math.min(93, ((event.clientX - bounds.left) / bounds.width) * 100));
  const y = Math.max(8, Math.min(88, ((event.clientY - bounds.top) / bounds.height) * 100));
  relationshipPersonPosition(relationshipDrag.button, x, y);
}

function finishRelationshipDrag(event) {
  if (!relationshipDrag || relationshipDrag.pointerId !== event.pointerId) return;
  const { button } = relationshipDrag;
  button.releasePointerCapture?.(event.pointerId);
  button.classList.remove('is-dragging');
  if (event.type === 'pointercancel') {
    const person = gameState.relationship.people.find((entry) => entry.key === button.dataset.relationshipPerson);
    relationshipPersonPosition(button, person.x, person.y);
  } else {
    snapRelationshipPerson(button, event.clientX, event.clientY);
  }
  relationshipDrag = null;
}

function placeRelationshipPersonWithKeyboard(button) {
  if (gameState.relationship.phase !== 'distance') return;
  const bounds = relationshipStage.getBoundingClientRect();
  const index = relationshipPeople.indexOf(button);
  const angle = (-155 + index * 103) * Math.PI / 180;
  const radius = Math.min(bounds.width, bounds.height) * .27;
  snapRelationshipPerson(button, bounds.left + bounds.width * .5 + Math.cos(angle) * radius, bounds.top + bounds.height * .47 + Math.sin(angle) * radius);
}

function selectRelationshipContact(role) {
  if (gameState.relationship.phase !== 'contact') return;
  const person = gameState.relationship.people.find((entry) => entry.key === role);
  if (!person) return;
  gameState.relationship.contact = role;
  setRelationshipPhase('phrase');
  relationshipStatus.textContent = language === 'zh'
    ? `压力很大时，你更可能先联系${relationshipPersonName(role)}。`
    : `When pressure rises, you are more likely to contact ${relationshipPersonName(role)} first.`;
  Audio$.tone(659.25, .22, .02);
}

function selectRelationshipPhrase(phrase) {
  if (gameState.relationship.phase !== 'phrase' || !relationshipExpressions[phrase]) return;
  gameState.relationship.phrase = phrase;
  relationshipPhraseButtons.forEach((button) => button.classList.toggle('is-selected', button.dataset.relationshipPhrase === phrase));
  renderRelationshipResult();
}

function renderRelationshipPeople() {
  relationshipPeople.forEach((button) => {
    const person = gameState.relationship.people.find((entry) => entry.key === button.dataset.relationshipPerson);
    if (!person) return;
    relationshipPersonPosition(button, person.x, person.y, false);
    button.classList.toggle('is-placed', Boolean(person.zone));
    button.classList.toggle('is-contact', person.key === gameState.relationship.contact);
    if (person.zone) button.dataset.zone = person.zone;
    else delete button.dataset.zone;
  });
}

function renderRelationshipResult() {
  if (gameState.relationship.phase !== 'phrase' || !gameState.relationship.contact || !gameState.relationship.phrase) return;
  setRelationshipPhase('result');
  renderRelationshipPeople();
  const people = gameState.relationship.people;
  const nearest = [...people].sort((a, b) => a.radius - b.radius)[0];
  const contact = people.find((person) => person.key === gameState.relationship.contact);
  const phrase = relationshipExpressions[gameState.relationship.phrase][language];
  relationshipResultTitle.textContent = language === 'zh'
    ? `压力很大时，你会先走向${relationshipPersonName(contact.key)}。`
    : `When pressure rises, you would first turn to ${relationshipPersonName(contact.key)}.`;
  relationshipResultCopy.textContent = language === 'zh'
    ? `你把${relationshipPersonName(nearest.key)}放得最近；你愿意对${relationshipPersonName(contact.key)}说：“${phrase}”。`
    : `You placed ${relationshipPersonName(nearest.key)} closest, and you would tell ${relationshipPersonName(contact.key)}, “${phrase}” This is not a verdict—only how closeness and speaking up feel right now.`;
  relationshipResultLines.replaceChildren();
  const line = document.createElement('i');
  const dx = contact.x - 50;
  const dy = contact.y - 47;
  line.className = 'relationship-spoken-line';
  line.style.setProperty('--line-angle', `${Math.atan2(dy, dx) * 180 / Math.PI}deg`);
  line.style.setProperty('--line-length', `${Math.max(7, Math.hypot(dx, dy) * .32)}rem`);
  line.style.setProperty('--line-opacity', '.9');
  relationshipResultLines.append(line);
  if (!gameState.relationship.recorded) {
    gameState.choiceHistory.push({
      scene: 'relationship-room',
      people: people.map(({ key, zone, x, y }) => ({ key, zone, x, y })),
      contact: gameState.relationship.contact,
      phrase: gameState.relationship.phrase
    });
    gameState.relationship.recorded = true;
  }
  Audio$.tone(783.99, .34, .022);
}

function beginRelationshipChapter() {
  const startPositions = [
    { x: 20, y: 86 }, { x: 40, y: 86 }, { x: 60, y: 86 }, { x: 80, y: 86 }
  ];
  gameState.relationship = {
    phase: 'distance', contact: null, phrase: null, recorded: false,
    people: relationshipRoles.map((role, index) => ({ key: role.key, zone: null, radius: 1, ...startPositions[index] }))
  };
  relationshipPhraseButtons.forEach((button) => button.classList.remove('is-selected'));
  relationshipDistanceContinue.disabled = true;
  relationshipResultLines.replaceChildren();
  renderRelationshipPeople();
  setRelationshipPhase('distance');
  ScreenManager.show('relationshipScreen');
  Audio$.tone(349.23, .25, .018);
}

function goBackRelationshipStep() {
  const phase = gameState.relationship.phase;
  if (phase === 'result') {
    setRelationshipPhase('phrase');
  } else if (phase === 'phrase') {
    gameState.relationship.contact = null;
    setRelationshipPhase('contact');
  } else if (phase === 'contact') {
    setRelationshipPhase('distance');
  } else {
    ScreenManager.back();
  }
  renderRelationshipPeople();
}

// Relationship map V3: place everyone, write to one or more people, then save report data.
function setRelationshipPhase(phase) {
  gameState.relationship.phase = phase;
  relationshipPanel.dataset.phase = phase;
  relationshipDistanceContinue.hidden = phase !== 'distance';
  relationshipExpressionPanel.hidden = phase !== 'expression';
  relationshipReportPanel.hidden = phase !== 'report';
  relationshipSaved.hidden = phase !== 'saved';
  relationshipStatus.textContent = '';
  renderRelationshipPeople();
  renderRelationshipRecipientState();
}

function renderRelationshipExpressionLines() {
  relationshipExpressionLines.replaceChildren();
  const stageWidth = relationshipStage.clientWidth || 960;
  const stageHeight = relationshipStage.clientHeight || 560;
  gameState.relationship.selectedRecipients.forEach((role) => {
    const person = gameState.relationship.people.find((entry) => entry.key === role);
    if (!person?.zone) return;
    const dx = (person.x - 50) / 100 * stageWidth;
    const dy = (person.y - 47) / 100 * stageHeight;
    const line = document.createElement('i');
    line.dataset.relationshipLine = role;
    line.style.setProperty('--line-angle', `${Math.atan2(dy, dx) * 180 / Math.PI}deg`);
    line.style.setProperty('--line-length', `${Math.max(18, Math.hypot(dx, dy))}px`);
    relationshipExpressionLines.append(line);
  });
}

function hasCompleteRelationshipMessages() {
  const selected = gameState.relationship.selectedRecipients;
  return selected.length > 0 && selected.every((role) => (gameState.relationship.messages[role] || '').trim().length > 0);
}

function renderRelationshipRecipientState() {
  if (!relationshipRecipientButtons.length) return;
  const selected = new Set(gameState.relationship.selectedRecipients || []);
  relationshipRecipientButtons.forEach((button) => {
    const active = selected.has(button.dataset.relationshipRecipient);
    button.setAttribute('aria-pressed', String(active));
  });
  relationshipMessageFields.forEach((field) => {
    field.hidden = !selected.has(field.dataset.relationshipMessageField);
  });
  relationshipMessageInputs.forEach((input) => {
    const role = input.dataset.relationshipMessage;
    if (input.value !== (gameState.relationship.messages[role] || '')) input.value = gameState.relationship.messages[role] || '';
  });
  relationshipPeople.forEach((button) => {
    const active = selected.has(button.dataset.relationshipPerson);
    button.classList.toggle('is-recipient', active);
    button.setAttribute('aria-pressed', String(active));
  });
  relationshipSaveMessages.disabled = !hasCompleteRelationshipMessages();
  renderRelationshipExpressionLines();
}

function toggleRelationshipRecipient(role) {
  if (gameState.relationship.phase !== 'expression' || !relationshipRoles.some((entry) => entry.key === role)) return;
  const selected = new Set(gameState.relationship.selectedRecipients);
  if (selected.has(role)) selected.delete(role);
  else selected.add(role);
  gameState.relationship.selectedRecipients = relationshipRoles.map((entry) => entry.key).filter((key) => selected.has(key));
  gameState.relationship.activeRecipient = role;
  renderRelationshipRecipientState();
  const field = relationshipMessageInputs.find((input) => input.dataset.relationshipMessage === role);
  if (selected.has(role)) window.setTimeout(() => field?.focus(), reduceMotion ? 0 : 180);
  Audio$.tone(selected.has(role) ? 659.25 : 392, .14, .014);
}

function updateRelationshipMessage(input) {
  const role = input.dataset.relationshipMessage;
  gameState.relationship.messages[role] = input.value.slice(0, 500);
  gameState.relationship.activeRecipient = role;
  relationshipSaveMessages.disabled = !hasCompleteRelationshipMessages();
}

function insertRelationshipStarter(button) {
  if (gameState.relationship.phase !== 'expression') return;
  const role = gameState.relationship.activeRecipient || gameState.relationship.selectedRecipients[0];
  const input = relationshipMessageInputs.find((entry) => entry.dataset.relationshipMessage === role);
  if (!input) {
    relationshipStatus.textContent = language === 'zh' ? '先选择一个想表达的人。' : 'Choose someone first.';
    return;
  }
  const starter = language === 'zh' ? button.dataset.messageStarter : button.dataset.starterEn;
  const current = input.value.trim();
  input.value = current ? `${current} ${starter}` : starter;
  updateRelationshipMessage(input);
  input.focus();
  input.setSelectionRange(input.value.length, input.value.length);
}

function saveRelationshipMessages() {
  if (gameState.relationship.phase !== 'expression' || !hasCompleteRelationshipMessages()) return;
  if (!gameState.relationship.recorded) {
    gameState.choiceHistory.push({
      scene: 'relationship-map',
      people: gameState.relationship.people.map(({ key, zone, x, y }) => ({ key, zone, x, y })),
      messages: { ...gameState.relationship.messages }
    });
    gameState.relationship.recorded = true;
  }
  setRelationshipPhase('report');
  window.setTimeout(() => relationshipReportEmail.focus(), reduceMotion ? 0 : 280);
  Audio$.tone(698.46, .24, .018);
}

function buildBodyMapReportPayload() {
  return {
    schemaVersion: 1,
    source: 'body-map-report',
    player: { name: gameState.playerName.slice(0, 80) },
    body: { weather: gameState.bodyWeather, weatherIndex: gameState.weatherIndex },
    stress: {
      sources: [...gameState.stress.selectedSources],
      otherSource: gameState.stress.otherSource,
      intensity: gameState.stress.intensity,
      response: gameState.stress.stressResponse,
      responses: [...gameState.stress.stressResponses],
      copingMode: gameState.stress.copingMode,
      otherCoping: gameState.stress.otherCoping
    },
    relationship: {
      people: gameState.relationship.people.map(({ key, zone, x, y }) => ({ key, zone, x, y })),
      messages: Object.fromEntries(
        gameState.relationship.selectedRecipients.map((role) => [role, (gameState.relationship.messages[role] || '').trim()])
      )
    }
  };
}

async function submitBodyMapReport(event) {
  event.preventDefault();
  if (!relationshipReportForm.reportValidity()) return;
  if (!relationshipReportConsent.checked) {
    relationshipReportStatus.textContent = language === 'zh' ? '请确认报告数据的使用方式。' : 'Please confirm how your report data will be used.';
    return;
  }
  if (!deploymentConfig.reportEndpoint || !deploymentConfig.reportNonce) {
    relationshipReportStatus.textContent = language === 'zh'
      ? '请在线上 WordPress 网站提交；本地预览不会保存这些内容。'
      : 'Please submit on the live WordPress site; this local preview does not save your entries.';
    return;
  }
  const email = relationshipReportEmail.value.trim();
  const honeypot = relationshipReportForm.querySelector('[name="website"]');
  const payload = new URLSearchParams({
    action: 'looove_submit_map_report',
    nonce: deploymentConfig.reportNonce,
    email,
    language,
    source: 'body-map-report',
    consent: '1',
    website: honeypot?.value || '',
    report: JSON.stringify(buildBodyMapReportPayload())
  });
  relationshipReportForm.setAttribute('aria-busy', 'true');
  relationshipReportSubmit.disabled = true;
  relationshipReportStatus.textContent = language === 'zh' ? '正在收好你的身心地图资料…' : 'Saving your body–mind map details…';
  try {
    const response = await fetch(deploymentConfig.reportEndpoint, {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
      body: payload.toString()
    });
    const result = await response.json().catch(() => null);
    if (!response.ok || !result?.success) throw new Error(result?.data?.message || (language === 'zh' ? '暂时无法保存，请稍后再试。' : 'Unable to save right now. Please try again.'));
    gameState.relationship.email = email;
    gameState.relationship.reportId = result.data?.reportId || null;
    relationshipFinish.href = deploymentConfig.homeUrl || 'index.html';
    setRelationshipPhase('saved');
    Audio$.tone(783.99, .34, .022);
  } catch (error) {
    relationshipReportStatus.textContent = error.message;
  } finally {
    relationshipReportForm.removeAttribute('aria-busy');
    relationshipReportSubmit.disabled = false;
  }
}

function renderRelationshipPeople() {
  const selected = new Set(gameState.relationship.selectedRecipients || []);
  relationshipPeople.forEach((button) => {
    const person = gameState.relationship.people.find((entry) => entry.key === button.dataset.relationshipPerson);
    if (!person) return;
    relationshipPersonPosition(button, person.x, person.y, false);
    button.classList.toggle('is-placed', Boolean(person.zone));
    button.classList.toggle('is-recipient', selected.has(person.key));
    if (person.zone) button.dataset.zone = person.zone;
    else delete button.dataset.zone;
  });
}

function beginRelationshipChapter() {
  const startPositions = [
    { x: 20, y: 86 }, { x: 40, y: 86 }, { x: 60, y: 86 }, { x: 80, y: 86 }
  ];
  gameState.relationship = {
    phase: 'distance', selectedRecipients: [], activeRecipient: null, messages: {}, email: '', reportId: null, recorded: false,
    people: relationshipRoles.map((role, index) => ({ key: role.key, zone: null, radius: 1, ...startPositions[index] }))
  };
  relationshipMessageInputs.forEach((input) => { input.value = ''; });
  relationshipReportForm.reset();
  relationshipReportStatus.textContent = '';
  relationshipExpressionLines.replaceChildren();
  relationshipDistanceContinue.disabled = true;
  renderRelationshipPeople();
  setRelationshipPhase('distance');
  ScreenManager.show('relationshipScreen');
  Audio$.tone(349.23, .25, .018);
}

function goBackRelationshipStep() {
  const phase = gameState.relationship.phase;
  if (phase === 'report') setRelationshipPhase('expression');
  else if (phase === 'expression') setRelationshipPhase('distance');
  else if (phase === 'distance') ScreenManager.back();
}

function goBackStressStep() {
  const step = gameState.stress.step;
  if (releaseToolkitMode) {
    returnToReleaseDemo();
    return;
  }
  if (step === 'source') {
    ScreenManager.back();
    window.setTimeout(() => Audio$.startWeatherNoise(gameState.bodyWeather), reduceMotion ? 0 : 620);
  } else if (step === 'intensity') {
    resetPressureScene(true);
    showStressStep('source');
  } else if (step === 'response') {
    resetPressureScene(true);
    showStressStep('source');
  } else if (step === 'release') {
    showStressStep('response');
  } else if (step === 'experience') {
    showStressStep('release');
  } else if (step === 'result') {
    showStressStep('experience');
  }
}

readyButton.addEventListener('click', () => {
  renderWeather(0);
  runWeatherQuestion();
  ScreenManager.show('weatherScreen');
  void Audio$.unlock();
  Audio$.tone(520, .18);
});

weatherTuner.addEventListener('input', () => renderWeather(weatherTuner.value, true));
weatherTuner.addEventListener('change', () => {
  weatherTuner.value = String(gameState.weatherIndex);
  renderWeather(gameState.weatherIndex, true);
});
tunerTrackWrap.addEventListener('pointerdown', (event) => {
  if (event.button !== undefined && event.button !== 0) return;
  tunerPointerId = event.pointerId;
  tunerTrackWrap.setPointerCapture?.(event.pointerId);
  tunerTrackWrap.classList.add('is-dragging');
  updateWeatherFromPointer(event);
});
tunerTrackWrap.addEventListener('pointermove', (event) => {
  if (tunerPointerId !== event.pointerId) return;
  updateWeatherFromPointer(event);
});
['pointerup', 'pointercancel'].forEach((name) => tunerTrackWrap.addEventListener(name, releaseWeatherPointer));

continueButton.addEventListener('click', () => {
  const state = weatherStates[gameState.weatherIndex];
  gameState.choiceHistory.push({ scene: 'body-weather', value: state.key, label: state.name[language] });
  Audio$.stopWeatherNoise();
  Audio$.tone(620, .16);
  ScreenManager.show('nextScreen');
});

stressSourceButtons.forEach((button) => button.addEventListener('click', () => {
  const source = button.dataset.stressSource;
  const selectedSources = new Set(gameState.stress.selectedSources);
  if (selectedSources.has(source)) selectedSources.delete(source);
  else selectedSources.add(source);
  gameState.stress.selectedSources = [...selectedSources];
  button.classList.toggle('is-selected', selectedSources.has(source));
  confirmSources.disabled = selectedSources.size === 0 && !stressOtherInput.value.trim();
  Audio$.tone(330, .12, .02);
}));
stressOtherInput.addEventListener('input', () => {
  gameState.stress.otherSource = stressOtherInput.value.trim();
  confirmSources.disabled = gameState.stress.selectedSources.length === 0 && !gameState.stress.otherSource;
});
confirmSources.addEventListener('click', () => {
  if (!gameState.stress.selectedSources.length && !stressOtherInput.value.trim()) return;
  gameState.stress.otherSource = stressOtherInput.value.trim();
  resetPressureScene(true);
  showStressStep('response');
});
intensityContinue.addEventListener('click', () => {
  if (!gameState.stress.completed) return;
  showStressStep('response');
});
stressResponseButtons.forEach((button) => button.addEventListener('click', () => selectStressResponse(button.dataset.stressResponse)));
confirmResponses.addEventListener('click', confirmStressResponses);
copingModeButtons.forEach((button) => button.addEventListener('click', () => selectCopingMode(button.dataset.copingMode)));
copingOtherInput?.addEventListener('input', () => {
  gameState.stress.otherCoping = copingOtherInput.value.trim();
});
pressureSponge.addEventListener('pointerdown', startSpongePress);
pressureSponge.addEventListener('pointerup', releaseSpongePress);
pressureSponge.addEventListener('pointercancel', releaseSpongePress);
pressureSponge.addEventListener('lostpointercapture', releaseSpongePress);
['selectstart', 'contextmenu', 'dragstart'].forEach((eventName) => {
  pressureSponge.addEventListener(eventName, (event) => event.preventDefault());
});
pressureSponge.addEventListener('keydown', (event) => {
  if ((event.key === ' ' || event.key === 'Enter') && !pressureHolding) {
    event.preventDefault();
    startSpongePress({ pointerId: -1 });
  }
});
pressureSponge.addEventListener('keyup', (event) => {
  if (event.key === ' ' || event.key === 'Enter') releaseSpongePress();
});
rhythmSpeed.addEventListener('input', () => setRhythmSpeed(rhythmSpeed.value));
rhythmSpeed.addEventListener('change', () => {
  setRhythmSpeed(rhythmSpeed.value);
  playPipaNote(523.25, 0, .35);
});
rhythmLaneButtons.forEach((button) => {
  button.addEventListener('pointerdown', (event) => {
    event.preventDefault();
    hitRhythmLane(Number(button.dataset.rhythmLane), true);
  });
});
window.addEventListener('keydown', (event) => {
  if (event.repeat || !(event.code in RHYTHM_KEY_MAP) || gameState.stress.copingMode !== 'rhythm' || gameState.stress.step !== 'experience') return;
  event.preventDefault();
  hitRhythmLane(RHYTHM_KEY_MAP[event.code]);
});
copingExperienceScene.addEventListener('pointerdown', () => {
  if (gameState.stress.copingMode === 'shake') prepareMotionControl(true);
});
copingExperienceScene.addEventListener('pointermove', (event) => {
  if (gameState.stress.copingMode !== 'shake' || event.target.closest('button')) return;
  const now = performance.now();
  if (!dispersalPointerSample) { dispersalPointerSample = { x: event.clientX, time: now }; return; }
  const elapsed = Math.max(12, now - dispersalPointerSample.time);
  const velocity = (event.clientX - dispersalPointerSample.x) / elapsed * 18;
  applyDispersalImpulse(velocity);
  dispersalPointerSample = { x: event.clientX, time: now };
});
copingExperienceScene.addEventListener('pointerleave', () => { dispersalPointerSample = null; });
dandelionBreathButton.addEventListener('click', () => {
  beginDandelionBreath();
});
dandelionSimulateButton.addEventListener('pointerdown', beginSimulatedBreath);
['pointerup', 'pointercancel', 'pointerleave'].forEach((name) => dandelionSimulateButton.addEventListener(name, endSimulatedBreath));
storePressureButton.addEventListener('click', () => {
  const note = storePressureText.value.trim();
  if (!note) { storePressureText.focus(); return; }
  sealExperience?.classList.add('is-storing');
  reduceExperiencePressure(gameState.stress.remainingPressure);
  window.setTimeout(() => { storePressureText.value = ''; }, 780);
});
completeCopingExperienceButton.addEventListener('click', finishCopingExperience);
releaseDetailBack.addEventListener('click', returnToReleaseDemo);
pressureReset.addEventListener('click', () => resetPressureScene(true));
stressStepBack.addEventListener('click', goBackStressStep);
stressContinue.addEventListener('click', () => {
  ScreenManager.show('dailyScreen');
  showDailyPhase('food');
});
foodButtons.forEach((button) => attachTokenInteraction(button, foodBowl, addFood));
movementButtons.forEach((button) => attachTokenInteraction(button, movementBody, addMovement));
customFoodAdd.addEventListener('click', addCustomFood);
customFoodInput.addEventListener('keydown', (event) => {
  if (event.key !== 'Enter') return;
  event.preventDefault();
  addCustomFood();
});
customMovementAdd.addEventListener('click', addCustomMovement);
customMovementInput.addEventListener('keydown', (event) => {
  if (event.key !== 'Enter') return;
  event.preventDefault();
  addCustomMovement();
});
foodUndo.addEventListener('click', undoFood);
foodContinue.addEventListener('click', () => {
  gameState.choiceHistory.push({ scene: 'daily-food', servings: [...gameState.daily.foodServings], percent: gameState.daily.foodPercent });
  showDailyPhase('movement'); Audio$.tone(587.33, .2, .018);
});
movementUndo.addEventListener('click', undoMovement);
movementSkip.addEventListener('click', () => {
  gameState.daily.movementPercent = 0;
  gameState.daily.movementChoices = [];
  gameState.daily.movementSkipped = true;
  renderMovementState();
  gameState.choiceHistory.push({ scene: 'daily-movement', percent: 0, choices: [], skipped: true });
  showDailyPhase('sleep'); renderSleepState(); Audio$.tone(587.33, .18, .015);
});
movementContinue.addEventListener('click', () => {
  gameState.daily.movementSkipped = false;
  gameState.choiceHistory.push({ scene: 'daily-movement', percent: gameState.daily.movementPercent, choices: [...gameState.daily.movementChoices], skipped: false });
  showDailyPhase('sleep'); renderSleepState(); Audio$.tone(659.25, .2, .018);
});
sleepRestoration.addEventListener('input', renderSleepState);
sleepRestoration.addEventListener('pointerdown', beginRestorationDrag);
sleepRestoration.addEventListener('pointermove', moveRestorationDrag);
sleepRestoration.addEventListener('pointerup', endRestorationDrag);
sleepRestoration.addEventListener('pointercancel', endRestorationDrag);
sleepBedtimeHandle.addEventListener('pointerdown', (event) => beginSleepHandleDrag('bedtime', event));
sleepWakeHandle.addEventListener('pointerdown', (event) => beginSleepHandleDrag('wake', event));
[sleepBedtimeHandle, sleepWakeHandle].forEach((handle) => {
  handle.addEventListener('pointermove', moveSleepHandle);
  handle.addEventListener('pointerup', endSleepHandleDrag);
  handle.addEventListener('pointercancel', endSleepHandleDrag);
  handle.addEventListener('click', (event) => event.stopPropagation());
});
sleepBedtimeHandle.addEventListener('keydown', (event) => nudgeSleepHandle('bedtime', event));
sleepWakeHandle.addEventListener('keydown', (event) => nudgeSleepHandle('wake', event));
sleepArc.addEventListener('click', addSleepInterruption);
sleepClearNodes.addEventListener('click', () => { gameState.daily.sleepInterruptions = []; renderSleepState(); });
sleepContinue.addEventListener('click', () => {
  renderSleepState(); gameState.choiceHistory.push({ scene: 'daily-sleep', bedtime: gameState.daily.bedtime, wake: gameState.daily.wake, interruptions: [...gameState.daily.sleepInterruptions], restoration: gameState.daily.restoration });
  showDailyPhase('report'); Audio$.tone(698.46, .24, .018);
});
dailyBack.addEventListener('click', () => {
  const phaseIndex = dailyPhaseOrder.indexOf(gameState.daily.phase);
  if (phaseIndex <= 0) ScreenManager.back(); else showDailyPhase(dailyPhaseOrder[phaseIndex - 1]);
});
dailyReportForm.addEventListener('submit', submitDailyAtlas);
languageToggle.addEventListener('click', () => setLanguage(language === 'zh' ? 'en' : 'zh'));
soundToggle.addEventListener('click', async (event) => {
  event.stopPropagation();
  if (!Audio$.enabled) {
    await Audio$.unlock();
    Audio$.playPianoNote(220, 3.5, .03);
    return;
  }
  const muted = Audio$.toggleMute();
  if (!muted && ScreenManager.current === 'weatherScreen') Audio$.startWeatherNoise(gameState.bodyWeather);
  if (muted) Audio$.stopWeatherNoise();
  soundToggle.textContent = muted ? '×' : '◉';
  soundToggle.setAttribute('aria-label', muted
    ? (language === 'zh' ? '开启声音' : 'Enable sound')
    : (language === 'zh' ? '关闭声音' : 'Mute sound'));
});

document.addEventListener('pointerdown', (event) => {
  if (!Audio$.enabled && !event.target.closest('#soundToggle')) Audio$.unlock();
}, { once: true });
document.addEventListener('keydown', () => {
  if (!Audio$.enabled) Audio$.unlock();
}, { once: true });

if (releaseToolkitMode) {
  releaseDetailHeader.hidden = false;
}
setLanguage(releaseToolkitMode ? releaseToolkitLanguage : 'zh', false);
renderWeather(0);
if (releaseToolkitMode) {
  document.body.classList.add('is-release-toolkit');
  gameState.stress.intensity = 100;
  gameState.stress.remainingPressure = 100;
  gameState.stress.completed = true;
  setPressureVisual(100);
  ScreenManager.show('nextScreen');
  if (releaseToolkitEntryMode && Object.hasOwn(copingModes, releaseToolkitEntryMode)) {
    startCopingExperience(releaseToolkitEntryMode);
  } else {
    returnToReleaseDemo();
  }
} else {
  showStressStep('source');
  renderFoodState();
  renderMovementState();
  renderSleepState();
  runIntroSequence();
}
