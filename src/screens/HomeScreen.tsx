import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Text, View, FlatList, Pressable, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createHomeStyles } from '../styles/home';
import { useAppTheme } from '@/contexts/ThemeContext';
import QRCode from 'react-native-qrcode-svg';
import { router } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

type HomePlan = {
    id: string;
    name: string;
    description: string;
    price_cents: number;
    billing_period: 'monthly' | 'semester' | 'one_time';
    benefits: string[];
};

function formatPrice(priceCents: number) {
    return `R$ ${(priceCents / 100).toFixed(2).replace('.', ',')}`;
}

export default function HomeScreen() {
    const { colors } = useAppTheme();
    const { session } = useAuth();
    const styles = createHomeStyles(colors);
    const userId = session?.user.id ?? '';
    const nomeTitular = session?.user.user_metadata?.full_name?.trim()
        || session?.user.email?.split('@')[0]
        || 'Passageiro';
    const codigoPasse = userId ? `VLC-${userId.replace(/-/g, '').slice(0, 8).toUpperCase()}` : 'VLC-PASSE';
    const [plans, setPlans] = useState<HomePlan[]>([]);
    const [loadingPlans, setLoadingPlans] = useState(true);
    const [plansError, setPlansError] = useState(false);

    useEffect(() => {
        let isMounted = true;

        const loadPlans = async () => {
            try {
                const { data, error } = await supabase
                    .from('plans')
                    .select('id, name, description, price_cents, billing_period, benefits')
                    .eq('active', true)
                    .order('price_cents', { ascending: true });

                if (error) throw error;
                if (isMounted) setPlans((data ?? []) as HomePlan[]);
            } catch (error) {
                console.warn('Não foi possível carregar os planos da Home:', error);
                if (isMounted) setPlansError(true);
            } finally {
                if (isMounted) setLoadingPlans(false);
            }
        };

        void loadPlans();
        return () => { isMounted = false; };
    }, []);

    return (
        <ScrollView
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.conteudoScroll}
        >

            {/* CONTEÚDO COM ROLAGEM */}
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
                                    {nomeTitular}
                                </Text>

                                <Text style={styles.idTitular}>
                                    ID: #{codigoPasse}
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
                                        value={userId ? `veloce-pass:${userId}` : 'veloce-pass:unavailable'}
                                        size={68}
                                        color="#0f172a"
                                        backgroundColor="#ffffff"
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
                                            color={colors.accent}
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

                        {loadingPlans ? (
                            <View style={styles.estadoPlanos}>
                                <ActivityIndicator color={colors.accent} />
                                <Text style={styles.textoEstadoPlanos}>Carregando planos...</Text>
                            </View>
                        ) : plansError ? (
                            <Text style={styles.textoEstadoPlanos}>Não foi possível carregar os planos agora.</Text>
                        ) : plans.length === 0 ? (
                            <Text style={styles.textoEstadoPlanos}>Nenhum plano disponível no momento.</Text>
                        ) : (
                            <FlatList
                                data={plans}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) => {
                                    const benefits = Array.isArray(item.benefits)
                                        ? item.benefits.filter((benefit) => typeof benefit === 'string').slice(0, 3)
                                        : [];
                                    const period = item.billing_period === 'monthly'
                                        ? 'por mês'
                                        : item.billing_period === 'semester' ? 'por semestre' : 'pagamento único';

                                    return (
                                        <View style={styles.cardPlano}>
                                            <Text style={styles.nomePlano}>{item.name}</Text>
                                            <Text style={styles.descricaoPlano}>{item.description}</Text>
                                            <Text style={styles.precoPlano}>{formatPrice(item.price_cents)}</Text>
                                            <Text style={styles.mensalidade}>{period}</Text>
                                            {benefits.length > 0 && (
                                                <View style={styles.beneficios}>
                                                    {benefits.map((benefit, index) => (
                                                        <Text key={`${item.id}-benefit-${index}`} style={styles.beneficio}>✓ {benefit}</Text>
                                                    ))}
                                                </View>
                                            )}
                                            <Pressable
                                                style={styles.botaoContratar}
                                                onPress={() => Alert.alert(item.name, 'A contratação pelo aplicativo ainda será integrada.')}
                                            >
                                                <Text style={styles.textoBotao}>Saiba mais</Text>
                                            </Pressable>
                                        </View>
                                    );
                                }}
                            />
                        )}

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
                            color={colors.accent}
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
    );
}
