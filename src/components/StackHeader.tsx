import {
    Image,
    Linking,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import Logo from '../assets/IBCC_Logo-icon-square.jpg';
import { mainStyles } from '../styles/mainStyle';
import { colors } from '../theme/colors';
import appUrls from '../utils/appUrls';
import useStyle from '../hooks/useStyle';

function StackHeader({}) {
    const generateStyle = useStyle();

    const containerStyle = generateStyle(
        'flexRow',
        'itemsCenter',
        'justifyBetween',
        'hPaddingL',
    );

    return (
        <View style={containerStyle}>
            <TouchableOpacity
                style={styles.imageContainer}
                onPress={() => Linking.openURL(appUrls.IBC)}
            >
                <Image
                    source={Logo}
                    style={{ ...mainStyles.circleIcon, ...styles.imageStyle }}
                />
            </TouchableOpacity>
        </View>
    );
}

export default StackHeader;

const styles = StyleSheet.create({
    imageContainer: {
        flexDirection: 'row',
        marginLeft: 'auto',
        alignItems: 'center',
        gap: 10,
    },
    imageStyle: { borderWidth: 1, borderColor: colors.petrolBlue },
    textStyle: { fontSize: 18, fontWeight: 'bold' },
});
