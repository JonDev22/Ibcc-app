import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
    FontAwesome,
    FontAwesomeIconName,
} from '@react-native-vector-icons/fontawesome';
import { colors } from '../../../../theme/colors';

interface InfoCardProps {
    title: string;
    header: string;
    text: string;
    icon: string;
    navigation: () => void;
}

function ResourceCard(props: InfoCardProps) {
    return (
        <View style={styles.container}>
            <View style={styles.headerView}>
                <FontAwesome
                    name={props.icon as FontAwesomeIconName}
                    size={20}
                    style={styles.iconCircle}
                />
                <Text>{props.title}</Text>
            </View>
            <Text style={styles.contentTitle}>{props.header}</Text>
            <Text numberOfLines={3} style={styles.contentText}>
                {props.text}
            </Text>
            <TouchableOpacity
                onPress={props.navigation}
                style={styles.bottomButton}
            >
                <Text style={styles.pressableText}>Learn more</Text>
            </TouchableOpacity>
        </View>
    );
}

export default ResourceCard;

const styles = StyleSheet.create({
    container: {
        margin: 8,
        borderRadius: 10,
        borderColor: colors.petrolBlue,
        borderStyle: 'solid',
        borderWidth: 0.2,

        padding: 24,
        display: 'flex',
        gap: 8,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    headerView: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    iconCircle: {
        fontSize: 28,
        color: colors.petrolBlue,
    },
    contentTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    contentText: { textAlign: 'justify', fontSize: 15 },
    bottomButton: {
        backgroundColor: colors.petrolBlue,
        padding: 8,
        marginTop: 5,
        width: '100%',
        alignItems: 'center',
    },
    pressableText: {
        color: colors.white100,
    },
});
