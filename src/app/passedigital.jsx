import React from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';
import { router } from 'expo-router';

import { styles } from '../styles/passedigital';

export default function PasseDigital() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      {/* 1. BARRA SUPERIOR DE NAVEGAÇÃO */}
      <View style={[styles.menuSuperior, { paddingTop: insets.top }]}>
        <View style={styles.areaVoltar}>
          <Pressable 
            style={styles.botaoVoltar} 
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={22} color="#0f172a" />
          </Pressable>
          <Text style={styles.tituloPagina}>Carteirinha Digital</Text>
        </View>

        <View style={styles.statusAtivo}>
          <View style={styles.pontoAtivo} />
          <Text style={styles.textoAtivo}>Ativo</Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.conteudo,
          { paddingBottom: insets.bottom + 20 },
        ]}
      >
        {/* 2. PÍLULA MODO APRESENTAÇÃO */}
        <View style={styles.modoApresentacao}>
          <Ionicons name="screen-rotation" size={16} color="#475569" />
          <Text style={styles.textoModo}>
            Modo Apresentação (Carteirinha na horizontal)
          </Text>
        </View>

        {/* 3. CARTÃO ROTACIONADO (90deg) */}
        <View style={styles.wrapperCarteirinha}>
          <View style={styles.carteirinhaRotacionada}>
            
            {/* FAIXA AZUL NO TOPO */}
            <View style={styles.faixaAzulTopo}>
              <View style={styles.infoPasseTopo}>
                <Ionicons name="bus" size={26} color="#ffffff" />
                <View style={styles.textosPasseTopo}>
                  <Text style={styles.nomeProduto}>Veloce Pass</Text>
                  <Text style={styles.subtituloProduto}>
                    REDE INTEGRADA • TODAS AS LINHAS
                  </Text>
                </View>
              </View>

              <View style={styles.badgeValido}>
                <View style={styles.pontoValido} />
                <Text style={styles.textoValido}>VÁLIDO</Text>
              </View>
            </View>

            {/* CORPO DE DADOS E QR CODE */}
            <View style={styles.corpoCartao}>
              
              {/* LADO ESQUERDO: INFORMAÇÕES DO PASSAGEIRO */}
              <View style={styles.secaoPassageiro}>
                {/* IDENTIFICAÇÃO DO PASSAGEIRO */}
                <View style={styles.identificacao}>
                  <Image
                    source={{ uri: 'https://github.com/github.png' }}
                    style={styles.avatar}
                  />
                  <View style={styles.dadosPassageiro}>
                    <Text style={styles.nomeTitular}>Mateus Silva</Text>
                    <Text style={styles.categoriaUsuario}>Passageiro Frequente</Text>
                    <Text style={styles.documentoProtegido}>CPF ***.482.918-**</Text>
                  </View>
                </View>

                {/* BLOCO DE COBERTURA COMPACTADO */}
                <View style={styles.blocoCobertura}>
                  <Ionicons name="flower-outline" size={15} color="#02719c" style={styles.iconeCobertura} />
                  <View style={styles.infoCobertura}>
                    <Text style={styles.rotuloCobertura}>COBERTURA AUTORIZADA</Text>
                    <Text style={styles.tituloBeneficio}>Passe Livre • Rede Completa</Text>
                    <Text style={styles.regraValidade}>
                      Válido em todas as vans e rotas
                    </Text>
                  </View>
                </View>

                {/* USO DIÁRIO */}
                <View style={styles.controleUso}>
                  <View style={styles.usoEsquerda}>
                    <Ionicons name="shield-checkmark-outline" size={15} color="#02719c" />
                    <Text style={styles.textoUso}>Acesso Diário</Text>
                  </View>
                  <Text style={styles.contadorCota}>1 de 2 viagens</Text>
                </View>
              </View>

              {/* LADO DIREITO: QR CODE EXPANDIDO */}
              <View style={styles.secaoQR}>
                <View style={styles.containerQR}>
                  <QRCode
                    value="VLC-8842-SP-MATEUS-SILVA"
                    size={120}
                    color="#0f172a"
                    backgroundColor="#ffffff"
                  />
                 
                </View>

                <View style={styles.infoQR}>
                  <Text style={styles.codigoContingencia}>#VLC-8842-SP</Text>
                  <View style={styles.tokenDinamico}>
                    <Ionicons name="sync-outline" size={12} color="#64748b" />
                    <Text style={styles.textoToken}>Renova em 45s</Text>
                  </View>
                </View>
              </View>

            </View>

          </View>
        </View>

        {/* 4. RODAPÉ INFORMATIVO */}
        <View style={styles.instrucao}>
          <Ionicons name="radio-outline" size={18} color="#02719c" />
          <Text style={styles.textoInstrucao}>
            Aproxime o QR Code do leitor da van ou terminal
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}