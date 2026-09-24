import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ThemeMode, useAppTheme } from '@/contexts/ThemeContext';

const options: { value: ThemeMode; label: string; description: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { value: 'system', label: 'Automático', description: 'Usar a aparência do celular', icon: 'phone-portrait-outline' },
  { value: 'light', label: 'Claro', description: 'Manter o aplicativo claro', icon: 'sunny-outline' },
  { value: 'dark', label: 'Escuro', description: 'Manter o aplicativo escuro', icon: 'moon-outline' },
];

export default function ModoEscuro() {
  const { mode, setMode, colors } = useAppTheme();
  const styles = makeStyles(colors);

  return (
    <View style={styles.container}>
      <Pressable style={styles.back} onPress={() => router.back()} accessibilityRole="button" accessibilityLabel="Voltar">
        <Ionicons name="arrow-back" size={22} color={colors.text} />
        <Text style={styles.backText}>Configurações</Text>
      </Pressable>
      <Text style={styles.title}>Aparência</Text>
      <Text style={styles.subtitle}>Escolha como o aplicativo deve aparecer.</Text>

      {options.map((option) => {
        const selected = mode === option.value;
        return (
          <Pressable
            key={option.value}
            style={[styles.option, selected && styles.selectedOption]}
            onPress={() => setMode(option.value)}
            accessibilityRole="radio"
            accessibilityState={{ selected }}
          >
            <Ionicons name={option.icon} size={22} color={colors.accent} />
            <View style={styles.optionCopy}>
              <Text style={styles.optionTitle}>{option.label}</Text>
              <Text style={styles.description}>{option.description}</Text>
            </View>
            {selected && <Ionicons name="checkmark-circle" size={22} color={colors.accent} />}
          </Pressable>
        );
      })}
    </View>
  );
}

function makeStyles(colors: ReturnType<typeof useAppTheme>['colors']) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background, padding: 24, paddingTop: 56 },
    back: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 36 },
    backText: { color: colors.text, fontSize: 16 },
    title: { color: colors.text, fontSize: 28, fontWeight: '700' },
    subtitle: { color: colors.textSecondary, fontSize: 15, marginTop: 8, marginBottom: 24 },
    option: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, borderRadius: 14, padding: 16, marginBottom: 12, gap: 14 },
    selectedOption: { borderColor: colors.accent },
    optionCopy: { flex: 1 },
    optionTitle: { color: colors.text, fontSize: 16, fontWeight: '600' },
    description: { color: colors.textSecondary, fontSize: 13, marginTop: 4 },
  });
}
