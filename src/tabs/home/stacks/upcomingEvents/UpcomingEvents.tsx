import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { IEvent } from '../../../../interfaces/IEvent';
import EventsDisplayCard from './EventsDisplayCard';
import Separator from '../../../../functions/Separator';

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
                keyExtractor={item => item.date.toDateString()}
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
        date: new Date('2024-01-01'),
        title: 'Baptism',
        text: 'Something is happening, you want to join!',
        location: 'ajhsdajkfh',
        details:
            'This is some more detail. Some auto generated text just to see, if details might be a good idea, or total crap. It sfaklfjdklsfjklsdfjslkdfjlskdflksdjfdlöfg ökldjglökdgnalöd gnlöd fgnd öjlfngakjd ngdkf gnkln gldjkfakdj nfgnajkdgn adljfgnan ajdgn',
    },
    {
        date: new Date('2024-02-14'),
        title: 'Valentine’s Day Dinner',
        text: 'Romantic evening with live music and a special menu.',
        location: 'Riverside Restaurant',
        details:
            'This is some more detail. Some auto generated text just to see, if details might be a good idea, or total crap. It sfaklfjdklsfjklsdfjslkdfjlskdflksdjfdlöfg ökldjglökdgnalöd gnlöd fgnd öjlfngakjd ngdkf gnkln gldjkfakdj nfgnajkdgn adljfgnan ajdgn',
    },
    {
        date: new Date('2024-03-10'),
        title: 'Spring Festival',
        text: 'Celebrate the arrival of spring with food, games, and music.',
        location: 'City Park',
        details:
            'This is some more detail. Some auto generated text just to see, if details might be a good idea, or total crap. It sfaklfjdklsfjklsdfjslkdfjlskdflksdjfdlöfg ökldjglökdgnalöd gnlöd fgnd öjlfngakjd ngdkf gnkln gldjkfakdj nfgnajkdgn adljfgnan ajdgn',
    },
    {
        date: new Date('2024-04-01'),
        title: 'Community Clean-Up',
        text: 'Join us to help clean and beautify our neighborhood.',
        location: 'Main Street Plaza',
        details:
            'This is some more detail. Some auto generated text just to see, if details might be a good idea, or total crap. It sfaklfjdklsfjklsdfjslkdfjlskdflksdjfdlöfg ökldjglökdgnalöd gnlöd fgnd öjlfngakjd ngdkf gnkln gldjkfakdj nfgnajkdgn adljfgnan ajdgn',
    },
    {
        date: new Date('2024-05-05'),
        title: 'Cinco de Mayo Celebration',
        text: 'Live performances, authentic food, and cultural activities.',
        location: 'Downtown Square',
        details:
            'This is some more detail. Some auto generated text just to see, if details might be a good idea, or total crap. It sfaklfjdklsfjklsdfjslkdfjlskdflksdjfdlöfg ökldjglökdgnalöd gnlöd fgnd öjlfngakjd ngdkf gnkln gldjkfakdj nfgnajkdgn adljfgnan ajdgn',
    },
    {
        date: new Date('2024-06-15'),
        title: 'Summer Kickoff BBQ',
        text: 'Grilled food, outdoor games, and a friendly volleyball match.',
        location: 'Lakeside Beach',
        details:
            'This is some more detail. Some auto generated text just to see, if details might be a good idea, or total crap. It sfaklfjdklsfjklsdfjslkdfjlskdflksdjfdlöfg ökldjglökdgnalöd gnlöd fgnd öjlfngakjd ngdkf gnkln gldjkfakdj nfgnajkdgn adljfgnan ajdgn',
    },
    {
        date: new Date('2024-07-04'),
        title: 'Independence Day Fireworks',
        text: 'Spectacular fireworks display after sunset.',
        location: 'Harborfront',
        details:
            'This is some more detail. Some auto generated text just to see, if details might be a good idea, or total crap. It sfaklfjdklsfjklsdfjslkdfjlskdflksdjfdlöfg ökldjglökdgnalöd gnlöd fgnd öjlfngakjd ngdkf gnkln gldjkfakdj nfgnajkdgn adljfgnan ajdgn',
    },
    {
        date: new Date('2024-08-12'),
        title: 'Outdoor Movie Night',
        text: 'Family-friendly movie under the stars. Bring blankets!',
        location: 'Central Park Lawn',
        details:
            'This is some more detail. Some auto generated text just to see, if details might be a good idea, or total crap. It sfaklfjdklsfjklsdfjslkdfjlskdflksdjfdlöfg ökldjglökdgnalöd gnlöd fgnd öjlfngakjd ngdkf gnkln gldjkfakdj nfgnajkdgn adljfgnan ajdgn',
    },
    {
        date: new Date('2024-09-08'),
        title: 'Back-to-School Fair',
        text: 'School supplies giveaway, games, and free snacks.',
        location: 'Community Center',
        details:
            'This is some more detail. Some auto generated text just to see, if details might be a good idea, or total crap. It sfaklfjdklsfjklsdfjslkdfjlskdflksdjfdlöfg ökldjglökdgnalöd gnlöd fgnd öjlfngakjd ngdkf gnkln gldjkfakdj nfgnajkdgn adljfgnan ajdgn',
    },
    {
        date: new Date('2024-10-31'),
        title: 'Halloween Costume Parade',
        text: 'Show off your costume and enjoy trick-or-treating.',
        location: 'Main Street',
        details:
            'This is some more detail. Some auto generated text just to see, if details might be a good idea, or total crap. It sfaklfjdklsfjklsdfjslkdfjlskdflksdjfdlöfg ökldjglökdgnalöd gnlöd fgnd öjlfngakjd ngdkf gnkln gldjkfakdj nfgnajkdgn adljfgnan ajdgn',
    },
    {
        date: new Date('2024-11-28'),
        title: 'Thanksgiving Potluck',
        text: 'Share a meal and give thanks with friends and neighbors.',
        location: 'Church Hall',
        details:
            'This is some more detail. Some auto generated text just to see, if details might be a good idea, or total crap. It sfaklfjdklsfjklsdfjslkdfjlskdflksdjfdlöfg ökldjglökdgnalöd gnlöd fgnd öjlfngakjd ngdkf gnkln gldjkfakdj nfgnajkdgn adljfgnan ajdgn',
    },
    {
        date: new Date('2024-12-24'),
        title: 'Christmas Eve Candlelight Service',
        text: 'A warm and peaceful evening of carols and reflection.',
        location: 'St. Mary’s Church',
        details:
            'This is some more detail. Some auto generated text just to see, if details might be a good idea, or total crap. It sfaklfjdklsfjklsdfjslkdfjlskdflksdjfdlöfg ökldjglökdgnalöd gnlöd fgnd öjlfngakjd ngdkf gnkln gldjkfakdj nfgnajkdgn adljfgnan ajdgn',
    },
    {
        date: new Date('2024-12-31'),
        title: 'New Year’s Eve Countdown Party',
        text: 'Ring in the new year with music, dancing, and fireworks.',
        location: 'City Square',
        details:
            'This is some more detail. Some auto generated text just to see, if details might be a good idea, or total crap. It sfaklfjdklsfjklsdfjslkdfjlskdflksdjfdlöfg ökldjglökdgnalöd gnlöd fgnd öjlfngakjd ngdkf gnkln gldjkfakdj nfgnajkdgn adljfgnan ajdgn',
    },
];
