import { useEffect, useState } from "react";

const lines = ["Ingénieur de données", "et architecte", "de bases de données"];
const title = lines.join(" ");

const offsets = lines.reduce<number[]>((acc, _line, i) => {
  acc.push(i === 0 ? 0 : acc[i - 1] + lines[i - 1].length + 1);
  return acc;
}, []);

export function ProfileTitle() {
  const [visible, setVisible] = useState(title.length);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer: ReturnType<typeof setTimeout>;
    let position = 0;
    const tick = () => {
      if (media.matches) {
        setVisible(title.length);
        return;
      }
      setVisible(position);
      if (position < title.length) {
        position += 1;
        timer = setTimeout(tick, 85);
      } else {
        position = 0;
        timer = setTimeout(tick, 2200);
      }
    };
    const restart = () => {
      clearTimeout(timer);
      position = 0;
      tick();
    };
    restart();
    media.addEventListener("change", restart);
    return () => {
      clearTimeout(timer);
      media.removeEventListener("change", restart);
    };
  }, []);

  const letters = (text: string, offset: number) =>
    text.split(" ").map((word, wordIndex, words) => {
      const start =
        offset + words.slice(0, wordIndex).join(" ").length + (wordIndex > 0 ? 1 : 0);
      return (
        <span key={start}>
          {wordIndex > 0 ? " " : null}
          <span className="whitespace-nowrap">
            {Array.from(word).map((letter, index) => (
              <span
                key={index}
                className={`typing-letter ${start + index < visible ? "" : "typing-pending"} ${start + index === visible - 1 ? "typing-cursor" : ""}`}
              >
                {letter}
              </span>
            ))}
          </span>
        </span>
      );
    });

  return (
    <h1 className="relative font-semibold leading-tight">
      <span className="sr-only">{title}</span>
      <svg
        aria-hidden="true"
        width="100%"
        className="block h-[120px] sm:h-[185px] md:h-[130px] lg:h-[185px] xl:h-[200px]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <foreignObject width="100%" height="100%">
          <div className="text-[28px] sm:text-[44px] md:text-[30px] lg:text-[44px] xl:text-5xl leading-tight font-semibold tracking-normal">
            {lines.map((line, i) => (
              <span key={line} className={i === 0 ? "" : "text-primary"}>
                {letters(line, offsets[i])}
                {i < lines.length - 1 ? <br /> : null}
              </span>
            ))}
          </div>
        </foreignObject>
      </svg>
    </h1>
  );
}
