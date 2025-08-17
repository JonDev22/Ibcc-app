import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors } from '../../theme/colors';
import ResourcesHome from './stacks/ResourcesHome/ResourcesHome';
import CourseDetail from './stacks/CourseDetail/CourseDetail';
import { ResourceNavigationParamList } from './types/navigationTypes';
import Courses from './stacks/Courses/Courses';
import Forms from './stacks/Forms/Forms';

const Stack = createNativeStackNavigator<ResourceNavigationParamList>();

function ResourcesStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: colors.lightPetrolBlue,
                },
                headerTintColor: 'orange',
                headerTitleStyle: {
                    fontSize: 24,
                    fontWeight: 'bold',
                },
            }}
        >
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
