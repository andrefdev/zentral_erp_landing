/**
 * Locale-agnostic question schema for the Zentral waitlist.
 *
 * Question ids, option ids, weights, and scoring functions live here.
 * Labels / titles / help text come from i18n at render time.
 *
 * Edit this file to add or remove questions; messages/{en,es}.json must
 * mirror the same ids under `waitlist.questions.<id>`.
 */

export type QuestionKind = 'single' | 'multi' | 'slider' | 'card';

interface ChoiceConfig { id: string; weight?: number }
interface CardConfig { id: string }

interface SingleConfig {
  id: string;
  kind: 'single';
  options: ChoiceConfig[];
}
interface MultiConfig {
  id: string;
  kind: 'multi';
  options: ChoiceConfig[];
  scoreFn: (ids: string[]) => number;
}
interface SliderConfig {
  id: string;
  kind: 'slider';
  min: number; max: number; step: number; defaultValue: number;
  ticks: string[];
  scoreFn: (v: number) => number;
}
interface CardListConfig {
  id: string;
  kind: 'card';
  options: CardConfig[];
}

export type QuestionConfig = SingleConfig | MultiConfig | SliderConfig | CardListConfig;

export const WAITLIST_QUESTIONS: QuestionConfig[] = [
  {
    id: 'company-size',
    kind: 'single',
    options: [
      { id: 'micro',  weight: 1 },
      { id: 'small',  weight: 2 },
      { id: 'medium', weight: 3 },
      { id: 'large',  weight: 3 },
      { id: 'solo',   weight: 0 },
    ],
  },
  {
    id: 'operations',
    kind: 'single',
    options: [
      { id: 'odoo-sap',  weight: 3 },
      { id: 'specialized', weight: 3 },
      { id: 'spreadsheets', weight: 2 },
      { id: 'whatsapp-drive', weight: 2 },
      { id: 'nothing', weight: 1 },
    ],
  },
  {
    id: 'monthly-invoices',
    kind: 'slider',
    min: 0, max: 500, step: 10, defaultValue: 50,
    ticks: ['0', '125', '250', '375', '500+'],
    scoreFn: (v) => (v >= 200 ? 3 : v >= 75 ? 2 : v >= 20 ? 1 : 0),
  },
  {
    id: 'current-tools',
    kind: 'multi',
    options: [
      { id: 'excel' }, { id: 'whatsapp' }, { id: 'drive' },
      { id: 'crm' }, { id: 'erp' }, { id: 'accounting' }, { id: 'nothing' },
    ],
    scoreFn: (arr) => {
      if (arr.includes('erp') || arr.includes('crm')) return 3;
      if (arr.includes('accounting')) return 2;
      if (arr.length >= 2 && !arr.includes('nothing')) return 1;
      return 0;
    },
  },
  {
    id: 'biggest-pain',
    kind: 'single',
    options: [
      { id: 'data-entry',     weight: 3 },
      { id: 'lost-leads',     weight: 3 },
      { id: 'no-visibility',  weight: 3 },
      { id: 'sunat',          weight: 2 },
      { id: 'tools-broken',   weight: 2 },
    ],
  },
  {
    id: 'budget',
    kind: 'single',
    options: [
      { id: 'free',  weight: 0 },
      { id: '50',    weight: 1 },
      { id: '100',   weight: 2 },
      { id: '200',   weight: 3 },
      { id: '300',   weight: 3 },
    ],
  },
  {
    id: 'priority-module',
    kind: 'card',
    options: [
      { id: 'erp' }, { id: 'crm' }, { id: 'suite' }, { id: 'finance' },
    ],
  },
];
