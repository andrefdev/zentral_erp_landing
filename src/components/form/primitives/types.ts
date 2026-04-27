export type TitlePart = string | { grad: string };

export interface ChoiceOption {
  id: string;
  label: string;
  weight?: number;
}

export interface CardOption {
  id: string;
  name: string;
  meta?: string;
}

export interface BaseQuestion {
  id: string;
  eyebrow: string;
  title: TitlePart[];
  help?: string;
}

export interface SingleQuestion extends BaseQuestion {
  kind: 'single';
  options: ChoiceOption[];
}

export interface MultiQuestion extends BaseQuestion {
  kind: 'multi';
  options: ChoiceOption[];
  scoreFn?: (ids: string[]) => number;
}

export interface SliderQuestion extends BaseQuestion {
  kind: 'slider';
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  unit: string;
  ticks: string[];
  scoreFn?: (v: number) => number;
}

export interface CardQuestion extends BaseQuestion {
  kind: 'card';
  options: CardOption[];
}

export type Question = SingleQuestion | MultiQuestion | SliderQuestion | CardQuestion;

export type AnswerValue = string | string[] | number | undefined;
export type AnswerMap = Record<string, AnswerValue>;

export type Verdict = 'high' | 'mid' | 'fit';
