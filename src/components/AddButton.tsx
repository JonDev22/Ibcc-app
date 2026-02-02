import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import useColorMap from '../hooks/useColorMap';

interface AddButtonProps {
    handleAddEvent: () => void;
}

function AddButton({ handleAddEvent }: AddButtonProps) {
    const colorMap = useColorMap();

    return (
        <TouchableOpacity
            style={{
                ...styles.fab,
                backgroundColor: colorMap.secondary,
            }}
            onPress={handleAddEvent}
        >
            <Text style={{ color: colorMap.color }}>+</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        width: 50,
        height: 50,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default AddButton;
