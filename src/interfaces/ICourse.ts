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
        [key: string]: string;
    };
    relatedResources?: {
        [key: string]: string;
    };
    sortOrder: number;
}
