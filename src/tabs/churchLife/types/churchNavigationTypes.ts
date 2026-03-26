import { ILifeGroup } from '../../../interfaces/ILifeGroup';

export type ChurchNavigationParamList = {
    'Church Life': undefined;
    Ministries: undefined;
    Leaders: undefined;
    Lifegroups: undefined;
    'Life Group': { group?: ILifeGroup };
};
