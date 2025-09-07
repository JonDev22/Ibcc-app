import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { Text, TouchableOpacity, View } from 'react-native';
import useStyle from '../../hooks/useStyle';
import logOut from '../../functions/database/signOut';

function Logout({ user }: { user: FirebaseAuthTypes.User }) {
    const generateStyle = useStyle();

    const container = generateStyle('gap3');
    const textStyle = generateStyle('fontS');
    const touchableStyle = generateStyle(
        'border1',
        'borderPrimary',
        'hPaddingL',
        'wPaddingL',
        'wMarginL',
        'rounded2',
    );

    return (
        <View style={container}>
            <Text style={textStyle}>Welcome: {user.email}</Text>
            <TouchableOpacity style={touchableStyle} onPress={logOut}>
                <Text style={textStyle}>Log Out</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Logout;
