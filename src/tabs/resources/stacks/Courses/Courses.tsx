import { FlatList, View } from 'react-native';
import { NavigationType } from '../../types/navigationProps';
import { useNavigation } from '@react-navigation/native';
import InfoCard from '../../../../components/InfoCard';
import { use } from 'react';
import { ResourceContext } from '../../../../contexts/ResourceContext';
import useStyle from '../../../../hooks/useStyle';
import Spacer from '../../../../components/Spacer';

function Courses() {
    const navigation = useNavigation<NavigationType<'Course Detail'>>();
    const { courses } = use(ResourceContext);

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
