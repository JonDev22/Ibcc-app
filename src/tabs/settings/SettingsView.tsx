import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import useStyle from '../../hooks/useStyle';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { colors } from '../../theme/colors';
import Login from './Login';
import Logout from './Logout';
import saveSystemSettings from '../../functions/saveSystemSettings';
import { sizeType } from '../../types/sizeTypes';
import userSettings from '../../storage/userSettings';

function SettingsView() {
    const generateStyle = useStyle();

    const { theme, setTheme, size, setSize, user } = userSettings();
    const [isEnabled, setEnabled] = useState<boolean>(theme === 'dark');

    const sizes: sizeType[] = ['Small', 'Medium', 'Large'];

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

    // Set storage functions
    const setStorageTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        saveSystemSettings('theme', newTheme);
        setTheme(newTheme);
        setEnabled(!isEnabled);
    };

    const setStorageSize = (newSize: sizeType) => {
        saveSystemSettings('textSize', newSize);
        setSize(newSize);
    };

    return (
        <SafeAreaView style={containerStyle}>
            <View style={innerView}>
                <Text style={headerStyle}>Settings</Text>

                <View style={styles.settingsView}>
                    <Text style={settingsText}>Dark Mode:</Text>
                    <Switch value={isEnabled} onValueChange={setStorageTheme} />
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
                                onPress={() => setStorageSize(item)}
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

                <View style={styles.settingsView}>
                    <Text style={settingsText}>Login:</Text>
                </View>

                <Text style={touchableTextSize}>
                    Login is designed for admins only!
                </Text>

                {user ? <Logout user={user} /> : <Login />}
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
