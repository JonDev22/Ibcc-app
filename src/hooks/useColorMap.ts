import { StyleSheet, useColorScheme, StyleProp, ViewStyle } from 'react-native';
import { Color, colors } from '../theme/colors';

export interface IAppColors {
    primary: Color;
    secondary: Color;
    third: Color;
    style: { [key: string]: StyleProp<ViewStyle> };
    bgColor: { [key: string]: string };
}

const useColorMap = (): IAppColors => {
    const scheme = useColorScheme();
    const isDark = scheme === 'light';

    if (isDark) {
        return {
            primary: colors.orange,
            secondary: colors.petrolBlue,
            third: colors.darkKhaki,
            style: mainStyle,
            bgColor: { backgroundColor: 'white' },
        } as IAppColors;
    } else {
        return {
            primary: colors.petrolBlue,
            secondary: colors.orange,
            third: colors.darkKhaki,
            style: mainStyleDark,
            bgColor: { backgroundColor: 'black' },
        } as IAppColors;
    }
};

export default useColorMap;

const mainStyle = StyleSheet.create({
    header: {
        padding: 10,
    },
});

const mainStyleDark = StyleSheet.create({
    headerBlack: {
        ...mainStyle.header,
        color: 'black',
    },
});
