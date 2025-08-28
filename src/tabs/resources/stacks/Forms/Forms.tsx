import React, { use } from 'react';
import {
    StyleSheet,
    FlatList,
    Text,
    ScrollView,
    Linking,
    TouchableOpacity,
} from 'react-native';
import FormListItem from './FormListItem';
import Separator from '../../../../functions/Separator';
import appUrls from '../../../../utils/appUrls';
import { ResourceContext } from '../../../../contexts/ResourceContext';

// Example list of forms
const Forms: React.FC = () => {
    const { forms } = use(ResourceContext);

    return (
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
                <Text style={styles.touchableText}>
                    Can't fine the form you were looking for? Please click here
                    to check our website for more information
                </Text>
            </TouchableOpacity>
        </ScrollView>
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
    touchableText: {
        fontStyle: 'italic',
    },
});
