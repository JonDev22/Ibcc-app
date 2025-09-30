import { Alert, Linking } from 'react-native';

function composeMail(email: string, s: string, b: string) {
    const subject = `Inquiry about ${s}`;
    const body = `Hi! \n\nI'd like to know more about ${b}`;

    const mailto = `mailto:${email}?subject=${encodeURIComponent(
        subject,
    )}&body=${encodeURIComponent(body)}`;

    Linking.canOpenURL(mailto)
        .then(supported => {
            if (supported) {
                Linking.openURL(mailto);
            } else {
                Alert.alert(
                    'Mail app not available',
                    `Please configure an email account or email ${email}`,
                );
            }
        })
        .catch(() =>
            Alert.alert(
                'Error opening mail.',
                `Could not open mail app. Please email ${email}`,
            ),
        );
}

export default composeMail;
