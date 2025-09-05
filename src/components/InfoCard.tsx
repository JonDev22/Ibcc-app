import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import FontAwesome, {
    FontAwesomeIconName,
} from '@react-native-vector-icons/fontawesome';
import { mainStyles } from '../styles/mainStyle';
import { colors } from '../theme/colors';
import useStyle from '../hooks/useStyle';
import useColorMap from '../hooks/useColorMap';

interface InfoCardProps {
    image: FontAwesomeIconName;
    header: string;
    text: string;
    onPress: () => void;
    headerLeft?: boolean;
    buttonText?: string;
}

function InfoCard(props: InfoCardProps) {
    const colorMap = useColorMap();
    const generateStyle = useStyle();

    const containerStyle = generateStyle(
        'wPadding3XL',
        'hPadding3XL',
        'gap7',
        'justifyBetween',
        'itemsCenter',
        'border1',
        'rounded3',
        'borderPrimary',
    );
    const headerTextLeft = generateStyle('bold');
    const contentTitle = generateStyle(
        'fontXL',
        'weight700',
        'textCenter',
        'primary',
    );
    const contentText = generateStyle('fontS', 'textJustify', 'hMarginS');

    const getHeader = () => {
        if (props.headerLeft) {
            return (
                <View style={styles.headerLeftView}>
                    <FontAwesome
                        name={props.image}
                        size={20}
                        style={styles.biggerIcon}
                        color={colorMap.primary}
                    />
                    <Text style={headerTextLeft}>{props.header}</Text>
                </View>
            );
        } else {
            return (
                <>
                    <FontAwesome
                        name={props.image}
                        size={30}
                        style={mainStyles.circleIcon}
                        color={colorMap.primary}
                    />
                    <Text style={contentTitle}>{props.header}</Text>
                </>
            );
        }
    };

    return (
        <View style={containerStyle}>
            {getHeader()}

            <Text style={contentText}>{props.text}</Text>

            <TouchableOpacity style={styles.button} onPress={props.onPress}>
                <Text style={styles.buttonText}>
                    {props.buttonText ?? 'Learn More'}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

export default InfoCard;

const styles = StyleSheet.create({
    container: {
        margin: 8,
        borderRadius: 12,
        borderColor: colors.petrolBlue,
        borderWidth: 0.5,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 8,
    },
    headerLeftView: {
        alignSelf: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
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
    biggerIcon: {
        fontSize: 24,
    },
    headerLeftText: {
        fontWeight: 'bold',
    },
});
