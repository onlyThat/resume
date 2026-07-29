import { useState, useEffect, useCallback, useRef } from 'react';

interface UseTypeWriterOptions {
  texts: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  waitTime?: number;
}

export function useTypeWriter({
  texts,
  typeSpeed = 80,
  deleteSpeed = 40,
  waitTime = 2000,
}: UseTypeWriterOptions) {
  const [displayText, setDisplayText] = useState('');
  const textIndexRef = useRef(0);
  const charIndexRef = useRef(0);
  const isDeletingRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const tick = useCallback(() => {
    const currentText = texts[textIndexRef.current];

    if (isDeletingRef.current) {
      charIndexRef.current--;
    } else {
      charIndexRef.current++;
    }

    setDisplayText(currentText.substring(0, charIndexRef.current));

    if (!isDeletingRef.current && charIndexRef.current === currentText.length) {
      timeoutRef.current = setTimeout(() => {
        isDeletingRef.current = true;
        tick();
      }, waitTime);
      return;
    }

    if (isDeletingRef.current && charIndexRef.current === 0) {
      isDeletingRef.current = false;
      textIndexRef.current = (textIndexRef.current + 1) % texts.length;
    }

    const speed = isDeletingRef.current ? deleteSpeed : typeSpeed;
    timeoutRef.current = setTimeout(tick, speed);
  }, [texts, typeSpeed, deleteSpeed, waitTime]);

  useEffect(() => {
    timeoutRef.current = setTimeout(tick, 500);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [tick]);

  return displayText;
}
