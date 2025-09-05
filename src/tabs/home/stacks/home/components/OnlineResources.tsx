import {
    FlatList,
    Image,
    Linking,
    StyleSheet,
    Text,
    TouchableOpacity,
    useColorScheme,
    View,
} from 'react-native';
import React, { use } from 'react';
import appUrls from '../../../../../utils/appUrls';

// RGB Icons
import ApplePodcastIcon from '../../../../../assets/Apple_Podcasts_Icon_RGB_lg_060623.svg';
import AppleMusicIcon from '../../../../../assets/Apple_Music_Icon_RGB_lg_073120.svg';
import SpotifyIcon from '../../../../../assets/Primary_Logo_Green_CMYK.svg';
import InstagramIcon from '../../../../../assets/Instagram_Glyph_Gradient.svg';
import FaceBookPng from '../../../../../assets/Facebook_Logo_Primary.png';
import YouTubePng from '../../../../../assets/yt_icon_red_digital.png';
// White Icons
import ApplePodcastIconWhite from '../../../../../assets/Apple_Podcasts_Icon_wht_lg_060623.svg';
import AppleMusicIconWhite from '../../../../../assets/Apple_Music_Icon_wht_lg_072420.svg';
import SpotifyIconWhite from '../../../../../assets/Primary_Logo_White_RGB.svg';
import InstagramIconWhite from '../../../../../assets/Instagram_Glyph_White.svg';
import FaceBookPngWhite from '../../../../../assets/Facebook_Logo_Secondary.png';
import YouTubePngWhite from '../../../../../assets/yt_icon_white_digital.png';

import useStyle from '../../../../../hooks/useStyle';
import Spacer from '../../../../../components/Spacer';
import { ResourceContext } from '../../../../../contexts/ResourceContext';

const WIDTH = 50;
const HEIGHT = 50;

interface ServiceCardProps {
    subHeader: string;
    items: {
        url: string;
        icon: React.ReactNode;
        iconDark: React.ReactNode;
    }[];
}

const ServiceCard: React.FC<ServiceCardProps> = ({ subHeader, items }) => {
    const { theme } = use(ResourceContext);
    const generateStyle = useStyle();
    const subheadingStyle = generateStyle('fontM', 'bold', 'textCenter');

    return (
        <>
            <Text style={subheadingStyle}>{subHeader}</Text>
            <Spacer />
            <View style={styles.row}>
                {items.map(item => (
                    <TouchableOpacity
                        key={item.url}
                        style={styles.card}
                        onPress={() => Linking.openURL(item.url)}
                    >
                        {theme === 'light' ? item.icon : item.iconDark}
                    </TouchableOpacity>
                ))}
            </View>
        </>
    );
};

function OnlineResources() {
    const generateStyle = useStyle();

    const headingStyle = generateStyle('fontXL', 'bold', 'textCenter');
    return (
        <View style={styles.container}>
            <Text style={headingStyle}>Get Connected:</Text>
            <Spacer />
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
                url: appUrls.APPLE_PODCAST,
                icon: <ApplePodcastIcon width={WIDTH} height={HEIGHT} />,
                iconDark: (
                    <ApplePodcastIconWhite width={WIDTH} height={HEIGHT} />
                ),
            },
            {
                url: appUrls.SPOTIFY_PODCAST,
                icon: <SpotifyIcon width={WIDTH} height={HEIGHT} />,
                iconDark: <SpotifyIconWhite width={WIDTH} height={HEIGHT} />,
            },
        ],
    },
    {
        subHeader: 'Listen to the songs that we sing',
        items: [
            {
                url: appUrls.APPLE_MUSIC,
                icon: <AppleMusicIcon width={WIDTH} height={HEIGHT} />,
                iconDark: <AppleMusicIconWhite width={WIDTH} height={HEIGHT} />,
            },
            {
                url: appUrls.SPOTIFY_MUSIC,
                icon: <SpotifyIcon width={WIDTH} height={HEIGHT} />,
                iconDark: <SpotifyIconWhite width={WIDTH} height={HEIGHT} />,
            },
        ],
    },
    {
        subHeader: 'Follow us on Social Media',
        items: [
            {
                url: appUrls.INSTAGRAM,
                icon: (
                    <InstagramIcon
                        width={WIDTH}
                        height={HEIGHT}
                        viewBox="0 -700 2500 3900"
                    />
                ),
                iconDark: <InstagramIconWhite width={WIDTH} height={HEIGHT} />,
            },
            {
                url: appUrls.YOUTUBE,
                icon: (
                    <Image
                        source={YouTubePng}
                        style={{
                            height: HEIGHT + 20,
                            width: WIDTH + 5,
                        }}
                    />
                ),
                iconDark: (
                    <Image
                        source={YouTubePngWhite}
                        style={{
                            height: HEIGHT + 20,
                            width: WIDTH + 5,
                        }}
                    />
                ),
            },
            {
                url: appUrls.FACEBOOK,
                icon: (
                    <Image
                        source={FaceBookPng}
                        style={{ height: HEIGHT, width: WIDTH }}
                    />
                ),
                iconDark: (
                    <Image
                        source={FaceBookPngWhite}
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
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
        gap: 30,
        alignItems: 'center',
    },
    card: { paddingBottom: 10 },
    text: {
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
    },
});
