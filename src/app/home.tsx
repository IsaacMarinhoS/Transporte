import { Text, View, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { router } from 'expo-router';
import { useAppTheme } from '@/contexts/ThemeContext';


import { createHomeStyles } from '../styles/home';

import HomeScreen from '../screens/HomeScreen';

import SuporteScreen from '../screens/SuporteScreen';
import MapaScreen from '@/screens/MapaScreen';
import PlanosScreen from '@/screens/PlanosScreen';
import PerfilScreen from '@/screens/PerfilScreen';

export default function Home() {

    const insets = useSafeAreaInsets();
    const { colors } = useAppTheme();
    const styles = createHomeStyles(colors);

    const [aba, setAba] = useState('home');

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>

            {/* MENU SUPERIOR */}
            <View
                style={[
                    styles.menuSuperior,
                    { paddingTop: insets.top, backgroundColor: colors.backgroundElement }
                ]}
            >
                <Text style={styles.logo}>
                    Logo
                </Text>

                <Pressable onPress={() => router.push({ pathname: '/modoescuro' } as unknown as import('expo-router').Href)} accessibilityRole="button" accessibilityLabel="Configurar aparência">
                    <Ionicons name="color-palette-outline" size={27} color={colors.accent} />
                </Pressable>
            </View>


            {/* CONTEÚDO */}
            <View style={{ flex: 1 }}>

                <View style={{ flex: 1 }}>
                    {aba === 'home' && <HomeScreen />}
                    {aba === 'mapa' && <MapaScreen />}
                    {aba === 'planos' && <PlanosScreen />}
                    {aba === 'suporte' && <SuporteScreen />}
                    {aba === 'perfil' && <PerfilScreen />}
                </View>

            </View>


            {/* MENU INFERIOR */}
            <View
                style={[
                    styles.menuinferior,
                    { paddingBottom: insets.bottom, backgroundColor: colors.backgroundElement }
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
                        color={colors.accent}
                    />

                    <Text style={[styles.textoMenu, { color: colors.textSecondary }]}>
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
                        color={colors.accent}
                    />

                    <Text style={[styles.textoMenu, { color: colors.textSecondary }]}>
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
                        color={colors.accent}
                    />

                    <Text style={[styles.textoMenu, { color: colors.textSecondary }]}>
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
                        color={colors.accent}
                    />

                    <Text style={[styles.textoMenu, { color: colors.textSecondary }]}>
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
                        color={colors.accent}
                    />

                    <Text style={[styles.textoMenu, { color: colors.textSecondary }]}>
                        Perfil
                    </Text>
                </Pressable>

            </View>

        </View>
    );
}
