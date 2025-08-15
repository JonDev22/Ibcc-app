import { useColorScheme } from 'react-native';
import { Color, colors } from '../theme/colors';

export interface IAppColors {
    primary: Color;
    secondary: Color;
    third: Color;
}

const useColorMap = (): IAppColors => {
    const isDark = useColorScheme();

    if (isDark) {
        return {
            primary: colors.orange,
            secondary: colors.petrolBlue,
            third: colors.darkKhaki,
        } as IAppColors;
    } else {
        return {
            primary: colors.petrolBlue,
            secondary: colors.orange,
            third: colors.darkKhaki,
        } as IAppColors;
    }
};

export default useColorMap;
