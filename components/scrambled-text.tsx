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
      // Revert any previous SplitText instance
      if (splitInstance) {
        splitInstance.revert();
        splitInstance = null;
      }

      // If DecryptedText already produced per-character spans, reuse them instead of re-wrapping.
      const existingChars = element.querySelectorAll<HTMLElement>(
        "span[aria-hidden='true'] span"
      );

      if (existingChars.length > 0) {
        charsRef.current = Array.from(existingChars);
      } else {
        // Fallback to GSAP SplitText (e.g. for headings without DecryptedText)
        splitInstance = SplitText.create(element, {
          type: "chars",
          charsClass: "char",
        });
        charsRef.current = (splitInstance.chars || []) as HTMLElement[];
      }

      // Ensure each character span has baseline data for scrambleText
      charsRef.current.forEach((c) => {
        const original = c.textContent || "";
        // Detect both regular (\u0020) and non-breaking (\u00A0) spaces
        const isSpace = original === " " || original === "\u00A0";

        if (isSpace) {
          c.innerHTML = "&nbsp;"; // keep visual width for space
          c.setAttribute("data-is-space", "true"); // mark for later skipping
        }
        gsap.set(c, {
          display: isSpace ? "inline-block" : "inline-block",
          attr: { "data-content": original },
        });
      });
    };

    // pointer move handler (shared)
    const handleMove = (e: PointerEvent) => {
      charsRef.current.forEach((c) => {
        // Skip any span we identified as a space so it never gets scrambled
        // (covers both regular and non-breaking spaces)
        if (c.dataset.isSpace === "true") return;
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

    // Run an initial split (for static text or headings)
    makeSplit();

    // Listen for a custom event fired by DecryptedText when its animation completes
    const handleDecryptComplete = () => {
      makeSplit();
    };

    element.addEventListener("decryptComplete", handleDecryptComplete as EventListener);

    const handlePointerLeave = () => {
      // Force-reset all characters to their original content when pointer leaves
      charsRef.current.forEach((c) => {
        gsap.killTweensOf(c);
        const isSpace = c.dataset.isSpace === "true";
        if (isSpace) {
          // Restore the non-breaking space entity to preserve width
          c.innerHTML = "&nbsp;";
        } else {
          c.textContent = c.getAttribute("data-content") || c.textContent || "";
        }
      });
    };

    rootRef.current.addEventListener("pointermove", handleMove);
    rootRef.current.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      rootRef.current?.removeEventListener("pointermove", handleMove);
      rootRef.current?.removeEventListener("pointerleave", handlePointerLeave);
      element.removeEventListener("decryptComplete", handleDecryptComplete as EventListener);
      if (splitInstance) splitInstance.revert();
    };
  }, [radius, duration, speed, scrambleChars]);

  return (
    <span ref={rootRef} className={`scrambled-wrapper ${className}`} style={style}>
      <span className="inline-block m-0 p-0">{children}</span>
    </span>
  );
};

export default ScrambledText; 