import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(SplitText, ScrambleTextPlugin);

interface ScrambledTextProps {
  radius?: number;
  duration?: number;
  speed?: number;
  scrambleChars?: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

const ScrambledText: React.FC<ScrambledTextProps> = ({
  radius = 100,
  duration = 1.2,
  speed = 0.5,
  scrambleChars = ".:",
  className = "",
  style = {},
  children,
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const charsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    if (!rootRef.current) return;

    const element = rootRef.current.firstElementChild as HTMLElement | null;
    if (!element) return;

    let splitInstance: any = null;

    const makeSplit = () => {
      if (splitInstance) splitInstance.revert();

      splitInstance = SplitText.create(element, {
        type: "chars",
        charsClass: "char",
      });
      charsRef.current = (splitInstance.chars || []) as HTMLElement[];

      charsRef.current.forEach((c) => {
        gsap.set(c, {
          display: "inline-block",
          attr: { "data-content": c.innerHTML },
        });
      });
    };

    // pointer move handler (shared)
    const handleMove = (e: PointerEvent) => {
      charsRef.current.forEach((c) => {
        const rect = c.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        const dist = Math.hypot(dx, dy);

        if (dist < radius) {
          gsap.to(c, {
            overwrite: true,
            duration: duration * (1 - dist / radius),
            scrambleText: {
              text: c.getAttribute("data-content") || "",
              chars: scrambleChars,
              speed,
            },
            ease: "none",
          });
        }
      });
    };

    // Observe mutations to know when decrypted text stabilizes
    let timer: NodeJS.Timeout | null = null;
    const observer = new MutationObserver(() => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        makeSplit();
        observer.disconnect();
      }, 250); // wait until no mutation for 250ms
    });

    observer.observe(element, { characterData: true, childList: true, subtree: true });

    // Initial attempt (in case text already static)
    makeSplit();

    rootRef.current.addEventListener("pointermove", handleMove);

    return () => {
      rootRef.current?.removeEventListener("pointermove", handleMove);
      observer.disconnect();
      if (splitInstance) splitInstance.revert();
    };
  }, [radius, duration, speed, scrambleChars]);

  return (
    <div ref={rootRef} className={`scrambled-wrapper ${className}`} style={style}>
      <span className="inline-block m-0 p-0">{children}</span>
    </div>
  );
};

export default ScrambledText; 