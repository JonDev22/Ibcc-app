import { ICourse } from '../../../interfaces/ICourse';
import { ITbtAtHome } from '../../../interfaces/ITbtAtHome';

export type ResourceNavigationParamList = {
    Resources: undefined;
    TBT: undefined;
    'TBT@Home': undefined;
    Courses: undefined;
    'Course Detail': {
        item: ICourse;
    };
    Forms: undefined;
    'New TBT At Home Resource': { tbtAtHome?: ITbtAtHome };
    'New TBT Resource': undefined;
};
