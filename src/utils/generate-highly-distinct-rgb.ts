function generateHighlyDistinctRGB(n: number) {
  const results = [];

  for (let i = 0; i < n; i++) {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);

    for (let j = 0; j < i; j++) {
      const prevColor = results[j];
      const prevR = prevColor[0];
      const prevG = prevColor[1];
      const prevB = prevColor[2];

      const difference =
        Math.abs(r - prevR) + Math.abs(g - prevG) + Math.abs(b - prevB);

      if (difference < 200) {
        r = Math.floor(Math.random() * 256);
        g = Math.floor(Math.random() * 256);
        b = Math.floor(Math.random() * 256);
        j = -1;
      }
    }

    results.push([r, g, b]);
  }

  return results;
}

export default generateHighlyDistinctRGB;
