import { StyleSheet } from 'react-native';
import { ThemePalette } from '@/constants/theme';

export const createHomeStyles = (colors: ThemePalette) => StyleSheet.create({

    // Ocupa a tela inteira
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },


    // MENU SUPERIOR
    menuSuperior: {
        width: '100%',
        minHeight: 80,

        backgroundColor: colors.backgroundElement,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        paddingHorizontal: 20,
    },


    // Logo
    logo: {
        fontSize: 22,
        fontWeight: 'bold',
        color: colors.accent,
    },


    // MENU INFERIOR
    menuinferior: {
        width: '100%',
        height: 70,

        backgroundColor: colors.backgroundElement,

        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },


    // Cada item do menu inferior
    itemMenu: {
        width: 60,
        height: 55,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },

    // Texto dos itens do menu
    textoMenu: {
        fontSize: 10,
        color: colors.accent,
        marginTop: 3,
    },


    // Área dos avisos
    avisos: {
        flexDirection: 'row',
        alignItems: 'center',

        // Um item fica em cada extremidade
        justifyContent: 'space-between',
    },


    // Texto "Avisos do serviço"
    tituloAvisos: {
        fontSize: 17,
        fontWeight: 'bold',
        color: colors.text,
    },


    // Número de avisos
    numeroAvisos: {
        fontSize: 10,
        fontWeight: 'bold',
        color: colors.accent,
    },


    // Conteúdo principal da Home
    // Mantém 20px de espaço nas laterais
    conteudo: {
        paddingHorizontal: 20,
    },

    caixaAviso: {
        width: '100%',
        height: 100,

        backgroundColor: colors.card,

        flexDirection: 'row',
        alignItems: 'center',

        marginTop: 15,

        borderRadius: 8,
    },

    barraAviso: {
        width: 5,
        height: '100%',

        backgroundColor: '#02719c',

        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
    },

    conteudoAviso: {
        marginLeft: 10,
    },

    tituloAviso: {
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.text,
    },

    textoAviso: {
        fontSize: 12,
        color: colors.textSecondary,
        marginTop: 3,
    },

    secaoPlanos: {
        marginTop: 25,
    },

    tituloPlanos: {
        fontSize: 17,
        fontWeight: 'bold',
        marginBottom: 12,
        color: colors.text,
    },

    estadoPlanos: {
        minHeight: 120,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        paddingHorizontal: 20,
    },

    textoEstadoPlanos: {
        color: colors.textSecondary,
        fontSize: 12,
        textAlign: 'center',
    },

    cardPlano: {
        width: 280,
        height: 295,
        backgroundColor: colors.card,
        borderRadius: 12,
        marginRight: 15,
        padding: 20,
        justifyContent: 'space-between',
        marginBottom: 30,
    },

    nomePlano: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.text,
    },

    descricaoPlano: {
        fontSize: 12,
        color: colors.textSecondary,
        marginTop: 5,
    },

    precoPlano: {
        fontSize: 26,
        fontWeight: 'bold',
        color: colors.accent,
        marginTop: 10,
    },

    mensalidade: {
        fontSize: 12,
        color: colors.textSecondary,
    },

    beneficios: {
        marginTop: 10,
    },

    beneficio: {
        fontSize: 12,
        color: colors.textSecondary,
        marginBottom: 4,
    },

    botaoContratar: {
        height: 40,
        backgroundColor: colors.accent,
        borderRadius: 7,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },

    textoBotao: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: 'bold',
    },

    passeCard: {
        width: '100%',
        marginTop: 25,
        backgroundColor: colors.card,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: colors.border,
        overflow: 'hidden',
    },

    passeTopo: {
        height: 110,
        backgroundColor: '#02719c',
        padding: 16,
        position: 'relative',
    },

    passeTopoLinha: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    passeCategoria: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    passeCategoriaTexto: {
        fontSize: 11,
        fontWeight: 'bold',
        letterSpacing: 1.5,
        color: '#e0f2fe',
        marginLeft: 7,
    },

    passeStatus: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: 8,
        paddingVertical: 5,
        borderRadius: 20,
    },

    pontoStatus: {
        width: 7,
        height: 7,
        borderRadius: 50,
        backgroundColor: '#10b981',
        marginRight: 5,
    },

    textoStatus: {
        fontSize: 9,
        fontWeight: 'bold',
        color: '#ffffff',
    },

    dadosTitular: {
        marginTop: 12,
    },

    nomeTitular: {
        fontSize: 17,
        fontWeight: '600',
        color: '#ffffff',
    },

    idTitular: {
        fontSize: 12,
        color: '#cbd5e1',
        marginTop: 2,
    },

    tagPremium: {
        position: 'absolute',
        right: 16,
        bottom: 12,
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },

    textoPremium: {
        fontSize: 9,
        fontWeight: 'bold',
        color: '#ffffff',
        letterSpacing: 1,
    },

    passeCorpo: {
        padding: 16,
    },

    qrContainer: {
        width: '100%',
        backgroundColor: colors.backgroundElement,
        borderRadius: 12,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },

    qrBox: {
        width: 84,
        height: 84,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },

    qrInformacoes: {
        flex: 1,
        marginLeft: 12,
    },

    tituloApresentar: {
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.text,
    },

    instrucaoQr: {
        fontSize: 12,
        lineHeight: 17,
        color: colors.textSecondary,
        marginTop: 4,
    },

    validacao: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 7,
    },

    textoValidacao: {
        fontSize: 11,
        fontWeight: '600',
        color: colors.accent,
        marginLeft: 4,
    },

    viagensCabecalho: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 16,
    },

    textoViagens: {
        fontSize: 13,
        color: colors.textSecondary,
    },

    numeroViagens: {
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.text,
    },

    trilhoProgresso: {
        width: '100%',
        height: 6,
        backgroundColor: colors.border,
        borderRadius: 10,
        marginTop: 8,
        overflow: 'hidden',
    },

    progresso: {
        width: '86%',
        height: '100%',
        backgroundColor: '#02719c',
        borderRadius: 10,
    },

    viagensRodape: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 7,
    },

    planoAtual: {
        fontSize: 12,
        color: colors.textSecondary,
    },

    restantes: {
        fontSize: 12,
        fontWeight: '600',
        color: colors.accent,
    },

    botaoApresentar: {
        width: '100%',
        height: 48,
        backgroundColor: '#02719c',
        borderRadius: 12,
        marginTop: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    textoBotaoApresentar: {
        fontSize: 14,
        fontWeight: '600',
        color: '#ffffff',
        marginLeft: 8,
    },

    conteudoScroll: {
        paddingBottom: 20,
    },

    marcadorMenu: {
        position: 'absolute',
        width: 48,
        height: 48,
        borderRadius: 10,
        backgroundColor: colors.accentSoft,
    },


});
