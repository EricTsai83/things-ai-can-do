import { useEffect, useRef } from 'react';

function useDragger(id: string) {
  const isClicked = useRef(false);
  const coords = useRef({
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
  });

  useEffect(() => {
    // Get the element by its ID
    const target = document.getElementById(id);
    // Get the computed style for the element
    // @ts-ignore
    const style = window.getComputedStyle(target);

    // parseInt('260px', 10) => 260
    coords.current.lastX = parseInt(style.getPropertyValue('left'), 10);
    coords.current.lastY = parseInt(style.getPropertyValue('top'), 10);

    if (!target) throw new Error("Element with given id doesn't exist");

    const container = target.parentElement;
    if (!container) throw new Error('Target element must have a parent');

    const onMouseDown = (e: any) => {
      e.preventDefault();

      isClicked.current = true;
      coords.current.startX = e.clientX; // e.clientX 是不看元素，去計算位置的
      coords.current.startY = e.clientY; // 但我們的的起始點是 div 內，故要做位置調整
    };

    const onMouseMove = (e: any) => {
      if (!isClicked.current) return;

      const nextX = e.clientX - coords.current.startX + coords.current.lastX; // 1.前面兩個項目表示右移了多少(透過整個 window 做計算)  2.上次最後的位置（透過畫布做計算）
      const nextY = e.clientY - coords.current.startY + coords.current.lastY;

      target.style.top = `${nextY}px`;
      target.style.left = `${nextX}px`;
    };

    const onMouseUp = () => {
      isClicked.current = false;
      coords.current.lastX = target.offsetLeft; // 返回當前元素左上角相對於 HTMLElement.offsetParent 節點的左邊界偏移的像素值。
      coords.current.lastY = target.offsetTop;
    };

    target.addEventListener('mousedown', onMouseDown);
    target.addEventListener('mouseup', onMouseUp);
    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseleave', onMouseUp);

    const cleanup = () => {
      target.removeEventListener('mousedown', onMouseDown);
      target.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseleave', onMouseUp); // 為了讓滑鼠離開視窗後不會是按下點擊的狀態
    };

    return cleanup;
  }, [id]);
}

export default useDragger;
