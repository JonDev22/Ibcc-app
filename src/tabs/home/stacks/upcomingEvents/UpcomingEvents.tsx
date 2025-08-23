import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { IEvent } from '../../../../interfaces/IEvent';
import EventsDisplayCard from './EventsDisplayCard';
import Separator from '../../../../functions/Separator';
import { Timestamp } from '@react-native-firebase/firestore';

// Filter and sort upcoming events
const getUpcomingEvents = (allEvents: IEvent[], today = new Date()) => {
    return (
        allEvents
            // .filter(e => e.date >= today)
            .sort((a, b) => (a.date < b.date ? -1 : 1))
    );
};

function UpcomingEventsList() {
    const upcoming = getUpcomingEvents(events);

    return (
        <View style={styles.container}>
            <FlatList
                data={upcoming}
                keyExtractor={item => item.date.toDate().toDateString()}
                renderItem={({ item }) => <EventsDisplayCard {...item} />}
                ItemSeparatorComponent={Separator}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#F9FAFB',
        flex: 1,
    },
});

export default UpcomingEventsList;

const events: IEvent[] = [
    {
        date: Timestamp.fromDate(new Date('2024-08-31')),
        title: 'Community Meal',
        text: 'Community Meal with IBC Cologne, AIC and IGK.',
        location: 'IBC Cologne',
        details:
            'As the church plant in Aachen grows, it is finally time to commit and send the team officially to reach the city of Aachen. Therefore, we use the community meal to celebrate church multiplication. Part of the team and therefore which we will officially be sending is our Pastor David Martin, Lucas Santos and the Barretos.',
        contact: 'Jonny',
    },
    {
        date: Timestamp.fromDate(new Date('2024-09-13')),
        title: 'Renovation Part I',
        text: 'Renovation of the new church building in Herbigstraße.',
        location: 'IBC Cologne',
        details:
            'Our host church has kindly offered us a room we will be able to use. To be able to offer it as a cosy, and welcoming room, it needs some renovation. We will be painting the walls, cleaning the floors, and setting up furniture. No special skills are required, just a willingness to help out. We will provide all the materials needed.',
        contact: 'Wurstmann',
    },
    {
        date: Timestamp.fromDate(new Date('2024-09-14')),
        title: 'Baptism',
        text: 'Making a faithful and public commitment to Jesus Christ.',
        location: 'IBC Cologne',
        details:
            'Excitingly, we will be baptizing in our church. As always, baptism is a reason to celebrate as Christ in His sovereign Grace leads another soul to Himself. If you are interested in being baptized, please contact us at!',
        contact: 'Klaus',
    },
    {
        date: Timestamp.fromDate(new Date('2024-09-27')),
        title: 'Renovation Part II',
        text: 'Renovation of the new church building in Herbigstraße.',
        location: 'IBC Cologne',
        details:
            'Our host church has kindly offered us a room we will be able to use. To be able to offer it as a cosy, and welcoming room, it needs some renovation. We will be painting the walls, cleaning the floors, and setting up furniture. No special skills are required, just a willingness to help out. We will provide all the materials needed.',
        contact: 'Den Mann vorne an der Tür',
    },
    {
        date: Timestamp.fromDate(new Date('2024-10-12')),
        title: 'AGM',
        text: 'Mark the date! Our autumn AGM is coming up.',
        location: 'IBC Cologne',
        details:
            'The autumn AGM is coming up. We will be discussing the church plant in Aachen, the renovation of the new church building in Herbigstraße, and other important topics. Please make sure to attend and bring your questions and suggestions. As always, we will be welcoming new members.',
        contact: 'Rumpel',
    },
];
