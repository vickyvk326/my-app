import { CurrencyCodeType } from '@/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type AccountType = {
  id: string;
  name: string;
  balance: number;
  type: 'purse' | 'bank' | 'demat';
  addedDate: string;
};

export type SettingsType = {
  systemSettings: {
    theme: 'light' | 'dark';
    currency: CurrencyCodeType;
    isBiometricEnabled: boolean;
  };
  personalSettings: {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
  };
  accountsSettings: {
    accounts: AccountType[];
  };
  financeSettings: {
    monthlyBudget: number;
  };
};

const defaultSettings: SettingsType = {
  systemSettings: {
    theme: 'light',
    currency: 'INR',
    isBiometricEnabled: false,
  },
  personalSettings: {
    firstName: 'Aanya',
    lastName: 'Kapoor',
    dateOfBirth: new Date().toISOString(),
  },
  accountsSettings: {
    accounts: [
      {
        id: 'acc-purse-1',
        name: 'Cash Wallet',
        balance: 2500,
        type: 'purse',
        addedDate: '2026-01-05T00:00:00.000Z',
      },
      {
        id: 'acc-bank-1',
        name: 'HDFC Savings',
        balance: 84250.75,
        type: 'bank',
        addedDate: '2026-01-05T00:00:00.000Z',
      },
      {
        id: 'acc-demat-1',
        name: 'Zerodha Demat',
        balance: 152300.5,
        type: 'demat',
        addedDate: '2026-02-12T00:00:00.000Z',
      },
    ],
  },
  financeSettings: {
    monthlyBudget: 30000,
  },
};

type SettingsState = {
  settings: SettingsType;
  addAccount: (account: Omit<AccountType, 'id' | 'addedDate'>) => void;
  removeAccount: (id: string) => void;
  updatePersonalSettings: (personalSettings: Partial<SettingsType['personalSettings']>) => void;
  updateSystemSettings: (systemSettings: Partial<SettingsType['systemSettings']>) => void;
  resetToDefault: () => void;
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      settings: defaultSettings,
      resetToDefault: () => set({ settings: defaultSettings }),
      addAccount: (account) =>
        set((state) => ({
          settings: {
            ...state.settings,
            accountsSettings: {
              ...state.settings.accountsSettings,
              accounts: [
                ...state.settings.accountsSettings.accounts,
                { ...account, id: uuidv4(), addedDate: new Date().toISOString() },
              ],
            },
          },
        })),
      removeAccount: (id) =>
        set((state) => ({
          settings: {
            ...state.settings,
            accountsSettings: {
              ...state.settings.accountsSettings,
              accounts: state.settings.accountsSettings.accounts.filter((a) => a.id !== id),
            },
          },
        })),
      updatePersonalSettings: (personalSettings) =>
        set((state) => ({
          settings: {
            ...state.settings,
            personalSettings: { ...state.settings.personalSettings, ...personalSettings },
          },
        })),
      updateSystemSettings: (systemSettings) =>
        set((state) => ({
          settings: {
            ...state.settings,
            systemSettings: { ...state.settings.systemSettings, ...systemSettings },
          },
        })),
    }),
    {
      name: 'settings-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
