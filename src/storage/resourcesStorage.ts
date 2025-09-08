import { create } from 'zustand';
import { ICourse } from '../interfaces/ICourse';
import { IForm } from '../interfaces/IForm';
import { ILeader } from '../interfaces/ILeader';
import { ILifeGroup } from '../interfaces/ILifeGroup';
import { IMinistry } from '../interfaces/IMinistry';
import { IPassage } from '../interfaces/IPassage';
import { IEvent } from '../interfaces/IEvent';
import { ITbtResource } from '../interfaces/ITbtResource';
import { IAnnouncement } from '../interfaces/IAnnouncement';
import getCollectionData from '../functions/getCollectionData';
import { Timestamp, where } from '@react-native-firebase/firestore';
import sortByDay from '../functions/sortByDay';

interface IResourceStorage {
    courses: ICourse[];
    forms: IForm[];
    leaders: ILeader[];
    lifeGroups: ILifeGroup[];
    ministries: IMinistry[];
    passages: IPassage[];
    events: IEvent[];
    tbt: ITbtResource[];
    announcements: IAnnouncement[];

    addEvent: (event: IEvent) => void;
    removeEvent: (event: IEvent) => void;

    addAnnouncement: (event: IAnnouncement) => void;
    removeAnnouncement: (event: IAnnouncement) => void;

    fetchAllData: () => void;
}

const resourcesStorage = create<IResourceStorage>((set, get) => ({
    courses: [],
    forms: [],
    leaders: [],
    lifeGroups: [],
    ministries: [],
    passages: [],
    events: [],
    tbt: [],
    announcements: [],

    addEvent: (event: IEvent) => {
        set({ events: [...get().events, event].sort(sortEvents) });
    },
    removeEvent: (event: IEvent) => {
        set({
            events: get().events.filter(
                item =>
                    !(
                        item.id === event.id &&
                        item.title === event.title &&
                        item.date === event.date
                    ),
            ),
        });
    },
    addAnnouncement: (announcement: IAnnouncement) => {
        set({
            announcements: [...get().announcements, announcement].sort(
                sortAnnouncements,
            ),
        });
    },
    removeAnnouncement: (announcement: IAnnouncement) => {
        set({
            announcements: get().announcements.filter(
                item =>
                    !(
                        item.id === announcement.id &&
                        item.title === announcement.title &&
                        item.date === announcement.date
                    ),
            ),
        });
    },
    fetchAllData: () => {
        const now = Timestamp.fromDate(new Date());

        Promise.all([
            getCollectionData<ICourse>('courses'),
            getCollectionData<IForm>('forms'),
            getCollectionData<ILeader>('leaders'),
            getCollectionData<ILifeGroup>('lifegroups'),
            getCollectionData<IMinistry>('ministries'),
            getCollectionData<IPassage>('passages'),
            getCollectionData<IEvent>('events', where('date', '>=', now)),
            getCollectionData<ITbtResource>('tbtResources'),
            getCollectionData<IAnnouncement>('announcements'),
        ]).then(
            ([
                coursesRef,
                forms,
                leaders,
                lifeGroupsRes,
                ministries,
                passages,
                eventsRes,
                tbtRes,
                announcementsRes,
            ]) => {
                const courses =
                    coursesRef?.sort((a, b) => a.sortOrder - b.sortOrder) ?? [];
                const lifeGroups = lifeGroupsRes
                    ? sortByDay<ILifeGroup>(lifeGroupsRes)
                    : [];
                const events = eventsRes?.sort(sortEvents) ?? [];
                const tbt =
                    tbtRes?.sort(
                        (a, b) => a.date.toMillis() - b.date.toMillis(),
                    ) ?? [];
                const announcements =
                    announcementsRes?.sort(sortAnnouncements) ?? [];

                set({
                    courses,
                    forms: forms ?? [],
                    leaders: leaders ?? [],
                    lifeGroups,
                    ministries: ministries ?? [],
                    passages: passages ?? [],
                    events,
                    tbt,
                    announcements,
                });
            },
        );
    },
}));

export default resourcesStorage;

const sortEvents = (a: IEvent, b: IEvent) =>
    a.date.toMillis() - b.date.toMillis();

const sortAnnouncements = (a: IAnnouncement, b: IAnnouncement) =>
    b.date.toMillis() - a.date.toMillis();
