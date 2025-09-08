import React from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import MinistryListItem from './MinistryListItem';
import useStyle from '../../../../hooks/useStyle';
import Spacer from '../../../../components/Spacer';
import resourcesStorage from '../../../../storage/resourcesStorage';

const MinistryList: React.FC = () => {
    const { ministries } = resourcesStorage();

    const generateStyle = useStyle();
    const containerStyle = generateStyle('hMinMax');

    return (
        <View style={containerStyle}>
            <FlatList
                data={ministries}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <MinistryListItem ministry={item} />}
                contentContainerStyle={styles.listContainer}
                ItemSeparatorComponent={Spacer}
            />
        </View>
    );
};

export default MinistryList;

const styles = StyleSheet.create({
    listContainer: {
        padding: 12,
    },
});
