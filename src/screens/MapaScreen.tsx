import {
    View,
    Text,
    Pressable,
    ScrollView,
    TextInput,
} from 'react-native';

import { useRef, useState } from 'react';
import {
    Animated,
    PanResponder,
} from 'react-native';
import * as Location from 'expo-location';

import { Ionicons } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';

import { styles } from '../styles/mapa';

export default function MapaScreen() {

    const painelY = useRef(new Animated.Value(0)).current;

    const [posicaoPainel, setPosicaoPainel] = useState(0);

    const POSICAO_ABERTO = 0;
    const POSICAO_MEIO = 220;
    const POSICAO_FECHADO = 370;

    const panResponder = useRef(
        PanResponder.create({

            onStartShouldSetPanResponder: () => true,

            onMoveShouldSetPanResponder: (_, gestureState) => {
                return Math.abs(gestureState.dy) > 5;
            },

            onPanResponderMove: (_, gestureState) => {

                let novaPosicao = posicaoPainel + gestureState.dy;

                novaPosicao = Math.max(
                    POSICAO_ABERTO,
                    Math.min(POSICAO_FECHADO, novaPosicao)
                );

                painelY.setValue(novaPosicao);
            },

            onPanResponderRelease: (_, gestureState) => {

                const deslocamento = gestureState.dy;

                let novaPosicao = posicaoPainel;

                // Arrastou para cima
                if (deslocamento < -50) {

                    if (posicaoPainel === POSICAO_FECHADO) {
                        novaPosicao = POSICAO_MEIO;
                    } else {
                        novaPosicao = POSICAO_ABERTO;
                    }

                }

                // Arrastou para baixo
                else if (deslocamento > 50) {

                    if (posicaoPainel === POSICAO_ABERTO) {
                        novaPosicao = POSICAO_MEIO;
                    } else {
                        novaPosicao = POSICAO_FECHADO;
                    }

                }

                Animated.spring(painelY, {
                    toValue: novaPosicao,
                    useNativeDriver: true,
                    tension: 80,
                    friction: 12,
                }).start();

                setPosicaoPainel(novaPosicao);
            },

        })
    ).current;

    const webViewRef = useRef<WebView>(null);

    const localizarUsuario = async () => {

        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
            alert('Permissão de localização negada.');
            return;
        }

        const location = await Location.getCurrentPositionAsync({});

        const latitude = location.coords.latitude;
        const longitude = location.coords.longitude;

        webViewRef.current?.injectJavaScript(`
        mostrarMinhaLocalizacao(${latitude}, ${longitude});
        true;
    `);
    };

    const mapaHTML = `
        <!DOCTYPE html>
        <html>
        <head>

            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
            />

            <link
                rel="stylesheet"
                href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
            />

            <style>

                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                html,
                body,
                #map {
                    width: 100%;
                    height: 100%;
                }

                .van {
                    background: #02719c;
                    width: 38px;
                    height: 38px;
                    border-radius: 50%;
                    border: 4px solid white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 3px 10px rgba(0,0,0,0.3);
                    color: white;
                    font-size: 18px;
                }

                .parada {
                    background: white;
                    width: 22px;
                    height: 22px;
                    border-radius: 50%;
                    border: 4px solid #02719c;
                    box-shadow: 0 2px 6px rgba(0,0,0,0.3);
                }

            </style>

        </head>

        <body>

            <div id="map"></div>

            <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

            <script>

    const map = L.map('map', {
        zoomControl: false
    }).setView(
        [-22.5050, -43.1780],
        14
    );
    

    let minhaLocalizacao = null;

const minhaLocalizacaoIcon = L.divIcon({
    className: '',
    html: '<div style="width:22px;height:22px;background:#02719c;border:4px solid white;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,0.35);"></div>',
    iconSize: [22, 22],
    iconAnchor: [11, 11]
});

window.mostrarMinhaLocalizacao = function(latitude, longitude) {

    if (minhaLocalizacao) {
        map.removeLayer(minhaLocalizacao);
    }

    minhaLocalizacao = L.marker(
        [latitude, longitude],
        {
            icon: minhaLocalizacaoIcon
        }
    )
    .addTo(map)
    .bindPopup('<b>Você está aqui</b>');

    map.setView(
        [latitude, longitude],
        16
    );
};

    L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
            maxZoom: 19,
            attribution: '&copy; OpenStreetMap'
        }
    ).addTo(map);


    // ==========================================
    // ROTA
    // ==========================================

    const rota = [
        [-22.5050, -43.1780],
        [-22.5100, -43.1800],
        [-22.5150, -43.1750],
        [-22.5200, -43.1700],
        [-22.5250, -43.1650]
    ];

    L.polyline(
        rota,
        {
            color: '#02719c',
            weight: 6,
            opacity: 0.9
        }
    ).addTo(map);


    // ==========================================
    // ÍCONE DA VAN
    // ==========================================

    const vanIcon = L.divIcon({
        className: '',
        html: '<div class="van">🚌</div>',
        iconSize: [38, 38],
        iconAnchor: [19, 19]
    });


    // ==========================================
    // ÍCONE DA PARADA
    // ==========================================

    const paradaIcon = L.divIcon({
        className: '',
        html: '<div class="parada"></div>',
        iconSize: [22, 22],
        iconAnchor: [11, 11]
    });


    // ==========================================
    // VANS
    // ==========================================

    L.marker(
        [-22.5050, -43.1780],
        {
            icon: vanIcon
        }
    )
    .addTo(map)
    .bindPopup(
        '<b>Van 14</b><br>Ativa • 5 vagas<br>38 km/h'
    );


    L.marker(
        [-22.5100, -43.1800],
        {
            icon: vanIcon
        }
    )
    .addTo(map)
    .bindPopup(
        '<b>Van 08</b><br>10 vagas'
    );


    L.marker(
        [-22.5150, -43.1750],
        {
            icon: vanIcon
        }
    )
    .addTo(map)
    .bindPopup(
        '<b>Van 22</b><br>2 vagas'
    );


    L.marker(
        [-22.5200, -43.1700],
        {
            icon: vanIcon
        }
    )
    .addTo(map)
    .bindPopup(
        '<b>Van 05</b><br>8 vagas'
    );


    // ==========================================
    // PARADAS
    // ==========================================

    L.marker(
        [-22.5050, -43.1780],
        {
            icon: paradaIcon
        }
    )
    .addTo(map)
    .bindPopup(
        '<b>Ponto de partida</b><br>Van 14'
    );


    L.marker(
        [-22.5150, -43.1750],
        {
            icon: paradaIcon
        }
    )
    .addTo(map)
    .bindPopup(
        '<b>Próxima parada</b><br>4 minutos'
    );


    // ==========================================
    // ZOOM
    // ==========================================

    L.control.zoom({
        position: 'bottomright'
    }).addTo(map);

</script>

        </body>
        </html>
    `;

    return (
        <View style={styles.container}>

            <View style={styles.areaMapa}>

                {/* BUSCA */}

                <View style={styles.areaBusca}>

                    <View style={styles.busca}>

                        <Ionicons
                            name="search-outline"
                            size={21}
                            color="#02719c"
                        />

                        <TextInput
                            style={styles.inputBusca}
                            placeholder="Buscar parada, linha ou destino..."
                            placeholderTextColor="#64748b"
                        />

                        <Pressable style={styles.botaoFiltro}>

                            <Ionicons
                                name="options-outline"
                                size={21}
                                color="#02719c"
                            />

                        </Pressable>

                    </View>


                    {/* FILTROS */}

                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.listaFiltros}
                    >

                        <Pressable style={styles.filtroAtivo}>

                            <Ionicons
                                name="bus-outline"
                                size={17}
                                color="#ffffff"
                            />

                            <Text style={styles.textoFiltroAtivo}>
                                Linha 04 - Paulista
                            </Text>

                        </Pressable>


                        <Pressable style={styles.filtro}>

                            <Ionicons
                                name="navigate-outline"
                                size={17}
                                color="#64748b"
                            />

                            <Text style={styles.textoFiltro}>
                                Próximas vans
                            </Text>

                        </Pressable>


                        <Pressable style={styles.filtro}>

                            <Ionicons
                                name="location-outline"
                                size={17}
                                color="#64748b"
                            />

                            <Text style={styles.textoFiltro}>
                                Meus pontos
                            </Text>

                        </Pressable>

                    </ScrollView>

                </View>


                {/* MAPA */}

                <WebView
                    ref={webViewRef}
                    originWhitelist={['*']}
                    source={{ html: mapaHTML }}
                    style={styles.mapa}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                />

                {/* CONTROLES */}

                <View style={styles.controlesMapa}>

                    <Pressable
                        style={styles.botaoMapa}
                        onPress={localizarUsuario}
                    >

                        <Ionicons
                            name="locate-outline"
                            size={21}
                            color="#02719c"
                        />

                    </Pressable>


                    <Pressable style={styles.botaoMapa}>

                        <Ionicons
                            name="add"
                            size={22}
                            color="#0f172a"
                        />

                    </Pressable>


                    <Pressable style={styles.botaoMapa}>

                        <Ionicons
                            name="remove"
                            size={22}
                            color="#0f172a"
                        />

                    </Pressable>


                    <Pressable style={styles.botaoMapa}>

                        <Ionicons
                            name="git-merge-outline"
                            size={20}
                            color="#02719c"
                        />

                    </Pressable>

                </View>


                {/* TELEMETRIA */}




                {/* BOTTOM SHEET */}

                <Animated.View
                    style={[
                        styles.bottomSheet,
                        {
                            transform: [
                                {
                                    translateY: painelY,
                                },
                            ],
                        },
                    ]}
                    {...panResponder.panHandlers}
                >

                    <View
                        style={{
                            height: 25,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <View style={styles.alca} />
                    </View>


                    <View style={styles.cardTrajeto}>

                        <View style={styles.iconeOrigem}>

                            <View style={styles.pontoOrigem} />

                        </View>


                        <View style={styles.infoTrajeto}>

                            <Text style={styles.rotuloTrajeto}>
                                PONTO DE PARTIDA
                            </Text>

                            <Text style={styles.tituloTrajeto}>
                                Terminal Rebouças
                            </Text>

                            <Text style={styles.subtituloTrajeto}>
                                Partida realizada às 08:35
                            </Text>

                        </View>

                    </View>


                    <View style={styles.cardTrajeto}>

                        <View style={styles.iconeDestino}>

                            <Ionicons
                                name="flag-outline"
                                size={19}
                                color="#02719c"
                            />

                        </View>


                        <View style={styles.infoTrajeto}>

                            <Text style={styles.rotuloTrajeto}>
                                DESTINO FINAL
                            </Text>

                            <Text style={styles.tituloTrajeto}>
                                Pátio Brigadeiro
                            </Text>

                            <Text style={styles.subtituloTrajeto}>
                                Trajeto: Terminal Rebouças → Pátio Brigadeiro
                            </Text>

                        </View>

                    </View>


                    <Pressable style={styles.botaoQR}>

                        <Ionicons
                            name="qr-code-outline"
                            size={21}
                            color="#ffffff"
                        />

                        <Text style={styles.textoBotaoQR}>
                            Ver Passe de Embarque (QR)
                        </Text>

                    </Pressable>

                </Animated.View>

            </View>

        </View >
    );
}