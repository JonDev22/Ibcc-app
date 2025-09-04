import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { Color } from '../theme/colors';
import StackHeader from '../components/StackHeader';

function getStackScreenOptions(
    primary: Color,
    bg: Color,
): NativeStackNavigationOptions {
    return {
        headerStyle: {
            backgroundColor: bg,
        },
        headerShadowVisible: true,
        headerTintColor: primary,
        headerTitleStyle: {
            fontSize: 24,
            fontWeight: 'bold',
        },
        // headerTitle: props => <StackHeader {...props} />,
        headerRight: StackHeader,
    };
}

export default getStackScreenOptions;
