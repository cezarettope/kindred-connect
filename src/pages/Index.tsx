import { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import QuizForm, { type FormState } from "@/components/QuizForm";
import TransitionLoader from "@/components/TransitionLoader";
import Result from "@/components/Result";
import Plans from "@/components/Plans";
import SocialProof, { Footer } from "@/components/SocialProof";

type Stage = "hero" | "loading" | "result" | "plans";

const Index = () => {
  const [stage, setStage] = useState<Stage>("hero");
  const resultRef = useRef<HTMLDivElement>(null);
  const plansRef = useRef<HTMLDivElement>(null);

  const handleQuizComplete = (_data: FormState) => {
    setStage("loading");
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "Lead");
    }
  };

  useEffect(() => {
    if (stage === "result") {
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
    }
    if (stage === "plans") {
      setTimeout(() => plansRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
    }
  }, [stage]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        {stage === "hero" && <QuizForm onComplete={handleQuizComplete} />}
        {stage === "loading" && <TransitionLoader onDone={() => setStage("result")} />}
        {(stage === "result" || stage === "plans") && (
          <div ref={resultRef}>
            <Result onContinue={() => setStage("plans")} />
          </div>
        )}
        {stage === "plans" && (
          <div ref={plansRef}>
            <Plans />
          </div>
        )}
        <SocialProof />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
