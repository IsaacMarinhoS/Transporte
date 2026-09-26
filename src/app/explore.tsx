import { View, Text } from 'react-native';
import { useAppTheme } from '@/contexts/ThemeContext';

export default function Explore() {
    const { colors } = useAppTheme();
    return (
        <View style={{ flex: 1, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: colors.text }}>Explore</Text>
        </View>
    );
}
