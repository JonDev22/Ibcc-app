import { RouteProp } from '@react-navigation/native';
import { ResourceNavigationParamList } from '../../types/navigationTypes';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Pressable,
    Linking,
} from 'react-native';
import { colors } from '../../../../theme/colors';
import FontAwesome from '@react-native-vector-icons/fontawesome';
import { mainStyles } from '../../../../styles/mainStyle';
import fetchFileFromStorage from '../../../../functions/fetchFileFromStorage';

type CourseDetailRouteProp = RouteProp<
    ResourceNavigationParamList,
    'Course Detail'
>;

interface CourseDetailProps {
    route: CourseDetailRouteProp;
}

function CourseDetail({ route }: CourseDetailProps) {
    const { header, text, details } = route.params;

    const fetchDocFromStorage = async () => {
        const url = await fetchFileFromStorage('audios/rainbow_song.aac');
        console.log(url);
        if (url) {
            Linking.openURL(url);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.centeredView}>
                <Text style={styles.header}>{header}</Text>
            </View>

            <View style={styles.centeredView}>
                <FontAwesome
                    style={mainStyles.circleIcon}
                    name="map-o"
                    size={20}
                />
                <Text style={styles.title}>Scope</Text>
                <Text style={styles.centeredText}>{text}</Text>
            </View>

            <View style={styles.centeredView}>
                <FontAwesome
                    style={mainStyles.circleIcon}
                    name="comment-o"
                    size={20}
                />
                <Text style={styles.title}>Content</Text>
                <Text style={styles.centeredText}>{details}</Text>
            </View>

            <Pressable
                style={styles.pressableStyle}
                onPress={fetchDocFromStorage}
            >
                <Text style={styles.pressableText}>Download Course</Text>
                <FontAwesome
                    name="download"
                    size={20}
                    style={styles.pressableText}
                />
            </Pressable>
        </ScrollView>
    );
}

export default CourseDetail;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    centeredView: {
        padding: 20,
        alignItems: 'center',
        gap: 5,
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        paddingTop: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    centeredText: {
        textAlign: 'justify',
        lineHeight: 25,
    },
    pressableStyle: {
        backgroundColor: colors.petrolBlue,
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        gap: 10,
        borderRadius: 20,
        marginTop: 20,
    },
    pressableText: {
        color: colors.white100,
    },
});
