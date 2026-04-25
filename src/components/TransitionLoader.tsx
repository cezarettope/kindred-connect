import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

const messages = [
  "Analisando seu metabolismo...",
  "Identificando seu padrão hormonal...",
  "Montando seu Protocolo Termo Hormonal...",
];

const TransitionLoader = ({ onDone }: { onDone: () => void }) => {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t1 = setInterval(() => setIdx((i) => Math.min(i + 1, messages.length - 1)), 1000);
    const done = setTimeout(onDone, 3200);
    return () => {
      clearInterval(t1);
      clearTimeout(done);
    };
  }, [onDone]);

  return (
    <section className="flex min-h-[80vh] items-center justify-center bg-gradient-soft px-6 py-16">
      <div className="w-full max-w-md text-center animate-fade-in">
        <div className="relative mx-auto mb-8 flex h-24 w-24 items-center justify-center">
          <div className="absolute inset-0 animate-ping rounded-full bg-primary/30" />
          <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-cta shadow-glow">
            <Loader2 className="h-10 w-10 animate-spin text-primary-foreground" />
          </div>
        </div>

        <div className="space-y-3">
          {messages.map((m, i) => (
            <p
              key={i}
              className={`text-lg font-semibold transition-all duration-500 ${
                i <= idx ? "text-foreground opacity-100" : "text-muted-foreground/40 opacity-60"
              }`}
            >
              {i < idx && "✓ "}
              {i === idx && "→ "}
              {m}
            </p>
          ))}
        </div>

        <div className="mt-10 h-1.5 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full bg-gradient-cta transition-all duration-[3000ms] ease-out"
            style={{ width: `${((idx + 1) / messages.length) * 100}%` }}
          />
        </div>
      </div>
    </section>
  );
};

export default TransitionLoader;
