import { FontAwesomeIconName } from '@react-native-vector-icons/fontawesome';

function getTabIcon(name: string): FontAwesomeIconName {
    switch (name) {
        case 'Home':
            return 'home';
        case 'Resources':
            return 'file-text-o';
        default:
            return 'home';
    }
}

export default getTabIcon;
