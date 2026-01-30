import { View, Text, StyleSheet } from 'react-native';
import getAdjacentSundays from '../../../../../functions/getAdjacentSundays';
import FontAwesome from '@react-native-vector-icons/fontawesome';
import formatFirebaseDate from '../../../../../functions/database/formatFirebaseDate';
import useStyle from '../../../../../hooks/useStyle';
import useColorMap from '../../../../../hooks/useColorMap';
import resourcesStorage from '../../../../../storage/resourcesStorage';
import { Timestamp } from '@react-native-firebase/firestore';
import Separator from '../../../../../functions/Separator';

interface VerseViewCardProps {
    direction: 'left' | 'right';
    sunday: 'Previous' | 'Next';
    passage: string | undefined;
    date?: Timestamp;
    isPrimary?: boolean;
}

function VerseViewer() {
    const { passages } = resourcesStorage();
    const colorMap = useColorMap();
    const generateStyle = useStyle();

    const { prev, next } = getAdjacentSundays(passages);

    const headerStyle = generateStyle(
        'fontM',
        'bold',
        'flexRow',
        'itemsCenter',
        'primary',
        'bgTransparent',
    );

    const labelStyle = generateStyle(
        'fontXS',
        'flexRow',
        'itemsCenter',
        'primary',
        'bgTransparent',
    );

    const badgeTextStyle = generateStyle(
        'fontXS',
        'weight600',
        'bgTransparent',
    );

    const createVerseView = (props: VerseViewCardProps) => {
        const isPrimary = props.sunday === 'Next';
        const isSecondary = !isPrimary;

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
                        name={
                            props.direction === 'left' ? 'history' : 'forward'
                        }
                        size={15}
                        color={colorMap.secondary}
                    />
                    <Text style={badgeTextStyle}>{props.sunday}</Text>
                </View>

                {/* Main content */}
                <View style={styles.cardContent}>
                    {/* Date */}
                    <Text
                        style={[styles.dateText, { color: colorMap.primary }]}
                    >
                        {props.date
                            ? formatFirebaseDate(props.date)
                            : 'Date N/A'}
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
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerIcon}>
                    <FontAwesome
                        name="book"
                        size={20}
                        color={colorMap.secondary}
                    />
                </View>
                <View>
                    <Text style={headerStyle}>This Week's Passages</Text>
                    <Text style={labelStyle}>Reflect on Scripture</Text>
                </View>
            </View>

            {/* Cards container */}
            <View style={styles.cardsContainer}>
                {createVerseView({
                    direction: 'left',
                    passage: prev?.passage,
                    date: prev?.date,
                    sunday: 'Previous',
                })}

                {createVerseView({
                    direction: 'right',
                    passage: next?.passage,
                    date: next?.date,
                    sunday: 'Next',
                })}
            </View>
        </View>
    );
}

export default VerseViewer;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingVertical: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
        gap: 12,
    },
    headerIcon: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardsContainer: {
        gap: 16,
    },
    cardWrapper: {
        borderRadius: 16,
        overflow: 'hidden',
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 4,
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
    accentLine: {
        width: 4,
        height: '100%',
        position: 'absolute',
        right: 0,
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
    badgeText: {
        fontSize: 11,
        fontWeight: '600',
        letterSpacing: 0.2,
    },
    dateText: {
        fontSize: 13,
        fontWeight: '600',
        letterSpacing: 0.3,
    },
});
