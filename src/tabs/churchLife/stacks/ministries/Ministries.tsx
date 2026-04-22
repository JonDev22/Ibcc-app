import React from 'react';
import { StyleSheet, FlatList, View, ScrollView } from 'react-native';
import MinistryListItem from './MinistryListItem';
import useStyle from '../../../../hooks/useStyle';
import Spacer from '../../../../components/Spacer';
import resourcesStorage from '../../../../storage/resourcesStorage';
import AddButton from '../../../../components/AddButton';
import { useNavigation } from '@react-navigation/native';
import { ChurchNavigationType } from '../../types/churchNavigationProps';

const MinistryList: React.FC = () => {
    const { ministries } = resourcesStorage();
    const navigation = useNavigation<ChurchNavigationType<'Ministry'>>();

    const generateStyle = useStyle();
    const containerStyle = generateStyle('hMinMax');

    return (
        <View style={containerStyle}>
            <ScrollView>
                <FlatList
                    data={ministries}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <MinistryListItem ministry={item} />
                    )}
                    contentContainerStyle={styles.listContainer}
                    ItemSeparatorComponent={Spacer}
                    scrollEnabled={false}
                />
                <AddButton
                    handleAddEvent={() => navigation.navigate('Ministry', {})}
                    buttonLabel="Add New Ministry"
                />
            </ScrollView>
        </View>
    );
};

export default MinistryList;

const styles = StyleSheet.create({
    listContainer: {
        padding: 12,
    },
});
