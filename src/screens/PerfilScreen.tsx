import { ReactNode, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@/contexts/ThemeContext';

const primary = '#02719c';

type IconName = keyof typeof Ionicons.glyphMap;

export default function PerfilScreen() {
  const { colors } = useAppTheme();
  const [nearbyAlert, setNearbyAlert] = useState(true);

  const notice = (title: string) => Alert.alert(title, 'Esta opção estará disponível em breve.');
  const sectionTitle = (icon: IconName, title: string, trailing?: string) => (
    <View style={styles.sectionTitleRow}>
      <Ionicons name={icon} size={21} color={primary} />
      <Text style={[styles.sectionTitle, { color: colors.text }]}>{title}</Text>
      {!!trailing && <Text style={styles.trailing}>{trailing}</Text>}
    </View>
  );

  const settingRow = (icon: IconName, title: string, subtitle: string, right?: ReactNode, onPress?: () => void) => (
    <Pressable onPress={onPress} disabled={!onPress} style={styles.settingRow}>
      <View style={[styles.settingIcon, { backgroundColor: colors.accentSoft }]}><Ionicons name={icon} size={20} color={primary} /></View>
      <View style={styles.settingCopy}>
        <Text style={[styles.rowTitle, { color: colors.text }]}>{title}</Text>
        <Text style={[styles.rowSubtitle, { color: colors.textSecondary }]}>{subtitle}</Text>
      </View>
      {right ?? <Ionicons name="chevron-forward" size={19} color={colors.textSecondary} />}
    </Pressable>
  );

  return (
    <ScrollView style={{ backgroundColor: colors.background }} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.heading}>
        <Text style={[styles.pageTitle, { color: colors.text }]}>Meu Perfil</Text>
        <Text style={[styles.pageSubtitle, { color: colors.textSecondary }]}>Seus dados e preferências de viagem</Text>
      </View>

      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={styles.identity}>
          <Pressable onPress={() => notice('Foto de perfil')} accessibilityRole="button" accessibilityLabel="Alterar foto de perfil" style={styles.avatar}><Ionicons name="person" size={42} color={primary} /><View style={styles.camera}><Ionicons name="camera" size={15} color="#fff" /></View></Pressable>
          <View style={styles.nameLine}><Text style={[styles.name, { color: colors.text }]}>Mateus Silva</Text><Ionicons name="checkmark-circle" size={20} color={primary} /></View>
          <Text style={[styles.member, { color: colors.textSecondary }]}>Passageiro Frequente • Membro desde Jan 2024</Text>
          <View style={[styles.personalData, { backgroundColor: colors.backgroundElement }]}>
            <Ionicons name="id-card-outline" size={16} color={primary} />
            <Text style={[styles.personalDataText, { color: colors.textSecondary }]}>CPF: ***.482.910-** • mateus.silva@email.com</Text>
          </View>
        </View>
        <Pressable onPress={() => notice('Editar dados pessoais')} style={[styles.editButton, { backgroundColor: colors.backgroundElement, borderColor: colors.border }]}>
          <Ionicons name="create-outline" size={18} color={primary} /><Text style={styles.editText}>Editar Dados Pessoais</Text>
        </Pressable>
      </View>

      <View style={styles.membershipCard}>
        <View style={styles.membershipTop}>
          <View style={styles.activePill}><View style={styles.dot} /><Text style={styles.activeLabel}>Plano Mensal Ilimitado (Ativo)</Text></View>
          <View style={styles.fleetIcon}><Ionicons name="bus-outline" size={22} color="#fff" /></View>
        </View>
        <Text style={styles.tripCount}>38</Text>
        <Text style={styles.tripCaption}>viagens realizadas neste mês</Text>
        <Pressable onPress={() => notice('Carteirinha digital')} style={styles.passButton}>
          <Ionicons name="qr-code-outline" size={19} color={primary} /><Text style={styles.passText}>Ver Carteirinha Digital</Text><Ionicons name="chevron-forward" size={18} color={primary} />
        </Pressable>
      </View>

      <View style={styles.section}>
        {sectionTitle('wallet-outline', 'Formas de Pagamento', '2 Ativas')}
        <View style={[styles.groupCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          {settingRow('card-outline', 'Mastercard •••• 4289', 'Expira em 08/28', <View style={styles.badgeBlue}><Text style={styles.badgeBlueText}>Padrão</Text></View>, () => notice('Cartão Mastercard'))}
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          {settingRow('checkmark-circle-outline', 'PIX Recorrente', 'Renovação automática mensal', <View style={styles.badgeGreen}><Text style={styles.badgeGreenText}>Conectado</Text></View>, () => notice('PIX recorrente'))}
        </View>
        <Pressable onPress={() => notice('Adicionar forma de pagamento')} style={[styles.addMethod, { backgroundColor: colors.backgroundElement, borderColor: colors.border }]}>
          <Ionicons name="add-circle-outline" size={19} color={primary} /><Text style={styles.addMethodText}>Adicionar novo cartão ou método</Text>
        </Pressable>
        <Pressable onPress={() => notice('Histórico de faturas')} style={styles.receipts}>
          <Ionicons name="receipt-outline" size={19} color={colors.textSecondary} /><Text style={[styles.receiptsText, { color: colors.textSecondary }]}>Histórico de faturas e recibos fiscais</Text><Text style={styles.link}>Ver recibos ›</Text>
        </Pressable>
      </View>

      <View style={styles.section}>
        {sectionTitle('options-outline', 'Preferências de Viagem')}
        <View style={[styles.groupCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          {settingRow('git-branch-outline', 'Rotas Favoritas', 'Linha 04 - Terminal Tietê ↔ Berrini', undefined, () => notice('Rotas favoritas'))}
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          {settingRow('time-outline', 'Horários Habituais', 'Ida: 07h45 • Volta: 18h20', undefined, () => notice('Horários habituais'))}
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          {settingRow('notifications-outline', 'Aviso de Aproximação', 'Alertar quando a van estiver a 5 min', <Switch value={nearbyAlert} onValueChange={setNearbyAlert} trackColor={{ false: '#cbd5e1', true: primary }} thumbColor="#fff" accessibilityLabel="Aviso de aproximação" />)}
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          {settingRow('accessibility-outline', 'Acessibilidade e Assento', 'Janela esquerda • Ar condicionado padrão', undefined, () => notice('Acessibilidade e assento'))}
        </View>
      </View>

      <View style={styles.section}>
        {sectionTitle('shield-checkmark-outline', 'Central de Segurança e Conta')}
        <View style={[styles.groupCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          {settingRow('finger-print', 'Biometria / Touch ID', 'Validação ao embarcar', <View style={styles.badgeGreen}><Text style={styles.badgeGreenText}>Ativo</Text></View>, () => notice('Biometria'))}
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          {settingRow('lock-closed-outline', 'Alterar Senha', 'Última troca há 3 meses', undefined, () => notice('Alterar senha'))}
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          {settingRow('eye-outline', 'Privacidade e Termos (LGPD)', 'Controle e exportação de dados', undefined, () => notice('Privacidade e termos'))}
        </View>
      </View>

      <Pressable onPress={() => notice('Ajuda e suporte')} style={[styles.supportCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={styles.settingIcon}><Ionicons name="help-circle-outline" size={23} color={primary} /></View>
        <View style={styles.settingCopy}><Text style={[styles.rowTitle, { color: colors.text }]}>Ajuda e Suporte ao Cliente</Text><Text style={[styles.rowSubtitle, { color: colors.textSecondary }]}>Atendimento 24h para passageiros</Text></View>
        <Ionicons name="chevron-forward" size={19} color={colors.textSecondary} />
      </Pressable>
      <Pressable onPress={() => Alert.alert('Sair da conta', 'A opção de sair será conectada à autenticação do aplicativo.')} style={styles.logoutButton}>
        <Ionicons name="log-out-outline" size={20} color="#dc2626" /><Text style={styles.logoutText}>Sair da Conta</Text>
      </Pressable>
      <Text style={styles.version}>Veloce Transit v2.4.1 (Build 842)</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: 18, paddingBottom: 30, gap: 18 },
  heading: { gap: 4, marginBottom: 1 },
  pageTitle: { fontSize: 25, fontWeight: '800' },
  pageSubtitle: { fontSize: 13 },
  card: { borderWidth: 1, borderRadius: 20, padding: 18 },
  identity: { alignItems: 'center' },
  avatar: { width: 96, height: 96, borderRadius: 48, backgroundColor: '#e0f2fe', borderWidth: 4, borderColor: '#fff', alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  camera: { position: 'absolute', right: -1, bottom: 1, width: 30, height: 30, borderRadius: 15, backgroundColor: primary, borderWidth: 2, borderColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  nameLine: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  name: { fontSize: 22, fontWeight: '700' },
  member: { fontSize: 12, marginTop: 4, textAlign: 'center' },
  personalData: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7, borderRadius: 18, paddingHorizontal: 12, paddingVertical: 8, marginTop: 13 },
  personalDataText: { fontSize: 11, flexShrink: 1 },
  editButton: { marginTop: 16, minHeight: 46, borderRadius: 12, borderWidth: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 8 },
  editText: { color: primary, fontSize: 14, fontWeight: '700' },
  membershipCard: { backgroundColor: primary, borderRadius: 20, padding: 18 },
  membershipTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  activePill: { backgroundColor: 'rgba(255,255,255,0.16)', flexDirection: 'row', alignItems: 'center', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 7, gap: 7 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#10b981' },
  activeLabel: { color: '#fff', fontWeight: '600', fontSize: 11 },
  fleetIcon: { width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.18)' },
  tripCount: { fontSize: 38, fontWeight: '800', color: '#fff', marginTop: 8 },
  tripCaption: { color: 'rgba(255,255,255,0.9)', fontSize: 13, marginTop: -3 },
  passButton: { backgroundColor: '#fff', borderRadius: 12, paddingHorizontal: 13, minHeight: 46, flexDirection: 'row', alignItems: 'center', gap: 9, marginTop: 16 },
  passText: { color: primary, fontSize: 14, fontWeight: '700', flex: 1 },
  section: { gap: 11 },
  sectionTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, minHeight: 25 },
  sectionTitle: { fontSize: 16, fontWeight: '700', flex: 1 },
  trailing: { color: primary, fontSize: 12, fontWeight: '600' },
  groupCard: { borderRadius: 16, borderWidth: 1, paddingHorizontal: 12 },
  settingRow: { flexDirection: 'row', alignItems: 'center', minHeight: 66, gap: 11, paddingVertical: 9 },
  settingIcon: { width: 38, height: 38, borderRadius: 12, backgroundColor: '#e0f2fe', alignItems: 'center', justifyContent: 'center' },
  settingCopy: { flex: 1, gap: 3 },
  rowTitle: { fontSize: 13, fontWeight: '600' },
  rowSubtitle: { fontSize: 11 },
  divider: { height: StyleSheet.hairlineWidth, marginLeft: 49 },
  badgeBlue: { backgroundColor: '#e0f2fe', borderRadius: 12, paddingHorizontal: 9, paddingVertical: 5 },
  badgeBlueText: { color: primary, fontSize: 10, fontWeight: '700' },
  badgeGreen: { backgroundColor: '#d1fae5', borderRadius: 12, paddingHorizontal: 9, paddingVertical: 5 },
  badgeGreenText: { color: '#047857', fontSize: 10, fontWeight: '700' },
  addMethod: { minHeight: 43, borderRadius: 11, borderWidth: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7 },
  addMethodText: { color: primary, fontWeight: '600', fontSize: 12 },
  receipts: { flexDirection: 'row', alignItems: 'center', gap: 7, paddingVertical: 4 },
  receiptsText: { fontSize: 10, flex: 1 },
  link: { color: primary, fontSize: 11, fontWeight: '700' },
  supportCard: { borderRadius: 15, borderWidth: 1, minHeight: 68, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, gap: 11 },
  logoutButton: { minHeight: 48, borderRadius: 12, borderWidth: 1, borderColor: '#fecaca', backgroundColor: '#fee2e2', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  logoutText: { color: '#b91c1c', fontSize: 14, fontWeight: '700' },
  version: { color: '#94a3b8', textAlign: 'center', fontSize: 11, marginTop: -7 },
});
