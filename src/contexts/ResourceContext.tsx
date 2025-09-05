import { createContext, useEffect, useState } from 'react';
import { ICourse } from '../interfaces/ICourse';
import { PropsWithChildren } from 'react';
import getCollectionData from '../functions/getCollectionData';
import { IForm } from '../interfaces/IForm';
import { ILeader } from '../interfaces/ILeader';
import { ILifeGroup } from '../interfaces/ILifeGroup';
import { IMinistry } from '../interfaces/IMinistry';
import { IPassage } from '../interfaces/IPassage';
import { IEvent } from '../interfaces/IEvent';
import { ITbtResource } from '../interfaces/ITbtResource';
import sortByDay from '../functions/sortByDay';
import { IAnnouncement } from '../interfaces/IAnnouncement';
import { Timestamp, where } from '@react-native-firebase/firestore';
import {
    FirebaseAuthTypes,
    getAuth,
    onAuthStateChanged,
} from '@react-native-firebase/auth';
import getSystemSettings from '../functions/getSystemSettings';
import { useColorScheme } from 'react-native';
import { sizeType } from '../types/sizeTypes';

type Theme = 'light' | 'dark';
type Size = 'Small' | 'Medium' | 'Large';

interface IResourceContext {
    courses: ICourse[];
    forms: IForm[];
    leaders: ILeader[];
    lifeGroups: ILifeGroup[];
    ministries: IMinistry[];
    passages: IPassage[];
    events: IEvent[];
    tbt: ITbtResource[];
    announcements: IAnnouncement[];

    user: FirebaseAuthTypes.User | null;

    theme: Theme;
    setTheme: (theme: Theme) => void;

    size: Size;
    setSize: (site: Size) => void;
}

const initialValue: IResourceContext = {
    courses: [],
    forms: [],
    leaders: [],
    lifeGroups: [],
    ministries: [],
    passages: [],
    events: [],
    tbt: [],
    announcements: [],

    user: null,

    theme: 'light',
    setTheme: () => {},

    size: 'Medium',
    setSize: () => {},
};

export const ResourceContext = createContext<IResourceContext>(initialValue);

export const ResourceProvider = ({ children }: PropsWithChildren<{}>) => {
    const auth = getAuth();
    onAuthStateChanged(auth, user => {
        setValue(prev => ({
            ...prev,
            user,
        }));
    });

    const userTheme = useColorScheme();

    const toggleTheme = (theme: Theme) => {
        setValue(prev => ({ ...prev, theme }));
    };

    const toggleSize = (size: Size) => {
        setValue(prev => ({ ...prev, size }));
    };

    const [value, setValue] = useState<IResourceContext>({
        ...initialValue,
        setTheme: toggleTheme,
        setSize: toggleSize,
    });

    useEffect(() => {
        // Get system settings
        getSystemSettings('theme').then(res => {
            const newTheme = res || userTheme;
            setValue(prev => ({
                ...prev,
                theme: newTheme === 'dark' ? 'dark' : 'light',
            }));
        });

        getSystemSettings('textSize').then(res => {
            const validSizes = ['Small', 'Medium', 'Large'];
            const resSize = res && validSizes.includes(res) ? res : 'Medium';
            setValue(prev => ({ ...prev, size: resSize as sizeType }));
        });

        // Fetch data
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
                const events =
                    eventsRes?.sort(
                        (a, b) =>
                            a.date.toDate().getTime() -
                            b.date.toDate().getTime(),
                    ) ?? [];
                const tbt =
                    tbtRes?.sort(
                        (a, b) => a.date.toMillis() - b.date.toMillis(),
                    ) ?? [];
                const announcements =
                    announcementsRes?.sort(
                        (a, b) => b.date.toMillis() - a.date.toMillis(),
                    ) ?? [];

                setValue(prev => ({
                    ...prev,
                    courses,
                    forms: forms ?? [],
                    leaders: leaders ?? [],
                    lifeGroups,
                    ministries: ministries ?? [],
                    passages: passages ?? [],
                    events,
                    tbt,
                    announcements,
                }));
            },
        );
    }, [userTheme]);

    return (
        <ResourceContext.Provider value={value}>
            {children}
        </ResourceContext.Provider>
    );
};
