import React from 'react';
import { ScrollView, View } from 'react-native';
import LeaderSection from './LeaderSection';
import Spacer from '../../../../components/Spacer';
import useStyle from '../../../../hooks/useStyle';
import resourcesStorage from '../../../../storage/resourcesStorage';
import AddButton from '../../../../components/AddButton';
import { useNavigation } from '@react-navigation/native';
import { ChurchNavigationType } from '../../types/churchNavigationProps';

const Leaders: React.FC = () => {
    const generateStyle = useStyle();
    const { leaders } = resourcesStorage();

    const navigate = useNavigation<ChurchNavigationType<'Leader'>>();

    const elders = leaders.filter(leader => leader.type === 'elder');
    const deacons = leaders.filter(leader => leader.type === 'deacon');
    const ministryLeaders = leaders.filter(
        leader => leader.type === 'ministry leader',
    );
    const others = leaders.filter(
        leader =>
            leader.type !== 'elder' &&
            leader.type !== 'deacon' &&
            leader.type !== 'ministry leader',
    );

    const containerStyle = generateStyle('hMinMax');

    return (
        <View style={containerStyle}>
            <ScrollView>
                {elders.length > 0 && (
                    <LeaderSection title="Elders" data={elders} />
                )}
                {deacons.length > 0 && (
                    <LeaderSection title="Deacons" data={deacons} />
                )}
                {ministryLeaders.length > 0 && (
                    <LeaderSection
                        title="Ministry Leaders"
                        data={ministryLeaders}
                    />
                )}
                {others.length > 0 && (
                    <LeaderSection title="Others" data={others} />
                )}
                <Spacer />

                <AddButton
                    handleAddEvent={() => navigate.navigate('Leader', {})}
                    buttonLabel="Add Leader"
                />

                <Spacer />
            </ScrollView>
        </View>
    );
};

export default Leaders;
