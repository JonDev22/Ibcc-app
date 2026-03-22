import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Audio from './Audio';
import getStackScreenOptions from '../../functions/getStackScreenOptions';
import useColorMap from '../../hooks/useColorMap';
import { AudioNavigationParamList } from './types/AudioNavigationParamList';
import AddAudio from './AddAudio';

const Stack = createNativeStackNavigator<AudioNavigationParamList>();

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
            <Stack.Screen name="Add Audio" component={AddAudio} />
        </Stack.Navigator>
    );
}

export default AudioStack;
