import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, Dumbbell, Home as HomeIcon, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";

type Goal = "Emagrecimento" | "Ganho de massa" | "Não sei dizer";
type Sex = "Masculino" | "Feminino";
type Routine = "Leve" | "Moderada" | "Intensa";
type Training = "Em casa" | "Academia" | "Não treino";

const MEALS = [
  { key: "cafe", label: "Café da Manhã", emoji: "☕", options: ["Pão integral", "Ovos mexidos", "Iogurte natural", "Café preto", "Frutas", "Tapioca", "Aveia", "Queijo branco"] },
  { key: "lancheManha", label: "Lanche da Manhã", emoji: "🍎", options: ["Maçã", "Banana", "Castanhas", "Iogurte", "Barra de cereal", "Não quero lanche da manhã"] },
  { key: "almoco", label: "Almoço", emoji: "🍽️", options: ["Arroz", "Feijão", "Frango grelhado", "Carne vermelha", "Peixe", "Salada", "Legumes", "Batata"] },
  { key: "lancheTarde", label: "Lanche da Tarde", emoji: "🍪", options: ["Frutas", "Iogurte", "Sanduíche", "Café com leite", "Castanhas", "Bolacha integral"] },
  { key: "janta", label: "Janta", emoji: "🌙", options: ["Sopa", "Salada", "Frango", "Peixe", "Omelete", "Wrap integral", "Vegetais", "Arroz"] },
] as const;

type FormState = {
  peso: string;
  altura: string;
  idade: string;
  objetivo: Goal | "";
  horarios: string;
  sexo: Sex | "";
  meals: Record<string, string[]>;
  rotina: Routine | "";
  treino: Training | "";
};

const initial: FormState = {
  peso: "",
  altura: "",
  idade: "",
  objetivo: "",
  horarios: "",
  sexo: "",
  meals: {},
  rotina: "",
  treino: "",
};

const TOTAL_STEPS = 4;

interface Props {
  onComplete: (data: FormState) => void;
}

