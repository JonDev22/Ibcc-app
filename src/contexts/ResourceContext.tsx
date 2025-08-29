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

interface IResourceContext {
    courses: ICourse[];
    forms: IForm[];
    leaders: ILeader[];
    lifeGroups: ILifeGroup[];
    ministries: IMinistry[];
    passages: IPassage[];
    events: IEvent[];
    tbt: ITbtResource[];
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
};

export const ResourceContext = createContext<IResourceContext>(initialValue);

export const ResourceProvider = ({ children }: PropsWithChildren<{}>) => {
    const [value, setValue] = useState<IResourceContext>(initialValue);

    useEffect(() => {
        getCollectionData<ICourse>('courses').then(coursesRes => {
            if (coursesRes) {
                const courses = coursesRes.sort(
                    (a, b) => a.sortOrder - b.sortOrder,
                );
                setValue(prev => ({ ...prev, courses }));
            }
        });

        getCollectionData<IForm>('forms').then(forms => {
            if (forms) {
                setValue(prev => ({ ...prev, forms }));
            }
        });

        getCollectionData<ILeader>('leaders').then(leaders => {
            if (leaders) {
                setValue(prev => ({ ...prev, leaders }));
            }
        });

        getCollectionData<ILifeGroup>('lifegroups').then(lifeGroupsRes => {
            if (lifeGroupsRes) {
                const lifeGroups = sortByDay<ILifeGroup>(lifeGroupsRes);
                setValue(prev => ({ ...prev, lifeGroups }));
            }
        });

        getCollectionData<IMinistry>('ministries').then(ministries => {
            if (ministries) {
                setValue(prev => ({ ...prev, ministries }));
            }
        });

        getCollectionData<IPassage>('passages').then(passages => {
            if (passages) {
                setValue(prev => ({ ...prev, passages }));
            }
        });

        getCollectionData<IEvent>('events').then(eventsRes => {
            if (eventsRes) {
                const events = eventsRes.sort(
                    (a, b) =>
                        a.date.toDate().getTime() - b.date.toDate().getTime(),
                );
                setValue(prev => ({ ...prev, events }));
            }
        });

        getCollectionData<ITbtResource>('tbtResources').then(tbt => {
            if (tbt) {
                setValue(prev => ({ ...prev, tbt }));
            }
        });
    }, []);

    return (
        <ResourceContext.Provider value={value}>
            {children}
        </ResourceContext.Provider>
    );
};
