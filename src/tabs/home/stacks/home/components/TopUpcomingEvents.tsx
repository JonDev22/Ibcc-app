import FontAwesome from '@react-native-vector-icons/fontawesome';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeNavigationParamList } from '../../../types/navigationTypes';
import { useNavigation } from '@react-navigation/native';
import useStyle from '../../../../../hooks/useStyle';
import useColorMap from '../../../../../hooks/useColorMap';
import resourcesStorage from '../../../../../storage/resourcesStorage';
import Spacer from '../../../../../components/Spacer';
import { getMonthAbbreviation } from '../../../../../constants/months';

type NavigationProps = NativeStackNavigationProp<
    HomeNavigationParamList,
    'Upcoming Events'
>;

function TopUpcomingEvents() {
    const navigation = useNavigation<NavigationProps>();

    const colorMap = useColorMap();
    const generateStyle = useStyle();

    const headerContainerStyle = generateStyle(
        'flexRow',
        'itemsCenter',
        'gap2',
        'wPadding3XL',
        'hPadding3XL',
    );
    const headerTextStyle = generateStyle(
        'fontXL',
        'weight700',
        'primary',
        'flex1',
    );
    const cardStyle = generateStyle(
        'flexRow',
        'gap3',
        'wPadding3XL',
        'hPadding3XL',
        'border1',
        'itemsStart',
        'rounded6',
    );
    const dateBoxStyle = generateStyle(
        'itemsCenter',
        'justifyCenter',
        'wAuto',
        'hAuto',
        'rounded4',
        'wPadding2XL',
        'hPadding2XL',
    );
    const monthStyle = generateStyle(
        'fontXS',
        'weight700',
        'primary',
        'bgTransparent',
    );
    const dayStyle = generateStyle(
        'fontL',
        'weight700',
        'primary',
        'bgTransparent',
    );
    const titleStyle = generateStyle('fontM', 'weight600', 'bgTransparent');
    const descriptionStyle = generateStyle(
        'fontXS',
        'secondary',
        'bgTransparent',
        'wMarginM',
    );
    const infoBadgeStyle = generateStyle(
        'flexRow',
        'itemsCenter',
        'gap1',
        'bgTransparent',
    );
    const infoTextStyle = generateStyle('fontXS', 'secondary', 'bgTransparent');

    const { events } = resourcesStorage();

    return (
        <View style={{ backgroundColor: colorMap.bgColor, flex: 1 }}>
            <View
                style={{
                    ...headerContainerStyle,
                    backgroundColor: colorMap.bgColor,
                }}
            >
                <FontAwesome
                    name="calendar"
                    size={22}
                    color={colorMap.primary}
                />
                <Text style={headerTextStyle}>Upcoming Events</Text>
            </View>

            <View style={{ paddingHorizontal: 10 }}>
                <FlatList
                    data={events.slice(0, 2)}
                    keyExtractor={item => item.id}
                    scrollEnabled={false}
                    ItemSeparatorComponent={() => <Spacer />}
                    renderItem={({ item }) => (
                        <View
                            style={{
                                ...cardStyle,
                                borderColor: colorMap.lightGray,
                                backgroundColor: colorMap.bgColor,
                            }}
                        >
                            <View
                                style={{
                                    ...dateBoxStyle,
                                    backgroundColor: colorMap.lightGray,
                                }}
                            >
                                <Text style={monthStyle}>
                                    {getMonthAbbreviation(
                                        item.date.toDate().getUTCMonth(),
                                    )}
                                </Text>
                                <Text style={dayStyle}>
                                    {item.date.toDate().getUTCDate()}
                                </Text>
                            </View>

                            <View style={{ flex: 1 }}>
                                <Text style={titleStyle}>{item.title}</Text>

                                {item.details && (
                                    <Text style={descriptionStyle}>
                                        {item.text}
                                    </Text>
                                )}

                                <View
                                    style={generateStyle(
                                        'flexRow',
                                        'itemsCenter',
                                        'gap4',
                                        'wMarginM',
                                    )}
                                >
                                    <View style={infoBadgeStyle}>
                                        <FontAwesome
                                            name="clock-o"
                                            size={12}
                                            color={colorMap.third}
                                        />
                                        <Text style={infoTextStyle}>
                                            {item.date
                                                .toDate()
                                                .toLocaleTimeString('en-US', {
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                })}
                                        </Text>
                                    </View>

                                    <View style={infoBadgeStyle}>
                                        <FontAwesome
                                            name="map-pin"
                                            size={13}
                                            color={colorMap.third}
                                        />
                                        <Text style={infoTextStyle}>
                                            {item.location}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    )}
                />
            </View>

            <TouchableOpacity
                onPress={() => navigation.navigate('Upcoming Events')}
                activeOpacity={0.7}
            >
                <View
                    style={{
                        ...headerContainerStyle,
                        alignSelf: 'center',
                    }}
                >
                    <Text style={infoTextStyle}>See More Events</Text>
                    <FontAwesome
                        name="chevron-right"
                        size={12}
                        color={colorMap.primary}
                    />
                </View>
            </TouchableOpacity>
        </View>
    );
}

export default TopUpcomingEvents;
