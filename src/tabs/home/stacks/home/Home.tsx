import { ScrollView, StyleSheet, View } from 'react-native';
import VerseViewer from './components/VerseViewer';
import TopUpcomingEvents from './components/TopUpcomingEvents';
import OnlineResources from './components/OnlineResources';
import VisitUs from './components/VisitUs';
import { useNavigation } from '@react-navigation/native';
import { HomeNavigationType } from '../../types/homeNavigationProp';
import useStyle from '../../../../hooks/useStyle';
import Spacer from '../../../../components/Spacer';
import TopAnnouncements from './components/TopAnnouncements';

function Home() {
    const navigate = useNavigation<HomeNavigationType<'Announcements'>>();

    const generateStyle = useStyle();

    return (
        <ScrollView style={generateStyle()}>
            <VerseViewer navigate={() => navigate.navigate('Passages')} />

            <Spacer />

            <TopUpcomingEvents />

            <Spacer />

            <TopAnnouncements />

            <Spacer />

            <VisitUs />

            <Spacer />

            <OnlineResources />

            <View style={styles.breather} />
        </ScrollView>
    );
}

export default Home;

const styles = StyleSheet.create({
    breather: {
        height: 30,
    },
    announcementView: {
        padding: 10,
    },
});
