import { ScrollView, StyleSheet, View } from 'react-native';
import VerseViewer from './components/VerseViewer';
import TopUpcomingEvents from './components/TopUpcomingEvents';
import OnlineResources from './components/OnlineResources';
import VisitUs from './components/VisitUs';
import InfoCard from '../../../../components/InfoCard';
import { useNavigation } from '@react-navigation/native';
import { HomeNavigationType } from '../../types/homeNavigationProp';

function Home() {
    const navigate = useNavigation<HomeNavigationType<'Announcements'>>();
    return (
        <ScrollView>
            <VerseViewer />

            <TopUpcomingEvents />

            <InfoCard
                image="bullhorn"
                text="Be part of the journey — explore the newest updates and announcements from our church family."
                onPress={() => navigate.navigate('Announcements')}
                header="Announcements"
                headerLeft
                buttonText="See announcements"
            />

            <OnlineResources />

            <VisitUs />

            <View style={styles.breather} />
        </ScrollView>
    );
}

export default Home;

const styles = StyleSheet.create({
    breather: {
        height: 30,
    },
});