const QuizForm = ({ onComplete }: Props) => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormState>(initial);

  const update = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setData((d) => ({ ...d, [k]: v }));

  const toggleMeal = (mealKey: string, opt: string) => {
    setData((d) => {
      const current = d.meals[mealKey] || [];
      // "Não quero" exclusivo
      if (opt.toLowerCase().startsWith("não quero")) {
        return { ...d, meals: { ...d.meals, [mealKey]: current.includes(opt) ? [] : [opt] } };
      }
      const filtered = current.filter((o) => !o.toLowerCase().startsWith("não quero"));
      if (filtered.includes(opt)) {
        return { ...d, meals: { ...d.meals, [mealKey]: filtered.filter((o) => o !== opt) } };
      }
      if (filtered.length >= 3) {
        toast({ title: "Limite atingido", description: "Selecione até 3 alimentos por refeição." });
        return d;
      }
      return { ...d, meals: { ...d.meals, [mealKey]: [...filtered, opt] } };
    });
  };

  const canNext = () => {
    if (step === 0) return data.peso && data.altura && data.idade && data.objetivo && data.sexo;
    if (step === 1) return MEALS.every((m) => (data.meals[m.key] || []).length > 0);
    if (step === 2) return data.rotina && data.treino;
    return true;
  };

  const next = () => {
    if (!canNext()) {
      toast({ title: "Complete os campos", description: "Preencha tudo para continuar." });
      return;
    }
    if (step < TOTAL_STEPS - 1) setStep(step + 1);
    else onComplete(data);
  };

  const progress = ((step + 1) / TOTAL_STEPS) * 100;

  return (
    <section id="quiz" className="bg-background py-16 md:py-24">
      <div className="container max-w-3xl">
        <div className="mb-8 text-center animate-fade-in">
          <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
            Preencha para calcular seu{" "}
            <span className="bg-gradient-cta bg-clip-text text-transparent">
              Protocolo Termo Hormonal
            </span>{" "}
            personalizado
          </h2>
          <p className="mt-3 text-muted-foreground">
            Etapa {step + 1} de {TOTAL_STEPS} — leva menos de 60 segundos
          </p>
        </div>

        <div className="mb-8 h-2 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full bg-gradient-cta transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="card-elevated p-6 md:p-10 animate-fade-in-up" key={step}>
          {step === 0 && <StepDados data={data} update={update} />}
          {step === 1 && <StepRefeicoes data={data} toggleMeal={toggleMeal} />}
          {step === 2 && <StepRotina data={data} update={update} />}
          {step === 3 && <StepRevisao data={data} />}
        </div>

        <div className="mt-6 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-medium text-foreground transition-all hover:bg-muted disabled:opacity-40"
          >
            <ArrowLeft className="h-4 w-4" /> Voltar
          </button>
          <button type="button" onClick={next} className="btn-flame inline-flex items-center gap-2">
            {step === TOTAL_STEPS - 1 ? "Calcular meu Protocolo" : "Continuar"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

/* ------- Sub-steps ------- */

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <label className="block">
    <span className="mb-2 block text-sm font-semibold text-foreground">{label}</span>
    {children}
  </label>
);

const inputCls =
  "w-full rounded-xl border border-input bg-background px-4 py-3 text-base transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30";

const Pill = ({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`rounded-full border px-5 py-2.5 text-sm font-medium transition-all ${
      active
        ? "border-primary bg-primary text-primary-foreground shadow-soft scale-105"
        : "border-border bg-card text-foreground hover:border-primary/50 hover:bg-muted"
    }`}
  >
    {children}
  </button>
);

const StepDados = ({
  data,
  update,
}: {
  data: FormState;
  update: <K extends keyof FormState>(k: K, v: FormState[K]) => void;
}) => (
  <div className="space-y-6">
    <h3 className="text-xl font-bold">Sobre você</h3>
    <div className="grid gap-4 sm:grid-cols-3">
      <Field label="Peso (kg)">
        <input
          type="number"
          inputMode="decimal"
          maxLength={3}
          value={data.peso}
          onChange={(e) => update("peso", e.target.value.slice(0, 3))}
          className={inputCls}
          placeholder="70"
        />
      </Field>
      <Field label="Altura (cm)">
        <input
          type="number"
          inputMode="numeric"
          maxLength={3}
          value={data.altura}
          onChange={(e) => update("altura", e.target.value.slice(0, 3))}
          className={inputCls}
          placeholder="170"
        />
      </Field>
      <Field label="Idade">
        <input
          type="number"
          inputMode="numeric"
          maxLength={3}
          value={data.idade}
          onChange={(e) => update("idade", e.target.value.slice(0, 3))}
          className={inputCls}
          placeholder="30"
        />
      </Field>
    </div>

    <Field label="Objetivo">
      <div className="flex flex-wrap gap-2">
        {(["Emagrecimento", "Ganho de massa", "Não sei dizer"] as Goal[]).map((g) => (
          <Pill key={g} active={data.objetivo === g} onClick={() => update("objetivo", g)}>
            {g}
          </Pill>
        ))}
      </div>
    </Field>

    <Field label="Sexo">
      <div className="flex flex-wrap gap-2">
        {(["Masculino", "Feminino"] as Sex[]).map((s) => (
          <Pill key={s} active={data.sexo === s} onClick={() => update("sexo", s)}>
            {s}
          </Pill>
        ))}
      </div>
    </Field>

    <Field label="Horários de alimentação (opcional)">
      <input
        type="text"
        maxLength={100}
        value={data.horarios}
        onChange={(e) => update("horarios", e.target.value)}
        className={inputCls}
        placeholder="Ex: 7h, 12h, 16h, 20h"
      />
    </Field>
  </div>
);

const StepRefeicoes = ({
  data,
  toggleMeal,
}: {
  data: FormState;
  toggleMeal: (k: string, opt: string) => void;
}) => (
  <div className="space-y-8">
    <div>
      <h3 className="text-xl font-bold">Suas refeições</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Selecione até <span className="font-semibold text-primary">3 alimentos</span> em cada refeição.
      </p>
    </div>

    {MEALS.map((meal) => {
      const selected = data.meals[meal.key] || [];
      return (
        <div key={meal.key} className="rounded-2xl border border-border bg-secondary/40 p-5">
          <div className="mb-3 flex items-center gap-2">
            <span className="text-2xl">{meal.emoji}</span>
            <h4 className="font-bold">{meal.label}</h4>
            <span className="ml-auto text-xs text-muted-foreground">{selected.length}/3</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {meal.options.map((opt) => {
              const active = selected.includes(opt);
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => toggleMeal(meal.key, opt)}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm transition-all ${
                    active
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card hover:border-primary/50"
                  }`}
                >
                  {active && <Check className="h-3.5 w-3.5" />}
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      );
    })}
  </div>
);

const StepRotina = ({
  data,
  update,
}: {
  data: FormState;
  update: <K extends keyof FormState>(k: K, v: FormState[K]) => void;
}) => (
  <div className="space-y-8">
    <div>
      <h3 className="text-xl font-bold">Como é sua rotina?</h3>
      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        {(["Leve", "Moderada", "Intensa"] as Routine[]).map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => update("rotina", r)}
            className={`rounded-2xl border p-5 text-left transition-all ${
              data.rotina === r
                ? "border-primary bg-primary/5 shadow-soft"
                : "border-border bg-card hover:border-primary/50"
            }`}
          >
            <div className="text-lg font-bold">{r}</div>
            <div className="mt-1 text-xs text-muted-foreground">
              {r === "Leve" && "Pouco movimento no dia"}
              {r === "Moderada" && "Trabalho ativo / caminhadas"}
              {r === "Intensa" && "Muita atividade física"}
            </div>
          </button>
        ))}
      </div>
    </div>

    <div>
      <h3 className="text-xl font-bold">Você treina?</h3>
      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        {([
          { v: "Em casa" as Training, icon: <HomeIcon className="h-5 w-5" /> },
          { v: "Academia" as Training, icon: <Dumbbell className="h-5 w-5" /> },
          { v: "Não treino" as Training, icon: <X className="h-5 w-5" /> },
        ]).map(({ v, icon }) => (
          <button
            key={v}
            type="button"
            onClick={() => update("treino", v)}
            className={`flex items-center gap-3 rounded-2xl border p-5 text-left transition-all ${
              data.treino === v
                ? "border-primary bg-primary/5 shadow-soft"
                : "border-border bg-card hover:border-primary/50"
            }`}
          >
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                data.treino === v ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
              }`}
            >
              {icon}
            </div>
            <div className="font-semibold">{v}</div>
          </button>
        ))}
      </div>
    </div>
  </div>
);

const StepRevisao = ({ data }: { data: FormState }) => (
  <div className="space-y-4">
    <h3 className="text-xl font-bold">Tudo certo!</h3>
    <p className="text-muted-foreground">
      Vamos cruzar suas respostas com o algoritmo do{" "}
      <span className="font-semibold text-foreground">Protocolo Termo Hormonal</span> para detectar
      seu padrão hormonal.
    </p>
    <div className="grid gap-2 rounded-2xl bg-secondary/60 p-5 text-sm">
      <Row k="Perfil" v={`${data.sexo}, ${data.idade} anos`} />
      <Row k="Medidas" v={`${data.peso} kg • ${data.altura} cm`} />
      <Row k="Objetivo" v={data.objetivo} />
      <Row k="Rotina" v={`${data.rotina} • ${data.treino}`} />
    </div>
  </div>
);

const Row = ({ k, v }: { k: string; v: string }) => (
  <div className="flex justify-between gap-3 border-b border-border/60 py-1.5 last:border-0">
    <span className="text-muted-foreground">{k}</span>
    <span className="font-semibold">{v}</span>
  </div>
);

export default QuizForm;
export type { FormState };
