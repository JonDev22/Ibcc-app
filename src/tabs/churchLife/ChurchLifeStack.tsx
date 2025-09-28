import { createNativeStackNavigator } from '@react-navigation/native-stack';
import getStackScreenOptions from '../../functions/getStackScreenOptions';
import MinistryList from './stacks/ministries/Ministries';
import Leaders from './stacks/leaders/Leaders';
import LifeGroupList from './stacks/lifegroups/Lifegroups';
import { ChurchNavigationParamList } from './types/churchNavigationTypes';
import ChurchLifeHome from './stacks/churchLifeHome/ChurchLifeHome';
import useColorMap from '../../hooks/useColorMap';
import resourcesStorage from '../../storage/resourcesStorage';
import getCollectionData from '../../functions/getCollectionData';
import { ILifeGroup } from '../../interfaces/ILifeGroup';
import { ILeader } from '../../interfaces/ILeader';
import { IMinistry } from '../../interfaces/IMinistry';
import { useEffect } from 'react';

const Stack = createNativeStackNavigator<ChurchNavigationParamList>();

function ChurchLifeStack() {
    const colorMap = useColorMap();

    const {
        lifeGroups,
        setLifeGroups,
        leaders,
        setLeaders,
        ministries,
        setMinistries,
    } = resourcesStorage();

    useEffect(() => {
        if (lifeGroups.length === 0) {
            getCollectionData<ILifeGroup>('lifegroups').then(res =>
                res ? setLifeGroups(res) : null,
            );
        }
        if (leaders.length === 0) {
            getCollectionData<ILeader>('leaders').then(res =>
                res ? setLeaders(res) : null,
            );
        }
        if (ministries.length === 0) {
            getCollectionData<IMinistry>('ministries').then(res =>
                res ? setMinistries(res) : null,
            );
        }
    }, [
        leaders.length,
        lifeGroups.length,
        ministries.length,
        setLeaders,
        setLifeGroups,
        setMinistries,
    ]);

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
