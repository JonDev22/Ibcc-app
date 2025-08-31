import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ChurchNavigationParamList } from './churchNavigationTypes';

export type ChurchNavigationType<T extends keyof ChurchNavigationParamList> =
    NativeStackNavigationProp<ChurchNavigationParamList, T>;
