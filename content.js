// SVG要素のクリックイベントを監視します
document.addEventListener('click', function(event) {
  const target = event.target;
  if (target.tagName === 'svg') {
    // SVG要素がクリックされた場合の処理を行います
    const container = target.parentElement;
    const isMermaid = container.classList.contains('mermaid');
    let state = container.getAttribute('data-state');
    let mouseX, mouseY;

    function updateTransformOrigin(x, y) {
      container.style.transformOrigin = `${x}px ${y}px`;
    }

    function resetTransformOrigin() {
      container.style.transformOrigin = '';
      container.style.transform = '';
    }

    function handleMouseMove(event) {
      mouseX = event.clientX;
      mouseY = event.clientY;
      updateTransformOrigin(mouseX, mouseY);
    }

    function handleMouseOut() {
      resetTransformOrigin();
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseout', handleMouseOut);
    }

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

        container.addEventListener('mousemove', handleMouseMove);

        // 初回のtransformOriginを設定
        mouseX = event.clientX;
        mouseY = event.clientY;
        updateTransformOrigin(mouseX, mouseY);
        container.style.transform = 'scale(2)';
      } else {
        // 3回目のクリック時の処理（元のサイズに戻す）
        state = '';
        container.removeAttribute('data-state');
        container.removeAttribute('style');
        resetTransformOrigin();
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseout', handleMouseOut);
      }
    }
  }
});