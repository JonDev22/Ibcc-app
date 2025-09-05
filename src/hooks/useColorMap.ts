import { Color, colors } from '../theme/colors';
import { ResourceContext } from '../contexts/ResourceContext';
import { use } from 'react';

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

    if (isDark) {
        return {
            primary: colors.white50,
            secondary: colors.turquoise,
            third: colors.darkKhaki,
            color: colors.white100,
            bgColor: colors.black,
        } as IAppColors;
    } else {
        return {
            primary: colors.petrolBlue,
            secondary: colors.lightPetrolBlue,
            third: colors.orange,
            color: colors.black,
            bgColor: colors.white100,
        } as IAppColors;
    }
};

export default useColorMap;
