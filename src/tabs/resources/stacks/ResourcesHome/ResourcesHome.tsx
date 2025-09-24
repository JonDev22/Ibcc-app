import { FlatList, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationType } from '../../types/navigationProps';
import InfoCard from '../../../../components/InfoCard';
import useStyle from '../../../../hooks/useStyle';
import { FontAwesomeIconName } from '@react-native-vector-icons/fontawesome';
import Spacer from '../../../../components/Spacer';

function ResourcesHome() {
    const navigationCourses = useNavigation<NavigationType<'Courses'>>();
    const tbtNavigation = useNavigation<NavigationType<'TBT'>>();
    const navigationForms = useNavigation<NavigationType<'Forms'>>();

    const generateStyle = useStyle();
    const containerStyle = generateStyle(
        'hMinMax',
        'wPadding3XL',
        'hPaddingXL',
    );

    const homeData = [
        {
            image: 'comments-o',
            header: 'T.B.T.',
            text: 'T.B.T. stands for Through the Bible Together. We offer multiple resources as we study together through the Bible.',
            navigation: () => tbtNavigation.navigate('TBT'),
        },
        {
            image: 'comments-o',
            header: 'TBT@Home',
            text: 'Helping parents to lead children through the bible.',
            navigation: () => tbtNavigation.navigate('TBT@Home'),
        },
        {
            image: 'book',
            header: 'Courses',
            text: "Knowing Jesus; Becoming like Jesus; Participating in Jesus' mission. Our courses are designed to help you grow in your faith and understanding of Jesus.' mission.",
            navigation: () => navigationCourses.navigate('Courses'),
        },
        {
            image: 'file-o',
            header: 'User Forms',
            text: 'Looking for forms you need to fill and submit? Click here to see our forms.',
            navigation: () => navigationForms.navigate('Forms'),
        },
    ];

    return (
        <View style={containerStyle}>
            <FlatList
                data={homeData}
                keyExtractor={item => item.header}
                renderItem={({ item }) => (
                    <InfoCard
                        image={item.image as FontAwesomeIconName}
                        header={item.header}
                        text={item.text}
                        onPress={item.navigation}
                        headerLeft
                    />
                )}
                ItemSeparatorComponent={Spacer}
            />
        </View>
    );
}

export default ResourcesHome;
