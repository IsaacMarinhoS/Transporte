import { Text, View, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

import { styles } from '../styles/home';

import HomeScreen from '../screens/HomeScreen';

export default function Home() {

    const insets = useSafeAreaInsets();

    const [aba, setAba] = useState('home');

    return (
        <View style={styles.container}>

            {/* MENU SUPERIOR */}
            <View
                style={[
                    styles.menuSuperior,
                    { paddingTop: insets.top }
                ]}
            >
                <Text style={styles.logo}>
                    Logo
                </Text>

                <Ionicons
                    name="notifications-outline"
                    size={28}
                    color="#02719c"
                />
            </View>


            {/* CONTEÚDO */}
            <View style={{ flex: 1 }}>

                {aba === 'home' && <HomeScreen />}

            </View>


            {/* MENU INFERIOR */}
            <View
                style={[
                    styles.menuinferior,
                    { paddingBottom: insets.bottom }
                ]}
            >

                {/* HOME */}
                <Pressable
                    style={styles.itemMenu}
                    onPress={() => setAba('home')}
                >
                    {aba === 'home' && (
                        <View style={styles.marcadorMenu} />
                    )}

                    <Ionicons
                        name="home-outline"
                        size={22}
                        color="#02719c"
                    />

                    <Text style={styles.textoMenu}>
                        Home
                    </Text>
                </Pressable>


                {/* MAPA */}
                <Pressable
                    style={styles.itemMenu}
                    onPress={() => setAba('mapa')}
                >
                    {aba === 'mapa' && (
                        <View style={styles.marcadorMenu} />
                    )}

                    <Ionicons
                        name="map-outline"
                        size={22}
                        color="#02719c"
                    />

                    <Text style={styles.textoMenu}>
                        Mapa
                    </Text>
                </Pressable>


                {/* PLANOS */}
                <Pressable
                    style={styles.itemMenu}
                    onPress={() => setAba('planos')}
                >
                    {aba === 'planos' && (
                        <View style={styles.marcadorMenu} />
                    )}

                    <Ionicons
                        name="calendar-outline"
                        size={22}
                        color="#02719c"
                    />

                    <Text style={styles.textoMenu}>
                        Planos
                    </Text>
                </Pressable>


                {/* SUPORTE */}
                <Pressable
                    style={styles.itemMenu}
                    onPress={() => setAba('suporte')}
                >
                    {aba === 'suporte' && (
                        <View style={styles.marcadorMenu} />
                    )}

                    <Ionicons
                        name="headset-outline"
                        size={22}
                        color="#02719c"
                    />

                    <Text style={styles.textoMenu}>
                        Suporte
                    </Text>
                </Pressable>


                {/* PERFIL */}
                <Pressable
                    style={styles.itemMenu}
                    onPress={() => setAba('perfil')}
                >
                    {aba === 'perfil' && (
                        <View style={styles.marcadorMenu} />
                    )}

                    <Ionicons
                        name="person-outline"
                        size={22}
                        color="#02719c"
                    />

                    <Text style={styles.textoMenu}>
                        Perfil
                    </Text>
                </Pressable>

            </View>

        </View>
    );
}