import { useEffect, useState } from "react";
import { QuizQuestion } from "../data/quiz";
import ProgressBar from "./ProgressBar";
import { track } from "../lib/analytics";

interface QuizStepProps {
  question: QuizQuestion;
  stepIndex: number;
  totalSteps: number;
  onSelect: (optionId: string) => void;
  onBack?: () => void;
}

export default function QuizStep({
  question,
  stepIndex,
  totalSteps,
  onSelect,
  onBack,
}: QuizStepProps) {

  const [selected, setSelected] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);


  // ANALYTICS - visualização da pergunta
  useEffect(() => {
    track("quiz_step_view", {
      step: stepIndex + 1,
      questionId: question.id,
    });
  }, [stepIndex, question.id]);


  const handleSelect = (id: string) => {

    setSelected(id);


    // FEEDBACK EMOCIONAL
    const emotionalFeedback: Record<string, string> = {

      "0-3m": "Essa fase realmente é mais intensa mesmo 💙",
      "4-6m": "Muitos bebês passam por isso nessa idade…",
      "7-12m": "Essa fase costuma bagunçar bastante o sono 😴",
      "1-2a": "Essa transição costuma ser desafiadora mesmo",
      "2a+": "Ainda dá pra ajustar o sono com pequenas mudanças",

      "0": "Que ótimo — isso já é um bom sinal 🙂",
      "1": "Bem comum nessa fase do desenvolvimento",
      "2": "Isso já indica um padrão de sono fragmentado",
      "3": "Isso pode estar te deixando muito exausta 😞",
      "4+": "Isso explica seu nível de cansaço atual 💔",

      berco: "Boa base — isso ajuda na rotina",
      cama: "Isso pode influenciar na autonomia do sono",
      colo: "Esse padrão costuma gerar mais dependência",

      adormecer: "Esse é um dos pontos mais comuns de dificuldade",
      manter: "Manter o sono é um desafio real para muitas mães",

    };


    const fb = emotionalFeedback[id];

    setFeedback(fb || null);


    // ANALYTICS - resposta selecionada
    track("quiz_answer", {
      step: stepIndex + 1,
      value: id,
      questionId: question.id,
    });


    // Pequeno delay para mostrar feedback
    setTimeout(() => {
      onSelect(id);
    }, 250);

  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E0F2FE] via-[#F8FAFC] to-[#EDE9FE]">

      <div className="max-w-xl mx-auto px-6 py-10 animate-in">


        <ProgressBar
          current={stepIndex + 1}
          total={totalSteps}
          onBack={onBack}
        />


        {/* PERGUNTA */}
        <h1 className="font-display text-3xl font-semibold text-slate-900 mb-2">
          {question.question}
        </h1>


        {question.subtext && (
          <p className="text-sm text-slate-500 mb-2">
            {question.subtext}
          </p>
        )}


        {/* MICROCOPY */}
        <p className="text-xs text-slate-400 mb-6">
          Não existe resposta certa — só queremos entender sua rotina 💙
        </p>



        {/* FEEDBACK */}
        {feedback && (
          <div className="
            mb-5
            p-3
            bg-blue-50
            border
            border-blue-100
            rounded-xl
            text-sm
            text-blue-700
            animate-in
          ">
            {feedback}
          </div>
        )}



        {/* OPÇÕES */}
        <div className="space-y-3">

          {question.options.map((opt) => {

            const isSelected = selected === opt.id;


            return (

              <button
                key={opt.id}
                onClick={() => handleSelect(opt.id)}
                className={`
                  w-full
                  bg-white
                  border
                  rounded-2xl
                  px-5
                  py-4
                  flex
                  items-center
                  justify-between
                  transition-all
                  hover:shadow-lg
                  hover:scale-[1.02]
                  active:scale-95

                  ${
                    isSelected
                      ? "border-blue-500 shadow-md shadow-blue-100"
                      : "border-slate-100"
                  }
                `}
              >


                <span className="flex items-center gap-3">

                  {opt.icon && (
                    <span className="
                      w-9
                      h-9
                      bg-slate-50
                      rounded-full
                      flex
                      items-center
                      justify-center
                    ">
                      {opt.icon}
                    </span>
                  )}


                  <span className="
                    font-medium
                    text-slate-900
                    text-[15px]
                  ">
                    {opt.label}
                  </span>


                </span>



                <span
                  className={`
                    w-5
                    h-5
                    rounded-full
                    border-2
                    transition

                    ${
                      isSelected
                        ? "bg-blue-500 border-blue-500"
                        : "border-slate-300"
                    }
                  `}
                />


              </button>

            );

          })}

        </div>


      </div>

    </div>
  );
}