import { StyleSheet } from 'react-native';

export const authColors = {
  background: '#f7f9fb',
  surface: '#ffffff',
  primary: '#02719c',
  title: '#0f172a',
  secondary: '#64748b',
  border: '#e2e8f0',
};

export const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: authColors.background },
  scrollContent: { flexGrow: 1, justifyContent: 'center', paddingHorizontal: 24, paddingVertical: 32 },
  form: { width: '100%', maxWidth: 420, alignSelf: 'center' },
  title: { color: authColors.title, fontSize: 28, fontWeight: '700', textAlign: 'center', letterSpacing: -0.5 },
  subtitle: { color: authColors.secondary, fontSize: 14, lineHeight: 21, textAlign: 'center', marginTop: 8, marginBottom: 28 },
  field: { marginBottom: 17 },
  label: { color: authColors.title, fontSize: 13, fontWeight: '600', marginBottom: 8 },
  inputShell: { minHeight: 54, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: authColors.border, borderRadius: 12, backgroundColor: authColors.surface, paddingHorizontal: 15 },
  inputIcon: { marginRight: 11 },
  input: { flex: 1, minHeight: 52, color: authColors.title, fontSize: 14, paddingVertical: 10 },
  eyeButton: { minWidth: 36, minHeight: 44, alignItems: 'center', justifyContent: 'center', marginLeft: 5 },
  auxRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: -1, marginBottom: 22 },
  checkRow: { flexDirection: 'row', alignItems: 'center', flexShrink: 1, gap: 8 },
  checkbox: { width: 19, height: 19, borderRadius: 5, borderWidth: 1.5, borderColor: '#cbd5e1', backgroundColor: authColors.surface, alignItems: 'center', justifyContent: 'center' },
  checkText: { color: authColors.secondary, fontSize: 12, lineHeight: 18, flexShrink: 1 },
  link: { color: authColors.primary, fontSize: 12, fontWeight: '600' },
  cta: { minHeight: 52, borderRadius: 12, backgroundColor: authColors.primary, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 8, paddingHorizontal: 16 },
  ctaDisabled: { opacity: 0.7 },
  ctaText: { color: '#ffffff', fontSize: 15, fontWeight: '700' },
  footer: { alignItems: 'center', marginTop: 22 },
  switchText: { color: authColors.secondary, fontSize: 13, textAlign: 'center' },
  legal: { color: '#94a3b8', fontSize: 11, lineHeight: 17, textAlign: 'center', marginTop: 24 },
  legalLink: { color: authColors.secondary, textDecorationLine: 'underline' },
});
