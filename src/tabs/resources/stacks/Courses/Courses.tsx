import { FlatList, View } from 'react-native';
import { NavigationType } from '../../types/navigationProps';
import { useNavigation } from '@react-navigation/native';
import InfoCard from '../../../../components/InfoCard';
import useStyle from '../../../../hooks/useStyle';
import Spacer from '../../../../components/Spacer';
import resourcesStorage from '../../../../storage/resourcesStorage';

function Courses() {
    const navigation = useNavigation<NavigationType<'Course Detail'>>();
    const { courses } = resourcesStorage();

    const generateStyle = useStyle();

    const containerStyle = generateStyle('hMinMax', 'wPadding3XL', 'hPaddingL');

    return (
        <View style={containerStyle}>
            <FlatList
                data={courses}
                keyExtractor={item => item.title}
                renderItem={({ item }) => (
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
                )}
                ItemSeparatorComponent={Spacer}
            />
        </View>
    );
}

export default Courses;
