import { useColorScheme } from 'react-native';
import { Color, colors } from '../theme/colors';

export interface IAppColors {
    primary: Color;
    secondary: Color;
    third: Color;
    color: Color;
    bgColor: Color;
}

const useColorMap = (): IAppColors => {
    const scheme = useColorScheme();
    const isDark = scheme !== 'light';

    if (isDark) {
        return {
            primary: colors.petrolBlue,
            secondary: colors.lightPetrolBlue,
            third: colors.darkKhaki,
            color: colors.black,
            bgColor: colors.white100,
        } as IAppColors;
    } else {
        return {
            primary: colors.white50,
            secondary: colors.turquoise,
            third: colors.darkKhaki,
            color: colors.white100,
            bgColor: colors.black,
        } as IAppColors;
    }
};

export default useColorMap;
