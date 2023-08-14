// SVG要素のクリックイベントを監視します
document.addEventListener('click', function(event) {
  const target = event.target;
  if (target.tagName === 'svg') {
    // SVG要素がクリックされた場合の処理を行います
    const container = target.parentElement;
    const isMermaid = container.classList.contains('mermaid');
    let state = container.getAttribute('data-state');
    
    if (isMermaid) {
      if (!state) {
        // 初回クリック時の処理（最大化1）
        state = 'maximized1';
        container.setAttribute('data-state', state);
        container.style.width = '100%';
        container.style.height = '100%';
        container.style.position = 'fixed';
        container.style.top = '0';
        container.style.left = '0';
        container.style.zIndex = '9999';
        container.style.background = '#fff';
      } else if (state === 'maximized1') {
        // 2回目のクリック時の処理（最大化2）
        state = 'maximized2';
        container.setAttribute('data-state', state);
        
        // マウスの位置を取得
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        
        // 拡大表示する位置を調整
        container.style.transform = 'scale(2)';
        container.style.transformOrigin = `${mouseX}px ${mouseY}px`;
      } else {
        // 3回目のクリック時の処理（元のサイズに戻す）
        state = '';
        container.removeAttribute('data-state');
        container.removeAttribute('style');
      }
    }
  }
});