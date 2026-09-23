import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

    // =================================================
    // CONTAINER
    // =================================================

    container: {
        flex: 1,
        backgroundColor: '#f7f9fb',
    },

    areaMapa: {
        flex: 1,
        position: 'relative',
    },


    // =================================================
    // BUSCA
    // =================================================

    areaBusca: {
        position: 'absolute',
        top: 14,
        left: 16,
        right: 16,
        zIndex: 10,
    },

    busca: {
        height: 52,
        backgroundColor: '#ffffff',
        borderRadius: 18,
        borderWidth: 1,
        borderColor: '#e2e8f0',

        flexDirection: 'row',
        alignItems: 'center',

        paddingHorizontal: 15,

        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.10,
        shadowRadius: 10,
        elevation: 5,
    },

    inputBusca: {
        flex: 1,
        height: 50,
        marginLeft: 10,

        fontSize: 13,
        color: '#0f172a',
    },

    botaoFiltro: {
        width: 38,
        height: 38,
        borderRadius: 12,

        backgroundColor: '#f2f4f6',

        alignItems: 'center',
        justifyContent: 'center',
    },


    // =================================================
    // FILTROS
    // =================================================

    listaFiltros: {
        paddingTop: 10,
        paddingBottom: 5,
        gap: 8,
    },

    filtroAtivo: {
        height: 38,

        paddingHorizontal: 14,

        borderRadius: 20,

        backgroundColor: '#02719c',

        flexDirection: 'row',
        alignItems: 'center',

        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.10,
        shadowRadius: 6,
        elevation: 3,
    },

    textoFiltroAtivo: {
        marginLeft: 7,

        color: '#ffffff',

        fontSize: 12,
        fontWeight: '600',
    },

    filtro: {
        height: 38,

        paddingHorizontal: 14,

        borderRadius: 20,

        backgroundColor: '#ffffff',

        borderWidth: 1,
        borderColor: '#e2e8f0',

        flexDirection: 'row',
        alignItems: 'center',
    },

    textoFiltro: {
        marginLeft: 7,

        color: '#64748b',

        fontSize: 12,
        fontWeight: '600',
    },


    // =================================================
    // MAPA
    // =================================================




    // =================================================
    // CONTROLES DO MAPA
    // =================================================

    controlesMapa: {
        position: 'absolute',

        right: 14,
        top: 170,

        gap: 9,
    },

    botaoMapa: {
        width: 42,
        height: 42,

        borderRadius: 21,

        backgroundColor: '#ffffff',

        alignItems: 'center',
        justifyContent: 'center',

        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.12,
        shadowRadius: 7,
        elevation: 4,
    },


    // =================================================
    // TELEMETRIA
    // =================================================

    telemetria: {
        position: 'absolute',

        left: 16,
        right: 16,
        bottom: 270,

        height: 30,

        borderRadius: 15,

        backgroundColor: 'rgba(255,255,255,0.94)',

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.08,
        shadowRadius: 5,
        elevation: 3,
    },

    pontoTelemetria: {
        width: 7,
        height: 7,

        borderRadius: 7,

        backgroundColor: '#10b981',

        marginRight: 7,
    },

    textoTelemetria: {
        fontSize: 10,
        fontWeight: '500',

        color: '#64748b',
    },


    // =================================================
    // BOTTOM SHEET
    // =================================================

    bottomSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,

    height: 390,

    backgroundColor: '#ffffff',

    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,

    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 16,

    shadowColor: '#000000',
    shadowOffset: {
        width: 0,
        height: -4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 10,
},

    alca: {
        width: 42,
        height: 4,

        borderRadius: 4,

        backgroundColor: '#cbd5e1',

        alignSelf: 'center',

        marginBottom: 12,
    },


    // =================================================
    // CARDS DE TRAJETO
    // =================================================

    cardTrajeto: {
        minHeight: 72,

        backgroundColor: '#f2f4f6',

        borderRadius: 16,

        paddingHorizontal: 12,
        paddingVertical: 11,

        flexDirection: 'row',
        alignItems: 'center',

        marginBottom: 8,
    },

    iconeOrigem: {
        width: 38,
        height: 38,

        borderRadius: 19,

        backgroundColor: '#02719c',

        alignItems: 'center',
        justifyContent: 'center',
    },

    pontoOrigem: {
        width: 12,
        height: 12,

        borderRadius: 6,

        backgroundColor: '#ffffff',

        borderWidth: 3,
        borderColor: '#02719c',
    },

    iconeDestino: {
        width: 38,
        height: 38,

        borderRadius: 19,

        backgroundColor: '#e0f2fe',

        alignItems: 'center',
        justifyContent: 'center',
    },

    infoTrajeto: {
        flex: 1,

        marginLeft: 11,
    },

    rotuloTrajeto: {
        fontSize: 10,
        fontWeight: '600',

        letterSpacing: 1,

        color: '#94a3b8',
    },

    tituloTrajeto: {
        fontSize: 16,
        fontWeight: '700',

        color: '#0f172a',

        marginTop: 2,
    },

    subtituloTrajeto: {
        fontSize: 11,

        color: '#64748b',

        marginTop: 3,
    },


    // =================================================
    // BOTÃO QR
    // =================================================

    botaoQR: {
        height: 52,

        borderRadius: 16,

        backgroundColor: '#02719c',

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

        marginTop: 4,

        shadowColor: '#02719c',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.20,
        shadowRadius: 8,
        elevation: 5,
    },

    textoBotaoQR: {
        color: '#ffffff',

        fontSize: 14,
        fontWeight: '700',

        marginLeft: 9,
    },

    mapa: {
        flex: 1,
    },

});

