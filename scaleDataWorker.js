self.onmessage = function (event) {
  const { data, dataKeys } = event.data;

  const minMaxScaling = (value, min, max) => (value - min) / (max - min);

  const scaledData = data.map(entry => {
    const scaledEntry = { ...entry, originalPayload: entry };
    dataKeys.forEach(key => {
      const values = data.map(item => item[key]);
      const min = Math.min(...values);
      const max = Math.max(...values);
      scaledEntry[key] = minMaxScaling(entry[key], min, max);
    });
    return scaledEntry;
  });

  self.postMessage(scaledData);
};
