import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

    // Ocupa a tela inteira
    container: {
        flex: 1,
        backgroundColor: '#f6f6f7',
    },


    // MENU SUPERIOR
    menuSuperior: {
        width: '100%',
        minHeight: 80,

        backgroundColor: '#fdfafa',

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        paddingHorizontal: 20,
    },


    // Logo
    logo: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#02719c',
    },


    // MENU INFERIOR
    menuinferior: {
        position: 'absolute',
        bottom: 0,

        width: '100%',
        height: 110,

        backgroundColor: '#fdfafa',

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
        color: '#02719c',
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
    },


    // Número de avisos
    numeroAvisos: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#02719c',
    },


    // Conteúdo principal da Home
    // Mantém 20px de espaço nas laterais
    conteudo: {
        paddingHorizontal: 20,
    },

    caixaAviso: {
        width: '100%',
        height: 100,

        backgroundColor: '#ffffff',

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
        color: '#333333',
    },

    textoAviso: {
        fontSize: 12,
        color: '#777777',
        marginTop: 3,
    },

    secaoPlanos: {
        marginTop: 25,
    },

    tituloPlanos: {
        fontSize: 17,
        fontWeight: 'bold',
        marginBottom: 12,
    },

    cardPlano: {
        width: 280,
        height: 295,
        backgroundColor: '#ffffff',
        borderRadius: 12,
        marginRight: 15,
        padding: 20,
        justifyContent: 'space-between',
        marginBottom: 30,
    },

    nomePlano: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333333',
    },

    descricaoPlano: {
        fontSize: 12,
        color: '#777777',
        marginTop: 5,
    },

    precoPlano: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#02719c',
        marginTop: 10,
    },

    mensalidade: {
        fontSize: 12,
        color: '#777777',
    },

    beneficios: {
        marginTop: 10,
    },

    beneficio: {
        fontSize: 12,
        color: '#555555',
        marginBottom: 4,
    },

    botaoContratar: {
        height: 40,
        backgroundColor: '#02719c',
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
        backgroundColor: '#ffffff',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#e2e8f0',
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
        backgroundColor: '#f8fafc',
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
        color: '#0f172a',
    },

    instrucaoQr: {
        fontSize: 12,
        lineHeight: 17,
        color: '#64748b',
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
        color: '#02719c',
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
        color: '#475569',
    },

    numeroViagens: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#0f172a',
    },

    trilhoProgresso: {
        width: '100%',
        height: 6,
        backgroundColor: '#e2e8f0',
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
        color: '#64748b',
    },

    restantes: {
        fontSize: 12,
        fontWeight: '600',
        color: '#02719c',
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
        paddingBottom: 70,
    },

    marcadorMenu: {
        position: 'absolute',
        width: 48,
        height: 48,
        borderRadius: 10,
        backgroundColor: 'rgba(2, 113, 156, 0.12)',
    },


});