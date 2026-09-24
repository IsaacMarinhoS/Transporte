import { View, Text, Pressable, TextInput } from 'react-native';
import { styles } from '../styles/login';
import { useState } from 'react';
import { router } from 'expo-router';
import { useAppTheme } from '@/contexts/ThemeContext';

export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const { colors } = useAppTheme();
    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={[styles.title, { color: colors.text }]}>Login</Text>

            <TextInput
                style={[styles.textInput, { color: colors.text, borderColor: colors.border }]}
                placeholder="E-mail"
                placeholderTextColor={colors.textSecondary}
                value={email}
                onChangeText={setEmail}
            /> 

            <TextInput
                style={[styles.textInput, { color: colors.text, borderColor: colors.border }]}
                placeholder="Senha"
                placeholderTextColor={colors.textSecondary}
                secureTextEntry
                value={senha}
                onChangeText={setSenha}
            />

            <Pressable
                onPress={() => {
                    if (email === 'Teste' && senha === '123') {
                        router.push('/home');
                    } else {
                        alert('E-mail ou senha incorretos!');
                    }
                }}
            >
                <Text style={[styles.entrar, { color: colors.accent, borderColor: colors.accent }]}>Entrar</Text>
            </Pressable>
        </View>
    );
}
