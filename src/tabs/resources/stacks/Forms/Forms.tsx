import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import FormListItem from './FormListItem';
import Separator from '../../../../functions/Separator';

const SeparatorComponent = () => <Separator />;

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
            title: 'Leave Request',
            description: 'Submit your leave request for approval.',
            submitTo: 'HR Department',
        },
        {
            id: '2',
            title: 'Expense Claim',
            description: 'Claim your business expenses.',
            submitTo: 'Finance Department',
        },
        {
            id: '3',
            title: 'Incident Report',
            description: 'Report a workplace incident or hazard.',
            submitTo: 'Safety Team',
        },
    ];

    return (
        <FlatList
            data={forms}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <FormListItem {...item} />}
            contentContainerStyle={styles.listContainer}
            ItemSeparatorComponent={() => SeparatorComponent()}
        />
    );
};

export default Forms;

const styles = StyleSheet.create({
    listContainer: {
        paddingVertical: 8,
        paddingHorizontal: 12,
    },
});
