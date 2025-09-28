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
import { ITbtAtHome } from '../interfaces/ITbtAtHome';
import sortByDate from '../functions/sorting/sortByDate';
import sortByOrder from '../functions/sorting/sortByOrder';
import sortByAddedDate from '../functions/sorting/sortByAddedDate';

export interface IResourceStorage {
    courses: ICourse[];
    forms: IForm[];
    leaders: ILeader[];
    lifeGroups: ILifeGroup[];
    ministries: IMinistry[];
    passages: IPassage[];
    events: IEvent[];
    tbt: ITbtResource[];
    tbtAtHome: ITbtAtHome[];
    announcements: IAnnouncement[];

    addEvent: (event: IEvent) => void;
    removeEvent: (event: IEvent) => void;
    editEvent: (event: IEvent) => void;

    addAnnouncement: (event: IAnnouncement) => void;
    removeAnnouncement: (event: IAnnouncement) => void;
    editAnnouncement: (event: IAnnouncement) => void;

    setCourses: (courses: ICourse[]) => void;
    setForms: (forms: IForm[]) => void;
    setLeaders: (leaders: ILeader[]) => void;
    setLifeGroups: (lifegroups: ILifeGroup[]) => void;
    setMinistries: (ministries: IMinistry[]) => void;
    setPassages: (passages: IPassage[]) => void;
    setEvents: (events: IEvent[]) => void;
    setTbt: (tbtResources: ITbtResource[]) => void;
    setTbtAtHome: (tbtAtHome: ITbtAtHome[]) => void;
    setAnnouncements: (announcements: IAnnouncement[]) => void;

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
    tbtAtHome: [],
    announcements: [],

    addEvent: (event: IEvent) => {
        set({
            events: [...get().events, event].sort((a, b) =>
                sortByDate<IEvent>(a, b, 'asc'),
            ),
        });
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
    editEvent: (event: IEvent) => {
        set(state => ({
            events: state.events.map(item =>
                item.id === event.id ? event : item,
            ),
        }));
    },

    addAnnouncement: (announcement: IAnnouncement) => {
        set({
            announcements: [...get().announcements, announcement].sort((a, b) =>
                sortByDate<IAnnouncement>(a, b, 'desc'),
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
    editAnnouncement: (announcement: IAnnouncement) => {
        set(state => ({
            announcements: state.announcements.map(item =>
                item.id === announcement.id ? announcement : item,
            ),
        }));
    },

    setCourses: (courses: ICourse[]) =>
        set({ courses: courses.sort(sortByOrder<ICourse>) }),
    setForms: (forms: IForm[]) => set({ forms }),
    setLeaders: (leaders: ILeader[]) => set({ leaders }),
    setLifeGroups: (lifeGroups: ILifeGroup[]) =>
        set({ lifeGroups: sortByDay<ILifeGroup>(lifeGroups) }),
    setMinistries: (ministries: IMinistry[]) => set({ ministries }),
    setPassages: (passages: IPassage[]) => set({ passages }),
    setEvents: (events: IEvent[]) =>
        set({ events: events.sort((a, b) => sortByDate<IEvent>(a, b, 'asc')) }),
    setTbt: (tbt: ITbtResource[]) =>
        set({
            tbt: tbt.sort((a, b) => sortByDate<ITbtResource>(a, b, 'asc')),
        }),
    setTbtAtHome: (tbtAtHome: ITbtAtHome[]) =>
        set({ tbtAtHome: tbtAtHome.sort(sortByAddedDate<ITbtAtHome>) }),
    setAnnouncements: (announcements: IAnnouncement[]) =>
        set({
            announcements: announcements.sort((a, b) =>
                sortByDate<IAnnouncement>(a, b, 'desc'),
            ),
        }),

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
            getCollectionData<ITbtAtHome>('tbtAtHome'),
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
                tbtAtHomeRes,
                announcementsRes,
            ]) => {
                const courses = coursesRef?.sort(sortByOrder<ICourse>) ?? [];
                const lifeGroups = lifeGroupsRes
                    ? sortByDay<ILifeGroup>(lifeGroupsRes)
                    : [];
                const events =
                    eventsRes?.sort((a, b) =>
                        sortByDate<IEvent>(a, b, 'asc'),
                    ) ?? [];
                const tbt =
                    tbtRes?.sort((a, b) =>
                        sortByDate<ITbtResource>(a, b, 'desc'),
                    ) ?? [];
                const tbtAtHome =
                    tbtAtHomeRes?.sort(sortByAddedDate<ITbtAtHome>) ?? [];
                const announcements =
                    announcementsRes?.sort((a, b) =>
                        sortByDate(a, b, 'desc'),
                    ) ?? [];

                set({
                    courses,
                    forms: forms ?? [],
                    leaders: leaders ?? [],
                    lifeGroups,
                    ministries: ministries ?? [],
                    passages: passages ?? [],
                    events,
                    tbt,
                    tbtAtHome,
                    announcements,
                });
            },
        );
    },
}));

export default resourcesStorage;
