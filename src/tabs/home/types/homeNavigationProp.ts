import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeNavigationParamList } from './navigationTypes';

export type HomeNavigationType<T extends keyof HomeNavigationParamList> =
    NativeStackNavigationProp<HomeNavigationParamList, T>;
