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
import resourcesStorage from '../../storage/resourcesStorage';
import { useEffect } from 'react';
import getCollectionData from '../../functions/getCollectionData';
import { ITbtResource } from '../../interfaces/ITbtResource';
import { ICourse } from '../../interfaces/ICourse';
import { IForm } from '../../interfaces/IForm';
import { ITbtAtHome } from '../../interfaces/ITbtAtHome';
import NewTbtAtHome from './stacks/TbtAtHome/NewTBTAtHome';
import NewTbt from './stacks/tbt/NewTBT';

const Stack = createNativeStackNavigator<ResourceNavigationParamList>();

function ResourcesStack() {
    const colorMap = useColorMap();

    const {
        tbt,
        setTbt,
        tbtAtHome,
        setTbtAtHome,
        courses,
        setCourses,
        forms,
        setForms,
    } = resourcesStorage();

    useEffect(() => {
        if (tbt.length === 0) {
            getCollectionData<ITbtResource>('tbtResources').then(res =>
                res ? setTbt(res) : null,
            );
        }
        if (courses.length === 0) {
            getCollectionData<ICourse>('courses').then(res =>
                res ? setCourses(res) : null,
            );
        }
        if (tbtAtHome.length === 0) {
            getCollectionData<ITbtAtHome>('tbtAtHome').then(res =>
                res ? setTbtAtHome(res) : null,
            );
        }
        if (forms.length === 0) {
            getCollectionData<IForm>('forms').then(res =>
                res ? setForms(res) : null,
            );
        }
    }, [
        courses.length,
        forms.length,
        setCourses,
        setForms,
        setTbt,
        setTbtAtHome,
        tbt.length,
        tbtAtHome.length,
    ]);

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
            <Stack.Screen
                options={{ title: 'New TBT@Home' }}
                name="New TBT At Home Resource"
                component={NewTbtAtHome}
            />
            <Stack.Screen
                options={{ title: 'New TBT Resource' }}
                name="New TBT Resource"
                component={NewTbt}
            />
        </Stack.Navigator>
    );
}

export default ResourcesStack;
