import { FontAwesomeIconName } from '@react-native-vector-icons/fontawesome';

function getTabIcon(name: string): FontAwesomeIconName {
    switch (name) {
        case 'Home':
            return 'home';
        case 'About':
            return 'info-circle';
        default:
            return 'home';
    }
}

export default getTabIcon;
