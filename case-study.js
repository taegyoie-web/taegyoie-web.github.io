const progress = document.getElementById('progress');
function updateProgress() {
  const maximum = document.documentElement.scrollHeight - innerHeight;
  progress.style.width = `${maximum > 0 ? scrollY / maximum * 100 : 0}%`;
}
window.addEventListener('scroll', updateProgress, {passive:true});
window.addEventListener('resize', updateProgress);
updateProgress();
