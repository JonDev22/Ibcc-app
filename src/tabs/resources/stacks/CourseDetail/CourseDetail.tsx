import { RouteProp } from '@react-navigation/native';
import { ResourceNavigationParamList } from '../../types/navigationTypes';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import FontAwesome from '@react-native-vector-icons/fontawesome';
import { mainStyles } from '../../../../styles/mainStyle';
import DownloadButton from './DownloadButton';
import Spacer from '../../../../components/Spacer';
import ResourceListView from './ResourceListView';
import sortByNumOfText from '../../../../functions/sortByNumOfText';
import useStyle from '../../../../hooks/useStyle';
import useColorMap from '../../../../hooks/useColorMap';

type CourseDetailRouteProp = RouteProp<
    ResourceNavigationParamList,
    'Course Detail'
>;

interface CourseDetailProps {
    route: CourseDetailRouteProp;
}

function CourseDetail({ route }: CourseDetailProps) {
    const { item } = route.params;
    const generateStyle = useStyle();
    const colorMap = useColorMap();

    const resources = item.resources ? Object.entries(item.resources) : null;
    const externalResources = item.externalResources
        ? Object.entries(item.externalResources)
        : null;
    const relatedResources = item.relatedResources
        ? Object.entries(item.relatedResources)
        : null;

    const headerStye = generateStyle('font2XL', 'bold');
    const titleStye = generateStyle('fontL', 'bold');
    const textStyle = generateStyle('textJustify', 'textLine20');

    return (
        <View style={generateStyle('hMinMax')}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.centeredView}>
                    <Spacer />
                    <Text style={headerStye}>{item.title}</Text>
                </View>

                <View style={styles.centeredView}>
                    <FontAwesome
                        style={mainStyles.circleIcon}
                        name="map-o"
                        size={20}
                        color={colorMap.primary}
                    />
                    <Text style={titleStye}>Scope</Text>
                    <Text style={textStyle}>{item.scope}</Text>
                </View>

                <View style={styles.centeredView}>
                    <FontAwesome
                        style={mainStyles.circleIcon}
                        name="comment-o"
                        size={20}
                        color={colorMap.primary}
                    />
                    <Text style={titleStye}>Content</Text>
                    <Text style={textStyle}>{item.description}</Text>
                </View>

                <DownloadButton text={'Complete Course'} url={item.course} />
                <Spacer />

                {resources && (
                    <View style={styles.centeredView}>
                        <Text style={titleStye}>Appendixes</Text>
                        <Text style={textStyle}>
                            These are resources you need for the course.
                        </Text>
                        <FlatList
                            data={sortByNumOfText(resources)}
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
                    <ResourceListView
                        items={externalResources}
                        header="External resources"
                        text="We cannot provide external resources. If you are
                interested in the course and need access to all
                resources, please talk to your mentor."
                    />
                )}

                {relatedResources && (
                    <ResourceListView
                        items={relatedResources}
                        header="Related resources"
                        text="Related resources are related to the course, but not mandatory to complete the course."
                    />
                )}

                <Spacer />
            </ScrollView>
        </View>
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
    flatList: {
        flexGrow: 0,
    },
});
