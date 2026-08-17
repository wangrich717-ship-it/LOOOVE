const root = document.documentElement;
const deploymentConfig = {
  homeUrl: root.dataset.loooveHomeUrl,
  gameUrl: root.dataset.loooveGameUrl,
  demoZhUrl: root.dataset.loooveDemoZhUrl,
  demoEnUrl: root.dataset.loooveDemoEnUrl,
  emailEndpoint: root.dataset.loooveEmailEndpoint,
  emailNonce: root.dataset.loooveEmailNonce,
  ...(window.LOOOVE_CONFIG || {}),
};
const languageToggle = document.querySelector('#languageToggle');
const journeyButton = document.querySelector('#journeyButton');
const appDemoButton = document.querySelector('#appDemoButton');
const emailForm = document.querySelector('#emailForm');
const emailInput = document.querySelector('#emailInput');
const emailHoneypot = document.querySelector('.form-honeypot');
const emailSubmitButton = emailForm.querySelector('button[type="submit"]');
const formStatus = document.querySelector('#formStatus');
const emailSection = document.querySelector('.email-section');
const emailPanel = document.querySelector('.email-panel');
const emailContent = document.querySelector('.email-content');
const emailTitle = document.querySelector('#emailTitle');
const emailProductStage = document.querySelector('.email-product-stage');
const compactSignupMedia = window.matchMedia('(max-width: 620px)');
const compactJourneyMedia = window.matchMedia('(max-width: 760px)');
const journeyMoments = [...document.querySelectorAll('.journey-moment')];
const journeyScenes = [...document.querySelectorAll('.journey-scene')];
const journeySignalTime = document.querySelector('#journeySignalTime');
const journeySignalTitle = document.querySelector('#journeySignalTitle');
const journeySceneCount = document.querySelector('#journeySceneCount');
const journeyMetricLabels = [1, 2, 3].map((index) => document.querySelector(`#journeyMetricLabel${index}`));
const journeyMetricValues = [1, 2, 3].map((index) => document.querySelector(`#journeyMetricValue${index}`));
const journeyVisual = document.querySelector('.journey-visual');

let language = 'en';
let activeJourneyIndex = 0;
let trajectorySyncFrame = 0;

function syncTrajectoryNodes() {
  document.querySelectorAll('.journey-trajectory').forEach((trajectory) => {
    const path = trajectory.querySelector('.trajectory-line path');
    const matrix = path?.getScreenCTM();
    if (!path || !matrix) return;

    const trajectoryBox = trajectory.getBoundingClientRect();
    const pathLength = path.getTotalLength();
    trajectory.querySelectorAll('.trajectory-node').forEach((node) => {
      const progress = Math.max(0, Math.min(1, Number(node.dataset.trajectoryProgress)));
      const point = path.getPointAtLength(pathLength * progress);
      const screenPoint = new DOMPoint(point.x, point.y).matrixTransform(matrix);
      node.style.setProperty('--trajectory-x', `${(screenPoint.x - trajectoryBox.left).toFixed(2)}px`);
      node.style.setProperty('--trajectory-y', `${(screenPoint.y - trajectoryBox.top).toFixed(2)}px`);
    });
  });
}

function scheduleTrajectorySync() {
  cancelAnimationFrame(trajectorySyncFrame);
  trajectorySyncFrame = requestAnimationFrame(syncTrajectoryNodes);
}

if ('ResizeObserver' in window) {
  const trajectoryResizeObserver = new ResizeObserver(scheduleTrajectorySync);
  document.querySelectorAll('.journey-trajectory').forEach((trajectory) => trajectoryResizeObserver.observe(trajectory));
}
window.addEventListener('resize', scheduleTrajectorySync, { passive: true });
document.fonts?.ready.then(scheduleTrajectorySync);

function activateJourneyMoment(index) {
  const moment = journeyMoments[index];
  if (!moment) return;
  activeJourneyIndex = index;
  journeyMoments.forEach((item, itemIndex) => item.classList.toggle('is-active', itemIndex === index));
  journeyScenes.forEach((scene) => scene.classList.toggle('is-active', scene.dataset.journeyScene === moment.dataset.scene));
  journeyVisual.classList.toggle('is-profile-active', index === 0);
  journeyVisual.classList.toggle('is-trajectory-active', index === journeyMoments.length - 1);
  journeySignalTime.textContent = moment.dataset.time;
  journeySignalTitle.textContent = moment.dataset[language === 'zh' ? 'signalZh' : 'signalEn'];
  journeySceneCount.textContent = String(index + 1).padStart(2, '0');
  const metrics = (moment.dataset[language === 'zh' ? 'metricsZh' : 'metricsEn'] || '').split('|');
  journeyMetricLabels.forEach((label, metricIndex) => {
    label.textContent = metrics[metricIndex * 2] || '';
    journeyMetricValues[metricIndex].textContent = metrics[metricIndex * 2 + 1] || '';
  });
  scheduleTrajectorySync();
}

