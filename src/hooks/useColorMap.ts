import { Color, colors } from '../theme/colors';
import { useMemo } from 'react';
import userSettings from '../storage/userSettings';

export interface IAppColors {
    primary: Color;
    secondary: Color;
    third: Color;
    color: Color;
    bgColor: Color;
    lightGray: string;
    darkGray: string;
}

const useColorMap = (): IAppColors => {
    const { theme } = userSettings();
    const isDark = theme === 'dark';

    const colorMap = useMemo(() => {
        return isDark
            ? {
                  primary: colors.white50,
                  secondary: colors.turquoise,
                  third: colors.darkKhaki,
                  color: colors.white100,
                  bgColor: colors.black,
                  lightGray: '#777777ff',
                  darkGray: '#3c3c3cff',
              }
            : {
                  primary: colors.petrolBlue,
                  secondary: colors.lightPetrolBlue,
                  third: colors.orange,
                  color: colors.black,
                  bgColor: colors.white100,
                  lightGray: '#d8d8d8ff',
                  darkGray: '#b6b6b6ff',
              };
    }, [isDark]);

    return colorMap as IAppColors;
};

export default useColorMap;
