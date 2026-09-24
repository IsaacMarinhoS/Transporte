import { StyleSheet } from 'react-native';
import { ThemePalette } from '@/constants/theme';

export const createChatStyles = (colors: ThemePalette) => StyleSheet.create({

    // =====================================================
    // TELA PRINCIPAL
    // =====================================================

    container: {
        flex: 1,
        backgroundColor: colors.background,
    },


    // =====================================================
    // HEADER
    // =====================================================

    header: {
        height: 100,
        backgroundColor: colors.card,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,

        flexDirection: 'row',
        alignItems: 'center',

        paddingHorizontal: 14,
    },

    botaoVoltar: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },

    identificacao: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 4,
    },

    avatarContainer: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: colors.accentSoft,

        alignItems: 'center',
        justifyContent: 'center',
    },

    statusOnline: {
        position: 'absolute',
        right: 1,
        bottom: 1,

        width: 11,
        height: 11,
        borderRadius: 11,

        backgroundColor: '#10b981',

        borderWidth: 2,
        borderColor: '#ffffff',
    },

    infoSuporte: {
        marginLeft: 10,
    },

    linhaTitulo: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    nomeSuporte: {
        fontSize: 15,
        fontWeight: '600',
        color: colors.text,
    },

    badgeAtendente: {
        backgroundColor: colors.accentSoft,
        borderRadius: 20,
        paddingHorizontal: 7,
        paddingVertical: 3,
        marginLeft: 7,
    },

    textoBadge: {
        fontSize: 10,
        fontWeight: '700',
        color: '#02719c',
    },

    subtituloSuporte: {
        fontSize: 12,
        color: colors.textSecondary,
        marginTop: 2,
    },

    botaoPerfil: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: '#02719c',

        alignItems: 'center',
        justifyContent: 'center',
    },


    // =====================================================
    // ÁREA DA CONVERSA
    // =====================================================

    conversa: {
        flex: 1,
    },

    conteudoConversa: {
        paddingHorizontal: 16,
        paddingTop: 18,
        paddingBottom: 20,
    },


    // =====================================================
    // MARCADOR DE DATA
    // =====================================================

    dataContainer: {
        alignSelf: 'center',
        backgroundColor: colors.backgroundSelected,
        borderRadius: 20,

        paddingHorizontal: 11,
        paddingVertical: 5,

        marginBottom: 16,
    },

    dataTexto: {
        fontSize: 11,
        fontWeight: '500',
        color: colors.textSecondary,
    },


    // =====================================================
    // CARD DE BOAS-VINDAS
    // =====================================================

    cardBoasVindas: {
        backgroundColor: colors.card,
        borderRadius: 18,

        padding: 16,
        alignItems: 'center',

        borderWidth: 1,
        borderColor: colors.border,

        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.04,
        shadowRadius: 8,

        elevation: 1,

        marginBottom: 20,
    },

    iconeBoasVindas: {
        width: 46,
        height: 46,
        borderRadius: 23,
        backgroundColor: colors.accentSoft,

        alignItems: 'center',
        justifyContent: 'center',

        marginBottom: 10,
    },

    textoBoasVindas: {
        fontSize: 13,
        lineHeight: 19,
        color: colors.textSecondary,
        textAlign: 'center',
    },


    // =====================================================
    // MENSAGENS RECEBIDAS
    // =====================================================

    mensagemRecebida: {
        flexDirection: 'row',
        alignItems: 'flex-end',

        marginBottom: 14,
    },

    avatarMensagem: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: colors.accentSoft,

        alignItems: 'center',
        justifyContent: 'center',

        marginRight: 8,
    },

    areaMensagemRecebida: {
        maxWidth: '82%',
    },

    balaoRecebido: {
        backgroundColor: colors.card,

        borderRadius: 17,
        borderBottomLeftRadius: 5,

        paddingHorizontal: 13,
        paddingVertical: 11,

        borderWidth: 1,
        borderColor: colors.border,

        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.03,
        shadowRadius: 5,

        elevation: 1,
    },

    textoMensagemRecebida: {
        fontSize: 13,
        lineHeight: 19,
        color: colors.text,
    },

    horarioMensagem: {
        fontSize: 10,
        color: colors.textSecondary,
        textAlign: 'right',
        marginTop: 5,
    },


    // =====================================================
    // MENSAGENS ENVIADAS
    // =====================================================

    mensagemEnviada: {
        alignItems: 'flex-end',
        marginBottom: 14,
    },

    balaoEnviado: {
        maxWidth: '82%',

        backgroundColor: '#02719c',

        borderRadius: 17,
        borderBottomRightRadius: 5,

        paddingHorizontal: 13,
        paddingVertical: 11,
    },

    textoMensagemEnviada: {
        fontSize: 13,
        lineHeight: 19,
        color: '#ffffff',
    },

    statusMensagem: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',

        marginTop: 5,
    },

    horarioEnviada: {
        fontSize: 10,
        color: '#ffffff',
        marginRight: 4,
        opacity: 0.8,
    },


    // =====================================================
    // CARD — VAN NO MAPA
    // =====================================================

    cardMapa: {
        flexDirection: 'row',
        alignItems: 'center',

        backgroundColor: colors.accentSoft,

        borderRadius: 12,

        padding: 9,
        marginTop: 11,
    },

    iconeMapa: {
        width: 34,
        height: 34,
        borderRadius: 9,

        backgroundColor: '#02719c',

        alignItems: 'center',
        justifyContent: 'center',
    },

    infoMapa: {
        flex: 1,
        marginLeft: 9,
        marginRight: 5,
    },

    tituloMapa: {
        fontSize: 12,
        fontWeight: '700',
        color: colors.text,
    },

    subtituloMapa: {
        fontSize: 10,
        color: colors.textSecondary,
        marginTop: 2,
    },


    // =====================================================
    // INDICADOR "DIGITANDO"
    // =====================================================

    digitando: {
        backgroundColor: colors.backgroundSelected,

        borderRadius: 16,
        borderBottomLeftRadius: 5,

        paddingHorizontal: 12,
        paddingVertical: 9,

        flexDirection: 'row',
        alignItems: 'center',
    },

    textoDigitando: {
        fontSize: 11,
        fontStyle: 'italic',
        color: colors.textSecondary,
    },

    pontosDigitando: {
        fontSize: 14,
        fontWeight: '700',
        color: colors.textSecondary,
        marginLeft: 5,
        letterSpacing: 1,
    },


    // =====================================================
    // FOOTER — ENVIO DE MENSAGEM
    // =====================================================

    footer: {
        height: 110,

        backgroundColor: colors.card,

        borderTopWidth: 1,
        borderTopColor: '#e2e8f0',

        paddingHorizontal: 12,
        paddingVertical: 10,

        flexDirection: 'row',
        alignItems: 'center',

        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: -3,
        },
        shadowOpacity: 0.05,
        shadowRadius: 8,

        elevation: 5,
    },

    botaoAnexo: {
        width: 42,
        height: 42,
        borderRadius: 21,

        alignItems: 'center',
        justifyContent: 'center',
    },

    areaInput: {
        flex: 1,

        minHeight: 44,
        maxHeight: 100,

        backgroundColor: colors.backgroundElement,

        borderRadius: 22,

        justifyContent: 'center',

        paddingHorizontal: 16,
        marginHorizontal: 5,
    },

    input: {
        fontSize: 14,
        color: colors.text,

        paddingTop: 10,
        paddingBottom: 10,

        maxHeight: 80,
    },

    botaoEnviar: {
        width: 44,
        height: 44,

        borderRadius: 12,

        backgroundColor: '#02719c',

        alignItems: 'center',
        justifyContent: 'center',
    },

});