import { View, Text, StyleSheet } from 'react-native';
import getAdjacentSundays from '../../../../../functions/getAdjacentSundays';
import FontAwesome from '@react-native-vector-icons/fontawesome';
import formatFirebaseDate from '../../../../../functions/database/formatFirebaseDate';
import useStyle from '../../../../../hooks/useStyle';
import useColorMap from '../../../../../hooks/useColorMap';
import resourcesStorage from '../../../../../storage/resourcesStorage';
import { Timestamp } from '@react-native-firebase/firestore';

interface VerseViewCardProps {
    bgColor: string;
    direction: 'left' | 'right';
    sunday: 'Previous' | 'Next';
    passage: string | undefined;
    date?: Timestamp;
    style: Record<string, string | number | Record<string, string | number>>;
}

function VerseViewer() {
    const { passages } = resourcesStorage();
    const colorMap = useColorMap();
    const generateStyle = useStyle();

    const labelStyle = generateStyle(
        'fontXS',
        'flexRow',
        'itemsCenter',
        'primary',
        'bgTransparent',
    );

    const dateStyle = generateStyle('fontS', 'weight600', 'bgTransparent');
    const headerStyle = {
        ...generateStyle(
            'fontXL',
            'bold',
            'flexRow',
            'itemsCenter',
            'bgTransparent',
        ),
        padding: 16,
    };

    const { prev, next } = getAdjacentSundays(passages);

    const createVerseView = (props: VerseViewCardProps) => {
        return (
            <View
                style={{
                    ...props.style,
                    backgroundColor: props.bgColor,
                }}
            >
                <View style={styles.card}>
                    <Text style={labelStyle}>
                        <FontAwesome
                            name={`arrow-${props.direction}`}
                            size={16}
                            color={colorMap.secondary}
                        />{' '}
                        {props.sunday} Sunday
                    </Text>
                    <Text style={dateStyle}>
                        {props.date ? formatFirebaseDate(props.date) : 'N/A'}
                    </Text>
                    <Text style={generateStyle('fontM', 'bgTransparent')}>
                        {props.passage ?? 'N/A'}
                    </Text>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={headerStyle}>
                <FontAwesome name="book" size={24} color={colorMap.primary} />{' '}
                Sunday Bible Passages
            </Text>

            {createVerseView({
                bgColor: colorMap.lightGray,
                direction: 'left',
                passage: prev?.passage,
                date: prev?.date,
                sunday: 'Previous',
                style: styles.frameLeft,
            })}

            {createVerseView({
                bgColor: colorMap.darkGray,
                direction: 'right',
                passage: next?.passage,
                date: next?.date,
                sunday: 'Next',
                style: styles.frameRight,
            })}
        </View>
    );
}

export default VerseViewer;

const styles = StyleSheet.create({
    container: {
        padding: 16,
        flex: 1,
    },
    card: {
        padding: 16,
        elevation: 3,
        gap: 4,
    },
    frameLeft: {
        alignSelf: 'flex-start',
        width: '90%',
        borderRadius: 8,
        marginBottom: 12,
        padding: 4,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: -2, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    frameRight: {
        alignSelf: 'flex-end',
        alignItems: 'flex-start',
        width: '90%',
        borderRadius: 8,
        marginBottom: 12,
        padding: 4,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
});
