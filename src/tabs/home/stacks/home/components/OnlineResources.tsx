import {
    FlatList,
    Image,
    Linking,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import React from 'react';

import ApplePodcastIcon from '../../../../../assets/Apple_Podcasts_Icon_RGB_lg_060623.svg';
import AppleMusicIcon from '../../../../../assets/Apple_Music_Icon_RGB_lg_073120.svg';
import SpotifyIcon from '../../../../../assets/Primary_Logo_Green_CMYK.svg';
import InstagramIcon from '../../../../../assets/Instagram_Glyph_Gradient.svg';
import FaceBookPng from '../../../../../assets/Facebook_Logo_Primary.png';
import YouTubePng from '../../../../../assets/yt_icon_red_digital.png';

const WIDTH = 50;
const HEIGHT = 50;

interface ServiceCardProps {
    subHeader: string;
    items: {
        icon: React.ReactNode;
        url: string;
    }[];
}

const ServiceCard: React.FC<ServiceCardProps> = ({ subHeader, items }) => {
    return (
        <>
            <Text style={styles.subheading}>{subHeader}</Text>
            <View style={styles.row}>
                {items.map(item => (
                    <TouchableOpacity
                        key={item.url}
                        style={styles.card}
                        onPress={() => Linking.openURL(item.url)}
                    >
                        {item.icon}
                    </TouchableOpacity>
                ))}
            </View>
        </>
    );
};

function OnlineResources() {
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Get Connected:</Text>

            <FlatList
                data={data}
                keyExtractor={item => item.subHeader}
                scrollEnabled={false}
                renderItem={({ item }) => <ServiceCard {...item} />}
            />
        </View>
    );
}

export default OnlineResources;

const data: ServiceCardProps[] = [
    {
        subHeader: 'Listen to our Sermon-Podcast',
        items: [
            {
                url: 'https://podcasts.apple.com/de/podcast/cologne-international-baptist-church/id1742416920',
                icon: <ApplePodcastIcon width={WIDTH} height={HEIGHT} />,
            },
            {
                url: 'https://open.spotify.com/show/1DR5382pZ18BZbqJYalIpg',
                icon: <SpotifyIcon width={WIDTH} height={HEIGHT} />,
            },
        ],
    },
    {
        subHeader: 'Listen to the songs that we sing',
        items: [
            {
                url: 'https://music.apple.com/de/playlist/ibc-cologne-music-playlist/pl.u-xlyNqMdCJxRDKNP?l=en',
                icon: <AppleMusicIcon width={WIDTH} height={HEIGHT} />,
            },
            {
                url: 'https://open.spotify.com/artist/your-artist-id',
                icon: <SpotifyIcon width={WIDTH} height={HEIGHT} />,
            },
        ],
    },
    {
        subHeader: 'Follow us on Social Media',
        items: [
            {
                url: 'https://www.instagram.com/ibccologne/',
                icon: (
                    <InstagramIcon
                        width={WIDTH}
                        height={HEIGHT}
                        viewBox="0 -700 2500 3900"
                    />
                ),
            },
            {
                url: 'https://www.facebook.com/ibc.cologne/',
                icon: (
                    <Image
                        source={FaceBookPng}
                        style={{ height: HEIGHT, width: WIDTH }}
                    />
                ),
            },
            {
                url: 'https://m.youtube.com/@ibccologneonline4271',
                icon: (
                    <Image
                        source={YouTubePng}
                        style={{ height: HEIGHT, width: WIDTH }}
                    />
                ),
            },
        ],
    },
];

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    heading: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    subheading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
        gap: 30,
    },
    card: { paddingBottom: 10 },
    text: {
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
    },
});
