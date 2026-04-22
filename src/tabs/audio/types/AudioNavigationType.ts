import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AudioNavigationParamList } from './AudioNavigationParamList';

export type AudioNavigationType<T extends keyof AudioNavigationParamList> =
    NativeStackNavigationProp<AudioNavigationParamList, T>;
