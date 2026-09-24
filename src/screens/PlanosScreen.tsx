import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@/contexts/ThemeContext';

type PlanCardProps = {
  title: string;
  description: string;
  price: string;
  detail: string;
  benefits: string[];
  icon: keyof typeof Ionicons.glyphMap;
  tag: string;
  featured?: boolean;
  active?: boolean;
  action: string;
  onPress: () => void;
  colors: ReturnType<typeof useAppTheme>['colors'];
};

function PlanCard({ title, description, price, detail, benefits, icon, tag, featured, active, action, onPress, colors }: PlanCardProps) {
  return (
    <View style={[styles.planCard, { backgroundColor: colors.card, borderColor: featured ? colors.accent : colors.border, borderWidth: featured ? 2 : 1 }]}>
      <View style={styles.planTagRow}>
        <View style={[styles.categoryTag, { backgroundColor: featured ? colors.accentSoft : colors.backgroundElement }]}>
          <Ionicons name={icon} size={15} color={colors.accent} />
          <Text style={[styles.categoryText, { color: colors.accent }]}>{tag}</Text>
        </View>
        {featured && <View style={[styles.featuredTag, { backgroundColor: colors.accent }]}><Ionicons name="star" size={12} color="#fff" /><Text style={styles.featuredText}>MAIS ESCOLHIDO</Text></View>}
      </View>
      <Text style={[styles.planTitle, { color: colors.text }]}>{title}</Text>
      <Text style={[styles.planDescription, { color: colors.textSecondary }]}>{description}</Text>
      <View style={[styles.priceBox, { backgroundColor: colors.backgroundElement }]}>
        <View style={{ flex: 1 }}>
          <View style={styles.priceRow}><Text style={[styles.price, { color: colors.accent }]}>{price}</Text><Text style={[styles.perMonth, { color: colors.textSecondary }]}>{title.includes('Flexível') ? '' : '/ mês'}</Text></View>
          <Text style={[styles.priceDetail, { color: colors.textSecondary }]}>{detail}</Text>
        </View>
        <Ionicons name="ribbon-outline" size={27} color={colors.accent} />
      </View>
      <View style={styles.benefitList}>
        {benefits.map((benefit) => <View key={benefit} style={styles.benefitRow}><Ionicons name="checkmark-circle" size={19} color={colors.accent} /><Text style={[styles.benefitText, { color: colors.text }]}>{benefit}</Text></View>)}
      </View>
      <Pressable onPress={onPress} style={[styles.planButton, active ? { backgroundColor: colors.accentSoft } : featured ? { backgroundColor: colors.accent } : { borderColor: colors.accent, borderWidth: 1 }]}>
        {active && <Ionicons name="checkmark-circle" size={18} color={colors.accent} />}
        <Text style={[styles.planButtonText, { color: active ? colors.accent : featured ? '#fff' : colors.accent }]}>{action}</Text>
        {!active && <Ionicons name="arrow-forward" size={17} color={featured ? '#fff' : colors.accent} />}
      </Pressable>
    </View>
  );
}

