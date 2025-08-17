import { ScrollView } from 'react-native';
import ResourceCard from '../components/ResourceCard';
import { NavigationType } from '../../types/navigationProps';
import { useNavigation } from '@react-navigation/native';

function Courses() {
    const navigation = useNavigation<NavigationType<'Course Detail'>>();

    return (
        <ScrollView>
            {courses.map(item => (
                <ResourceCard
                    title="Course"
                    icon="book"
                    key={item.header}
                    header={item.header}
                    text={item.text}
                    navigation={() =>
                        navigation.navigate('Course Detail', {
                            ...item,
                        })
                    }
                />
            ))}
        </ScrollView>
    );
}

export default Courses;

const courses = [
    {
        header: 'Church Membership',
        text: 'Understanding church membership is crucial in our culture. Why commit to a church? Why being a member?',
    },
    {
        header: 'Discipleship',
        text: 'What does discipleship mean? Do I need do be discipled? Do I need to disciple? What is that all about?',
    },
    {
        header: 'Baptism',
        text: 'I believe in Christ and that He is our Lord and Savior. But why do I still need to be baptized? And why is that important?',
    },
    {
        header: 'Communion',
        text: 'Why is communion so relevant? Why do I need to eat a tiny piece of cracker with everyone else once a month at church?',
    },
];
