import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f9fb',
  },

  /* MENU SUPERIOR */
  menuSuperior: {
    minHeight: 70,
    backgroundColor: '#f7f9fb',
    paddingHorizontal: 18,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  areaVoltar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  botaoVoltar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  tituloPagina: {
    marginLeft: 8,
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
  },
  statusAtivo: {
    height: 28,
    paddingHorizontal: 12,
    borderRadius: 14,
    backgroundColor: '#d1fae5',
    flexDirection: 'row',
    alignItems: 'center',
  },
  pontoAtivo: {
    width: 6,
    height: 6,
    borderRadius: 6,
    backgroundColor: '#10b981',
    marginRight: 6,
  },
  textoAtivo: {
    fontSize: 11,
    fontWeight: '700',
    color: '#047857',
  },

  /* MODO APRESENTAÇÃO */
  conteudo: {
    alignItems: 'center',
    paddingTop: 8,
  },
  modoApresentacao: {
    height: 32,
    paddingHorizontal: 14,
    borderRadius: 16,
    backgroundColor: '#e2e8f0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  textoModo: {
    marginLeft: 6,
    fontSize: 11,
    color: '#475569',
    fontWeight: '500',
  },

  /* WRAPPER E CARTÃO ROTACIONADO (90deg) */
  wrapperCarteirinha: {
    width: 310,
    height: 480,
    alignItems: 'center',
    justifyContent: 'center',
  },
  carteirinhaRotacionada: {
    width: 480,
    height: 310,
    backgroundColor: '#ffffff',
    borderRadius: 22,
    flexDirection: 'column',
    overflow: 'hidden',
    transform: [{ rotate: '90deg' }],

    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 8,
  },

  /* FAIXA AZUL NO TOPO */
  faixaAzulTopo: {
    width: '100%',
    height: 70,
    backgroundColor: '#02719c',
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoPasseTopo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textosPasseTopo: {
    marginLeft: 10,
    alignItems: 'flex-start',
  },
  nomeProduto: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '800',
    textAlign: 'left',
  },
  subtituloProduto: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 8,
    fontWeight: '700',
    marginTop: 2,
    textAlign: 'left',
  },
  badgeValido: {
    height: 26,
    paddingHorizontal: 10,
    borderRadius: 13,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
  },
  pontoValido: {
    width: 6,
    height: 6,
    borderRadius: 6,
    backgroundColor: '#10b981',
    marginRight: 5,
  },
  textoValido: {
    fontSize: 9,
    fontWeight: '800',
    color: '#02719c',
  },

  /* CORPO PRINCIPAL */
  corpoCartao: {
    flex: 1,
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  /* LADO ESQUERDO: PASSAGEIRO */
  secaoPassageiro: {
    flex: 1.1,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    height: '100%',
  },
  identificacao: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 12,
  },
  dadosPassageiro: {
    marginLeft: 10,
    alignItems: 'flex-start',
  },
  nomeTitular: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0f172a',
    textAlign: 'left',
  },
  categoriaUsuario: {
    fontSize: 12,
    fontWeight: '700',
    color: '#02719c',
    marginTop: 1,
    textAlign: 'left',
  },
  documentoProtegido: {
    fontSize: 11,
    color: '#64748b',
    marginTop: 1,
    textAlign: 'left',
  },

  /* BLOCO COBERTURA (REDUZIDO) */
  blocoCobertura: {
    width: '100%',
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: '#f1f5f9',
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconeCobertura: {
    marginRight: 6,
  },
  infoCobertura: {
    flex: 1,
    alignItems: 'flex-start',
  },
  rotuloCobertura: {
    fontSize: 7,
    fontWeight: '800',
    color: '#64748b',
    textAlign: 'left',
  },
  tituloBeneficio: {
    fontSize: 10,
    fontWeight: '800',
    color: '#0f172a',
    textAlign: 'left',
  },
  regraValidade: {
    fontSize: 8,
    color: '#475569',
    textAlign: 'left',
  },

  /* USO DIÁRIO */
  controleUso: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  usoEsquerda: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textoUso: {
    marginLeft: 5,
    fontSize: 11,
    fontWeight: '600',
    color: '#475569',
  },
  contadorCota: {
    fontSize: 11,
    fontWeight: '700',
    color: '#02719c',
  },

  /* LADO DIREITO: QR CODE (EXPANDIDO) */
  secaoQR: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 10,
  },
  containerQR: {
    padding: 8,
    borderRadius: 14,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    position: 'relative',
  },
  checkQR: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#02719c',
    alignItems: 'center',
    justifyContent: 'center',
    top: '40%',
    left: '40%',
  },
  infoQR: {
    alignItems: 'flex-start',
    marginTop: 8,
  },
  codigoContingencia: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0f172a',
    textAlign: 'left',
  },
  tokenDinamico: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
  },
  textoToken: {
    marginLeft: 4,
    fontSize: 10,
    color: '#64748b',
    textAlign: 'left',
  },

  /* RODAPÉ INFORMATIVO */
  instrucao: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  textoInstrucao: {
    marginLeft: 6,
    fontSize: 11,
    color: '#475569',
  },
});