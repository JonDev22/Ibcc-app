import {
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { record } from '../../../../functions/getIconFromString';
import Spacer from '../../../../components/Spacer';
import useStyle from '../../../../hooks/useStyle';
import useColorMap from '../../../../hooks/useColorMap';

interface ResourceTypeModalProps {
    open: boolean;
    onClose: () => void;
    setValue: (value: string) => void;
}

function ResourceTypeModal({
    open,
    onClose,
    setValue,
}: ResourceTypeModalProps) {
    const generateStyle = useStyle();
    const colorMap = useColorMap();

    const headerText = generateStyle('font2XL', 'fontBold', 'pb4', 'mb4');
    const textStyle = generateStyle('fontM');
    const buttonText = generateStyle('fontXL', 'fontBold', 'bgTransparent');

    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={open}
            onRequestClose={onClose}
        >
            <View
                style={{
                    backgroundColor: colorMap.bgColor,
                    minHeight: "100%"
                }}
            >
                <ScrollView
                    contentContainerStyle={{
                        ...styles.centeredContainer,
                        backgroundColor: colorMap.bgColor,
                    }}
                >
                    <Text style={headerText}>Select Resource Type:</Text>

                    {Object.entries(record).map(([key]) => (
                        <TouchableOpacity
                            key={key}
                            style={styles.item}
                            onPress={() => {
                                setValue(key);
                                onClose();
                            }}
                        >
                            <Text style={textStyle}>{key.toUpperCase()}</Text>
                        </TouchableOpacity>
                    ))}

                    <Spacer />

                    <TouchableOpacity
                        style={styles.cancelButton}
                        onPress={onClose}
                    >
                        <Text style={buttonText}>Done</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </Modal>
    );
}

export default ResourceTypeModal;

const styles = StyleSheet.create({
    centeredContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 80,
    },
    item: {
        paddingVertical: 10,
    },
    cancelButton: {
        marginTop: 30,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        backgroundColor: '#b60000',
    },
    cancelText: {
        fontSize: 16,
    },
});
