// SVG要素のクリックイベントを監視します
document.addEventListener('click', function(event) {
  const target = event.target;
  if (target.tagName === 'svg') {
    // SVG要素がクリックされた場合の処理を行います
    const container = target.parentElement;
    const isMaximized = container.classList.contains('maximized');

    if (isMaximized) {
      // 最大化解除の処理を実行します
      container.classList.remove('maximized');
      container.removeAttribute('style');
    } else {
      // 最大化表示の処理を実行します
      container.classList.add('maximized');
      container.style.width = '100%';
      container.style.height = '100%';
      container.style.position = 'fixed';
      container.style.top = '0';
      container.style.left = '0';
      container.style.zIndex = '9999';
      container.style.background = '#fff';
    }
  }
});
