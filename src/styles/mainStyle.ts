import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

export const mainStyles = StyleSheet.create({
    circleIcon: {
        borderRadius: 100,
        backgroundColor: colors.petrolBlue,
        color: colors.white100,
        fontSize: 20,
        width: 40,
        height: 40,
        textAlign: 'center',
        lineHeight: 40,
    },
});
