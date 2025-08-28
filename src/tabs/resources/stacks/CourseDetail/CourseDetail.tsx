import { RouteProp } from '@react-navigation/native';
import { ResourceNavigationParamList } from '../../types/navigationTypes';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import FontAwesome from '@react-native-vector-icons/fontawesome';
import { mainStyles } from '../../../../styles/mainStyle';
import DownloadButton from './DownloadButton';
import Spacer from '../../../../components/Spacer';

type CourseDetailRouteProp = RouteProp<
    ResourceNavigationParamList,
    'Course Detail'
>;

interface CourseDetailProps {
    route: CourseDetailRouteProp;
}

function CourseDetail({ route }: CourseDetailProps) {
    const { item } = route.params;

    const resources = item.resources ? Object.entries(item.resources) : null;
    const externalResources = item.externalResources
        ? Object.entries(item.externalResources)
        : null;
    const relatedResources = item.relatedResources
        ? Object.entries(item.relatedResources)
        : null;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.centeredView}>
                <Text style={styles.header}>{item.title}</Text>
            </View>

            <View style={styles.centeredView}>
                <FontAwesome
                    style={mainStyles.circleIcon}
                    name="map-o"
                    size={20}
                />
                <Text style={styles.title}>Scope</Text>
                <Text style={styles.centeredText}>{item.scope}</Text>
            </View>

            <View style={styles.centeredView}>
                <FontAwesome
                    style={mainStyles.circleIcon}
                    name="comment-o"
                    size={20}
                />
                <Text style={styles.title}>Content</Text>
                <Text style={styles.centeredText}>{item.description}</Text>
            </View>

            <DownloadButton text={'Download Course'} url={item.course} />

            {resources && (
                <View style={styles.centeredView}>
                    <Text style={styles.title}>Appendixes</Text>
                    <Text style={styles.centeredText}>
                        These are resources you need for the course.
                    </Text>
                    <FlatList
                        data={resources}
                        keyExtractor={([key]) => key}
                        renderItem={({ item: [key, value] }) => (
                            <DownloadButton
                                text={`Appendix ${key}`}
                                url={value.url}
                            />
                        )}
                        scrollEnabled={false}
                        style={styles.flatList}
                    />
                </View>
            )}

            {externalResources && (
                <View style={styles.centeredView}>
                    <Text style={styles.title}>External resources</Text>
                    <Text style={styles.centeredText}>
                        We cannot provide external resources. If you are
                        interested in the course and need access to all
                        resources, please talk to your mentor.
                    </Text>
                    <FlatList
                        data={externalResources}
                        keyExtractor={([key]) => key}
                        renderItem={({ item: [key, value] }) => (
                            <Text key={key}>
                                {key}: {value.url}
                            </Text>
                        )}
                        scrollEnabled={false}
                        style={styles.flatList}
                    />
                </View>
            )}

            {relatedResources && (
                <View style={styles.centeredView}>
                    <Text style={styles.title}>Related resources</Text>
                    <FlatList
                        data={relatedResources}
                        keyExtractor={([key]) => key}
                        renderItem={({ item: [key, value] }) => (
                            <Text key={key}>
                                {key}: {value.url}
                            </Text>
                        )}
                        scrollEnabled={false}
                        style={styles.flatList}
                    />
                </View>
            )}

            <Spacer />
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
    flatList: {
        flexGrow: 0,
    },
});
