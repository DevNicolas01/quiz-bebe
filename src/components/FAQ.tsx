import { useState } from 'react'

const faqs = [
  {
    q: 'Funciona para bebês de qualquer idade?',
    a: 'Sim! O método se adapta à faixa etária do seu bebê, desde recém-nascidos até os 2 anos, com orientações específicas para cada fase de desenvolvimento.',
  },
  {
    q: 'Preciso deixar meu bebê chorar sozinho?',
    a: 'Não. O método é gentil e acolhedor, sem técnicas de choro prolongado (cry it out). Você acompanha seu bebê em cada etapa da adaptação.',
  },
  {
    q: 'Quanto tempo leva para ver resultado?',
    a: 'A maioria das famílias percebe melhora já nos primeiros 3 a 5 dias seguindo o cronograma. O plano completo é de 7 dias.',
  },
  {
    q: 'E se eu não gostar do método?',
    a: 'Você tem garantia incondicional de 7 dias. Se não funcionar para o seu bebê, devolvemos 100% do valor, sem perguntas.',
  },
  {
    q: 'Como recebo o material?',
    a: 'O acesso é liberado imediatamente após a confirmação do pagamento, direto no seu e-mail e em uma área de membros online.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="space-y-2.5">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i
        return (
          <div key={faq.q} className="bg-white border border-lav-100 rounded-2xl overflow-hidden">
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-center justify-between px-5 py-4 text-left"
            >
              <span className="font-medium text-lav-900 text-sm pr-4">{faq.q}</span>
              <span className={`text-lav-400 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-45' : ''}`}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M9 3v12M3 9h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </span>
            </button>
            {isOpen && (
              <p className="px-5 pb-4 text-lav-500 text-sm leading-relaxed animate-in">
                {faq.a}
              </p>
            )}
          </div>
        )
      })}
    </div>
  )
}
