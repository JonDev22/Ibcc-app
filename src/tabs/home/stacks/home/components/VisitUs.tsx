import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Linking,
} from 'react-native';
import appUrls from '../../../../../utils/appUrls';
import useStyle from '../../../../../hooks/useStyle';
import Spacer from '../../../../../components/Spacer';

function VisitUs() {
    const generateStyle = useStyle();

    const containerStyle = generateStyle(
        'flex',
        'itemsCenter',
        'border1',
        'borderPrimary',
        'wPadding3XL',
        'hPadding3XL',
        'hMargin3XL',
        'rounded6',
    );
    const headingStyle = generateStyle('fontXL', 'weight700', 'secondary');
    const labelStyle = generateStyle('fontM', 'weight600', 'secondary');
    const valueStyle = generateStyle('fontS', 'wMarginS');
    const touchableStyle = generateStyle(
        'wPadding3XL',
        'hPadding3XL',
        'border1',
        'rounded2',
        'borderPrimary',
    );
    const touchableText = generateStyle('primary');

    return (
        <View style={containerStyle}>
            <Text style={headingStyle}>Sunday Service</Text>

            <View>
                <Spacer />
                <Text style={labelStyle}>Time of Service:</Text>
                <Text style={valueStyle}>Sundays at 14:00 (2 pm)</Text>

                <Spacer />
                <Text style={labelStyle}>Location:</Text>
                <Text style={valueStyle}>
                    Herbigstraße 18-20, 50825 Cologne
                </Text>
            </View>

            <Spacer />
            <TouchableOpacity
                onPress={() => Linking.openURL(appUrls.IBC)}
                style={touchableStyle}
            >
                <Text style={touchableText}>Visit our website</Text>
            </TouchableOpacity>
        </View>
    );
}
export default VisitUs;

const styles = StyleSheet.create({});
