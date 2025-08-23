import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Linking,
} from 'react-native';
import { colors } from '../../../../../theme/colors';
import appUrls from '../../../../../utils/appUrls';

function VisitUs() {
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Visit Us</Text>

            <View>
                <Text style={styles.label}>Time of Service:</Text>
                <Text style={styles.value}>Sundays at 14:00 (2 pm)</Text>

                <Text style={styles.label}>Location:</Text>
                <Text style={styles.value}>
                    Herbigstraße 18-20, 50825 Cologne
                </Text>
            </View>

            <TouchableOpacity
                onPress={() => Linking.openURL(appUrls.IBC)}
                style={styles.visitWebsiteTouchable}
            >
                <Text style={styles.touchableText}>Visit our website</Text>
            </TouchableOpacity>
        </View>
    );
}
export default VisitUs;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        marginHorizontal: 10,
        borderWidth: 1,
        borderColor: colors.petrolBlue,
        borderRadius: 20,
    },
    heading: {
        fontSize: 24,
        fontWeight: '700',
        color: colors.lightPetrolBlue,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.lightPetrolBlue,
        marginTop: 10,
    },
    value: {
        fontSize: 18,
        marginTop: 2,
    },
    visitWebsiteTouchable: {
        padding: 12,
        marginTop: 12,
        borderWidth: 1,
        borderRadius: 12,
        borderColor: colors.petrolBlue,
    },
    touchableText: {
        color: colors.petrolBlue,
    },
});
