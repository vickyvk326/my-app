import { TransactionCategory } from '@/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

export type Transaction = {
  id: string;
  accountId: string;
  title: string;
  category: TransactionCategory;
  amount: number;
  date: string;
  note?: string;
};

type TransactionsState = {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
  removeTransaction: (id: string) => void;
  clear: () => void;
};

const mockTransactions: Transaction[] = [
  {
    id: 'txn-1',
    accountId: 'acc-bank-1',
    title: 'Monthly Salary',
    category: 'salary',
    amount: 65000,
    date: '2026-07-01T09:00:00.000Z',
  },
  {
    id: 'txn-2',
    accountId: 'acc-bank-1',
    title: 'Rent Payment',
    category: 'housing',
    amount: -18000,
    date: '2026-07-02T10:30:00.000Z',
  },
  {
    id: 'txn-3',
    accountId: 'acc-purse-1',
    title: 'Grocery Store',
    category: 'groceries',
    amount: -2450.5,
    date: '2026-07-03T17:15:00.000Z',
  },
  {
    id: 'txn-4',
    accountId: 'acc-bank-1',
    title: 'Electricity Bill',
    category: 'utilities',
    amount: -1875,
    date: '2026-07-03T20:00:00.000Z',
  },
  {
    id: 'txn-5',
    accountId: 'acc-purse-1',
    title: 'Dinner with Friends',
    category: 'dining',
    amount: -1200,
    date: '2026-07-05T21:45:00.000Z',
  },
  {
    id: 'txn-6',
    accountId: 'acc-demat-1',
    title: 'Mutual Fund SIP',
    category: 'investment',
    amount: -5000,
    date: '2026-07-05T08:00:00.000Z',
  },
  {
    id: 'txn-7',
    accountId: 'acc-bank-1',
    title: 'Netflix Subscription',
    category: 'subscriptions',
    amount: -649,
    date: '2026-07-06T00:05:00.000Z',
  },
  {
    id: 'txn-8',
    accountId: 'acc-purse-1',
    title: 'Cab Ride',
    category: 'transportation',
    amount: -340,
    date: '2026-07-07T13:20:00.000Z',
  },
  {
    id: 'txn-9',
    accountId: 'acc-bank-1',
    title: 'Freelance Project Payout',
    category: 'refund',
    amount: 12000,
    date: '2026-07-07T15:00:00.000Z',
  },
  {
    id: 'txn-10',
    accountId: 'acc-purse-1',
    title: 'Movie Tickets',
    category: 'entertainment',
    amount: -600,
    date: '2026-07-08T19:30:00.000Z',
  },
];

export const useTransactionsStore = create<TransactionsState>()(
  persist(
    (set) => ({
      transactions: mockTransactions,
      addTransaction: (transaction) =>
        set((state) => ({
          transactions: [
            ...state.transactions,
            { ...transaction, id: uuidv4(), date: new Date().toISOString() },
          ],
        })),
      removeTransaction: (id) =>
        set((state) => ({ transactions: state.transactions.filter((t) => t.id !== id) })),
      clear: () => set({ transactions: [] }),
    }),
    {
      name: 'transactions-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
