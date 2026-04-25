import { X, Zap } from "lucide-react";
import { useEffect } from "react";

interface UpsellModalProps {
  open: boolean;
  onClose: () => void;
  onAcceptUpsell: () => void;
  onContinueOriginal: () => void;
}

const UpsellModal = ({ open, onClose, onAcceptUpsell, onContinueOriginal }: UpsellModalProps) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/70 p-4 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-3xl bg-card p-6 shadow-glow md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-muted/80"
          aria-label="Fechar"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-cta text-primary-foreground shadow-glow">
          <Zap className="h-7 w-7" />
        </div>

        <h3 className="text-center text-2xl font-extrabold tracking-tight">
          Espere! Liberação exclusiva para você
        </h3>

        <p className="mt-3 text-center text-sm text-muted-foreground">
          Você acabou de desbloquear a chance de acessar o{" "}
          <strong className="text-foreground">Protocolo Termo Hormonal completo</strong> com desconto
          especial.
        </p>

        <div className="my-6 rounded-2xl border-2 border-dashed border-primary/40 bg-primary/5 p-5 text-center">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Oferta exclusiva
          </div>
          <div className="mt-1 flex items-baseline justify-center gap-2">
            <span className="text-sm text-muted-foreground line-through">R$ 37,00</span>
            <span className="text-4xl font-extrabold text-primary">R$ 26,50</span>
          </div>
          <div className="mt-1 text-xs font-bold text-accent">Economia de R$ 10,50</div>
        </div>

        <button
          onClick={onAcceptUpsell}
          className="w-full rounded-full bg-gradient-cta px-6 py-3.5 text-sm font-bold text-primary-foreground shadow-glow transition-all hover:scale-[1.02]"
        >
          Quero o Protocolo Completo com Desconto
        </button>

        <button
          onClick={onContinueOriginal}
          className="mt-3 w-full text-xs font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          Continuar com meu plano atual
        </button>
      </div>
    </div>
  );
};

export default UpsellModal;
