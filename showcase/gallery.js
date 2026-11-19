const features = [...document.querySelectorAll('.feature')];
const controls = document.getElementById('feature-controls');
controls.setAttribute('role', 'group');
const buttons = features.map((feature, index) => {
  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = feature.dataset.name;
  button.setAttribute('aria-controls', feature.id);
  button.addEventListener('click', () => selectFeature(index));
  controls.append(button);
  return button;
});
function selectFeature(index) {
  features.forEach((feature, i) => {
    feature.hidden = i !== index;
    buttons[i].setAttribute('aria-pressed', String(i === index));
  });
}
selectFeature(0);

const viewer = document.getElementById('viewer');
const detail = document.getElementById('detail');
if (typeof viewer.showModal === 'function') {
  document.querySelectorAll('.capture').forEach(link => {
    link.addEventListener('click', event => {
      if (event.ctrlKey || event.shiftKey || event.altKey || event.metaKey) return;
      event.preventDefault();
      document.getElementById('viewer-title').textContent = link.dataset.title;
      document.getElementById('original').href = link.href;
      detail.src = link.href;
      detail.alt = link.querySelector('img').alt;
      viewer.showModal();
      document.getElementById('close').focus();
    });
  });
  document.getElementById('close').addEventListener('click', () => viewer.close());
  viewer.addEventListener('click', event => {
    if (event.target !== viewer) return;
    const box = viewer.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right ||
        event.clientY < box.top || event.clientY > box.bottom) viewer.close();
  });
}
