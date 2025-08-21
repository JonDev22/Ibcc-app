import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import FontAwesome, {
    FontAwesomeIconName,
} from '@react-native-vector-icons/fontawesome';
import { colors } from '../../../../../theme/colors';
import { mainStyles } from '../../../../../styles/mainStyle';
import { useNavigation } from '@react-navigation/native';
import { HomeNavigationType } from '../../../types/homeNavigationProp';

interface InfoCardProps {
    image: FontAwesomeIconName;
    header: string;
    text: string;
    onPress?: () => void;
}

function InfoCard({ image, header, text, onPress }: InfoCardProps) {
    const navigation = useNavigation<HomeNavigationType<'Ministries'>>();
    return (
        <View style={styles.container}>
            <FontAwesome
                name={image}
                size={30}
                style={mainStyles.circleIcon}
                color={colors.petrolBlue}
            />
            <Text style={styles.contentTitle}>{header}</Text>
            <Text numberOfLines={2} style={styles.contentText}>
                {text}
            </Text>

            <TouchableOpacity
                style={styles.button}
                onPress={onPress ?? (() => navigation.navigate('Ministries'))}
            >
                <Text style={styles.buttonText}>Learn More</Text>
            </TouchableOpacity>
        </View>
    );
}

export default InfoCard;

const styles = StyleSheet.create({
    container: {
        margin: 8,
        borderRadius: 12,
        borderColor: colors.white50,
        borderWidth: 0.5,
        backgroundColor: colors.white100,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
        elevation: 3,
    },
    contentTitle: {
        fontSize: 20,
        fontWeight: '700',
        marginVertical: 8,
        textAlign: 'center',
        color: colors.petrolBlue,
    },
    contentText: {
        fontSize: 15,
        textAlign: 'center',
        marginBottom: 12,
    },
    button: {
        backgroundColor: colors.petrolBlue,
        paddingVertical: 12,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: colors.white100,
        fontSize: 16,
        fontWeight: '600',
    },
});
