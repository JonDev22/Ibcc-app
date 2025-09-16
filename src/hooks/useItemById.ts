import { IAnnouncement } from '../interfaces/IAnnouncement';
import { IEvent } from '../interfaces/IEvent';
import resourcesStorage from '../storage/resourcesStorage';

function useItemById(
    id: string,
    type: 'events' | 'announcements',
): IEvent | IAnnouncement | undefined {
    return resourcesStorage(s => {
        const list = s[type];
        return list.find(i => i.id === id);
    });
}

export default useItemById;
