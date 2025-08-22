import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { colors } from '../theme/colors';
import StackHeader from '../components/StackHeader';

function getStackScreenOptions(): NativeStackNavigationOptions {
    return {
        headerStyle: {
            backgroundColor: colors.white50,
        },
        headerShadowVisible: true,
        headerTintColor: colors.petrolBlue,
        headerTitleStyle: {
            fontSize: 24,
            fontWeight: 'bold',
        },
        // headerTitle: props => <StackHeader {...props} />,
        headerRight: StackHeader,
    };
}

export default getStackScreenOptions;
