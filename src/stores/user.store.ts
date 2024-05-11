import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  user: false,
};

const useUserStore = create(
  persist(
    set => ({
      ...initialState,
      setUser: (user: boolean) => set({user}),
      logout: () => set({user: false}),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default useUserStore;
