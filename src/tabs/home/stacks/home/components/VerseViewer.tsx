import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import getAdjacentSundays from '../../../../../functions/getAdjacentSundays';
import FontAwesome from '@react-native-vector-icons/fontawesome';
import { use } from 'react';
import { ResourceContext } from '../../../../../contexts/ResourceContext';
import formatFirebaseDate from '../../../../../functions/database/formatFirebaseDate';
import useStyle from '../../../../../hooks/useStyle';
import useColorMap from '../../../../../hooks/useColorMap';

function VerseViewer() {
    const { passages } = use(ResourceContext);
    const colorMap = useColorMap();
    const generateStyle = useStyle();
    const scheme = useColorScheme();

    const bgLeft = scheme === 'light' ? '#e0e0e0' : '#2e2e2e';
    const bgRight = scheme === 'light' ? '#e0e0e0' : '#2e2e2e';

    console.log('A');

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

    return (
        <View style={styles.container}>
            <Text style={headerStyle}>
                <FontAwesome name="book" size={24} color={colorMap.primary} />{' '}
                Sunday Bible Passages
            </Text>

            {prev && (
                <View
                    style={{
                        ...styles.frameLeft,
                        backgroundColor: bgLeft,
                    }}
                >
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
                        <Text style={generateStyle('fontM', 'bgTransparent')}>
                            {prev.passage}
                        </Text>
                    </View>
                </View>
            )}

            {next && (
                <View
                    style={{
                        ...styles.frameRight,
                        backgroundColor: bgRight,
                    }}
                >
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
                        <Text style={generateStyle('fontM', 'bgTransparent')}>
                            {next.passage}
                        </Text>
                    </View>
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
