import { useNavigation } from '@react-navigation/native';
import { FlatList, StyleSheet } from 'react-native';
import { ChurchNavigationType } from '../../types/churchNavigationProps';
import InfoCard from '../../../../components/InfoCard';
import { FontAwesomeIconName } from '@react-native-vector-icons/fontawesome';

function ChurchLifeHome() {
    const navigation = useNavigation<ChurchNavigationType<'Ministries'>>();

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
        />
    );
}

export default ChurchLifeHome;

const styles = StyleSheet.create({
    breather: {
        height: 30,
    },
});
