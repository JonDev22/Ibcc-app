import { Text, View } from 'react-native';
import useStyle from '../../hooks/useStyle';
import logOut from '../../functions/database/signOut';
import { IUser } from '../../interfaces/IUser';
import AddButton from '../../components/AddButton';
import Spacer from '../../components/Spacer';

function Logout({ user }: { user: IUser }) {
    const generateStyle = useStyle();

    const container = generateStyle('gap3');
    const textStyle = generateStyle('fontS');

    return (
        <View style={container}>
            <Text style={textStyle}>
                Welcome: {user.firstName} {user.lastName}
            </Text>
            <Spacer />
            <AddButton handleAddEvent={logOut} buttonLabel="Log Out" />
        </View>
    );
}

export default Logout;
