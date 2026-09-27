import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@/contexts/ThemeContext';
import { supabase } from '@/lib/supabase';

type BillingPeriod = 'monthly' | 'semester' | 'one_time';

type PlanRecord = {
  id: string;
  name: string;
  description: string;
  price_cents: number;
  billing_period: BillingPeriod;
  benefits: string[];
};

type ThemeColors = ReturnType<typeof useAppTheme>['colors'];

function formatPrice(priceCents: number) {
  return `R$ ${(priceCents / 100).toFixed(2).replace('.', ',')}`;
}

function PlanCard({ plan, colors }: { plan: PlanRecord; colors: ThemeColors }) {
  const periodLabel = plan.billing_period === 'monthly'
    ? '/ mês'
    : plan.billing_period === 'semester' ? '/ semestre' : 'pagamento único';
  const periodDetail = plan.billing_period === 'monthly'
    ? 'Cobrança mensal'
    : plan.billing_period === 'semester' ? 'Cobrança a cada 6 meses' : 'Sem mensalidade recorrente';
  const benefits = Array.isArray(plan.benefits)
    ? plan.benefits.filter((benefit): benefit is string => typeof benefit === 'string')
    : [];

  return (
    <View style={[styles.planCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View style={[styles.categoryTag, { backgroundColor: colors.accentSoft }]}>
        <Ionicons name={plan.billing_period === 'one_time' ? 'ticket-outline' : 'bus-outline'} size={15} color={colors.accent} />
        <Text style={[styles.categoryText, { color: colors.accent }]}>
          {plan.billing_period === 'one_time' ? 'AVULSO' : plan.billing_period === 'semester' ? 'SEMESTRAL' : 'MENSAL'}
        </Text>
      </View>

      <Text style={[styles.planTitle, { color: colors.text }]}>{plan.name}</Text>
      {!!plan.description && <Text style={[styles.planDescription, { color: colors.textSecondary }]}>{plan.description}</Text>}

      <View style={[styles.priceBox, { backgroundColor: colors.backgroundElement }]}>
        <View style={{ flex: 1 }}>
          <View style={styles.priceRow}>
            <Text style={[styles.price, { color: colors.accent }]}>{formatPrice(plan.price_cents)}</Text>
            <Text style={[styles.periodLabel, { color: colors.textSecondary }]}>{periodLabel}</Text>
          </View>
          <Text style={[styles.priceDetail, { color: colors.textSecondary }]}>{periodDetail}</Text>
        </View>
        <Ionicons name="ribbon-outline" size={27} color={colors.accent} />
      </View>

      {benefits.length > 0 && (
        <View style={styles.benefitList}>
          {benefits.map((benefit, index) => (
            <View key={`${plan.id}-benefit-${index}`} style={styles.benefitRow}>
              <Ionicons name="checkmark-circle" size={19} color={colors.accent} />
              <Text style={[styles.benefitText, { color: colors.text }]}>{benefit}</Text>
            </View>
          ))}
        </View>
      )}

      <Pressable
        onPress={() => Alert.alert(plan.name, 'A contratação pelo aplicativo ainda será integrada.')}
        style={[styles.planButton, { backgroundColor: colors.accent }]}
      >
        <Text style={styles.planButtonText}>Saiba mais</Text>
        <Ionicons name="arrow-forward" size={17} color="#fff" />
      </Pressable>
    </View>
  );
}

export default function PlanosScreen() {
  const { colors } = useAppTheme();
  const [billing, setBilling] = useState<'monthly' | 'semester'>('monthly');
  const [plans, setPlans] = useState<PlanRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const loadPlans = async () => {
      setLoading(true);
      setErrorMessage('');

      try {
        const { data, error } = await supabase
          .from('plans')
          .select('id, name, description, price_cents, billing_period, benefits')
          .eq('active', true)
          .order('price_cents', { ascending: true });

        if (error) throw error;
        if (isMounted) setPlans((data ?? []) as PlanRecord[]);
      } catch (error) {
        console.warn('Não foi possível carregar os planos:', error);
        if (isMounted) setErrorMessage('Não foi possível carregar os planos. Confira sua conexão e tente novamente.');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    void loadPlans();
    return () => { isMounted = false; };
  }, [reloadKey]);

  const isSemester = billing === 'semester';
  const visiblePlans = plans.filter((plan) => plan.billing_period === billing || plan.billing_period === 'one_time');

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.heading}>
        <Text style={[styles.pageTitle, { color: colors.text }]}>Planos Veloce</Text>
        <Text style={[styles.pageSubtitle, { color: colors.textSecondary }]}>Confira os planos disponíveis.</Text>
      </View>

      <View style={[styles.billingControl, { backgroundColor: colors.backgroundSelected }]}>
        <Pressable
          onPress={() => setBilling('monthly')}
          style={[styles.billingOption, !isSemester && { backgroundColor: colors.card, elevation: 2 }]}
        >
          <Text style={[styles.billingText, { color: isSemester ? colors.textSecondary : colors.text }]}>Mensal</Text>
        </Pressable>
        <Pressable
          onPress={() => setBilling('semester')}
          style={[styles.billingOption, isSemester && { backgroundColor: colors.card, elevation: 2 }]}
        >
          <Text style={[styles.billingText, { color: isSemester ? colors.text : colors.textSecondary }]}>Semestral</Text>
        </Pressable>
      </View>

      {loading ? (
        <View style={styles.stateContainer}>
          <ActivityIndicator color={colors.accent} />
          <Text style={[styles.stateText, { color: colors.textSecondary }]}>Carregando planos...</Text>
        </View>
      ) : errorMessage ? (
        <View style={styles.stateContainer}>
          <Text style={[styles.stateText, { color: colors.textSecondary }]}>{errorMessage}</Text>
          <Pressable onPress={() => setReloadKey((value) => value + 1)} style={[styles.retryButton, { borderColor: colors.accent }]}>
            <Text style={[styles.retryText, { color: colors.accent }]}>Tentar novamente</Text>
          </Pressable>
        </View>
      ) : visiblePlans.length === 0 ? (
        <View style={styles.stateContainer}>
          <Text style={[styles.stateText, { color: colors.textSecondary }]}>Nenhum plano disponível nesta modalidade.</Text>
        </View>
      ) : (
        visiblePlans.map((plan) => <PlanCard key={plan.id} plan={plan} colors={colors} />)
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: 18, paddingBottom: 20, gap: 16 },
  heading: { marginBottom: 2, gap: 4 },
  pageTitle: { fontSize: 24, fontWeight: '800' },
  pageSubtitle: { fontSize: 14 },
  billingControl: { flexDirection: 'row', borderRadius: 13, padding: 4 },
  billingOption: { flex: 1, minHeight: 42, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  billingText: { fontWeight: '600', fontSize: 13 },
  planCard: { borderRadius: 17, padding: 16, gap: 12, borderWidth: 1 },
  categoryTag: { alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: 5, paddingVertical: 6, paddingHorizontal: 9, borderRadius: 20, backgroundColor: '#e0f2fe' },
  categoryText: { fontSize: 9, fontWeight: '800', letterSpacing: 0.5 },
  planTitle: { fontSize: 18, fontWeight: '800' },
  planDescription: { fontSize: 12, lineHeight: 18, marginTop: -8 },
  priceBox: { flexDirection: 'row', alignItems: 'center', borderRadius: 12, padding: 13 },
  priceRow: { flexDirection: 'row', alignItems: 'baseline', gap: 4, flexWrap: 'wrap' },
  price: { fontSize: 21, fontWeight: '800' },
  periodLabel: { fontSize: 12 },
  priceDetail: { fontSize: 11, marginTop: 3 },
  benefitList: { gap: 9 },
  benefitRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8 },
  benefitText: { flex: 1, fontSize: 12, lineHeight: 18 },
  planButton: { minHeight: 45, borderRadius: 11, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingHorizontal: 12 },
  planButtonText: { color: '#fff', fontSize: 13, fontWeight: '700' },
  stateContainer: { alignItems: 'center', gap: 12, paddingVertical: 24 },
  stateText: { fontSize: 13, textAlign: 'center', lineHeight: 19 },
  retryButton: { minHeight: 40, borderRadius: 10, borderWidth: 1, paddingHorizontal: 14, alignItems: 'center', justifyContent: 'center' },
  retryText: { fontSize: 13, fontWeight: '700' },
});
