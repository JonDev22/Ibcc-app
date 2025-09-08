import React from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import Separator from '../../../../functions/Separator';
import LifeGroupListItem from './LifeGroupListItem';
import useStyle from '../../../../hooks/useStyle';
import resourcesStorage from '../../../../storage/resourcesStorage';
import Spacer from '../../../../components/Spacer';

const LifeGroupList: React.FC = () => {
    const { lifeGroups } = resourcesStorage();

    const weeklyGroups = lifeGroups.filter(group => group.type === 'weekly');
    const biWeeklyGroups = lifeGroups.filter(
        group => group.type === 'bi-weekly',
    );
    const monthlyGroups = lifeGroups.filter(group => group.type === 'monthly');
    const other = lifeGroups.filter(group => group.type === undefined);

    const groups = [
        { title: 'Weekly', groups: weeklyGroups },
        { title: 'Bi-Weekly', groups: biWeeklyGroups },
        { title: 'Monthly', groups: monthlyGroups },
        { title: 'Other', groups: other },
    ];

    const generateStyle = useStyle();

    const containerStyle = generateStyle('hMinMax');
    const textStyle = generateStyle('font2XL', 'bold', 'hPadding3XL');

    return (
        <View style={containerStyle}>
            <ScrollView>
                <Spacer />
                {groups.map(gg => {
                    if (gg.groups.length > 0) {
                        return (
                            <View key={gg.title} style={styles.listContainer}>
                                <Text style={textStyle}>{gg.title}</Text>
                                <Spacer />
                                <FlatList
                                    data={gg.groups}
                                    keyExtractor={item => item.id}
                                    renderItem={({ item }) => (
                                        <LifeGroupListItem group={item} />
                                    )}
                                    ItemSeparatorComponent={Separator}
                                    scrollEnabled={false}
                                />
                                <Spacer />
                            </View>
                        );
                    }
                })}
            </ScrollView>
        </View>
    );
};

export default LifeGroupList;

const styles = StyleSheet.create({
    listContainer: {
        padding: 12,
    },
});
