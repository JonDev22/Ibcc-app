import { createNativeStackNavigator } from '@react-navigation/native-stack';
import getStackScreenOptions from '../../functions/getStackScreenOptions';
import MinistryList from './stacks/ministries/Ministries';
import Leaders from './stacks/leaders/Leaders';
import LifeGroupList from './stacks/lifegroups/Lifegroups';
import { ChurchNavigationParamList } from './types/churchNavigationTypes';
import ChurchLifeHome from './stacks/churchLifeHome/ChurchLifeHome';
import useColorMap from '../../hooks/useColorMap';

const Stack = createNativeStackNavigator<ChurchNavigationParamList>();

function ChurchLifeStack() {
    const colorMap = useColorMap();

    return (
        <Stack.Navigator
            screenOptions={getStackScreenOptions(
                colorMap.primary,
                colorMap.bgColor,
            )}
        >
            <Stack.Screen name="Church Life" component={ChurchLifeHome} />
            <Stack.Screen name="Ministries" component={MinistryList} />
            <Stack.Screen name="Leaders" component={Leaders} />
            <Stack.Screen name="Lifegroups" component={LifeGroupList} />
        </Stack.Navigator>
    );
}

export default ChurchLifeStack;
