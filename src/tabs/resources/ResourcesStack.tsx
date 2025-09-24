import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ResourcesHome from './stacks/ResourcesHome/ResourcesHome';
import CourseDetail from './stacks/CourseDetail/CourseDetail';
import { ResourceNavigationParamList } from './types/navigationTypes';
import Courses from './stacks/Courses/Courses';
import Forms from './stacks/Forms/Forms';
import getStackScreenOptions from '../../functions/getStackScreenOptions';
import TBT from './stacks/tbt/TBT';
import useColorMap from '../../hooks/useColorMap';
import TbtAtHome from './stacks/TbtAtHome/TbtAtHome';

const Stack = createNativeStackNavigator<ResourceNavigationParamList>();

function ResourcesStack() {
    const colorMap = useColorMap();

    return (
        <Stack.Navigator
            screenOptions={getStackScreenOptions(
                colorMap.primary,
                colorMap.bgColor,
            )}
        >
            <Stack.Screen name="Resources" component={ResourcesHome} />
            <Stack.Screen name="Courses" component={Courses} />
            <Stack.Screen name="TBT" component={TBT} />
            <Stack.Screen name="TBT@Home" component={TbtAtHome} />
            <Stack.Screen
                options={{ title: '' }}
                name="Course Detail"
                component={CourseDetail}
            />
            <Stack.Screen
                options={{ title: '' }}
                name="Forms"
                component={Forms}
            />
        </Stack.Navigator>
    );
}

export default ResourcesStack;
