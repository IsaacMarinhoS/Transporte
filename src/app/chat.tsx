
import {
    View,
    Text,
    Pressable,
    TextInput,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';

import { createChatStyles } from '../styles/chat';
import { useAppTheme } from '@/contexts/ThemeContext';

export default function Chat() {

    const [mensagem, setMensagem] = useState('');
    const { colors } = useAppTheme();
    const styles = createChatStyles(colors);

    const insets = useSafeAreaInsets();

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >

            {/* ================================================= */}
            {/* HEADER */}
            {/* ================================================= */}

            <View
                style={[
                    styles.header,
                    { paddingTop: insets.top }
                ]}
            >

                {/* BOTÃO VOLTAR */}
                <Pressable
                    style={styles.botaoVoltar}
                    onPress={() => router.back()}
                >
                    <Ionicons
                        name="arrow-back"
                        size={23}
                        color={colors.text}
                    />
                </Pressable>


                {/* IDENTIFICAÇÃO DO SUPORTE */}
                <View style={styles.identificacao}>

                    <View style={styles.avatarContainer}>

                        <Ionicons
                            name="headset-outline"
                            size={21}
                            color="#02719c"
                        />

                        <View style={styles.statusOnline} />

                    </View>


                    <View style={styles.infoSuporte}>

                        <View style={styles.linhaTitulo}>

                            <Text style={styles.nomeSuporte}>
                                Suporte Veloce
                            </Text>

                            <View style={styles.badgeAtendente}>
                                <Text style={styles.textoBadge}>
                                    Atendente
                                </Text>
                            </View>

                        </View>


                        <Text style={styles.subtituloSuporte}>
                            Central de Tráfego Veloce
                        </Text>

                    </View>

                </View>


                {/* PERFIL */}
                <Pressable style={styles.botaoPerfil}>

                    <Ionicons
                        name="person-outline"
                        size={19}
                        color="#ffffff"
                    />

                </Pressable>

            </View>


            {/* ================================================= */}
            {/* CONVERSA */}
            {/* ================================================= */}

            <ScrollView
                style={styles.conversa}
                contentContainerStyle={styles.conteudoConversa}
                showsVerticalScrollIndicator={false}
            >

                {/* MARCADOR DE DATA */}
                <View style={styles.dataContainer}>

                    <Text style={styles.dataTexto}>
                        Hoje, 08:42
                    </Text>

                </View>


                {/* CARD DE BOAS-VINDAS */}
                <View style={styles.cardBoasVindas}>

                    <View style={styles.iconeBoasVindas}>

                        <Ionicons
                            name="chatbubbles-outline"
                            size={23}
                            color="#02719c"
                        />

                    </View>


                    <Text style={styles.textoBoasVindas}>
                        Você está em atendimento com o Suporte Veloce
                        na Central de Operações. Tempo médio de espera:
                        {' < 1 min.'}
                    </Text>

                </View>


                {/* ================================================= */}
                {/* MENSAGEM DO SUPORTE */}
                {/* ================================================= */}

                <View style={styles.mensagemRecebida}>

                    <View style={styles.avatarMensagem}>

                        <Ionicons
                            name="headset-outline"
                            size={17}
                            color="#02719c"
                        />

                    </View>


                    <View style={styles.areaMensagemRecebida}>

                        <View style={styles.balaoRecebido}>

                            <Text style={styles.textoMensagemRecebida}>
                                Bom dia! Vi no sistema que seu embarque
                                habitual é às 08:50 (Linha Paulista Express).
                                Como posso te orientar hoje?
                            </Text>


                            <Text style={styles.horarioMensagem}>
                                08:43
                            </Text>

                        </View>

                    </View>

                </View>


                {/* ================================================= */}
                {/* MENSAGEM DO PASSAGEIRO */}
                {/* ================================================= */}

                <View style={styles.mensagemEnviada}>

                    <View style={styles.balaoEnviado}>

                        <Text style={styles.textoMensagemEnviada}>
                            Gostaria de saber se a van das 08:50 na parada
                            Oscar Freire está no horário correto ou com
                            algum desvio.
                        </Text>


                        <View style={styles.statusMensagem}>

                            <Text style={styles.horarioEnviada}>
                                08:44
                            </Text>

                            <Ionicons
                                name="checkmark-done"
                                size={16}
                                color="#ffffff"
                            />

                        </View>

                    </View>

                </View>


                {/* ================================================= */}
                {/* RESPOSTA COM TELEMETRIA */}
                {/* ================================================= */}

                <View style={styles.mensagemRecebida}>

                    <View style={styles.avatarMensagem}>

                        <Ionicons
                            name="headset-outline"
                            size={17}
                            color="#02719c"
                        />

                    </View>


                    <View style={styles.areaMensagemRecebida}>

                        <View style={styles.balaoRecebido}>

                            <Text style={styles.textoMensagemRecebida}>
                                Sim! A van está em rota e se aproximando
                                normalmente da parada.
                            </Text>


                            {/* CARD MAPA */}
                            <Pressable style={styles.cardMapa}>

                                <View style={styles.iconeMapa}>

                                    <Ionicons
                                        name="navigate-outline"
                                        size={20}
                                        color="#ffffff"
                                    />

                                </View>


                                <View style={styles.infoMapa}>

                                    <Text style={styles.tituloMapa}>
                                        Ver van no mapa ao vivo
                                    </Text>

                                    <Text style={styles.subtituloMapa}>
                                        Sentido Consolação • ~650m
                                    </Text>

                                </View>


                                <Ionicons
                                    name="chevron-forward"
                                    size={19}
                                    color="#02719c"
                                />

                            </Pressable>


                            <Text style={styles.horarioMensagem}>
                                08:45
                            </Text>

                        </View>

                    </View>

                </View>


                {/* ================================================= */}
                {/* DIGITANDO */}
                {/* ================================================= */}

                <View style={styles.mensagemRecebida}>

                    <View style={styles.avatarMensagem}>

                        <Ionicons
                            name="headset-outline"
                            size={17}
                            color="#02719c"
                        />

                    </View>


                    <View style={styles.digitando}>

                        <Text style={styles.textoDigitando}>
                            Suporte está digitando...
                        </Text>

                        <Text style={styles.pontosDigitando}>
                            •••
                        </Text>

                    </View>

                </View>

            </ScrollView>


            {/* ================================================= */}
            {/* BARRA DE ENVIO */}
            {/* ================================================= */}

            <View
                style={[
                    styles.footer,
                    { paddingBottom: insets.bottom }
                ]}
            >

                {/* ANEXO */}
                <Pressable style={styles.botaoAnexo}>

                    <Ionicons
                        name="attach-outline"
                        size={23}
                        color={colors.textSecondary}
                    />

                </Pressable>


                {/* INPUT */}
                <View style={styles.areaInput}>

                    <TextInput
                        style={styles.input}
                        placeholder="Digite sua mensagem..."
                        placeholderTextColor={colors.textSecondary}
                        value={mensagem}
                        onChangeText={setMensagem}
                        multiline
                    />

                </View>


                {/* ENVIAR */}
                <Pressable
                    style={styles.botaoEnviar}
                    onPress={() => {

                        if (mensagem.trim() !== '') {

                            console.log('Mensagem:', mensagem);

                            setMensagem('');

                        }

                    }}
                >

                    <Ionicons
                        name="send"
                        size={19}
                        color="#ffffff"
                    />

                </Pressable>

            </View>

        </KeyboardAvoidingView>
    );
}

