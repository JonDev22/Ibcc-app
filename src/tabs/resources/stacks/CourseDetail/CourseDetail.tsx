import { RouteProp } from '@react-navigation/native';
import { ResourceNavigationParamList } from '../../types/navigationTypes';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    FlatList,
    Linking,
    TouchableOpacity,
} from 'react-native';
import FontAwesome from '@react-native-vector-icons/fontawesome';
import { mainStyles } from '../../../../styles/mainStyle';
import DownloadButton from './DownloadButton';
import Spacer from '../../../../components/Spacer';
import ResourceListView from './ResourceListView';
import sortByNumOfText from '../../../../functions/sortByNumOfText';
import useStyle from '../../../../hooks/useStyle';
import useColorMap from '../../../../hooks/useColorMap';
import { colors } from '../../../../theme/colors';

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
    const textStyleTouchable = generateStyle(
        'textJustify',
        'textLine20',
        'bgTransparent',
    );

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

                {item.linkToPw && (
                    <View style={styles.centeredView}>
                        <Text style={titleStye}>Guided Course</Text>
                        <Text style={textStyle}>
                            We encourage everyone to complete each course with
                            the guidance of a mentor. Our desire is to help you
                            grow in knowing Jesus, becoming like Him, and
                            participating in His mission. Guided courses are
                            available on the Pathwright platform, which you can
                            access using the link below.
                        </Text>
                        <TouchableOpacity
                            style={styles.pressableStyle}
                            onPress={() => Linking.openURL(item.linkToPw ?? '')}
                        >
                            <Text style={textStyleTouchable}>
                                Link To Pathwright
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}

                <View style={styles.centeredView}>
                    <Text style={titleStye}>Course PDF</Text>
                    <Text style={textStyle}>
                        A simplified PDF version of the course is available via
                        the link below.
                    </Text>
                    <DownloadButton
                        text={'Complete Course'}
                        url={item.course}
                    />
                </View>

                <Spacer />

                {resources && (
                    <View style={styles.centeredView}>
                        <Text style={titleStye}>Appendixes</Text>
                        <Text style={textStyle}>
                            The following materials are required to complete the
                            course.
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
                        text="We’re unable to provide external resources directly.
                            If you're interested in the course and need full access
                            to all materials, please reach out to your mentor for support."
                    />
                )}

                {relatedResources && (
                    <ResourceListView
                        items={relatedResources}
                        header="Related resources"
                        text="Related resources complement the course but are not required to complete it."
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
    pressableStyle: {
        backgroundColor: colors.petrolBlue,
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        gap: 10,
        borderRadius: 20,
        marginTop: 20,
    },
});
