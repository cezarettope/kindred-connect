import { Flame, AlertTriangle, Droplets, Activity, ArrowDown } from "lucide-react";

const Result = ({ onContinue }: { onContinue: () => void }) => {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container max-w-3xl">
        <div className="card-elevated overflow-hidden animate-scale-in">
          <div className="bg-gradient-cta px-6 py-8 text-center text-primary-foreground md:px-10">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-background/20 backdrop-blur">
              <Flame className="h-8 w-8 animate-flame-flicker" />
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
              Seu Protocolo Termo Hormonal está pronto
            </h2>
            <p className="mt-3 text-base opacity-95 md:text-lg">
              Detectamos um <span className="font-bold">bloqueio hormonal</span> que impede seu
              emagrecimento.
            </p>
          </div>

          <div className="space-y-6 p-6 md:p-10">
            <div className="rounded-2xl border-2 border-primary/40 bg-primary/5 p-5 text-center">
              <div className="text-xs font-bold uppercase tracking-wider text-primary">
                Seu perfil identificado
              </div>
              <div className="mt-2 flex items-center justify-center gap-2 text-2xl font-extrabold md:text-3xl">
                <span className="text-3xl">🔥</span> Termo Hormonal Travado
              </div>
              <div className="mt-1 inline-flex items-center gap-2 rounded-full bg-destructive/10 px-3 py-1 text-sm font-semibold text-destructive">
                <AlertTriangle className="h-3.5 w-3.5" /> Nível 2 — Atenção
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-bold">O que está acontecendo no seu corpo:</h3>
              <ul className="space-y-3">
                <Bullet icon={<Activity className="h-5 w-5" />} text="Metabolismo desacelerado" />
                <Bullet icon={<Droplets className="h-5 w-5" />} text="Retenção de líquido" />
                <Bullet icon={<AlertTriangle className="h-5 w-5" />} text="Cortisol elevado" />
              </ul>
            </div>

            <div className="rounded-2xl bg-secondary/60 p-5 text-center">
              <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Acesso liberado
              </div>
              <div className="mt-1 text-sm text-muted-foreground">A partir de</div>
              <div className="mt-1 text-4xl font-extrabold text-primary">R$ 19,90</div>
            </div>

            <button
              onClick={onContinue}
              className="btn-flame pulse-glow w-full text-base inline-flex items-center justify-center gap-2"
            >
              Acessar meu Protocolo Termo Hormonal
              <ArrowDown className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const Bullet = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <li className="flex items-center gap-3 rounded-xl border border-border bg-card p-3">
    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
      {icon}
    </div>
    <span className="font-semibold">{text}</span>
  </li>
);

export default Result;
