import { RefObject } from 'react';

export function copyTextToClipboard(text: string) {
  navigator.clipboard.writeText(text);
}

export function copyRefToClipboard(divRef: RefObject<HTMLDivElement>) {
  const textToCopy = divRef.current?.textContent as string;
  const cleanedText = textToCopy.replace(/ {2,}/g, ' ');
  navigator.clipboard.writeText(cleanedText);
}
