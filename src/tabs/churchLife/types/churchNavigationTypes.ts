import { ILeader } from '../../../interfaces/ILeader';
import { ILifeGroup } from '../../../interfaces/ILifeGroup';

export type ChurchNavigationParamList = {
    'Church Life': undefined;
    Ministries: undefined;
    Leaders: undefined;
    Leader: { leader?: ILeader };
    Lifegroups: undefined;
    'Life Group': { group?: ILifeGroup };
};
