import { View, Text, StyleSheet } from 'react-native';
import getAdjacentSundays from '../../../../../functions/getAdjacentSundays';
import FontAwesome from '@react-native-vector-icons/fontawesome';
import { use } from 'react';
import { ResourceContext } from '../../../../../contexts/ResourceContext';
import formatFirebaseDate from '../../../../../functions/formatFirebaseDate';
import useStyle from '../../../../../hooks/useStyle';
import useColorMap from '../../../../../hooks/useColorMap';

function VerseViewer() {
    const { passages } = use(ResourceContext);
    const colorMap = useColorMap();
    const generateStyle = useStyle();

    const labelStyle = generateStyle(
        'fontXS',
        'flexRow',
        'itemsCenter',
        'primary',
    );

    const dateStyle = generateStyle('fontS', 'weight600');
    const headerStyle = {
        ...generateStyle('fontXL', 'bold', 'flexRow', 'itemsCenter'),
        padding: 16,
    };

    const { prev, next } = getAdjacentSundays(passages);

    return (
        <View style={styles.container}>
            <Text style={headerStyle}>
                <FontAwesome name="book" size={24} color={colorMap.primary} />{' '}
                Sunday Bible Passages
            </Text>

            {prev && (
                <View style={styles.card}>
                    <Text style={labelStyle}>
                        <FontAwesome
                            name="arrow-left"
                            size={16}
                            color={colorMap.secondary}
                        />{' '}
                        Previous Sunday
                    </Text>
                    <Text style={dateStyle}>
                        {formatFirebaseDate(prev.date)}
                    </Text>
                    <Text style={generateStyle('fontM')}>{prev.passage}</Text>
                </View>
            )}

            {next && (
                <View style={styles.card}>
                    <Text style={labelStyle}>
                        Next Sunday{' '}
                        <FontAwesome
                            name="arrow-right"
                            size={16}
                            color={colorMap.secondary}
                        />
                    </Text>
                    <Text style={dateStyle}>
                        {formatFirebaseDate(next.date)}
                    </Text>
                    <Text style={generateStyle('fontM')}>{next.passage}</Text>
                </View>
            )}
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
});
