import { useNavigation } from '@react-navigation/native';
import { FlatList, View } from 'react-native';
import { ChurchNavigationType } from '../../types/churchNavigationProps';
import InfoCard from '../../../../components/InfoCard';
import { FontAwesomeIconName } from '@react-native-vector-icons/fontawesome';
import useStyle from '../../../../hooks/useStyle';
import Spacer from '../../../../components/Spacer';

function ChurchLifeHome() {
    const navigation = useNavigation<ChurchNavigationType<'Ministries'>>();

    const generateStyle = useStyle();

    const homeData = [
        {
            image: 'comments',
            header: 'Lifegroups',
            text: 'Our small group communities (Life Groups) meet weekly throughout the city to fellowship, pray, learn the word, and praise the Lord.',
            navigation: () => navigation.navigate('Lifegroups'),
        },
        {
            image: 'group',
            header: 'Ministries',
            text: "Most of the ministry of our church community is done by the unpaid members of our church. We are people called to offer their whole lives to participate in Jesus' mission.",
            navigation: () => navigation.navigate('Ministries'),
        },
        {
            image: 'handshake-o',
            header: 'Our Elders and deacons',
            text: 'We have a dedicated team of elders and deacons who faithfully serve in accordance with the qualifications outlined in 1 Timothy 3:1-13 and Titus 1:5-9',
            navigation: () => navigation.navigate('Leaders'),
        },
    ];

    const containerStyle = generateStyle('hMinMax', 'hPaddingM', 'wPaddingM');

    return (
        <View style={containerStyle}>
            <FlatList
                data={homeData}
                keyExtractor={item => item.header}
                renderItem={({ item }) => (
                    <InfoCard
                        image={item.image as FontAwesomeIconName}
                        header={item.header}
                        text={item.text}
                        onPress={item.navigation}
                    />
                )}
                ItemSeparatorComponent={Spacer}
            />
        </View>
    );
}

export default ChurchLifeHome;
