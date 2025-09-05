import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import useStyle from '../../hooks/useStyle';
import { SafeAreaView } from 'react-native-safe-area-context';
import { use, useState } from 'react';
import { ResourceContext } from '../../contexts/ResourceContext';
import { colors } from '../../theme/colors';

function SettingsView() {
    const generateStyle = useStyle();

    const { theme, setTheme, size, setSize } = use(ResourceContext);
    const [isEnabled, setEnabled] = useState<boolean>(theme === 'dark');

    const sizes: ('Small' | 'Medium' | 'Large')[] = [
        'Small',
        'Medium',
        'Large',
    ];

    const toggleSwitch = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
        setEnabled(!isEnabled);
    };

    const containerStyle = generateStyle('hMinMax');
    const innerView = generateStyle('hPadding4XL', 'wPadding2XL', 'gap7');
    const headerStyle = generateStyle(
        'wPadding3XL',
        'wMargin3XL',
        'font2XL',
        'bold',
    );
    const settingsText = generateStyle('fontM', 'bold');
    const touchableTextSize = generateStyle('fontS');
    const touchableStyle = generateStyle(
        'borderPrimary',
        'border1',
        'hPaddingXL',
        'wPaddingM',
    );
    const touchableStyleActive = generateStyle(
        'borderPrimary',
        'border1',
        'hPaddingXL',
        'wPaddingM',
    );

    // npm install @react-native-async-storage/async-storage

    return (
        <SafeAreaView style={containerStyle}>
            <View style={innerView}>
                <Text style={headerStyle}>Settings</Text>

                <View style={styles.settingsView}>
                    <Text style={settingsText}>Dark Mode:</Text>
                    <Switch value={isEnabled} onValueChange={toggleSwitch} />
                </View>

                <View style={styles.settingsView}>
                    <Text style={settingsText}>Dark Mode:</Text>
                    <View style={styles.buttonView}>
                        {sizes.map(item => (
                            <TouchableOpacity
                                key={item}
                                style={
                                    item === size
                                        ? {
                                              ...touchableStyleActive,
                                              ...styles.activeButton,
                                          }
                                        : touchableStyle
                                }
                                onPress={() => setSize(item)}
                            >
                                <Text
                                    style={
                                        item === size
                                            ? {
                                                  ...touchableTextSize,
                                                  ...styles.activeText,
                                              }
                                            : touchableTextSize
                                    }
                                >
                                    {item}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default SettingsView;

const styles = StyleSheet.create({
    settingsView: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    buttonView: {
        flexDirection: 'row',
    },
    activeButton: {
        borderColor: colors.orange,
    },
    activeText: {
        color: colors.orange,
    },
});
