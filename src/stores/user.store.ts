import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useMeterReadingStore from './meterReading.store';
import useMaintenanceStore from './maintenance.store';
import {clearUserSession} from '../utils/storage';
interface UserState {
  user: boolean;
  isMaintenance: boolean;
  isConnected: boolean | null;
  setUser: (user: boolean) => void;
  logout: () => void;
  setConnectionStatus: (isConnected: boolean) => void;
}

// Initial state
const initialState: Omit<
  UserState,
  'setUser' | 'logout' | 'setConnectionStatus'
> = {
  user: false,
  isMaintenance: true,
  isConnected: null,
};

const useUserStore = create<UserState>()(
  persist(
    set => ({
      ...initialState,
      setUser: (user: boolean) => set({user}),
      logout: async () => {
        useMeterReadingStore.getState().clearStore();
        useMaintenanceStore.getState().clearStore();
        await clearUserSession();
        set({user: false});
      },
      setConnectionStatus: (isConnected: boolean) => set({isConnected}),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default useUserStore;
