import { View, Text, StyleSheet } from 'react-native';
import getAdjacentSundays from '../../../../../functions/getAdjacentSundays';
import FontAwesome from '@react-native-vector-icons/fontawesome';
import { colors } from '../../../../../theme/colors';

function VerseViewer() {
    const { prev, next } = getAdjacentSundays();

    return (
        <View style={styles.container}>
            <Text style={styles.header}>
                <FontAwesome name="book" size={24} color={colors.petrolBlue} />{' '}
                Sunday Bible Passages
            </Text>

            {prev && (
                <View style={styles.card}>
                    <Text style={styles.label}>
                        <FontAwesome
                            name="arrow-left"
                            size={16}
                            color={colors.lightPetrolBlue}
                        />{' '}
                        Previous Sunday
                    </Text>
                    <Text style={styles.date}>{prev.date.toDateString()}</Text>
                    <Text style={styles.passage}>{prev.passage}</Text>
                </View>
            )}

            {next && (
                <View style={styles.card}>
                    <Text style={styles.label}>
                        Next Sunday{' '}
                        <FontAwesome
                            name="arrow-right"
                            size={16}
                            color={colors.lightPetrolBlue}
                        />
                    </Text>
                    <Text style={styles.date}>{next.date.toDateString()}</Text>
                    <Text style={styles.passage}>{next.passage}</Text>
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
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    card: {
        padding: 16,
        elevation: 3,
    },
    label: {
        fontSize: 14,
        color: colors.petrolBlue,
        marginBottom: 4,
        flexDirection: 'row',
        alignItems: 'center',
    },
    date: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
    },
    passage: {
        fontSize: 18,
    },
});
