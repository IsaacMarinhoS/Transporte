import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useFonts, PlusJakartaSans_400Regular, PlusJakartaSans_600SemiBold, PlusJakartaSans_700Bold } from '@expo-google-fonts/plus-jakarta-sans';
import { supabase } from '@/lib/supabase';
import { authColors, styles } from '../styles/login';

const REMEMBER_ME_KEY = 'transporte.auth.remember-me';

type AuthFieldProps = {
  label: string;
  placeholder: string;
  icon: keyof typeof Ionicons.glyphMap;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: 'default' | 'email-address';
  autoCapitalize?: 'none' | 'words';
  autoComplete?: 'name' | 'email' | 'new-password' | 'current-password';
  secure?: boolean;
  showPassword?: boolean;
  onTogglePassword?: () => void;
  disabled: boolean;
};

function AuthField({
  label,
  placeholder,
  icon,
  value,
  onChangeText,
  keyboardType,
  autoCapitalize,
  autoComplete,
  secure,
  showPassword,
  onTogglePassword,
  disabled,
}: AuthFieldProps) {
  return (
    <View style={styles.field}>
      <Text style={[styles.label, { fontFamily: 'PlusJakartaSans_600SemiBold' }]}>{label}</Text>
      <View style={styles.inputShell}>
        <Ionicons name={icon} size={19} color="#94a3b8" style={styles.inputIcon} />
        <TextInput
          style={[styles.input, { fontFamily: 'PlusJakartaSans_400Regular' }]}
          placeholder={placeholder}
          placeholderTextColor="#94a3b8"
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoComplete={autoComplete}
          secureTextEntry={secure && !showPassword}
          editable={!disabled}
          selectionColor={authColors.primary}
        />
        {onTogglePassword && (
          <Pressable onPress={onTogglePassword} style={styles.eyeButton} accessibilityRole="button" accessibilityLabel={showPassword ? 'Ocultar senha' : 'Mostrar senha'}>
            <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={19} color="#94a3b8" />
          </Pressable>
        )}
      </View>
    </View>
  );
}

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');
  const [confirmacao, setConfirmacao] = useState('');
  const [cadastrando, setCadastrando] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [lembrar, setLembrar] = useState(true);
  const [aceitouTermos, setAceitouTermos] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);
  const [fontsLoaded] = useFonts({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
  });

  const entrar = async () => {
    const identificador = email.trim();
    if (!identificador || !senha) {
      Alert.alert('Dados incompletos', 'Informe seu e-mail e sua senha.');
      return;
    }
    if (!identificador.includes('@')) {
      Alert.alert('Use seu e-mail', 'Entre com o e-mail cadastrado.');
      return;
    }

    setCarregando(true);
    try {
      await AsyncStorage.setItem(REMEMBER_ME_KEY, lembrar ? 'true' : 'false');
      const { error } = await supabase.auth.signInWithPassword({ email: identificador, password: senha });
      if (error) {
        Alert.alert('Não foi possível entrar', 'Confira seu e-mail e senha e tente novamente.');
        return;
      }
      router.replace('/home');
    } catch {
      Alert.alert('Sem conexão', 'Não foi possível acessar sua conta. Confira sua internet e tente novamente.');
    } finally {
      setCarregando(false);
    }
  };

  const cadastrar = async () => {
    if (!nome.trim() || !email.trim() || !senha || !confirmacao) {
      Alert.alert('Dados incompletos', 'Preencha todos os campos.');
      return;
    }
    if (!aceitouTermos) {
      Alert.alert('Consentimento necessário', 'Leia e aceite os Termos de Uso e a Política de Privacidade para continuar.');
      return;
    }
    if (senha.length < 6) {
      Alert.alert('Senha muito curta', 'Use pelo menos 6 caracteres.');
      return;
    }
    if (senha !== confirmacao) {
      Alert.alert('Senhas diferentes', 'Digite a mesma senha nos dois campos.');
      return;
    }

    setCarregando(true);
    try {
      await AsyncStorage.setItem(REMEMBER_ME_KEY, 'true');
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password: senha,
        options: { data: { full_name: nome.trim() } },
      });

      if (error) {
        Alert.alert('Não foi possível criar a conta', error.message);
        return;
      }
      if (!data.session) {
        Alert.alert('Confirme seu e-mail', 'Enviamos um link de confirmação. Depois, entre com seu e-mail e senha.');
        setCadastrando(false);
        setSenha('');
        setConfirmacao('');
        return;
      }
      router.replace('/home');
    } catch {
      Alert.alert('Sem conexão', 'Não foi possível criar sua conta. Confira sua internet e tente novamente.');
    } finally {
      setCarregando(false);
    }
  };

  const recuperarSenha = async () => {
    const address = email.trim();
    if (!address.includes('@')) {
      Alert.alert('Informe seu e-mail', 'Digite o e-mail da sua conta para receber o link de recuperação.');
      return;
    }
    setCarregando(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(address);
      if (error) Alert.alert('Não foi possível enviar', 'Confira o e-mail e tente novamente.');
      else Alert.alert('Verifique seu e-mail', 'Se houver uma conta com esse endereço, enviaremos as instruções para redefinir a senha.');
    } catch {
      Alert.alert('Sem conexão', 'Não foi possível enviar o link. Tente novamente.');
    } finally {
      setCarregando(false);
    }
  };

  if (!fontsLoaded) {
    return <View style={[styles.screen, { alignItems: 'center', justifyContent: 'center' }]}><ActivityIndicator color={authColors.primary} /></View>;
  }

  const legalNotice = (
    <Text style={[styles.legal, { fontFamily: 'PlusJakartaSans_400Regular' }]}>
      Ao continuar, você concorda com nossos{' '}
      <Text style={styles.legalLink} onPress={() => Alert.alert('Termos de Uso', 'Os termos serão disponibilizados nesta tela em breve.')}>Termos de Uso</Text>
      {' '}e{' '}
      <Text style={styles.legalLink} onPress={() => Alert.alert('Privacidade', 'A Política de Privacidade será disponibilizada nesta tela em breve.')}>Política de Privacidade (LGPD)</Text>.
    </Text>
  );

  return (
    <KeyboardAvoidingView style={styles.screen} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.scrollContent}>
        <View style={styles.form}>
          <Text style={[styles.title, { fontFamily: 'PlusJakartaSans_700Bold' }]}>{cadastrando ? 'Criar Conta' : 'Bem-vindo'}</Text>
          <Text style={[styles.subtitle, { fontFamily: 'PlusJakartaSans_400Regular' }]}>
            {cadastrando ? 'Preencha os dados abaixo para começar.' : 'Acesse sua conta para ver suas rotas e passe de embarque.'}
          </Text>

          {cadastrando && (
            <AuthField
              label="Nome Completo"
              placeholder="Ex: Mateus Silva"
              icon="person-outline"
              value={nome}
              onChangeText={setNome}
              autoCapitalize="words"
              autoComplete="name"
              disabled={carregando}
            />
          )}
          <AuthField
            label="E-mail *"
            placeholder="seu.email@exemplo.com"
            icon="person-circle-outline"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            disabled={carregando}
          />
          <AuthField
            label={cadastrando ? 'Criar Senha' : 'Senha de Acesso *'}
            placeholder={cadastrando ? 'Digite uma senha forte' : 'Digite sua senha'}
            icon="lock-closed-outline"
            value={senha}
            onChangeText={setSenha}
            autoComplete={cadastrando ? 'new-password' : 'current-password'}
            secure
            showPassword={mostrarSenha}
            onTogglePassword={() => setMostrarSenha(!mostrarSenha)}
            disabled={carregando}
          />
          {cadastrando && (
            <AuthField
              label="Confirmar Senha"
              placeholder="Repita sua senha"
              icon="lock-closed-outline"
              value={confirmacao}
              onChangeText={setConfirmacao}
              autoComplete="new-password"
              secure
              showPassword={mostrarConfirmacao}
              onTogglePassword={() => setMostrarConfirmacao(!mostrarConfirmacao)}
              disabled={carregando}
            />
          )}

          {cadastrando ? (
            <Pressable style={styles.checkRow} onPress={() => setAceitouTermos(!aceitouTermos)} accessibilityRole="checkbox" accessibilityState={{ checked: aceitouTermos }}>
              <View style={[styles.checkbox, aceitouTermos && { backgroundColor: authColors.primary, borderColor: authColors.primary }]}>
                {aceitouTermos && <Ionicons name="checkmark" size={14} color="#fff" />}
              </View>
              <Text style={[styles.checkText, { fontFamily: 'PlusJakartaSans_400Regular' }]}>
                Li e concordo com os <Text style={styles.legalLink} onPress={() => Alert.alert('Termos de Uso', 'Os termos serão disponibilizados nesta tela em breve.')}>Termos de Uso</Text> e com a <Text style={styles.legalLink} onPress={() => Alert.alert('Privacidade', 'A Política de Privacidade será disponibilizada nesta tela em breve.')}>Política de Privacidade</Text> da Veloce Transit.
              </Text>
            </Pressable>
          ) : (
            <View style={styles.auxRow}>
              <Pressable style={styles.checkRow} onPress={() => setLembrar(!lembrar)} accessibilityRole="checkbox" accessibilityState={{ checked: lembrar }}>
                <View style={[styles.checkbox, lembrar && { backgroundColor: authColors.primary, borderColor: authColors.primary }]}>
                  {lembrar && <Ionicons name="checkmark" size={14} color="#fff" />}
                </View>
                <Text style={[styles.checkText, { fontFamily: 'PlusJakartaSans_400Regular' }]}>Lembrar de mim</Text>
              </Pressable>
              <Pressable onPress={recuperarSenha} disabled={carregando} accessibilityRole="button">
                <Text style={[styles.link, { fontFamily: 'PlusJakartaSans_600SemiBold' }]}>Esqueceu a senha?</Text>
              </Pressable>
            </View>
          )}

          <Pressable
            onPress={cadastrando ? cadastrar : entrar}
            disabled={carregando}
            accessibilityRole="button"
            style={[styles.cta, carregando && styles.ctaDisabled, cadastrando && { marginTop: 22 }]}
          >
            {carregando ? <ActivityIndicator color="#fff" /> : (
              <>
                <Text style={[styles.ctaText, { fontFamily: 'PlusJakartaSans_700Bold' }]}>{cadastrando ? 'Criar Conta' : 'Entrar'}</Text>
                <Ionicons name="arrow-forward" size={18} color="#fff" />
              </>
            )}
          </Pressable>

          <View style={styles.footer}>
            <Pressable onPress={() => setCadastrando(!cadastrando)} disabled={carregando} accessibilityRole="button">
              <Text style={[styles.switchText, { fontFamily: 'PlusJakartaSans_400Regular' }]}>
                {cadastrando ? 'Já possui uma conta? ' : 'Ainda não tem conta? '}
                <Text style={[styles.link, { fontFamily: 'PlusJakartaSans_700Bold' }]}>{cadastrando ? 'Entrar ❯' : 'Cadastre-se'}</Text>
              </Text>
            </Pressable>
            {!cadastrando && legalNotice}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
