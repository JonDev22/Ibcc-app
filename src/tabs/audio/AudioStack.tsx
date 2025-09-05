import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Audio from './Audio';
import getStackScreenOptions from '../../functions/getStackScreenOptions';
import useColorMap from '../../hooks/useColorMap';

const Stack = createNativeStackNavigator();

function AudioStack() {
    const colorMap = useColorMap();

    return (
        <Stack.Navigator
            screenOptions={getStackScreenOptions(
                colorMap.primary,
                colorMap.bgColor,
            )}
        >
            <Stack.Screen name="Audio Player" component={Audio} />
        </Stack.Navigator>
    );
}

export default AudioStack;
