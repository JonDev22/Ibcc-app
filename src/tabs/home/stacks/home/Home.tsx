import { FlatList, ScrollView } from 'react-native';
import type { FontAwesomeIconName } from '@react-native-vector-icons/fontawesome';
import VerseViewer from './components/VerseViewer';
import TopUpcomingEvents from './components/TopUpcomingEvents';
import { HomeNavigationType } from '../../types/homeNavigationProp';
import { useNavigation } from '@react-navigation/native';
import OnlineResources from './components/OnlineResources';
import InfoCard from '../../../../components/InfoCard';

function Home() {
    const navigation = useNavigation<HomeNavigationType<'Ministries'>>();

    const homeData = [
        {
            image: 'comments',
            header: 'Lifegroups',
            text: 'Every week we meet in lifegroups to enjoy fellowship as God`s people',
            navigation: () => navigation.navigate('Lifegroups'),
        },
        {
            image: 'group',
            header: 'Ministries',
            text: 'Theres is plenty of opportunity for you to serve your local church. Check out our ministries.',
            navigation: () => navigation.navigate('Ministries'),
        },
        {
            image: 'handshake-o',
            header: 'Our Elders and deacons',
            text: 'These are our leaders. They will be able to help you with any question, concern, or anything you need.',
            navigation: () => navigation.navigate('Leaders'),
        },
    ];

    return (
        <ScrollView>
            <VerseViewer />

            <TopUpcomingEvents />

            <FlatList
                data={homeData}
                keyExtractor={item => item.header}
                scrollEnabled={false}
                renderItem={({ item }) => (
                    <InfoCard
                        image={item.image as FontAwesomeIconName}
                        header={item.header}
                        text={item.text}
                        onPress={item.navigation}
                    />
                )}
            />

            <OnlineResources />
        </ScrollView>
    );
}

export default Home;
