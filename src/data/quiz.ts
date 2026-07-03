export interface QuizOption {
  id: string
  label: string
  icon?: string
}

export interface QuizQuestion {
  id: string
  question: string
  options: QuizOption[]
}

export interface QuizQuestion {
  id: string
  question: string
  subtext?: string
  options: QuizOption[]
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'idade',
    question: 'Qual a idade do bebê?',
    subtext: 'Leva menos de 1 minuto para personalizar o resultado',
    options: [
      { id: '0-3m', label: '0 - 3 meses', icon: '👶' },
      { id: '4-6m', label: '4 - 6 meses', icon: '🍼' },
      { id: '7-12m', label: '7 - 12 meses', icon: '🧸' },
      { id: '1-2a', label: '1 - 2 anos', icon: '🚼' },
      { id: '2a+', label: '2+ anos', icon: '🧒' },
    ],
  },
  {
    id: 'acordar',
    question: 'Quantas vezes o bebê acorda por noite?',
    subtext: 'Em poucos passos você vai entender o padrão de sono',
    options: [
      { id: '0', label: 'Nenhuma vez' },
      { id: '1', label: '1 vez' },
      { id: '2', label: '2 vezes' },
      { id: '3', label: '3 vezes' },
      { id: '4+', label: '4 ou mais' },
    ],
  },
  {
    id: 'onde-dorme',
    question: 'Onde o bebê dorme hoje?',
    subtext: 'Isso ajuda a entender a rotina atual do sono',
    options: [
      { id: 'berco', label: 'No berço', icon: '🛏️' },
      { id: 'cama', label: 'Na cama', icon: '🌙' },
      { id: 'colo', label: 'No colo', icon: '🤱' },
    ],
  },
  {
    id: 'desafio',
    question: 'Qual o maior desafio hoje?',
    subtext: 'Essa resposta define o resultado personalizado',
    options: [
      { id: 'adormecer', label: 'Fazer o bebê adormecer', icon: '🌙' },
      { id: 'manter', label: 'Manter o bebê dormindo', icon: '☀️' },
    ],
  },
]

export const idadeLabels: Record<string, string> = {
  '0-3m': '0-3m', '4-6m': '4-6m', '7-12m': '7-12m', '1-2a': '1-2a', '2a+': '2a+',
}
export const acordarLabels: Record<string, string> = {
  '0': 'Nenhuma', '1': '1x', '2': '2x', '3': '3x', '4+': '4+',
}
export const ondeLabels: Record<string, string> = {
  berco: 'Berço', cama: 'Cama', colo: 'Colo',
}
export const desafioLabels: Record<string, string> = {
  adormecer: 'Adormecer', manter: 'Manter dormindo',
}

