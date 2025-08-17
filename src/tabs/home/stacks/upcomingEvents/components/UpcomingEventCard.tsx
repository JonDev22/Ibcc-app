import { Pressable, StyleSheet, Text, View } from 'react-native';
import FontAwesome from '@react-native-vector-icons/fontawesome';
import { colors } from '../../../../../theme/colors';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeNavigationParamList } from '../../../types/navigationTypes';
import { useNavigation } from '@react-navigation/native';

type NavigationProps = NativeStackNavigationProp<
    HomeNavigationParamList,
    'Upcoming Events Details'
>;

interface UpcomingEventCardProps {
    item: {
        date: Date;
        title: string;
        text: string;
        location: string;
        details: string;
    };
}

function UpcomingEventCard({ item }: UpcomingEventCardProps) {
    const navigation = useNavigation<NavigationProps>();

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.dateContainer}>
                    <FontAwesome name="calendar" size={15} />
                    <Text style={styles.mediumText}>
                        {item.date.toDateString()}
                    </Text>
                </View>
                <View style={styles.locationContainer}>
                    <FontAwesome name="map-pin" size={12} />
                    <Text style={styles.mediumText}>{item.location}</Text>
                </View>
            </View>
            <View style={styles.contentContainer}>
                <Pressable
                    style={styles.pressable}
                    onPress={() =>
                        navigation.navigate('Upcoming Events Details', {
                            title: item.title,
                            date: item.date.toDateString(),
                            text: item.text,
                            location: item.location,
                            detail: item.details,
                        })
                    }
                >
                    <Text style={styles.title}>{item.title}</Text>
                    <FontAwesome name="chevron-right" size={12} />
                </Pressable>
                <Text>{item.text}</Text>
            </View>
        </View>
    );
}

export default UpcomingEventCard;

const styles = StyleSheet.create({
    mediumText: {
        fontSize: 16,
        color: colors.petrolBlue,
    },
    container: {
        padding: 20,
        alignItems: 'center',
        borderColor: colors.petrolBlue,
        borderWidth: 1,
        borderRadius: 12,
        overflow: 'hidden',
        gap: 10,
    },
    headerContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dateContainer: {
        flexDirection: 'row',
        gap: 4,
        alignItems: 'center',
    },
    locationContainer: {
        flexDirection: 'row',
        gap: 4,
        alignItems: 'center',
    },
    contentContainer: {
        width: '100%',
        alignItems: 'flex-start',
        alignContent: 'flex-start',
        textAlign: 'left',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    pressable: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
});
