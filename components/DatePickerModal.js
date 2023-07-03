import React, { useState } from 'react';
import { Modal, View, Button, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const DatePickerModal = ({ isVisible, onConfirm, onCancel }) => {
    const [date, setDate] = useState(new Date());

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
    };

    return (
        <Modal visible={isVisible} animationType="slide">
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <DateTimePicker
                    value={date}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={onChange}
                    maximumDate={new Date()}
                />
                <View style={{ flexDirection: 'row' }}>
                    <Button title="Cancel" onPress={onCancel} />
                    <Button title="Confirm" onPress={() => onConfirm(date)} />
                </View>
            </View>
        </Modal>
    );
};

export default DatePickerModal;
