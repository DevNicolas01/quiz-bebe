import { createFileRoute, Link } from "@tanstack/react-router";
import { Lock, Shield, Check } from "lucide-react";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Método Sono Sereno" },
      { name: "description", content: "Finalize sua compra com segurança." },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  return (
    <div className="min-h-screen bg-background px-5 py-10">
      <div className="mx-auto max-w-xl">
        <Link
          to="/oferta"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← Voltar
        </Link>

        <div className="mt-4 rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-[0_10px_40px_-20px_rgba(80,60,120,0.25)]">
          <div className="flex items-center gap-2 text-xs font-semibold text-primary mb-3">
            <Lock className="h-3.5 w-3.5" /> PAGAMENTO SEGURO
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-card-foreground mb-2">
            Finalize seu pedido
          </h1>
          <p className="text-sm text-muted-foreground mb-6">
            Você está a um passo de noites mais tranquilas.
          </p>

          <div className="rounded-2xl bg-secondary/60 p-4 mb-6">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-muted-foreground">Método Sono Sereno</span>
              <span className="font-semibold text-foreground">R$ 47,00</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Suporte 30 dias</span>
              <span className="font-semibold text-primary">Grátis</span>
            </div>
            <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
              <span className="font-bold text-foreground">Total</span>
              <span className="font-bold text-foreground text-lg">R$ 47,00</span>
            </div>
          </div>

          <form className="space-y-4">
            <Field label="Seu nome" placeholder="Nome completo" />
            <Field label="E-mail" placeholder="seu@email.com" type="email" />
            <Field label="Número do cartão" placeholder="0000 0000 0000 0000" />
            <div className="grid grid-cols-2 gap-3">
              <Field label="Validade" placeholder="MM/AA" />
              <Field label="CVV" placeholder="123" />
            </div>

            <button
              type="button"
              className="w-full rounded-2xl bg-primary px-5 py-4 text-base font-bold text-primary-foreground shadow-sm hover:bg-primary/90 active:scale-[0.99] transition-all mt-2"
            >
              Finalizar compra — R$ 47,00
            </button>
          </form>

          <div className="mt-6 space-y-2">
            {[
              { icon: Shield, t: "Garantia de 7 dias ou seu dinheiro de volta" },
              { icon: Lock, t: "Ambiente 100% seguro e criptografado" },
              { icon: Check, t: "Acesso imediato após confirmação" },
            ].map(({ icon: Icon, t }) => (
              <div key={t} className="flex items-center gap-2 text-xs text-muted-foreground">
                <Icon className="h-4 w-4 text-primary" />
                <span>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold text-foreground mb-1.5">
        {label}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
      />
    </label>
  );
}
