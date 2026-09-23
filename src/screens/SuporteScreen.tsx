import { ScrollView, Text, View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import { styles } from '../styles/Suporte';

export default function SuporteScreen() {
    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.conteudo}
            showsVerticalScrollIndicator={false}
        >


            {/* CANAIS DE ATENDIMENTO */}
            <Text style={styles.tituloCanais}>
                CANAIS DE ATENDIMENTO
            </Text>

            {/* CARD CHAT */}
            <View style={styles.cardCanal}>

                <View style={styles.cabecalhoCanal}>

                    <View style={styles.iconeCanal}>
                        <Ionicons
                            name="chatbubble-outline"
                            size={22}
                            color="#02719c"
                        />
                    </View>

                    <View style={styles.infoCanal}>
                        <Text style={styles.tituloCanal}>
                            Chat com Atendente
                        </Text>

                        <Text style={styles.descricaoCanal}>
                            Fila prioritária • Tempo de resposta ~2 min
                        </Text>
                    </View>

                    <View style={styles.badgeOnline}>
                        <View style={styles.pontoOnline} />

                        <Text style={styles.textoOnline}>
                            Online agora
                        </Text>
                    </View>

                </View>

                <Pressable
                    style={styles.botaoChat}
                    onPress={() => router.push('/chat')}
                >
                    <Text style={styles.textoBotaoChat}>
                        Iniciar Chat
                    </Text>

                    <Ionicons
                        name="arrow-forward"
                        size={18}
                        color="#ffffff"
                    />
                </Pressable>
                

            </View>


            {/* CARD TELEFONE */}
            <View style={styles.cardCanal}>

                <View style={styles.cabecalhoTelefone}>

                    <View style={styles.iconeCanal}>
                        <Ionicons
                            name="call-outline"
                            size={22}
                            color="#02719c"
                        />
                    </View>

                    <View style={styles.infoTelefone}>

                        <Text style={styles.rotuloTelefone}>
                            CENTRAL TELEFÔNICA (0800)
                        </Text>

                        <Text style={styles.numeroTelefone}>
                            0800 835 623
                        </Text>

                        <Text style={styles.descricaoCanal}>
                            Ligação gratuita para todo o Brasil • 24h para emergências
                        </Text>

                    </View>

                </View>

                <View style={styles.acoesTelefone}>

                    <View style={styles.tagGratuita}>
                        <Text style={styles.textoTag}>
                            Ligação Gratuita
                        </Text>
                    </View>

                    <Pressable
                        style={styles.botaoLigar}
                        onPress={() => {
                            // futuramente podemos colocar a discagem aqui
                        }}
                    >
                        <Ionicons
                            name="call"
                            size={17}
                            color="#02719c"
                        />

                        <Text style={styles.textoLigar}>
                            Ligar Agora
                        </Text>
                    </Pressable>

                </View>

            </View>

            {/* TÍTULO DA SEÇÃO */}
            <Text style={styles.tituloSecao}>
                FUNCIONAMENTO
            </Text>

            {/* CARD PRINCIPAL */}
            <View style={styles.card}>

                {/* CABEÇALHO */}
                <View style={styles.cabecalho}>

                    <View style={styles.iconeCabecalho}>
                        <Ionicons
                            name="time-outline"
                            size={24}
                            color="#02719c"
                        />
                    </View>

                    <View style={styles.infoCabecalho}>
                        <Text style={styles.tituloCard}>
                            Horários da Central de Tráfego
                        </Text>

                        <Text style={styles.descricaoCard}>
                            Monitoramento e suporte operacional em tempo real
                            para passageiros e motoristas.
                        </Text>
                    </View>

                    <View style={styles.badge}>
                        <Text style={styles.textoBadge}>
                            Atendimento{'\n'}Ativo
                        </Text>
                    </View>

                </View>

                {/* HORÁRIOS */}
                <View style={styles.horarios}>

                    {/* SEGUNDA A SEXTA */}
                    <View style={styles.linhaHorario}>

                        <View style={styles.ladoHorario}>
                            <Ionicons
                                name="calendar-outline"
                                size={19}
                                color="#64748b"
                            />

                            <Text style={styles.nomeDia}>
                                Segunda a Sexta
                            </Text>
                        </View>

                        <Text style={styles.horario}>
                            05:00 às 23:30
                        </Text>

                    </View>

                    {/* SÁBADOS */}
                    <View style={styles.linhaHorario}>

                        <View style={styles.ladoHorario}>
                            <Ionicons
                                name="calendar-outline"
                                size={19}
                                color="#64748b"
                            />

                            <Text style={styles.nomeDia}>
                                Sábados
                            </Text>
                        </View>

                        <Text style={styles.horario}>
                            06:00 às 18:00
                        </Text>

                    </View>

                </View>

                {/* PLANTÃO */}
                <View style={styles.plantao}>

                    <View style={styles.linhaPlantao}>

                        <Ionicons
                            name="shield-checkmark-outline"
                            size={20}
                            color="#02719c"
                        />

                        <Text style={styles.tituloPlantao}>
                            PLANTÃO DE EMERGÊNCIA 24H
                        </Text>

                    </View>

                    <Text style={styles.textoPlantao}>
                        Disponível ininterruptamente para vans em rota e
                        ocorrências a bordo.
                    </Text>

                </View>

            </View>

            {/* FEEDBACK */}
            <View style={styles.feedback}>

                <Text style={styles.textoFeedback}>
                    Este canal de suporte atendeu às suas necessidades?
                </Text>

                <View style={styles.acoesFeedback}>

                    <Pressable style={styles.botaoFeedback}>
                        <Ionicons
                            name="thumbs-up-outline"
                            size={20}
                            color="#64748b"
                        />
                    </Pressable>

                    <Pressable style={styles.botaoFeedback}>
                        <Ionicons
                            name="thumbs-down-outline"
                            size={20}
                            color="#64748b"
                        />
                    </Pressable>

                </View>

            </View>

        </ScrollView>
    );
}