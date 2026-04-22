import React from 'react';
import {
    StyleSheet,
    FlatList,
    Text,
    ScrollView,
    Linking,
    TouchableOpacity,
    View,
} from 'react-native';
import FormListItem from './FormListItem';
import Separator from '../../../../functions/Separator';
import useStyle from '../../../../hooks/useStyle';
import appUrls from '../../../../utils/appUrls';
import resourcesStorage from '../../../../storage/resourcesStorage';

// Example list of forms
const Forms: React.FC = () => {
    const { forms } = resourcesStorage();

    const generateStyle = useStyle();
    const containerStyle = generateStyle('hMinMax');
    const touchableTextStyle = generateStyle('italic');

    return (
        <View style={containerStyle}>
            <ScrollView>
                <FlatList
                    data={forms}
                    keyExtractor={item => item.title}
                    renderItem={({ item }) => <FormListItem {...item} />}
                    contentContainerStyle={styles.listContainer}
                    ItemSeparatorComponent={Separator}
                    scrollEnabled={false}
                />

                <TouchableOpacity
                    onPress={() => Linking.openURL(`${appUrls.IBC}/about-us`)}
                    style={styles.touchableElement}
                >
                    <Text style={touchableTextStyle}>
                        Can't find the form you were looking for? Please click
                        here to check our website for more information
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

export default Forms;

const styles = StyleSheet.create({
    listContainer: {
        paddingVertical: 8,
        paddingHorizontal: 12,
    },
    touchableElement: {
        padding: 12,
    },
});
