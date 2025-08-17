import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ResourceNavigationParamList } from './navigationTypes';

export type NavigationType<T extends keyof ResourceNavigationParamList> =
    NativeStackNavigationProp<ResourceNavigationParamList, T>;
