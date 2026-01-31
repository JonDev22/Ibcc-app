import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { IUser } from '../interfaces/IUser';

export type Theme = 'light' | 'dark';
export type Size = 'Small' | 'Medium' | 'Large';

interface IUserSettings {
    user: IUser | null;
    setUser: (user: IUser | null) => void;
    removeUser: () => void;
    theme: Theme;
    setTheme: (theme: Theme) => void;
    size: Size;
    setSize: (size: Size) => void;
}

const userSettings = create(
    persist<IUserSettings>(
        set => ({
            user: null,
            theme: 'light',
            size: 'Medium',
            setUser: (user: IUser | null) => {
                set({ user });
            },
            removeUser: () => {
                set({ user: null });
            },
            setTheme: (theme: Theme) => {
                set({ theme });
            },
            setSize: (size: Size) => {
                set({ size });
            },
        }),
        {
            name: 'settings-storage',
            storage: createJSONStorage(() => AsyncStorage),
        },
    ),
);

export default userSettings;
