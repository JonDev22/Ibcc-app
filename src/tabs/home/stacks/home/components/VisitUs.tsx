import React from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import appUrls from '../../../../../utils/appUrls';
import useStyle from '../../../../../hooks/useStyle';
import Spacer from '../../../../../components/Spacer';
import resourcesStorage from '../../../../../storage/resourcesStorage';
import FontAwesome from '@react-native-vector-icons/fontawesome';
import useColorMap from '../../../../../hooks/useColorMap';

function VisitUs() {
    const { serviceInformation } = resourcesStorage();
    const colors = useColorMap();
    const generateStyle = useStyle();

    const containerStyle = generateStyle(
        'flex',
        'itemsCenter',
        'border1',
        'borderPrimary',
        'wPadding3XL',
        'hPadding4XL',
        'hMargin3XL',
        'rounded6',
    );
    const headingStyle = generateStyle(
        'fontXL',
        'weight700',
        'secondary',
        'textLeft',
        'bgTransparent',
    );
    const valueStyle = generateStyle('fontS', 'wMarginS', 'bgTransparent');
    const touchableStyle = generateStyle('bgTransparent');
    const touchableText = generateStyle('primary', 'bgTransparent', 'fontS', 'pb1');
    const viewStyle = generateStyle(
        'flexRow',
        'itemsCenter',
        'gap2',
        'itemsCenter',
        'bgTransparent',
    );

    return (
        <View style={{ ...containerStyle, backgroundColor: '#f1f1f1' }}>
            <View style={{ alignSelf: 'flex-start', paddingTop: 10 }}>
                <Text style={headingStyle}>IBC Cologne</Text>
                <Text
                    style={{
                        ...valueStyle,
                        fontSize: 16,
                        color: colors.secondary,
                        fontStyle: 'italic',
                    }}
                >
                    Join our services
                </Text>
            </View>

            <View style={{ alignSelf: 'flex-start' }}>
                <Spacer />

                <View style={viewStyle}>
                    <FontAwesome
                        name="clock-o"
                        size={13}
                        color={colors.third}
                    />
                    <Text style={valueStyle}>
                        {serviceInformation?.time ?? 'N/A'}
                    </Text>
                </View>

                <View style={viewStyle}>
                    <FontAwesome
                        name="map-marker"
                        size={17}
                        color={colors.third}
                    />
                    <Text style={valueStyle}>
                        {serviceInformation?.location ?? 'N/A'}
                    </Text>
                </View>
            </View>

            <Spacer />
            <TouchableOpacity
                onPress={() => Linking.openURL(appUrls.IBC)}
                style={{ ...touchableStyle, alignSelf: 'flex-start' }}
            >
                <View style={viewStyle}>
                    <Text style={touchableText}>Visit our website</Text>
                    <FontAwesome
                        name="chevron-right"
                        size={12}
                        color={colors.third}
                    />
                </View>
            </TouchableOpacity>
        </View>
    );
}
export default VisitUs;
