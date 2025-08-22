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

function StackHeader({}) {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.imageContainer}
                onPress={() => Linking.openURL('https://www.ibc-cologne.com')}
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
    container: {
        // width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    imageContainer: {
        flexDirection: 'row',
        marginLeft: 'auto',
        alignItems: 'center',
        gap: 10,
    },
    imageStyle: { borderWidth: 1, borderColor: colors.petrolBlue },
    textStyle: { fontSize: 18, fontWeight: 'bold' },
});
