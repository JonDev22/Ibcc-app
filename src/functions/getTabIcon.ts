import { FontAwesomeIconName } from '@react-native-vector-icons/fontawesome';

function getTabIcon(name: string): FontAwesomeIconName {
    switch (name) {
        case 'HomeTab':
            return 'home';
        case 'AudioPlayerTab':
            return 'music';
        case 'ResourcesTab':
            return 'file-text-o';
        case 'ChurchLifeTab':
            return 'users';
        default:
            return 'home';
    }
}

export default getTabIcon;
