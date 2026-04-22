import { Alert, Text, TextInput, View } from 'react-native';
import authenticate from '../../functions/database/authenticate';
import { useState } from 'react';
import useStyle from '../../hooks/useStyle';
import useColorMap from '../../hooks/useColorMap';
import Spacer from '../../components/Spacer';
import AddButton from '../../components/AddButton';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const colorMap = useColorMap();

    const generateStyle = useStyle();

    const container = generateStyle('gap3', 'hPadding2XL');
    const textStyle = generateStyle('primary');
    const inputStyle = generateStyle(
        'border1',
        'hPadding2XL',
        'wPaddingM',
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
                placeholderTextColor={colorMap.third}
                value={username}
                onChangeText={setUsername}
            />
            <Text style={textStyle}>Password:</Text>
            <TextInput
                placeholder="password"
                secureTextEntry={true}
                style={inputStyle}
                placeholderTextColor={colorMap.third}
                value={password}
                onChangeText={setPassword}
            />
            <Spacer />
            <AddButton handleAddEvent={authenticateUser} buttonLabel="Log In" />
        </View>
    );
}

export default Login;
