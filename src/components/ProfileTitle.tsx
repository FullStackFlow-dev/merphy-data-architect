import { useEffect, useState } from "react";

const title = "Ingénieur de données et architecte de bases de données";
const firstLine = "Ingénieur de données";
const secondLine = "et architecte de bases de données";

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

  const letters = (text: string, offset: number) => text.split(" ").map((word, wordIndex, words) => {
    const start = offset + words.slice(0, wordIndex).join(" ").length + (wordIndex > 0 ? 1 : 0);
    return <span key={start}>
      {wordIndex > 0 ? " " : null}
      <span className="whitespace-nowrap">{Array.from(word).map((letter, index) => (
        <span key={index} className={`typing-letter ${start + index < visible ? "" : "typing-pending"} ${start + index === visible - 1 ? "typing-cursor" : ""}`}>{letter}</span>
      ))}</span>
    </span>;
  });
  return (
    <h1 className="relative font-semibold leading-tight">
      <span className="sr-only">{title}</span>
      <svg aria-hidden="true" width="100%" className="block h-[156px] sm:h-[192px]" xmlns="http://www.w3.org/2000/svg">
        <foreignObject width="100%" height="100%">
          <div className="text-3xl sm:text-5xl leading-tight font-semibold tracking-normal">
            {letters(firstLine, 0)}<br />
            <span className="text-primary">{letters(secondLine, firstLine.length + 1)}</span>
          </div>
        </foreignObject>
      </svg>
    </h1>
  );
}