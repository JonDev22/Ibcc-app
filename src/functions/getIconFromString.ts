import { FontAwesomeIconName } from '@react-native-vector-icons/fontawesome';

const record: Record<string, FontAwesomeIconName> = {
    music: 'music',
    home: 'home',
    user: 'user',
    users: 'users',
    camera: 'camera',
    sound: 'headphones',
    calendar: 'calendar',
    folder: 'folder',
    bookmark: 'bookmark',
    comment: 'comment',
    comments: 'comments-o',
    coffee: 'coffee',
    file: 'file-text-o',
    clock: 'clock-o',
    map: 'map-pin',
    poster: 'object-group',
};

const isKey = (key: string): key is keyof typeof record => key in record;

function getIconFromString(name: string): FontAwesomeIconName {
    return isKey(name) ? record[name] : 'question';
}

export default getIconFromString;
