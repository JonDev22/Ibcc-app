import React, { use } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import Separator from '../../../../functions/Separator';
import { ResourceContext } from '../../../../contexts/ResourceContext';
import LifeGroupListItem from './LifeGroupListItem';
import useStyle from '../../../../hooks/useStyle';

const LifeGroupList: React.FC = () => {
    const { lifeGroups } = use(ResourceContext);

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
