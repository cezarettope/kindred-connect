import { Instagram, Lock } from "lucide-react";

const SocialProof = () => (
  <section className="bg-background py-12">
    <div className="container">
      <a
        href="#"
        className="mx-auto flex max-w-xl items-center justify-center gap-3 rounded-2xl border border-border bg-gradient-soft px-6 py-5 text-center shadow-soft transition-all hover:scale-[1.02]"
      >
        <Instagram className="h-7 w-7 text-primary" />
        <span className="text-lg font-bold">
          Já somos mais de <span className="text-primary">850 mil</span> no Instagram
        </span>
      </a>
    </div>
  </section>
);

export const Footer = () => (
  <footer className="border-t border-border bg-secondary/40 py-10">
    <div className="container flex flex-col items-center gap-3 text-center text-sm text-muted-foreground">
      <div className="flex items-center gap-2 font-semibold text-foreground">
        <Lock className="h-4 w-4 text-accent" /> Pagamento seguro
      </div>
      <p>© {new Date().getFullYear()} Protocolo Termo Hormonal. Todos os direitos reservados.</p>
    </div>
  </footer>
);

export default SocialProof;
