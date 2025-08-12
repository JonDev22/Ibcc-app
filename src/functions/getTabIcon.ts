function getTabIcon(name: string) {
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
