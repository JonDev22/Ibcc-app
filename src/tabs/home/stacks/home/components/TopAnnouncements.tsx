import FontAwesome from '@react-native-vector-icons/fontawesome';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeNavigationParamList } from '../../../types/navigationTypes';
import { useNavigation } from '@react-navigation/native';
import useStyle from '../../../../../hooks/useStyle';
import useColorMap from '../../../../../hooks/useColorMap';
import resourcesStorage from '../../../../../storage/resourcesStorage';
import Spacer from '../../../../../components/Spacer';

type NavigationProps = NativeStackNavigationProp<
    HomeNavigationParamList,
    'Upcoming Events'
>;

function TopAnnouncements() {
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
    const titleStyle = generateStyle('fontM', 'weight600', 'bgTransparent');
    const descriptionStyle = generateStyle(
        'fontXS',
        'secondary',
        'bgTransparent',
        'wMarginM',
    );
    const infoTextStyle = generateStyle('fontXS', 'secondary', 'bgTransparent');

    const { announcements } = resourcesStorage();

    return (
        <View style={{ backgroundColor: colorMap.bgColor, flex: 1 }}>
            <View
                style={{
                    ...headerContainerStyle,
                    backgroundColor: colorMap.bgColor,
                }}
            >
                <FontAwesome
                    name="bullhorn"
                    size={22}
                    color={colorMap.primary}
                />
                <Text style={headerTextStyle}>Announcements</Text>
            </View>

            <View style={{ paddingHorizontal: 10 }}>
                <FlatList
                    data={announcements
                        .sort(
                            (a, b) =>
                                b.date.toDate().getTime() -
                                a.date.toDate().getTime(),
                        )
                        .slice(0, 2)}
                    keyExtractor={item => item.id}
                    scrollEnabled={false}
                    ItemSeparatorComponent={() =>  <Spacer />}
                    renderItem={({ item }) => (
                        <View
                            style={{
                                ...cardStyle,
                                borderColor: colorMap.lightGray,
                                backgroundColor: colorMap.bgColor,
                            }}
                        >
                            <View style={{ flex: 1 }}>
                                <Text style={titleStyle}>{item.title}</Text>

                                {item.disclaimer && (
                                    <Text style={descriptionStyle}>
                                        {item.disclaimer}
                                    </Text>
                                )}
                            </View>
                        </View>
                    )}
                />
            </View>

            <TouchableOpacity
                onPress={() => navigation.navigate('Announcements')}
                activeOpacity={0.7}
            >
                <View
                    style={{
                        ...headerContainerStyle,
                        alignSelf: 'center',
                    }}
                >
                    <Text style={infoTextStyle}>See More Announcements</Text>
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

export default TopAnnouncements;
