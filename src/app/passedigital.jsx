import React from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';
import { router } from 'expo-router';

import { createPasseDigitalStyles } from '../styles/passedigital';
import { useAppTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';

export default function PasseDigital() {
  const insets = useSafeAreaInsets();
  const { colors, isDark } = useAppTheme();
  const { session } = useAuth();
  const themedStyles = createPasseDigitalStyles(colors, isDark);
  const userId = session?.user.id ?? '';
  const nomeTitular = session?.user.user_metadata?.full_name?.trim()
    || session?.user.email?.split('@')[0]
    || 'Passageiro';
  const codigoPasse = userId ? `VLC-${userId.replace(/-/g, '').slice(0, 8).toUpperCase()}` : 'VLC-PASSE';

  return (
    <View style={themedStyles.container}>
      {/* 1. BARRA SUPERIOR DE NAVEGAÇÃO */}
      <View style={[themedStyles.menuSuperior, { paddingTop: insets.top }]}>
        <View style={themedStyles.areaVoltar}>
          <Pressable 
            style={themedStyles.botaoVoltar} 
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={22} color={colors.text} />
          </Pressable>
          <Text style={themedStyles.tituloPagina}>Carteirinha Digital</Text>
        </View>

        <View style={themedStyles.statusAtivo}>
          <View style={themedStyles.pontoAtivo} />
          <Text style={themedStyles.textoAtivo}>Ativo</Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          themedStyles.conteudo,
          { paddingBottom: insets.bottom + 20 },
        ]}
      >
        {/* 2. PÍLULA MODO APRESENTAÇÃO */}
        <View style={themedStyles.modoApresentacao}>
          <Ionicons name="screen-rotation" size={16} color={colors.textSecondary} />
          <Text style={themedStyles.textoModo}>
            Modo Apresentação (Carteirinha na horizontal)
          </Text>
        </View>

        {/* 3. CARTÃO ROTACIONADO (90deg) */}
        <View style={themedStyles.wrapperCarteirinha}>
          <View style={themedStyles.carteirinhaRotacionada}>
            
            {/* FAIXA AZUL NO TOPO */}
            <View style={themedStyles.faixaAzulTopo}>
              <View style={themedStyles.infoPasseTopo}>
                <Ionicons name="bus" size={26} color="#ffffff" />
                <View style={themedStyles.textosPasseTopo}>
                  <Text style={themedStyles.nomeProduto}>Veloce Pass</Text>
                  <Text style={themedStyles.subtituloProduto}>
                    REDE INTEGRADA • TODAS AS LINHAS
                  </Text>
                </View>
              </View>

              <View style={themedStyles.badgeValido}>
                <View style={themedStyles.pontoValido} />
                <Text style={themedStyles.textoValido}>VÁLIDO</Text>
              </View>
            </View>

            {/* CORPO DE DADOS E QR CODE */}
            <View style={themedStyles.corpoCartao}>
              
              {/* LADO ESQUERDO: INFORMAÇÕES DO PASSAGEIRO */}
              <View style={themedStyles.secaoPassageiro}>
                {/* IDENTIFICAÇÃO DO PASSAGEIRO */}
                <View style={themedStyles.identificacao}>
                  <View style={themedStyles.avatar}>
                    <Ionicons name="person" size={28} color={colors.accent} />
                  </View>
                  <View style={themedStyles.dadosPassageiro}>
                    <Text style={themedStyles.nomeTitular} numberOfLines={1}>{nomeTitular}</Text>
                    <Text style={themedStyles.categoriaUsuario}>Passe pessoal</Text>
                    <Text style={themedStyles.documentoProtegido}>Identificação individual</Text>
                  </View>
                </View>

                {/* BLOCO DE COBERTURA COMPACTADO */}
                <View style={themedStyles.blocoCobertura}>
                  <Ionicons name="flower-outline" size={15} color={colors.accent} style={themedStyles.iconeCobertura} />
                  <View style={themedStyles.infoCobertura}>
                    <Text style={themedStyles.rotuloCobertura}>COBERTURA AUTORIZADA</Text>
                    <Text style={themedStyles.tituloBeneficio}>Passe Livre • Rede Completa</Text>
                    <Text style={themedStyles.regraValidade}>
                      Válido em todas as vans e rotas
                    </Text>
                  </View>
                </View>

                {/* USO DIÁRIO */}
                <View style={themedStyles.controleUso}>
                  <View style={themedStyles.usoEsquerda}>
                    <Ionicons name="shield-checkmark-outline" size={15} color={colors.accent} />
                    <Text style={themedStyles.textoUso}>Acesso Diário</Text>
                  </View>
                  <Text style={themedStyles.contadorCota}>1 de 2 viagens</Text>
                </View>
              </View>

              {/* LADO DIREITO: QR CODE EXPANDIDO */}
              <View style={themedStyles.secaoQR}>
                <View style={themedStyles.containerQR}>
                  <QRCode
                    value={userId ? `veloce-pass:${userId}` : 'veloce-pass:unavailable'}
                    size={120}
                    color="#0f172a"
                    backgroundColor="#ffffff"
                  />
                 
                </View>

                <View style={themedStyles.infoQR}>
                  <Text style={themedStyles.codigoContingencia}>#{codigoPasse}</Text>
                  <View style={themedStyles.tokenDinamico}>
                    <Ionicons name="sync-outline" size={12} color={colors.textSecondary} />
                    <Text style={themedStyles.textoToken}>Renova em 45s</Text>
                  </View>
                </View>
              </View>

            </View>

          </View>
        </View>

        {/* 4. RODAPÉ INFORMATIVO */}
        <View style={themedStyles.instrucao}>
          <Ionicons name="radio-outline" size={18} color={colors.accent} />
          <Text style={themedStyles.textoInstrucao}>
            Aproxime o QR Code do leitor da van ou terminal
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
