import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationType } from '../../types/navigationProps';
import InfoCard from '../../../../components/InfoCard';

function ResourcesHome() {
    const navigationCourses = useNavigation<NavigationType<'Courses'>>();
    const tbtNavigation = useNavigation<NavigationType<'TBT'>>();
    const navigationForms = useNavigation<NavigationType<'Forms'>>();

    return (
        <ScrollView>
            <InfoCard
                header="T.B.T."
                text="T.B.T. stands for Through the Bible Together. We offer multiple resources as we study together through the Bible."
                image="comments-o"
                onPress={() => tbtNavigation.navigate('TBT')}
                headerLeft
            />
            <InfoCard
                header="Courses"
                text="Knowing Jesus; Becoming like Jesus; Participating in Jesus' mission. Our courses are designed to help you grow in your faith and understanding of Jesus."
                image="book"
                onPress={() => navigationCourses.navigate('Courses')}
                headerLeft
            />
            <InfoCard
                header="User Forms"
                text="Looking for forms you need to fill and submit? Click here to see our forms."
                image="file-o"
                onPress={() => navigationForms.navigate('Forms')}
                headerLeft
            />
        </ScrollView>
    );
}

export default ResourcesHome;