const journeyObserver = new IntersectionObserver((entries) => {
  if (compactJourneyMedia.matches) return;
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    activateJourneyMoment(journeyMoments.indexOf(entry.target));
  });
}, { threshold: .58, rootMargin: '-12% 0px -24% 0px' });
journeyMoments.forEach((moment) => journeyObserver.observe(moment));

compactJourneyMedia.addEventListener('change', () => activateJourneyMoment(activeJourneyIndex));

function syncSignupProductPosition() {
  if (compactSignupMedia.matches) {
    if (emailProductStage.parentElement !== emailContent) emailTitle.after(emailProductStage);
    return;
  }

  if (emailProductStage.parentElement !== emailSection) emailSection.insertBefore(emailProductStage, emailPanel);
}

compactSignupMedia.addEventListener('change', syncSignupProductPosition);

function setLanguage(nextLanguage) {
  language = nextLanguage;
  root.dataset.language = language;
  document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';

  document.querySelectorAll('[data-zh][data-en]').forEach((element) => {
    element.textContent = element.dataset[language];
  });

  document.querySelectorAll('[data-zh-html][data-en-html]').forEach((element) => {
    element.innerHTML = element.dataset[language === 'zh' ? 'zhHtml' : 'enHtml'];
  });

  document.querySelectorAll('[data-placeholder-zh]').forEach((element) => {
    element.placeholder = element.dataset[`placeholder${language === 'zh' ? 'Zh' : 'En'}`];
  });

  document.querySelectorAll('[data-alt-zh]').forEach((element) => {
    element.alt = element.dataset[`alt${language === 'zh' ? 'Zh' : 'En'}`];
  });

  languageToggle.querySelector('.language-current').textContent = language === 'zh' ? '中' : 'EN';
  languageToggle.querySelector('.language-next').textContent = language === 'zh' ? 'EN' : '中';
  languageToggle.setAttribute('aria-label', language === 'zh' ? 'Switch to English' : '切换到中文');
  appDemoButton.href = language === 'zh'
    ? (deploymentConfig.demoZhUrl || '新demo/LOOOVE-demo-shell%20-%20cn.html')
    : (deploymentConfig.demoEnUrl || '新demo/LOOOVE-demo-shell%20-%20en.html');
  formStatus.textContent = '';
  const activeMoment = journeyMoments.findIndex((moment) => moment.classList.contains('is-active'));
  activateJourneyMoment(Math.max(0, activeMoment));
  scheduleTrajectorySync();
}

languageToggle.addEventListener('click', () => {
  setLanguage(language === 'zh' ? 'en' : 'zh');
});

journeyButton.addEventListener('click', () => {
  window.location.href = deploymentConfig.gameUrl || 'game.html';
});

emailForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  if (!emailInput.validity.valid) {
    formStatus.textContent = language === 'zh' ? '请输入有效的邮箱地址。' : 'Enter a valid email address.';
    emailInput.focus();
    return;
  }

  if (!deploymentConfig.emailEndpoint || !deploymentConfig.emailNonce) {
    formStatus.textContent = language === 'zh'
      ? '请在 WordPress 网站中提交；当前本地预览不会保存邮箱。'
      : 'Please submit on the WordPress site; this local preview does not store emails.';
    return;
  }

  const payload = new URLSearchParams({
    action: 'looove_collect_email',
    nonce: deploymentConfig.emailNonce,
    email: emailInput.value.trim(),
    language,
    source: 'landing',
    website: emailHoneypot?.value || '',
  });

  emailForm.setAttribute('aria-busy', 'true');
  emailSubmitButton.disabled = true;
  formStatus.textContent = language === 'zh' ? '正在加入名单…' : 'Joining the list…';

  try {
    const response = await fetch(deploymentConfig.emailEndpoint, {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
      body: payload.toString(),
    });
    const result = await response.json().catch(() => null);
    if (!response.ok || !result?.success) {
      throw new Error(result?.data?.message || (language === 'zh' ? '暂时无法提交，请稍后再试。' : 'Unable to submit right now. Please try again.'));
    }
    formStatus.textContent = language === 'zh'
      ? '已加入名单，期待与你见面。'
      : 'You’re on the list. We look forward to meeting you.';
    emailForm.reset();
  } catch (error) {
    formStatus.textContent = error.message;
    emailInput.focus();
  } finally {
    emailForm.removeAttribute('aria-busy');
    emailSubmitButton.disabled = false;
  }
});

syncSignupProductPosition();
setLanguage('en');
scheduleTrajectorySync();
