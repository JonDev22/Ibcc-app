import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Timestamp } from '@react-native-firebase/firestore';
import Separator from '../../../../../functions/Separator';
import useStyle from '../../../../../hooks/useStyle';
import useColorMap from '../../../../../hooks/useColorMap';
import formatFirebaseDate from '../../../../../functions/database/formatFirebaseDate';
import FontAwesome from '@react-native-vector-icons/fontawesome';

interface VerseViewCardProps {
    direction: 'left' | 'right';
    sunday: 'Previous' | 'Next';
    passage: string | undefined;
    date?: Timestamp;
    isPrimary?: boolean;
}

function VerseViewerSection(props: VerseViewCardProps) {
    const generateStyle = useStyle();
    const colorMap = useColorMap();

    const badgeTextStyle = generateStyle(
        'fontXS',
        'weight600',
        'bgTransparent',
    );

    const labelStyle = generateStyle(
        'fontXS',
        'flexRow',
        'itemsCenter',
        'primary',
        'bgTransparent',
    );

    const isPrimary = props.isPrimary ?? false;

    return (
        <View
            style={[
                styles.cardWrapper,
                isPrimary ? styles.cardPrimary : styles.cardSecondary,
            ]}
        >
            {/* Badge indicator */}
            <View style={styles.badge}>
                <FontAwesome
                    name={props.direction === 'left' ? 'history' : 'forward'}
                    size={15}
                    color={colorMap.secondary}
                />
                <Text style={badgeTextStyle}>{props.sunday}</Text>
            </View>

            {/* Main content */}
            <View style={styles.cardContent}>
                {/* Date */}
                <Text style={[styles.dateText, { color: colorMap.primary }]}>
                    {props.date ? formatFirebaseDate(props.date) : 'Date N/A'}
                </Text>

                <Separator />

                {/* Passage text */}
                <Text style={labelStyle} numberOfLines={3}>
                    {props.passage ?? 'Passage N/A'}
                </Text>
            </View>

            {/* Accent line on the side */}
            <View
                style={[
                    styles.accentLine,
                    {
                        backgroundColor: isPrimary
                            ? colorMap.secondary
                            : colorMap.primary,
                    },
                ]}
            />
        </View>
    );
}

export default VerseViewerSection;

const styles = StyleSheet.create({
    accentLine: {
        width: 4,
        height: '100%',
        position: 'absolute',
        right: 0,
    },
    cardWrapper: {
        borderRadius: 16,
        overflow: 'hidden',
        flexDirection: 'row',
        alignItems: 'center',
        // elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.12,
        shadowRadius: 8,
    },
    cardPrimary: {
        // backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E8E8E8',
    },
    cardSecondary: {
        // backgroundColor: '#FAFAFA',
        borderWidth: 1,
        borderColor: '#F0F0F0',
    },
    dateText: {
        fontSize: 13,
        fontWeight: '600',
        letterSpacing: 0.3,
    },
    cardContent: {
        flex: 1,
        paddingVertical: 16,
        paddingHorizontal: 16,
        paddingRight: 12,
    },
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 20,
        marginLeft: 12,
        gap: 6,
        width: 100,
    },
});
