import { Check, Crown, Star } from "lucide-react";

const CHECKOUT_BASE = "https://pay.perfectpay.com.br/";

const plans = [
  {
    name: "Plano Emagrecimento Eficiente",
    price: "R$ 9,99",
    badge: null as string | null,
    highlight: false,
    features: ["Treinos básicos", "Acesso inicial ao app"],
    url: CHECKOUT_BASE + "PPU38CPMUH3",
    icon: <Star className="h-5 w-5" />,
  },
  {
    name: "Protocolo Termo Hormonal",
    price: "R$ 19,90",
    badge: "Mais escolhido",
    highlight: true,
    features: [
      "Treinos completos",
      "Sessões hormonais",
      "Alongamentos guiados",
      "Dieta personalizada para seu objetivo",
    ],
    url: CHECKOUT_BASE + "PPU38CPMUH4",
    icon: <Crown className="h-5 w-5" />,
  },
  {
    name: "Consulta com o Mentor",
    price: "R$ 28,90",
    badge: "Premium",
    highlight: false,
    features: [
      "Tudo do plano anterior",
      "Protocolo Termo Hormonal completo",
      "Dieta personalizada",
      "Acompanhamento direto",
    ],
    url: CHECKOUT_BASE + "PPU38CPMUH5",
    icon: <Crown className="h-5 w-5" />,
  },
];

const Plans = () => {
  const handleCheckout = (url: string, name: string) => {
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "InitiateCheckout", { content_name: name });
    }
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
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
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {plans.map((p, i) => (
            <div
              key={p.name}
              className={`relative flex flex-col rounded-3xl border p-6 transition-all animate-fade-in-up ${
                p.highlight
                  ? "border-primary bg-card shadow-glow md:-translate-y-4 md:scale-105"
                  : "border-border bg-card shadow-soft hover:shadow-card"
              }`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {p.badge && (
                <div
                  className={`absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-bold uppercase tracking-wider ${
                    p.highlight
                      ? "bg-gradient-cta text-primary-foreground shadow-glow"
                      : "bg-foreground text-background"
                  }`}
                >
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

              <ul className="mt-6 space-y-3 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span
                      className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full ${
                        p.highlight ? "bg-primary text-primary-foreground" : "bg-accent/20 text-accent"
                      }`}
                    >
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    <span className="text-foreground">{f}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleCheckout(p.url, p.name)}
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
  );
};

export default Plans;
