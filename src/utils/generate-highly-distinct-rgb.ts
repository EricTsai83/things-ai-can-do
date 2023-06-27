function generateHighlyDistinctRGB(n: any) {
  const results = [];

  for (let i = 0; i < n; i++) {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);

    // 確保與先前生成的顏色差異很大
    for (let j = 0; j < i; j++) {
      const prevColor = results[j];
      const prevR = prevColor[0];
      const prevG = prevColor[1];
      const prevB = prevColor[2];

      // 檢查與先前顏色的差異程度
      const difference =
        Math.abs(r - prevR) + Math.abs(g - prevG) + Math.abs(b - prevB);

      // 如果與先前顏色的差異太小，重新生成顏色
      if (difference < 200) {
        r = Math.floor(Math.random() * 256);
        g = Math.floor(Math.random() * 256);
        b = Math.floor(Math.random() * 256);

        // 重新檢查與之前的所有顏色的差異
        j = -1;
      }
    }

    results.push([r, g, b]);
  }

  return results;
}

export default generateHighlyDistinctRGB;
