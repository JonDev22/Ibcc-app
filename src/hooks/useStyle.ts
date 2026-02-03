import useColorMap from './useColorMap';
import userSettings from '../storage/userSettings';
import { colors } from '../theme/colors';

const useStyle = () => {
    const colorMap = useColorMap();
    const { size } = userSettings();

    const offset = size === 'Small' ? -3 : size === 'Large' ? 4 : 0;

    const stylePresets: Record<string, Record<string, string | number>> = {
        bold: { fontWeight: 'bold' },
        weight500: { fontWeight: '500' },
        weight600: { fontWeight: '600' },
        weight700: { fontWeight: '700' },

        fontXs: { fontSize: 14 + offset },
        fontS: { fontSize: 16 + offset },
        fontM: { fontSize: 18 + offset },
        fontL: { fontSize: 20 + offset },
        fontXL: { fontSize: 22 + offset },
        font2XL: { fontSize: 30 + offset },

        flex: { flex: 1 },
        flexRow: { flexDirection: 'row' },

        itemsCenter: { alignItems: 'center' },
        itemsStart: { alignItems: 'start' },

        textCenter: { textAlign: 'center' },
        textJustify: { textAlign: 'justify' },
        textLeft: { textAlign: 'left' },
        textRight: { textAlign: 'right' },

        textLine20: { lineHeight: 20 },

        justifyContentCenter: { justifyContent: 'center' },

        justifyBetween: { justifyContent: 'space-between' },

        hPaddingS: { paddingHorizontal: 2 },
        hPaddingM: { paddingHorizontal: 4 },
        hPaddingL: { paddingHorizontal: 6 },
        hPaddingXL: { paddingHorizontal: 8 },
        hPadding2XL: { paddingHorizontal: 10 },
        hPadding3XL: { paddingHorizontal: 12 },
        hPadding4XL: { paddingHorizontal: 16 },

        wPaddingS: { paddingVertical: 2 },
        wPaddingM: { paddingVertical: 4 },
        wPaddingL: { paddingVertical: 6 },
        wPaddingXL: { paddingVertical: 8 },
        wPadding2XL: { paddingVertical: 10 },
        wPadding3XL: { paddingVertical: 12 },
        wPadding4XL: { paddingVertical: 16 },

        hMarginS: { marginHorizontal: 2 },
        hMarginM: { marginHorizontal: 4 },
        hMarginL: { marginHorizontal: 6 },
        hMarginXL: { marginHorizontal: 8 },
        hMargin2XL: { marginHorizontal: 10 },
        hMargin3XL: { marginHorizontal: 12 },

        wMarginS: { marginVertical: 2 },
        wMarginM: { marginVertical: 4 },
        wMarginL: { marginVertical: 6 },
        wMarginXL: { marginVertical: 8 },
        wMargin2XL: { marginVertical: 10 },
        wMargin3XL: { marginVertical: 12 },

        border1: { borderWidth: 1 },
        border2: { borderWidth: 2 },
        border3: { borderWidth: 3 },

        rounded1: { borderRadius: 6 },
        rounded2: { borderRadius: 8 },
        rounded3: { borderRadius: 10 },
        rounded4: { borderRadius: 12 },
        rounded5: { borderRadius: 14 },
        rounded6: { borderRadius: 16 },
        rounded7: { borderRadius: 18 },
        rounded8: { borderRadius: 20 },
        roundedMax: { borderRadius: 100 },

        selfCenter: { alignSelf: 'center' },

        gap1: { gap: 4 },
        gap2: { gap: 6 },
        gap3: { gap: 8 },
        gap4: { gap: 10 },
        gap5: { gap: 12 },
        gap6: { gap: 14 },
        gap7: { gap: 16 },

        m1: { margin: 2 },
        m2: { margin: 4 },
        m3: { margin: 6 },
        m4: { margin: 8 },
        m5: { margin: 10 },

        p1: { padding: 2 },
        p2: { padding: 4 },
        p3: { padding: 6 },
        p4: { padding: 8 },
        p5: { padding: 10 },

        mb1: { marginBottom: 2 },
        mb2: { marginBottom: 4 },
        mb3: { marginBottom: 6 },
        mb4: { marginBottom: 8 },
        mb5: { marginBottom: 10 },

        pt1: { paddingTop: 2 },
        pt2: { paddingTop: 4 },
        pt3: { paddingTop: 6 },
        pt4: { paddingTop: 8 },
        pt5: { paddingTop: 10 },

        mt1: { marginTop: 2 },
        mt2: { marginTop: 4 },
        mt3: { marginTop: 6 },
        mt4: { marginTop: 8 },
        mt5: { marginTop: 10 },

        pb1: { paddingBottom: 2 },
        pb2: { paddingBottom: 4 },
        pb3: { paddingBottom: 6 },
        pb4: { paddingBottom: 8 },
        pb5: { paddingBottom: 10 },

        italic: { fontStyle: 'italic' },

        hMinMax: { minHeight: '100%' },

        borderPrimary: { borderColor: colorMap.primary },
        borderSecondary: { borderColor: colorMap.secondary },
        borderThird: { borderColor: colorMap.third },

        primary: { color: colorMap.primary },
        secondary: { color: colorMap.secondary },
        third: { color: colorMap.third },
        textWhite: { color: colors.white100 },

        bgTransparent: {
            backgroundColor: 'transparent',
        },
    };

    const generalPresets = {
        backgroundColor: colorMap.bgColor,
        color: colorMap.color,
    };

    const generateStyle = (...presets: string[]) => {
        const styles = presets.reduce((acc, preset) => {
            return { ...acc, ...stylePresets[preset] };
        }, {});

        return { ...generalPresets, ...styles };
    };

    return generateStyle;
};

export default useStyle;
