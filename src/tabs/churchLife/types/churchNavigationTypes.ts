import { ILeader } from '../../../interfaces/ILeader';
import { ILifeGroup } from '../../../interfaces/ILifeGroup';
import { IMinistry } from '../../../interfaces/IMinistry';

export type ChurchNavigationParamList = {
    'Church Life': undefined;
    Ministries: undefined;
    Ministry: { ministry?: IMinistry };
    Leaders: undefined;
    Leader: { leader?: ILeader };
    Lifegroups: undefined;
    'Life Group': { group?: ILifeGroup };
};
