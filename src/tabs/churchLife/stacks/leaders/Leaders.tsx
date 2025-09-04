import React, { use } from 'react';
import { ScrollView, View } from 'react-native';
import LeaderSection from './LeaderSection';
import { ResourceContext } from '../../../../contexts/ResourceContext';
import Spacer from '../../../../components/Spacer';
import useStyle from '../../../../hooks/useStyle';

const Leaders: React.FC = () => {
    const generateStyle = useStyle();
    const { leaders } = use(ResourceContext);

    const elders = leaders.filter(leader => leader.type === 'elder');
    const deacons = leaders.filter(leader => leader.type === 'deacon');
    const ministryLeaders = leaders.filter(
        leader => leader.type === 'ministry leader',
    );

    const containerStyle = generateStyle('hMinMax');

    return (
        <View style={containerStyle}>
            <ScrollView>
                <LeaderSection title="Elders" data={elders} />
                <LeaderSection title="Deacons" data={deacons} />
                <LeaderSection
                    title="Ministry Leaders"
                    data={ministryLeaders}
                />
                <Spacer />
            </ScrollView>
        </View>
    );
};

export default Leaders;