export default function PlanosScreen() {
  const { colors } = useAppTheme();
  const [billing, setBilling] = useState<'monthly' | 'semester'>('monthly');
  const isSemester = billing === 'semester';

  return (
    <ScrollView style={{ backgroundColor: colors.background }} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.heading}>
        <Text style={[styles.pageTitle, { color: colors.text }]}>Planos Veloce</Text>
        <Text style={[styles.pageSubtitle, { color: colors.textSecondary }]}>Escolha a melhor opção para sua rotina.</Text>
      </View>

      <View style={styles.currentCard}>
        <View style={styles.currentTop}>
          <View style={styles.currentBadge}><View style={styles.activeDot} /><Text style={styles.currentBadgeText}>SEU PLANO ATUAL</Text></View>
          <Text style={styles.activeStatus}>Assinatura Ativa</Text>
        </View>
        <Text style={styles.currentTitle}>Plano Mensal Ilimitado</Text>
        <Text style={styles.currentDescription}>Acesso livre a todas as rotas e vans da rede metropolitana</Text>
        <View style={styles.metricsRow}>
          <View style={styles.metric}><Text style={styles.metricLabel}>COTA DESTE MÊS</Text><Text style={styles.metricValue}>38 viagens</Text><Text style={styles.metricHint}>Uso ilimitado</Text></View>
          <View style={styles.metric}><Text style={styles.metricLabel}>PRÓXIMA FATURA</Text><Text style={styles.metricValue}>18 de Nov</Text><Text style={styles.metricHint}>Renovação auto</Text></View>
        </View>
        <Pressable onPress={() => Alert.alert('Gerenciar assinatura', 'O gerenciamento da assinatura estará disponível em breve.')} style={styles.manageButton}>
          <Ionicons name="document-text-outline" size={19} color="#fff" /><Text style={styles.manageText}>Gerenciar Assinatura</Text><Ionicons name="chevron-forward" size={18} color="#fff" />
        </Pressable>
      </View>

      <View style={[styles.billingControl, { backgroundColor: colors.backgroundSelected }]}>
        <Pressable onPress={() => setBilling('monthly')} style={[styles.billingOption, isSemester ? null : { backgroundColor: colors.card, elevation: 2 }]}>
          <Text style={[styles.billingText, { color: isSemester ? colors.textSecondary : colors.text }]}>Cobrança Mensal</Text>
        </Pressable>
        <Pressable onPress={() => setBilling('semester')} style={[styles.billingOption, isSemester ? { backgroundColor: colors.card, elevation: 2 } : null]}>
          <Text style={[styles.billingText, { color: isSemester ? colors.text : colors.textSecondary }]}>Semestral</Text><View style={[styles.discountBadge, { backgroundColor: colors.accentSoft }]}><Text style={[styles.discountText, { color: colors.accent }]}>15% OFF</Text></View>
        </Pressable>
      </View>

      <PlanCard colors={colors} featured active icon="star-outline" tag="COMPLETO" title="Plano Mensal Completo" description="Ideal para quem usa vans todos os dias no trajeto casa-trabalho" price={isSemester ? 'R$ 246,42' : 'R$ 289,90'} detail={isSemester ? 'R$ 1.478,49 cobrados a cada 6 meses' : 'Equivalente a R$ 6,58 por trajeto'} benefits={['Embarque ilimitado em qualquer linha da rede', 'Reserva antecipada de assento garantida', 'Carteirinha digital com validação prioritária', 'Suporte prioritário 24/7 via WhatsApp e Chat', 'Wi-Fi a bordo de alta velocidade e tomadas USB']} action="Plano Atual (Ativo)" onPress={() => Alert.alert('Plano atual', 'Você já está usando o Plano Mensal Completo.')} />

      <PlanCard colors={colors} icon="school-outline" tag="ESTUDANTE" title="Plano Universitário" description="Desconto especial com comprovação de matrícula ativa" price={isSemester ? 'R$ 169,92' : 'R$ 199,90'} detail="Economia de 31% para graduação" benefits={['Até 2 viagens por dia (segunda a sábado)', 'Cobertura em todas as rotas universitárias e terminais', 'Validação rápida por biometria no app']} action="Mudar para este plano" onPress={() => Alert.alert('Plano Universitário', 'A validação de matrícula estará disponível em breve.')} />

      <PlanCard colors={colors} icon="options-outline" tag="FLEXÍVEL" title="Pacote Flexível (10 Viagens)" description="Perfeito para trabalho híbrido (válido por 60 dias)" price="R$ 89,90" detail="Sem mensalidade recorrente" benefits={['10 créditos de viagem avulsos', 'Sem fidelidade ou cobrança automática', 'Válido em todas as linhas metropolitanas']} action="Comprar Pacote Avulso" onPress={() => Alert.alert('Pacote Flexível', 'A compra de pacotes estará disponível em breve.')} />

      <View style={styles.trustSection}>
        <View style={styles.sectionHeading}><Ionicons name="shield-checkmark" size={23} color={colors.accent} /><Text style={[styles.sectionTitle, { color: colors.text }]}>Por que assinar a Veloce?</Text></View>
        {[
          ['calendar-outline', 'Cancele quando quiser', 'Sem multas rescisórias ou burocracia'],
          ['lock-closed-outline', 'Pagamento 100% protegido', 'Via Cartão de Crédito ou PIX recorrente'],
          ['bus-outline', 'Frota executiva e climatizada', 'Vans rastreadas com assento individual'],
        ].map(([icon, title, subtitle]) => <View key={title} style={[styles.trustCard, { backgroundColor: colors.card, borderColor: colors.border }]}><View style={[styles.trustIcon, { backgroundColor: colors.accentSoft }]}><Ionicons name={icon as keyof typeof Ionicons.glyphMap} size={20} color={colors.accent} /></View><View style={{ flex: 1 }}><Text style={[styles.trustTitle, { color: colors.text }]}>{title}</Text><Text style={[styles.trustSubtitle, { color: colors.textSecondary }]}>{subtitle}</Text></View></View>)}
      </View>

      <View style={styles.fleetBanner}>
        <View style={styles.fleetIcon}><Ionicons name="bus" size={30} color="#fff" /></View>
        <Text style={styles.fleetLabel}>PADRÃO VELOCE TRANSIT</Text>
        <Text style={styles.fleetTitle}>Conforto executivo em cada quilômetro da sua rotina diária</Text>
      </View>

      <View style={[styles.corporateCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={[styles.corporateIcon, { backgroundColor: colors.accentSoft }]}><Ionicons name="help-circle-outline" size={24} color={colors.accent} /></View>
        <View style={{ flex: 1 }}><Text style={[styles.corporateTitle, { color: colors.text }]}>Dúvidas sobre planos corporativos?</Text><Text style={[styles.corporateSubtitle, { color: colors.textSecondary }]}>Fale com um consultor para empresas</Text></View>
        <Pressable onPress={() => Alert.alert('Planos corporativos', 'Em breve, você poderá falar com um consultor por aqui.')} style={[styles.contactButton, { borderColor: colors.accent }]}><Text style={[styles.contactText, { color: colors.accent }]}>Contatar</Text></Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: 18, paddingBottom: 30, gap: 16 },
  heading: { marginBottom: 2 }, pageTitle: { fontSize: 24, fontWeight: '800' }, pageSubtitle: { fontSize: 14, marginTop: 4 },
  currentCard: { backgroundColor: '#02719c', borderRadius: 18, padding: 18 }, currentTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, currentBadge: { flexDirection: 'row', alignItems: 'center', gap: 7, borderRadius: 30, borderWidth: 1, borderColor: 'rgba(255,255,255,0.35)', backgroundColor: 'rgba(255,255,255,0.12)', paddingHorizontal: 10, paddingVertical: 7 }, activeDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#10b981' }, currentBadgeText: { color: '#fff', fontSize: 9, fontWeight: '800', letterSpacing: 0.5 }, activeStatus: { color: '#e4f5fa', fontSize: 11 }, currentTitle: { color: '#fff', fontSize: 21, fontWeight: '800', marginTop: 17 }, currentDescription: { color: 'rgba(255,255,255,0.9)', fontSize: 12, lineHeight: 18, marginTop: 5 }, metricsRow: { flexDirection: 'row', gap: 10, marginTop: 17 }, metric: { flex: 1, borderRadius: 12, padding: 12, backgroundColor: 'rgba(255,255,255,0.13)' }, metricLabel: { color: '#d7eff7', fontSize: 9, fontWeight: '700', letterSpacing: 0.4 }, metricValue: { color: '#fff', fontSize: 17, fontWeight: '800', marginTop: 7 }, metricHint: { color: '#e0f2fe', fontSize: 11, marginTop: 2 }, manageButton: { height: 46, borderRadius: 11, backgroundColor: 'rgba(255,255,255,0.18)', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 9, marginTop: 13 }, manageText: { color: '#fff', fontWeight: '700', flex: 1 },
  billingControl: { flexDirection: 'row', borderRadius: 13, padding: 4 }, billingOption: { flex: 1, minHeight: 42, borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7 }, billingText: { fontWeight: '600', fontSize: 13 }, discountBadge: { paddingHorizontal: 6, paddingVertical: 3, borderRadius: 8 }, discountText: { fontSize: 9, fontWeight: '800' },
  planCard: { borderRadius: 17, padding: 16, gap: 12 }, planTagRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 6 }, categoryTag: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingVertical: 6, paddingHorizontal: 9, borderRadius: 20 }, categoryText: { fontSize: 9, fontWeight: '800', letterSpacing: 0.5 }, featuredTag: { flexDirection: 'row', alignItems: 'center', gap: 4, borderRadius: 20, paddingHorizontal: 8, paddingVertical: 6 }, featuredText: { color: '#fff', fontSize: 9, fontWeight: '800' }, planTitle: { fontSize: 18, fontWeight: '800', marginBottom: -8 }, planDescription: { fontSize: 12, lineHeight: 18 }, priceBox: { flexDirection: 'row', alignItems: 'center', borderRadius: 12, padding: 13 }, priceRow: { flexDirection: 'row', alignItems: 'baseline', gap: 4 }, price: { fontSize: 21, fontWeight: '800' }, perMonth: { fontSize: 12 }, priceDetail: { fontSize: 11, marginTop: 3 }, benefitList: { gap: 9 }, benefitRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8 }, benefitText: { flex: 1, fontSize: 12, lineHeight: 18 }, planButton: { minHeight: 45, borderRadius: 11, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingHorizontal: 12 }, planButtonText: { fontSize: 13, fontWeight: '700' },
  trustSection: { gap: 10, marginTop: 4 }, sectionHeading: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 2 }, sectionTitle: { fontSize: 17, fontWeight: '800' }, trustCard: { borderWidth: 1, borderRadius: 13, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 11 }, trustIcon: { width: 39, height: 39, borderRadius: 12, alignItems: 'center', justifyContent: 'center' }, trustTitle: { fontSize: 13, fontWeight: '700' }, trustSubtitle: { fontSize: 11, marginTop: 3 },
  fleetBanner: { borderRadius: 17, padding: 18, minHeight: 155, justifyContent: 'flex-end', overflow: 'hidden', backgroundColor: '#07516e' }, fleetIcon: { position: 'absolute', top: 18, right: 18, opacity: 0.7 }, fleetLabel: { color: '#b9ecfa', fontSize: 10, fontWeight: '800', letterSpacing: 1 }, fleetTitle: { color: '#fff', fontSize: 19, lineHeight: 25, fontWeight: '800', marginTop: 7, maxWidth: '90%' },
  corporateCard: { borderWidth: 1, borderRadius: 15, padding: 13, flexDirection: 'row', alignItems: 'center', gap: 10 }, corporateIcon: { width: 38, height: 38, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }, corporateTitle: { fontSize: 12, fontWeight: '700' }, corporateSubtitle: { fontSize: 10, marginTop: 3 }, contactButton: { borderWidth: 1, borderRadius: 9, paddingHorizontal: 12, paddingVertical: 9 }, contactText: { fontWeight: '700', fontSize: 11 },
});
