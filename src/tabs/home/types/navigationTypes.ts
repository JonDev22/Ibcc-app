import { IAnnouncement } from '../../../interfaces/IAnnouncement';
import { IEvent } from '../../../interfaces/IEvent';

export type HomeNavigationParamList = {
    Home: undefined;
    'Upcoming Events': undefined;
    'Upcoming Events Details': {
        item: IEvent;
    };
    Announcements: undefined;
    'Announcements Details': {
        announcement: IAnnouncement;
    };
    'New Event': undefined;
    'New Announcement': undefined;
};
