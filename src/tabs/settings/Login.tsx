import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import authenticate from '../../functions/database/authenticate';
import { useState } from 'react';
import useStyle from '../../hooks/useStyle';
import useColorMap from '../../hooks/useColorMap';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const colorMap = useColorMap();

    const generateStyle = useStyle();

    const container = generateStyle('gap3', 'hPadding2XL');
    const textStyle = generateStyle();
    const inputStyle = generateStyle(
        'border1',
        'hPaddingM',
        'wPaddingM',
        'rounded2',
    );
    const touchableStyle = generateStyle(
        'border1',
        'borderPrimary',
        'hPaddingL',
        'wPaddingL',
        'wMarginL',
        'rounded2',
    );

    const authenticateUser = () => {
        authenticate(username, password).then(res => {
            if (res !== 'success') {
                Alert.alert(res);
            }
        });
    };

    return (
        <View style={container}>
            <Text style={textStyle}>Email:</Text>
            <TextInput
                placeholder="email"
                autoCapitalize="none"
                style={inputStyle}
                placeholderTextColor={colorMap.secondary}
                value={username}
                onChangeText={setUsername}
            />
            <Text style={textStyle}>Password:</Text>
            <TextInput
                placeholder="password"
                secureTextEntry={true}
                style={inputStyle}
                placeholderTextColor={colorMap.secondary}
                value={password}
                onChangeText={setPassword}
            />
            <TouchableOpacity onPress={authenticateUser} style={touchableStyle}>
                <Text style={textStyle}>Log In</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Login;
