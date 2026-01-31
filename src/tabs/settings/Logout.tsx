import { Text, TouchableOpacity, View } from 'react-native';
import useStyle from '../../hooks/useStyle';
import logOut from '../../functions/database/signOut';
import { colors } from '../../theme/colors';
import { IUser } from '../../interfaces/IUser';

function Logout({ user }: { user: IUser }) {
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
            <Text style={textStyle}>Welcome: {user.firstName} {user.lastName}</Text>
            <TouchableOpacity style={touchableStyle} onPress={logOut}>
                <Text style={{ ...textStyle, color: colors.orange }}>
                    Log Out
                </Text>
            </TouchableOpacity>
        </View>
    );
}

export default Logout;
