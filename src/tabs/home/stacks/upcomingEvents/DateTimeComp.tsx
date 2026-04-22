import { useState } from 'react';
import {
    Modal,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import formatFirebaseDate from '../../../../functions/database/formatFirebaseDate';
import formatFirebaseTime from '../../../../functions/formatFirebaseTime';
import DateTimePicker, {
    DateTimePickerAndroid,
} from '@react-native-community/datetimepicker';
import useStyle from '../../../../hooks/useStyle';
import { Timestamp } from '@react-native-firebase/firestore';
import Spacer from '../../../../components/Spacer';

interface DateTimeCompProps {
    date: Timestamp;
    setDate: (date: Timestamp) => void;
}

function DateTimeComp({ date, setDate }: DateTimeCompProps) {
    const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

    const generateStyle = useStyle();

    const textStyle = generateStyle('fontS');
    const dateTextStyle = generateStyle('fontS', 'secondary');
    const modalViewContent = generateStyle(
        'wPaddingXL',
        'hPaddingXL',
        'wMarginXL',
        'hMarginXL',
        'rounded2',
        'selfCenter',
    );
    const addButtonStyle = generateStyle(
        'border1',
        'borderPrimary',
        'rounded2',
        'wPaddingL',
        'hPaddingL',
    );

    if (Platform.OS === 'android') {
        return (
            <>
                <Text style={textStyle}>Date *</Text>
                <TouchableOpacity
                    onPress={() =>
                        DateTimePickerAndroid.open({
                            minimumDate: new Date(),
                            value: date.toDate(),
                            mode: 'date',
                            onChange: (_, selectedDate) => {
                                if (selectedDate)
                                    setDate(Timestamp.fromDate(selectedDate));
                            },
                        })
                    }
                >
                    <Text style={dateTextStyle}>
                        {formatFirebaseDate(date)}
                    </Text>
                </TouchableOpacity>

                <Spacer />

                <Text style={textStyle}>Time *</Text>
                <TouchableOpacity
                    onPress={() =>
                        DateTimePickerAndroid.open({
                            mode: 'time',
                            value: date.toDate(),
                            minimumDate: new Date(),
                            onChange: (_, selectedDate) => {
                                if (selectedDate)
                                    setDate(Timestamp.fromDate(selectedDate));
                            },
                        })
                    }
                >
                    <Text style={dateTextStyle}>
                        {formatFirebaseTime(date)}
                    </Text>
                </TouchableOpacity>
            </>
        );
    }

    // Else IOS
    return (
        <>
            <Text style={textStyle}>Date *</Text>
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                <Text style={dateTextStyle}>{`${formatFirebaseDate(
                    date,
                )}; ${formatFirebaseTime(date)}`}</Text>
            </TouchableOpacity>

            <Modal
                visible={showDatePicker}
                transparent={true}
                animationType="slide"
            >
                <View style={styles.modalViewContainer}>
                    <View style={modalViewContent}>
                        <DateTimePicker
                            value={date.toDate()}
                            mode="datetime"
                            display={
                                Platform.OS === 'ios' ? 'inline' : 'spinner'
                            }
                            onChange={(_, selectedDate) => {
                                if (selectedDate)
                                    setDate(Timestamp.fromDate(selectedDate));
                            }}
                        />
                        <TouchableOpacity
                            onPress={() => setShowDatePicker(false)}
                            style={addButtonStyle}
                        >
                            <Text style={textStyle}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </>
    );
}

export default DateTimeComp;

const styles = StyleSheet.create({
    modalViewContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#000000aa',
    },
});
