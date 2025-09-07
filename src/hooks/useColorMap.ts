import { Color, colors } from '../theme/colors';
import { ResourceContext } from '../contexts/ResourceContext';
import { use, useMemo } from 'react';

export interface IAppColors {
    primary: Color;
    secondary: Color;
    third: Color;
    color: Color;
    bgColor: Color;
}

const useColorMap = (): IAppColors => {
    const { theme } = use(ResourceContext);
    const isDark = theme === 'dark';

    const colorMap = useMemo(() => {
        return isDark
            ? {
                  primary: colors.white50,
                  secondary: colors.turquoise,
                  third: colors.darkKhaki,
                  color: colors.white100,
                  bgColor: colors.black,
              }
            : {
                  primary: colors.petrolBlue,
                  secondary: colors.lightPetrolBlue,
                  third: colors.orange,
                  color: colors.black,
                  bgColor: colors.white100,
              };
    }, [isDark]);

    return colorMap as IAppColors;
};

export default useColorMap;
