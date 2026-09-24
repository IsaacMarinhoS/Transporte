import { StyleSheet } from 'react-native';
import { ThemePalette } from '@/constants/theme';

export const createSuporteStyles = (colors: ThemePalette) => StyleSheet.create({

    // =====================================================
    // CONTAINER PRINCIPAL DA TELA
    // =====================================================

    container: {
        flex: 1,
        backgroundColor: colors.background,
    },

    conteudo: {
        paddingHorizontal: 20,

        paddingBottom: 120,
    },


    // =====================================================
    // TÍTULO — FUNCIONAMENTO
    // =====================================================

    tituloSecao: {
        fontSize: 11,
        fontWeight: '800',
        letterSpacing: 1.5,
        color: '#02719c',
        marginBottom: 12,
    },


    // =====================================================
    // CARD — HORÁRIOS DA CENTRAL
    // =====================================================

    card: {
        backgroundColor: colors.card,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: colors.border,
        padding: 16,

        // Sombra
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.05,
        shadowRadius: 10,

        elevation: 2,
    },


    // =====================================================
    // CABEÇALHO DO CARD DE HORÁRIOS
    // =====================================================

    cabecalho: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },

    // Fundo do ícone de relógio
    iconeCabecalho: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: '#e0f2fe',
        alignItems: 'center',
        justifyContent: 'center',
    },

    // Área dos textos do cabeçalho
    infoCabecalho: {
        flex: 1,
        marginLeft: 12,
        marginRight: 8,
    },

    // Título "Horários da Central de Tráfego"
    tituloCard: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.text,
        lineHeight: 21,
    },

    // Descrição abaixo do título
    descricaoCard: {
        fontSize: 12,
        fontWeight: '400',
        color: colors.textSecondary,
        lineHeight: 17,
        marginTop: 4,
    },


    // =====================================================
    // BADGE — ATENDIMENTO ATIVO
    // =====================================================

    badge: {
        backgroundColor: '#e0f2fe',
        borderRadius: 20,
        paddingHorizontal: 9,
        paddingVertical: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },

    textoBadge: {
        fontSize: 10,
        fontWeight: '600',
        color: '#02719c',
        lineHeight: 13,
        textAlign: 'center',
    },


    // =====================================================
    // HORÁRIOS DE FUNCIONAMENTO
    // =====================================================

    horarios: {
        marginTop: 18,
        gap: 10,
    },

    // Cada linha de horário
    linhaHorario: {
        minHeight: 50,
        backgroundColor: colors.backgroundElement,
        borderRadius: 11,
        paddingHorizontal: 14,

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    // Ícone + nome do dia
    ladoHorario: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    // "Segunda a Sexta" / "Sábados"
    nomeDia: {
        fontSize: 13,
        fontWeight: '600',
        color: colors.text,
        marginLeft: 9,
    },

    // Horário "05:00 às 23:30"
    horario: {
        fontSize: 13,
        fontWeight: '700',
        color: colors.text,
    },


    // =====================================================
    // PLANTÃO DE EMERGÊNCIA 24H
    // =====================================================

    plantao: {
        backgroundColor: '#e0f2fe',
        borderRadius: 12,
        padding: 14,
        marginTop: 14,
    },

    // Ícone + título do plantão
    linhaPlantao: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    // "PLANTÃO DE EMERGÊNCIA 24H"
    tituloPlantao: {
        fontSize: 12,
        fontWeight: '700',
        color: '#02719c',
        marginLeft: 8,
    },

    // Texto abaixo do título
    textoPlantao: {
        fontSize: 12,
        fontWeight: '400',
        color: colors.text,
        lineHeight: 17,
        marginTop: 7,
    },


    // =====================================================
    // TÍTULO — CANAIS DE ATENDIMENTO
    // =====================================================

    tituloCanais: {
        fontSize: 11,
        fontWeight: '700',
        letterSpacing: 1.5,
        color: '#02719c',
        marginTop: 24,
        marginBottom: 12,
    },


    // =====================================================
    // CARDS DOS CANAIS DE ATENDIMENTO
    // =====================================================

    cardCanal: {
        backgroundColor: colors.card,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: colors.border,
        padding: 16,
        marginBottom: 12,

        // Sombra
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.05,
        shadowRadius: 10,

        elevation: 2,
    },


    // =====================================================
    // CARD — CHAT COM ATENDENTE
    // =====================================================

    cabecalhoCanal: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    // Fundo do ícone de chat/telefone
    iconeCanal: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: '#e0f2fe',
        alignItems: 'center',
        justifyContent: 'center',
    },

    // Área dos textos do canal
    infoCanal: {
        flex: 1,
        marginLeft: 12,
        marginRight: 8,
    },

    // Título "Chat com Atendente"
    tituloCanal: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.text,
    },

    // Texto secundário
    descricaoCanal: {
        fontSize: 12,
        fontWeight: '400',
        color: colors.textSecondary,
        lineHeight: 17,
        marginTop: 4,
    },


    // =====================================================
    // STATUS — ONLINE AGORA
    // =====================================================

    badgeOnline: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f1f5f9',
        borderRadius: 20,
        paddingHorizontal: 9,
        paddingVertical: 7,
    },

    // Bolinha verde do status
    pontoOnline: {
        width: 7,
        height: 7,
        borderRadius: 7,
        backgroundColor: '#10b981',
        marginRight: 5,
    },

    textoOnline: {
        fontSize: 10,
        fontWeight: '500',
        color: colors.text,
    },


    // =====================================================
    // BOTÃO — INICIAR CHAT
    // =====================================================

    botaoChat: {
        height: 44,
        backgroundColor: '#02719c',
        borderRadius: 12,
        marginTop: 16,

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    textoBotaoChat: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: '700',
        marginRight: 7,
    },


    // =====================================================
    // CARD — CENTRAL TELEFÔNICA 0800
    // =====================================================

    cabecalhoTelefone: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },

    infoTelefone: {
        flex: 1,
        marginLeft: 12,
    },

    // "CENTRAL TELEFÔNICA (0800)"
    rotuloTelefone: {
        fontSize: 11,
        fontWeight: '700',
        color: colors.textSecondary,
        letterSpacing: 0.5,
    },

    // Número 0800
    numeroTelefone: {
        fontSize: 20,
        fontWeight: '800',
        color: colors.text,
        marginTop: 2,
        letterSpacing: 0.5,
    },


    // =====================================================
    // AÇÕES DO TELEFONE
    // =====================================================

    acoesTelefone: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 16,
    },

    // Selo "Ligação Gratuita"
    tagGratuita: {
        flex: 1,
        height: 44,
        backgroundColor: '#f1f5f9',
        borderRadius: 10,

        alignItems: 'center',
        justifyContent: 'center',
    },

    textoTag: {
        fontSize: 12,
        fontWeight: '600',
        color: colors.textSecondary,
    },

    // Botão "Ligar Agora"
    botaoLigar: {
        flex: 1,
        height: 44,
        backgroundColor: '#e0f2fe',
        borderRadius: 12,

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    textoLigar: {
        fontSize: 13,
        fontWeight: '700',
        color: '#02719c',
        marginLeft: 7,
    },


    // =====================================================
    // FEEDBACK
    // =====================================================

    feedback: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 18,
    },

    textoFeedback: {
        flex: 1,
        fontSize: 12,
        fontWeight: '400',
        color: colors.textSecondary,
        lineHeight: 17,
        marginRight: 12,
    },

    acoesFeedback: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },

    // Botões de gostei / não gostei
    botaoFeedback: {
        width: 38,
        height: 38,
        borderRadius: 10,
        backgroundColor: colors.card,
        borderWidth: 1,
        borderColor: colors.border,

        alignItems: 'center',
        justifyContent: 'center',
    },

});