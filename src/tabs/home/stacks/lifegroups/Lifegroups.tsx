import React, { use } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import Separator from '../../../../functions/Separator';
import { ResourceContext } from '../../../../contexts/ResourceContext';
import LifeGroupListItem from './LifeGroupListItem';

const LifeGroupList: React.FC = () => {
    const { lifeGroups } = use(ResourceContext);

    return (
        <FlatList
            data={lifeGroups}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <LifeGroupListItem group={item} />}
            contentContainerStyle={styles.listContainer}
            ItemSeparatorComponent={Separator}
        />
    );
};

export default LifeGroupList;

const styles = StyleSheet.create({
    listContainer: {
        padding: 12,
    },
});
