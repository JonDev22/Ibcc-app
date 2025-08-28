export interface ICourse {
    description: string;
    scope: string;
    title: string;
    course: string;
    resources?: {
        [key: string]: {
            url: string;
        };
    };
    externalResources?: {
        [key: string]: {
            url: string;
        };
    };
    relatedResources?: {
        [key: string]: {
            url: string;
        };
    };
    sortOrder: number;
}
