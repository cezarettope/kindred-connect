import amanda from "@/assets/amanda.jpeg";

const ExpertSection = () => {
  return (
    <section className="bg-background py-12 md:py-16">
      <div className="container max-w-5xl">
        <div className="grid items-center gap-8 rounded-3xl border border-border bg-card p-6 shadow-card md:grid-cols-[260px_1fr] md:p-10">
          <div className="mx-auto md:mx-0">
            <div className="relative">
              <div className="absolute inset-0 -z-10 rounded-full bg-gradient-cta blur-2xl opacity-30" />
              <img
                src={amanda}
                alt="Amanda Albuquerque, especialista no Protocolo Termo Hormonal"
                className="h-48 w-48 rounded-full object-cover ring-4 ring-primary/20 md:h-60 md:w-60"
                loading="lazy"
              />
            </div>
          </div>
          <div className="text-center md:text-left">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
              ⭐ Sua mentora
            </div>
            <h3 className="text-2xl font-extrabold tracking-tight md:text-3xl">
              Amanda Albuquerque
            </h3>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground md:text-lg">
              Especialista no <strong className="text-foreground">Protocolo Termo Hormonal</strong>,
              responsável por ajudar milhares de pessoas a destravarem o emagrecimento desde{" "}
              <strong className="text-foreground">2017</strong>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpertSection;
