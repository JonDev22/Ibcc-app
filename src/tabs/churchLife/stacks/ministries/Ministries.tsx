import React, { use } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import MinistryListItem from './MinistryListItem';
import { ResourceContext } from '../../../../contexts/ResourceContext';

const MinistryList: React.FC = () => {
    const { ministries } = use(ResourceContext);

    return (
        <FlatList
            data={ministries}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <MinistryListItem ministry={item} />}
            contentContainerStyle={styles.listContainer}
        />
    );
};

export default MinistryList;

const styles = StyleSheet.create({
    listContainer: {
        padding: 12,
    },
});
