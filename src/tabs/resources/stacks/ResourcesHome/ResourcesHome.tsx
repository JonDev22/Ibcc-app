import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ResourceCard from '../components/ResourceCard';
import { NavigationType } from '../../types/navigationProps';

function ResourcesHome() {
    const navigationCourses = useNavigation<NavigationType<'Courses'>>();
    const navigationDetail = useNavigation<NavigationType<'Course Detail'>>();
    const navigationForms = useNavigation<NavigationType<'Forms'>>();

    return (
        <ScrollView>
            <ResourceCard
                title="Materials"
                header="T.B.T."
                text="T.B.T. stands for Through the Bible Together. We offer multiple resources as we study together through the Bible."
                icon="comments-o"
                navigation={() =>
                    navigationCourses.navigate('Course Detail', {
                        text: 'A',
                        header: 'B',
                    })
                }
            />
            <ResourceCard
                title="Course"
                header="Courses"
                text="Look at the courses that we offer."
                icon="book"
                navigation={() => navigationCourses.navigate('Courses')}
            />
            <ResourceCard
                title="Forms"
                header="User Forms"
                text="Looking for forms you need to fill and submit? Click here to see our forms."
                icon="file-o"
                navigation={() => navigationForms.navigate('Forms')}
            />
        </ScrollView>
    );
}

export default ResourcesHome;
