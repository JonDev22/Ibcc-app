import React, { use } from 'react';
import { ScrollView } from 'react-native';
import LeaderSection from './LeaderSection';
import { ResourceContext } from '../../../../contexts/ResourceContext';
import Spacer from '../../../../components/Spacer';

const Leaders: React.FC = () => {
    const { leaders } = use(ResourceContext);

    const elders = leaders.filter(leader => leader.type === 'elder');
    const deacons = leaders.filter(leader => leader.type === 'deacon');
    const ministryLeaders = leaders.filter(
        leader => leader.type === 'ministry leader',
    );

    return (
        <ScrollView>
            <LeaderSection title="Elders" data={elders} />
            <LeaderSection title="Deacons" data={deacons} />
            <LeaderSection title="Ministry Leaders" data={ministryLeaders} />
            <Spacer />
        </ScrollView>
    );
};

export default Leaders;
