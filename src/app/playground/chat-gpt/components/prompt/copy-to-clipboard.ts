const copyToClipboard = (divRef: any) => {
  const textToCopy = divRef.current?.textContent as string;
  const cleanedText = textToCopy.replace(/ {2,}/g, ' ');

  navigator.clipboard
    .writeText(cleanedText)
    .then(() => {
      console.log('Text copied to clipboard');
    })
    .catch((error) => {
      console.error('Error copying text:', error);
    });
};

export default copyToClipboard;
