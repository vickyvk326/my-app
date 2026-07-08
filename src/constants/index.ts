export const TRANSACTION_CATEGORIES = [
  // Income
  'salary',
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
  'taxes',
  'gifts',
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

export type CurrencyCodeType = keyof typeof currencyCodeMap;
export type CurrencySymbolType = (typeof currencyCodeMap)[CurrencyCodeType];

export const currencyCodes = Object.keys(currencyCodeMap) as CurrencyCodeType[];
export const currencySymbols = Object.values(currencyCodeMap) as CurrencySymbolType[];
