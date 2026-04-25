import { Flame, Sparkles } from "lucide-react";
import FeedbackCarousel from "./FeedbackCarousel";

const Hero = () => {
  return (
    <section id="top" className="relative overflow-hidden bg-gradient-soft">
      <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-primary-glow/20 blur-3xl" />

      <div className="container relative grid gap-12 py-12 md:grid-cols-2 md:py-20">
        <div className="flex flex-col justify-center animate-fade-in-up">
          <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5">
            <Flame className="h-4 w-4 text-primary animate-flame-flicker" />
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Diagnóstico exclusivo 2025
            </span>
          </div>

          <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
            Protocolo Termo Hormonal:{" "}
            <span className="bg-gradient-cta bg-clip-text text-transparent">
              desbloqueie o emagrecimento
            </span>{" "}
            que seu corpo esconde
          </h1>

          <p className="mt-5 max-w-lg text-lg text-muted-foreground">
            <span className="font-semibold text-foreground">+500 mil pessoas</span> já
            ativaram esse protocolo e destravaram o metabolismo.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a href="#quiz" className="btn-flame pulse-glow inline-flex items-center justify-center gap-2 text-base">
              <Sparkles className="h-5 w-5" />
              Começar diagnóstico
            </a>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-8 w-8 rounded-full border-2 border-background bg-gradient-flame"
                  />
                ))}
              </div>
              <span>+500k diagnósticos feitos</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center animate-scale-in">
          <FeedbackCarousel />
        </div>
      </div>
    </section>
  );
};

export default Hero;
