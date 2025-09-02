import useColorMap from './useColorMap';

const useStyle = () => {
    const colorMap = useColorMap();

    const stylePresets: Record<string, Record<string, string | number>> = {
        bold: { fontWeight: 'bold' },
        weight500: { fontWeight: '500' },
        weight600: { fontWeight: '600' },
        weight700: { fontWeight: '700' },

        fontXs: { fontSize: 14 },
        fontS: { fontSize: 16 },
        fontM: { fontSize: 18 },
        fontL: { fontSize: 20 },
        fontXL: { fontSize: 22 },
        font2XL: { fontSize: 30 },

        flexRow: { flexDirection: 'row' },

        itemsCenter: { alignItems: 'center' },
        itemsStart: { alignItems: 'start' },

        textCenter: { textAlign: 'center' },
        textJustify: { textAlign: 'justify' },
        textLeft: { textAlign: 'left' },
        textRight: { textAlign: 'right' },

        hPaddingS: { paddingHorizontal: 2 },
        hPaddingM: { paddingHorizontal: 4 },
        hPaddingL: { paddingHorizontal: 6 },
        hPaddingXL: { paddingHorizontal: 8 },
        hPadding2XL: { paddingHorizontal: 10 },
        hPadding3XL: { paddingHorizontal: 12 },

        wPaddingS: { paddingVertical: 2 },
        wPaddingM: { paddingVertical: 4 },
        wPaddingL: { paddingVertical: 6 },
        wPaddingXL: { paddingVertical: 8 },
        wPadding2XL: { paddingVertical: 10 },
        wPadding3XL: { paddingVertical: 12 },

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

        primary: { color: colorMap.primary },
        secondary: { color: colorMap.secondary },
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
