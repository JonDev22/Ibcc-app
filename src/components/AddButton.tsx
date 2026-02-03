import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import useColorMap from '../hooks/useColorMap';

interface AddButtonProps {
    handleAddEvent: () => void;
    buttonLabel?: string;
}

function AddButton({ handleAddEvent, buttonLabel }: AddButtonProps) {
    const colorMap = useColorMap();

    return (
        <View style={styles.paddedView}>
            <TouchableOpacity style={styles.fab} onPress={handleAddEvent}>
                <Text
                    style={{
                        color: colorMap.primary,
                    }}
                >
                    {buttonLabel ?? '#'}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    paddedView: {
        paddingHorizontal: 24,
        paddingBottom: 20,
    },
    fab: {
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#a70000',
        borderWidth: 2,
        paddingHorizontal: 3,
        paddingVertical: 5,
    },
});

export default AddButton;
