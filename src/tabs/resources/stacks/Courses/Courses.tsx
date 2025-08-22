import { ScrollView } from 'react-native';
import { NavigationType } from '../../types/navigationProps';
import { useNavigation } from '@react-navigation/native';
import InfoCard from '../../../../components/InfoCard';

function Courses() {
    const navigation = useNavigation<NavigationType<'Course Detail'>>();

    return (
        <ScrollView>
            {courses.map(item => (
                <InfoCard
                    header={item.header}
                    image="book"
                    key={item.header}
                    text={item.text}
                    onPress={() =>
                        navigation.navigate('Course Detail', {
                            ...item,
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

const courses = [
    {
        header: 'Missional Membership',
        text: "Understanding Jesus' commission, so we can live mission-focused lives, and lead others into Jesus' mission.",
        details:
            "This course focuses on the mission for which the other Missional Membership courses are intended to equip you. \n Since the word 'discipleship' is so familiar, and so central in the Bible, it is possible for Christians to use it without asking themselves what it really means, or considering how it should impact their daily decisions.",
    },
    {
        header: 'Bible',
        text: 'Understanding how to study our Bibles, so we can study our Bibles, and lead others into Bible study.',
        details:
            "Being able to correctly interpret the Bible is essential for life as a Disciple of Jesus. The Bible 'mini-class' course consists of 6 sessions. Each session will teach one step in Bible study.",
    },
    {
        header: 'Gospel',
        text: 'Understanding the Gospel, so we can live Gospel-sharing lives, and lead others to the Gospel.',
        details:
            'Knowing the Gospel, so to better contemplate its implications, and to ensure others fully grasp it, is essential for the life of a disciples. \n For this course, spend most of your time in Romans 1-5, applying what you learned in the BIBLE course.',
    },
    {
        header: 'Communion With God',
        text: 'Understanding communion with God, so we can live in communion with God, and lead others to communion with God.',
        details:
            'Like a tree planted by streams of water, which yields its fruit in season, we need to be drawing from the source. The Communion with God course seeks to address this. \n This course will be centered around the task of journaling your personal devotions, and providing content so you better know God, and appreciate what He is doing.',
    },
    {
        header: 'The Family',
        text: "Understanding Gods plan for the family, so we can flourish in God's created order, and lead others to God's plan for a family.",
        details:
            "God designed men and women, and the family, and when we live according to the Designer's instructions, we can flourish. \n God's design is established at Creation, and so for this course you will spend most of your time in Genesis 1-3, applying what you learned in the 'Bible' course.",
    },
];
