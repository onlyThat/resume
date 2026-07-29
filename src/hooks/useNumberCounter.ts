import { useState, useEffect, useRef } from 'react';

interface UseNumberCounterOptions {
  target: number;
  duration?: number;
  trigger: boolean;
}

export function useNumberCounter({
  target,
  duration = 2000,
  trigger,
}: UseNumberCounterOptions) {
  const [value, setValue] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!trigger || hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(target * eased));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setValue(target);
      }
    };

    requestAnimationFrame(animate);
  }, [trigger, target, duration]);

  return value;
}
