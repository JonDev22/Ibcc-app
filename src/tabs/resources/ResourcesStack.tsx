import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ResourcesHome from './stacks/ResourcesHome/ResourcesHome';
import CourseDetail from './stacks/CourseDetail/CourseDetail';
import { ResourceNavigationParamList } from './types/navigationTypes';
import Courses from './stacks/Courses/Courses';
import Forms from './stacks/Forms/Forms';
import getStackScreenOptions from '../../functions/getStackScreenOptions';

const Stack = createNativeStackNavigator<ResourceNavigationParamList>();

function ResourcesStack() {
    return (
        <Stack.Navigator screenOptions={getStackScreenOptions()}>
            <Stack.Screen name="Resources" component={ResourcesHome} />
            <Stack.Screen name="Courses" component={Courses} />
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
