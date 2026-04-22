import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import getAdjacentSundays from '../../../../../functions/getAdjacentSundays';
import FontAwesome from '@react-native-vector-icons/fontawesome';
import useStyle from '../../../../../hooks/useStyle';
import useColorMap from '../../../../../hooks/useColorMap';
import resourcesStorage from '../../../../../storage/resourcesStorage';
import hasUserRole from '../../../../../functions/hasUserRole';
import { userGroups } from '../../../../../constants/userGroups';
import userSettings from '../../../../../storage/userSettings';
import VerseViewerSection from './VerseViewerSection';

interface VerseViewerProps {
    navigate: () => void;
}

function VerseViewer({ navigate }: VerseViewerProps) {
    const { passages } = resourcesStorage();
    const { user } = userSettings();
    const colorMap = useColorMap();
    const generateStyle = useStyle();

    const { prev, next } = getAdjacentSundays(passages);

    const headerStyle = generateStyle(
        'fontM',
        'bold',
        'flexRow',
        'itemsCenter',
        'primary',
        'bgTransparent',
    );

    const labelStyle = generateStyle(
        'fontXS',
        'flexRow',
        'itemsCenter',
        'primary',
        'bgTransparent',
    );

    const headerIcon = (
        <View style={styles.headerIcon}>
            <FontAwesome name="book" size={20} color={colorMap.secondary} />
        </View>
    );

    const headerText = (
        <View>
            <Text style={headerStyle}>This Week's Passages</Text>
            <Text style={labelStyle}>Reflect on Scripture</Text>
        </View>
    );

    const generateHeader = () => {
        if (hasUserRole(user, [userGroups.ADMIN])) {
            return (
                <TouchableOpacity style={styles.header} onPress={navigate}>
                    {headerIcon}
                    {headerText}
                    <View>
                        <FontAwesome
                            name="chevron-right"
                            style={styles.addIcon}
                            color={colorMap.primary}
                        />
                    </View>
                </TouchableOpacity>
            );
        }

        return (
            <View style={styles.header}>
                {headerIcon}
                {headerText}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            {generateHeader()}

            {/* Cards container */}
            <View style={styles.cardsContainer}>
                <VerseViewerSection
                    direction="left"
                    passage={prev?.passage}
                    date={prev?.date}
                    sunday="Previous"
                    isPrimary={true}
                />

                <VerseViewerSection
                    direction="right"
                    passage={next?.passage}
                    date={next?.date}
                    sunday="Next"
                    isPrimary={false}
                />
            </View>
        </View>
    );
}

export default VerseViewer;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingVertical: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
        gap: 12,
    },
    headerIcon: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardsContainer: {
        gap: 16,
    },
    badgeText: {
        fontSize: 11,
        fontWeight: '600',
        letterSpacing: 0.2,
    },

    addIcon: {
        fontSize: 20,
        width: 40,
        height: 40,
        textAlign: 'center',
        lineHeight: 40,
    },
});
