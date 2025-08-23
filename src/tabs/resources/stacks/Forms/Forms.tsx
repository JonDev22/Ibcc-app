import React from 'react';
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

// Type for a form item
export type FormItem = {
    id: string;
    title: string;
    description?: string;
    submitTo: string; // text telling the user where to send it
};

// Example list of forms
const Forms: React.FC = () => {
    const forms: FormItem[] = [
        {
            id: '1',
            title: 'GDPR Consent Form',
            description:
                'Consent to use your personal data solely for church ministry purposes.',
            submitTo: 'admin@ibc-cologne.com',
        },
        {
            id: '2',
            title: 'Reimbursement Claim',
            description:
                'Claim your ministry expenses (Ministry leaders only!).',
            submitTo: 'finance@ibc-cologne.com',
        },
        {
            id: '3',
            title: 'Constitution',
            description: 'Want to have a look at our constitution?',
            submitTo: 'Questions to the Elders',
        },
    ];

    return (
        <ScrollView>
            <FlatList
                data={forms}
                keyExtractor={item => item.id}
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
