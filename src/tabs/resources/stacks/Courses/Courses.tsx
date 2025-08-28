import { ScrollView } from 'react-native';
import { NavigationType } from '../../types/navigationProps';
import { useNavigation } from '@react-navigation/native';
import InfoCard from '../../../../components/InfoCard';
import { use } from 'react';
import { ResourceContext } from '../../../../contexts/ResourceContext';

function Courses() {
    const navigation = useNavigation<NavigationType<'Course Detail'>>();
    const { courses } = use(ResourceContext);
    console.log(courses);

    return (
        <ScrollView>
            {courses.map(item => (
                <InfoCard
                    header={item.title}
                    image="book"
                    key={item.title}
                    text={item.scope}
                    onPress={() =>
                        navigation.navigate('Course Detail', {
                            item,
                        })
                    }
                    headerLeft
                    buttonText="Explore Course"
                />
            ))}
        </ScrollView>
    );
}

export default Courses;
