import { Flame } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <a href="#top" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-cta shadow-glow">
            <Flame className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold tracking-tight">
            Termo<span className="text-primary">Hormonal</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {["Home", "Dietas", "Perfil", "Sair"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {item}
            </a>
          ))}
        </nav>

        <a
          href="#quiz"
          className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-soft transition-all hover:scale-105 md:hidden"
        >
          Diagnóstico
        </a>
      </div>
    </header>
  );
};

export default Header;
