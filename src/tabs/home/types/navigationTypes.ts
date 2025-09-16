import { IAnnouncement } from '../../../interfaces/IAnnouncement';
import { IEvent } from '../../../interfaces/IEvent';

export type HomeNavigationParamList = {
    Home: undefined;
    'Upcoming Events': undefined;
    'Upcoming Events Details': {
        id: string;
    };
    Announcements: undefined;
    'Announcements Details': {
        id: string;
    };
    'New Event': { event?: IEvent };
    'New Announcement': { announcement?: IAnnouncement };
};
