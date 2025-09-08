import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import Separator from '../../../../functions/Separator';
import LifeGroupListItem from './LifeGroupListItem';
import useStyle from '../../../../hooks/useStyle';
import resourcesStorage from '../../../../storage/resourcesStorage';

const LifeGroupList: React.FC = () => {
    const { lifeGroups } = resourcesStorage();

    const generateStyle = useStyle();

    const containerStyle = generateStyle('hMinMax');

    return (
        <View style={containerStyle}>
            <FlatList
                data={lifeGroups}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <LifeGroupListItem group={item} />}
                contentContainerStyle={styles.listContainer}
                ItemSeparatorComponent={Separator}
            />
        </View>
    );
};

export default LifeGroupList;

const styles = StyleSheet.create({
    listContainer: {
        padding: 12,
    },
});
