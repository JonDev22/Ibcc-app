import { createContext, useEffect, useState } from 'react';
import { ICourse } from '../interfaces/ICourse';
import { PropsWithChildren } from 'react';
import getCollectionData from '../functions/getCollectionData';
import { IForm } from '../interfaces/IForm';
import { ILeader } from '../interfaces/ILeader';
import { ILifeGroup } from '../interfaces/ILifeGroup';
import { IMinistry } from '../interfaces/IMinistry';

interface IResourceContext {
    courses: ICourse[];
    forms: IForm[];
    leaders: ILeader[];
    lifeGroups: ILifeGroup[];
    ministries: IMinistry[];
}

const initialValue: IResourceContext = {
    courses: [],
    forms: [],
    leaders: [],
    lifeGroups: [],
    ministries: [],
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

        getCollectionData<ILifeGroup>('lifegroups').then(lifeGroups => {
            if (lifeGroups) {
                setValue(prev => ({ ...prev, lifeGroups }));
            }
        });

        getCollectionData<IMinistry>('ministries').then(ministries => {
            if (ministries) {
                setValue(prev => ({ ...prev, ministries }));
            }
        });
    }, []);

    return (
        <ResourceContext.Provider value={value}>
            {children}
        </ResourceContext.Provider>
    );
};
