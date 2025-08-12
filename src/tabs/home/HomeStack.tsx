import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './stacks/home/Home';

const Stack = createNativeStackNavigator();

function HomeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
    );
}

export default HomeStack;
