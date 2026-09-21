import { View, Text, Pressable, TextInput } from 'react-native';
import { styles } from '../styles/login';
import { useState } from 'react';
import { router } from 'expo-router';

export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>

            <TextInput
                style={styles.textInput}
                placeholder="E-mail"
                placeholderTextColor={styles.placeholder.color}
                value={email}
                onChangeText={setEmail}
            /> 

            <TextInput
                style={styles.textInput}
                placeholder="Senha"
                placeholderTextColor={styles.placeholder.color}
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
                <Text style={styles.entrar}>Entrar</Text>
            </Pressable>
        </View>
    );
}