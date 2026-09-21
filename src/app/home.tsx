import { Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from '../styles/home';

export default function Home() {
    const insets = useSafeAreaInsets();

    return (
        <SafeAreaView style={styles.container}>
            <Text>Bem-vindo!</Text>

            <View
                style={[
                    styles.menuinferior,
                    { bottom: insets.bottom }
                ]}
            >
                <Text>Menu Inferior</Text>
            </View>
        </SafeAreaView>
    );
}