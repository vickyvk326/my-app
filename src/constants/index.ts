export const TRANSACTION_CATEGORIES = [
  // Income
  'salary',
  'freelance',
  'business',
  'investment',
  'gift_received',
  'refund',

  // Expenses
  'groceries',
  'dining',
  'transportation',
  'housing',
  'utilities',
  'shopping',
  'healthcare',
  'education',
  'entertainment',
  'travel',
  'subscriptions',
  'insurance',
  'personal_care',
  'taxes',
  'gifts',
  'charity',
  'fees',

  // Transfers
  'transfer',

  // Fallback
  'other',
] as const;

export type TransactionCategory = (typeof TRANSACTION_CATEGORIES)[number];

export const currencyCodeMap = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  AUD: '$',
  CAD: '$',
  CHF: 'CHF',
  CNY: '¥',
  JPY: '¥',
  KRW: '₩',
  MXN: '$',
  RUB: '₽',
  SEK: 'kr',
  TRY: '₺',
  ZAR: 'R',
  INR: '₹',
  BRL: 'R$',
} as const;

export const currencyCodes = Object.keys(currencyCodeMap);
export const currencySymbols = Object.values(currencyCodeMap);

export type CurrencyCodeType = keyof typeof currencyCodeMap;
export type CurrencySymbolType = (typeof currencyCodeMap)[CurrencyCodeType];
