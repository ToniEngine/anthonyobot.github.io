import { useEffect, useRef, useState } from "react";

export function useTypingEffect(texts, typeSpeed = 120, deleteSpeed = 70, holdDelay = 1500) {
  const [displayText, setDisplayText] = useState("");
  const stateRef = useRef({ textIndex: 0, charIndex: 0, deleting: false });

  useEffect(() => {
    if (!texts?.length) {
      setDisplayText("");
      return undefined;
    }

    let timeoutId;

    const tick = () => {
      const state = stateRef.current;
      const current = texts[state.textIndex];

      if (state.deleting) {
        state.charIndex = Math.max(0, state.charIndex - 1);
      } else {
        state.charIndex = Math.min(current.length, state.charIndex + 1);
      }

      setDisplayText(current.slice(0, state.charIndex));

      if (!state.deleting && state.charIndex === current.length) {
        state.deleting = true;
        timeoutId = window.setTimeout(tick, holdDelay);
        return;
      }

      if (state.deleting && state.charIndex === 0) {
        state.deleting = false;
        state.textIndex = (state.textIndex + 1) % texts.length;
      }

      timeoutId = window.setTimeout(tick, state.deleting ? deleteSpeed : typeSpeed);
    };

    timeoutId = window.setTimeout(tick, typeSpeed);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [deleteSpeed, holdDelay, texts, typeSpeed]);

  return displayText;
}
