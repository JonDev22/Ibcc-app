import { IEvent } from '../../../interfaces/IEvent';

export type HomeNavigationParamList = {
    Home: undefined;
    'Upcoming Events': undefined;
    'Upcoming Events Details': {
        item: IEvent;
    };
    Ministries: undefined;
    Leaders: undefined;
    Lifegroups: undefined;
};
