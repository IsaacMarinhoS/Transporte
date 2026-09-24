import { Text, View, FlatList, Pressable, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createHomeStyles } from '../styles/home';
import { useAppTheme } from '@/contexts/ThemeContext';
import QRCode from 'react-native-qrcode-svg';
import { router } from 'expo-router';

export default function HomeScreen() {
    const { colors } = useAppTheme();
    const styles = createHomeStyles(colors);
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.conteudoScroll}
        >

            {/* CONTEÚDO COM ROLAGEM */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.conteudoScroll}
            >
                {/* CONTEÚDO DA HOME */}




                <View style={styles.conteudo}>

                    {/* PASSE DIGITAL */}
                    <View style={styles.passeCard}>

                        {/* TOPO AZUL */}
                        <View style={styles.passeTopo}>

                            <View style={styles.passeTopoLinha}>
                                <View style={styles.passeCategoria}>
                                    <Ionicons
                                        name="wifi-outline"
                                        size={18}
                                        color="#e0f2fe"
                                    />

                                    <Text style={styles.passeCategoriaTexto}>
                                        PASSE DIGITAL
                                    </Text>
                                </View>

                                <View style={styles.passeStatus}>
                                    <View style={styles.pontoStatus} />
                                    <Text style={styles.textoStatus}>
                                        ASSINATURA ATIVA
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.dadosTitular}>
                                <Text style={styles.nomeTitular}>
                                    Junior Silveira
                                </Text>

                                <Text style={styles.idTitular}>
                                    ID: #VTC-84920
                                </Text>
                            </View>

                            <View style={styles.tagPremium}>
                                <Text style={styles.textoPremium}>
                                    PREMIUM
                                </Text>
                            </View>

                        </View>

                        {/* CORPO */}
                        <View style={styles.passeCorpo}>

                            {/* QR CODE */}
                            <View style={styles.qrContainer}>

                                <View style={styles.qrBox}>
                                    <QRCode
                                        value="VTC-84920-ISAAC-SILVEIRA"
                                        size={68}
                                    />
                                </View>

                                <View style={styles.qrInformacoes}>

                                    <Text style={styles.tituloApresentar}>
                                        Apresente na van
                                    </Text>

                                    <Text style={styles.instrucaoQr}>
                                        Aproxime do leitor óptico no momento do embarque
                                    </Text>

                                    <View style={styles.validacao}>
                                        <Ionicons
                                            name="radio-outline"
                                            size={13}
                                            color="#02719c"
                                        />

                                        <Text style={styles.textoValidacao}>
                                            Validação instantânea
                                        </Text>
                                    </View>

                                </View>

                            </View>

                            {/* VIAGENS */}
                            <View style={styles.viagensCabecalho}>

                                <Text style={styles.textoViagens}>
                                    Viagens no mês
                                </Text>

                                <Text style={styles.numeroViagens}>
                                    38 / 44
                                </Text>

                            </View>

                            {/* BARRA DE PROGRESSO */}
                            <View style={styles.trilhoProgresso}>
                                <View style={styles.progresso} />
                            </View>

                            <View style={styles.viagensRodape}>

                                <Text style={styles.planoAtual}>
                                    Plano Premium Urbano
                                </Text>

                                <Text style={styles.restantes}>
                                    6 restantes
                                </Text>

                            </View>

                            {/* BOTÃO */}
                            <Pressable style={styles.botaoApresentar}onPress={() => router.push('/passedigital')}>
              
             
                                <Ionicons
                                    name="scan-outline"
                                    size={20}
                                    color="#ffffff"
                                />

                                <Text style={styles.textoBotaoApresentar}>
                                    Apresentar ao Motorista
                                </Text>

                            </Pressable>

                        </View>

                    </View>

                    {/* PLANOS */}
                    <View style={styles.secaoPlanos}>

                        <Text style={styles.tituloPlanos}>
                            Planos
                        </Text>

                        <FlatList
                            data={[
                                {
                                    id: '1',
                                    nome: 'Plano Básico',
                                    preco: 'R$ 99,90',
                                },
                                {
                                    id: '2',
                                    nome: 'Plano Conforto',
                                    preco: 'R$ 149,90',
                                },
                                {
                                    id: '3',
                                    nome: 'Plano Premium',
                                    preco: 'R$ 199,90',
                                },
                            ]}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <View style={styles.cardPlano}>

                                    <Text style={styles.nomePlano}>
                                        {item.nome}
                                    </Text>

                                    <Text style={styles.descricaoPlano}>
                                        Transporte mensal com conforto e praticidade.
                                    </Text>

                                    <Text style={styles.precoPlano}>
                                        {item.preco}
                                    </Text>

                                    <Text style={styles.mensalidade}>
                                        por mês
                                    </Text>

                                    <View style={styles.beneficios}>
                                        <Text style={styles.beneficio}>✓ Rotas selecionadas</Text>
                                        <Text style={styles.beneficio}>✓ Viagens mensais</Text>
                                        <Text style={styles.beneficio}>✓ Suporte pelo aplicativo</Text>
                                    </View>

                                    <Pressable style={styles.botaoContratar}>
                                        <Text style={styles.textoBotao}>
                                            Quero contratar
                                        </Text>
                                    </Pressable>

                                </View>
                            )}
                        />

                    </View>

                    {/* AVISOS DO SERVIÇO */}
                    <View style={styles.avisos}>

                        <Text style={styles.tituloAvisos}>
                            Avisos do serviço
                        </Text>

                        <Text style={styles.numeroAvisos}>
                            0
                        </Text>

                    </View>


                    {/* CAIXA DE AVISOS */}
                    <View style={styles.caixaAviso}>

                        {/* Barra vertical */}
                        <View style={styles.barraAviso} />

                        {/* Ícone */}
                        <Ionicons
                            name="checkmark-circle-outline"
                            size={25}
                            color="#02719c"
                            marginLeft={10}
                        />

                        {/* Textos */}
                        <View style={styles.conteudoAviso}>

                            <Text style={styles.tituloAviso}>
                                Tudo certo!
                            </Text>

                            <Text style={styles.textoAviso}>
                                Não há novos avisos no momento.
                            </Text>

                        </View>



                    </View>
                </View>


            </ScrollView>


        </ScrollView>
    );
}
