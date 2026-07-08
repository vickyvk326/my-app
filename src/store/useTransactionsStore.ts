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
};

type TransactionsState = {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
  removeTransaction: (id: string) => void;
  clear: () => void;
};

export const useTransactionsStore = create<TransactionsState>()(
  persist(
    (set) => ({
      transactions: [],
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
