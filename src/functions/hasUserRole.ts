import { userGroups } from '../constants/userGroups';
import { IUser } from '../interfaces/IUser';

type UserRole = (typeof userGroups)[keyof typeof userGroups];

function hasUserRole(user: IUser | null, groups: UserRole[]): boolean {
    if (!user?.role) {
        return false;
    }
    return groups.some(group => user.role.includes(group));
}

export default hasUserRole;
