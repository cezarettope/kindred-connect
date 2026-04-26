import { useState } from "react";
import { Check, Crown, Star, Sparkles } from "lucide-react";
import UpsellModal from "./UpsellModal";
import ExpertSection from "./ExpertSection";

const UTM = "?utm_source=FB&utm_campaign={{campaign.name}}|{{campaign.id}}&utm_medium={{adset.name}}|{{adset.id}}&utm_content={{ad.name}}|{{ad.id}}&utm_term={{placement}}";

const URL_ESSENCIAL = `https://go.perfectpay.com.br/PPU38CQB260${UTM}`;
const URL_CONSULTA = `https://go.perfectpay.com.br/PPU38CQB262${UTM}`;
const URL_PROTOCOLO = `https://go.perfectpay.com.br/PPU38CQB25T${UTM}`;
const URL_UPSELL = `https://go.perfectpay.com.br/PPU38CQB263${UTM}`;

type PlanKey = "essencial" | "protocolo" | "consulta";

interface Plan {
  key: PlanKey;
  name: string;
  price: string;
  badge: string | null;
  highlight: boolean;
  features: string[];
  url: string;
  triggersUpsell: boolean;
  icon: JSX.Element;
}

const plans: Plan[] = [
  {
    key: "essencial",
    name: "Plano Mentorado Essencial",
    price: "R$ 19,90",
    badge: null,
    highlight: false,
    features: [
      "Acesso ao guia inicial do Protocolo Termo Hormonal",
      "Direcionamento alimentar estruturado",
      "Treinos básicos para ativação metabólica",
      "Acesso ao Mentor Nutricional inteligente",
    ],
    url: URL_ESSENCIAL,
    triggersUpsell: true,
    icon: <Star className="h-5 w-5" />,
  },
  {
    key: "protocolo",
    name: "Protocolo Termo Hormonal",
    price: "R$ 37,00",
    badge: "Mais Completo",
    highlight: true,
    features: [
      "Tudo dos planos anteriores",
      "Acesso completo ao sistema do Protocolo Termo Hormonal",
      "Treinos personalizados com acompanhamento",
      "Plano alimentar adaptativo dentro do sistema",
      "Estratégia hormonal completa aplicada no seu dia a dia",
    ],
    url: URL_PROTOCOLO,
    triggersUpsell: false,
    icon: <Crown className="h-5 w-5" />,
  },
  {
    key: "consulta",
    name: "Mentoria Individual",
    price: "R$ 29,90",
    badge: "Premium",
    highlight: false,
    features: [
      "Tudo do plano essencial",
      "Ajustes estratégicos de alimentação",
      "Direcionamento personalizado de treino",
      "Acesso ao Mentor Nutricional + Treinador Personal",
      "Otimização contínua do seu plano",
    ],
    url: URL_CONSULTA,
    triggersUpsell: true,
    icon: <Sparkles className="h-5 w-5" />,
  },
];

const trackCheckout = (name: string) => {
  if (typeof window !== "undefined" && (window as any).fbq) {
    (window as any).fbq("track", "InitiateCheckout", { content_name: name });
  }
};

const openUrl = (url: string) => {
  window.open(url, "_blank", "noopener,noreferrer");
};

const Plans = () => {
  const [pendingUrl, setPendingUrl] = useState<string | null>(null);
  const [pendingName, setPendingName] = useState<string>("");
  const upsellOpen = pendingUrl !== null;

  const handleClick = (plan: Plan) => {
    trackCheckout(plan.name);
    if (plan.triggersUpsell) {
      setPendingUrl(plan.url);
      setPendingName(plan.name);
    } else {
      openUrl(plan.url);
    }
  };

  const handleAcceptUpsell = () => {
    trackCheckout("Upsell Protocolo Termo Hormonal");
    openUrl(URL_UPSELL);
    setPendingUrl(null);
  };

  const handleContinueOriginal = () => {
    if (pendingUrl) openUrl(pendingUrl);
    setPendingUrl(null);
  };

  // Visual ordering: Essencial (1) → Protocolo destaque (2 - centro) → Consulta (3)
  // Essencial → Protocolo (destaque/centro) → Mentoria Individual (premium)
  const ordered: Plan[] = [plans[0], plans[1], plans[2]];

  return (
    <>
      <section id="planos" className="bg-gradient-soft py-16 md:py-24">
        <div className="container max-w-6xl">
          <div className="mx-auto max-w-2xl text-center animate-fade-in">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
              🔥 Recomendação personalizada
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
              Com base nas suas respostas, seu corpo respondeu melhor ao{" "}
              <span className="bg-gradient-cta bg-clip-text text-transparent">
                Protocolo Termo Hormonal
              </span>
            </h2>
            <p className="mt-5 text-base text-muted-foreground md:text-lg">
              Seu diagnóstico está pronto. Agora escolha como quer acessar seu protocolo personalizado:
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3 md:items-center">
            {ordered.map((p, i) => (
              <div
                key={p.key}
                className={`relative flex flex-col rounded-3xl border p-6 transition-all animate-fade-in-up ${
                  p.highlight
                    ? "border-primary bg-card shadow-glow ring-2 ring-primary/40 md:-translate-y-4 md:scale-105"
                    : "border-border bg-card shadow-soft hover:shadow-card"
                }`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {p.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-cta px-4 py-1 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-glow">
                    ⭐ Mais escolhido
                  </div>
                )}
                {!p.highlight && p.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-foreground px-4 py-1 text-xs font-bold uppercase tracking-wider text-background">
                    {p.badge}
                  </div>
                )}

                <div
                  className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${
                    p.highlight ? "bg-gradient-cta text-primary-foreground" : "bg-muted text-foreground"
                  }`}
                >
                  {p.icon}
                </div>

                <h3 className="text-xl font-bold">{p.name}</h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold">{p.price}</span>
                  <span className="text-sm text-muted-foreground">/único</span>
                </div>

                {p.highlight && (
                  <div className="mt-2 inline-flex w-fit items-center gap-1 rounded-full bg-accent/10 px-2 py-0.5 text-xs font-bold text-accent">
                    Mais Completo
                  </div>
                )}

                <ul className="mt-6 space-y-3 text-sm">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span
                        className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full ${
                          p.highlight
                            ? "bg-primary text-primary-foreground"
                            : "bg-accent/20 text-accent"
                        }`}
                      >
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      <span className="text-foreground">{f}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleClick(p)}
                  className={`mt-8 w-full rounded-full px-6 py-3.5 text-sm font-bold transition-all ${
                    p.highlight
                      ? "bg-gradient-cta text-primary-foreground shadow-glow hover:scale-[1.02]"
                      : "border border-border bg-background text-foreground hover:border-primary hover:bg-primary hover:text-primary-foreground"
                  }`}
                >
                  Escolher Plano
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ExpertSection />

      <UpsellModal
        open={upsellOpen}
        onClose={() => setPendingUrl(null)}
        onAcceptUpsell={handleAcceptUpsell}
        onContinueOriginal={handleContinueOriginal}
      />
    </>
  );
};

export default Plans;
