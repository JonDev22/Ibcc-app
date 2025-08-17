import { ScrollView } from 'react-native';
import InfoCard from './components/InfoCard';
import type { FontAwesomeIconName } from '@react-native-vector-icons/fontawesome';
import VerseViewer from './components/VerseViewer';
import TopUpcomingEvents from './components/TopUpcomingEvents';
// import fetchFileFromStorage from '../../../../functions/fetchFileFromStorage';
// import getCollectionData from '../../../../functions/getCollectionData';
// import { Linking } from 'react-native';

function Home() {
    // const fetchData = () => {
    //     getCollectionData('audios').then(res => {
    //         if (res) {
    //             console.log(res);
    //         } else {
    //             console.error('Error');
    //         }
    //     });
    // };

    // const fetchDocFromStorage = async () => {
    //     const url = await fetchFileFromStorage('audios/rainbow_song.aac');
    //     console.log(url);
    //     if (url) {
    //         Linking.openURL(url);
    //     }
    // };

    return (
        <ScrollView>
            {/* <Button onPress={() => fetchData()} title="Fetchifetch" />
            <Button onPress={fetchDocFromStorage} title="Fetch Audio" /> */}
            {/* Verse of the week and following week. */}
            <VerseViewer />

            <TopUpcomingEvents />

            {/* <Button
                onPress={() => navigation.navigate('Upcoming Events')}
                title="Push Me"
            /> */}
            {homeData.map(item => (
                <InfoCard
                    key={item.header}
                    image={item.image as FontAwesomeIconName}
                    header={item.header}
                    text={item.text}
                />
            ))}
        </ScrollView>
    );
}

export default Home;

const homeData = [
    {
        image: 'comments',
        header: 'Lifegroups',
        text: 'Every week we meet in lifegroups to enjoy fellowship as God`s people',
    },
    {
        image: 'book',
        header: 'Study Resources',
        text: 'We offer a great variety of study guides that encourage growth into Christ.',
    },
    {
        image: 'book',
        header: 'Ministries',
        text: 'Theres is plenty of opportunity for you to serve your local church. Check out our ministries.',
    },
    {
        image: 'book',
        header: 'What we believe',
        text: 'Ever wondered what we as a church believe? Click here to find out!',
    },
    {
        image: 'book',
        header: 'Our Elders and deacons',
        text: 'These are our leaders. They will be able to help you with any question, concern, or anything you need.',
    },
];
