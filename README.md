# Central de Monitoramento de Missões Espaciais

## Integrantes:
562242 - Pedro Gabriel Mendes Soares Leite
565564 - Leonardo Augusto Bacelar da Cunha
563346 - Alexandre Campão Fernandes Schneider Bertini

Um aplicativo mobile desenvolvido em **React Native + Expo** que simula uma central de monitoramento de missões espaciais em tempo real. A aplicação oferece uma interface temática futurista inspirada em centros de controle de missão reais, permitindo monitorar sensores, gerenciar alertas e atualizar dados de forma intuitiva.

## 📋 Descrição do Projeto

Este projeto foi desenvolvido como trabalho acadêmico para a disciplina **Cross-Platform Application Development** do curso de Ciência da Computação (2º ano) da FIAP.

O aplicativo implementa uma solução completa de monitoramento de missões espaciais com:

- **Dashboard em tempo real** com visualização de múltiplos sensores
- **Sistema automático de alertas** quando parâmetros atingem níveis críticos
- **Formulários com validação** para atualização de dados
- **Persistência local** de dados com AsyncStorage
- **Gerenciamento de estado global** com Context API
- **Navegação fluida** com Expo Router
- **Design temático** com paleta de cores espacial

## 🎨 Características Principais

### Telas da Aplicação

1. **Dashboard (Home)**
   - Visualização em tempo real de 4 sensores principais
   - Cards com status de energia, comunicação, altitude e temperatura
   - Indicador de alertas não lidos
   - Acesso rápido a detalhes de sensores

2. **Alertas**
   - Lista de todos os alertas do sistema
   - Classificação por severidade (crítico, aviso, informação)
   - Marcação de alertas como lidos
   - Limpeza de alertas

3. **Detalhes de Sensor**
   - Visualização detalhada de cada sensor
   - Gráfico de progresso com intervalo normal
   - Histórico de valores
   - Informações estatísticas

4. **Atualização de Dados**
   - Formulário com validação em tempo real
   - Campos para energia, comunicação, altitude e temperatura
   - Feedback visual de erros
   - Confirmação de sucesso

5. **Configurações**
   - Visualização dos limites de alerta
   - Informações da missão
   - Opção para resetar dados

## 🛠️ Tecnologias Utilizadas

- **React Native 0.81**
- **Expo SDK 54**
- **Expo Router 6** - Navegação
- **TypeScript 5.9** - Type safety
- **NativeWind 4** - Tailwind CSS para React Native
- **Context API** - Gerenciamento de estado
- **AsyncStorage** - Persistência local de dados
- **React Native Reanimated 4** - Animações

## 📦 Requisitos Técnicos Implementados

✅ **Dashboards com dados de sensores** - Dashboard com 4 cards de sensores (energia, comunicação, altitude, temperatura)

✅ **Alertas automáticos** - Sistema que dispara alertas quando parâmetros atingem níveis críticos

✅ **Formulários com validação** - Tela de atualização com validação de campos obrigatórios, formatos e limites

✅ **Navegação com Expo Router** - 5 telas principais com navegação por abas

✅ **Persistência local com AsyncStorage** - Todos os dados são salvos localmente

✅ **Gerenciamento de estado com Context API** - Estado global da missão compartilhado entre telas

✅ **Design visual temático** - Paleta de cores espacial (azul escuro, ciano, verde neon)

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+
- npm ou pnpm
- Expo CLI

### Instalação

```bash
# Clonar o repositório
git clone <URL_DO_REPOSITORIO>
cd space_mission_monitor

# Instalar dependências
pnpm install
```

### Desenvolvimento

```bash
# Iniciar o servidor de desenvolvimento
pnpm run dev

# Ou para plataforma específica:
pnpm run ios    # iOS
pnpm run android # Android
pnpm run web    # Web
```

### Build

```bash
# Gerar APK para Android
pnpm run build:android

# Gerar IPA para iOS
pnpm run build:ios
```

## 📁 Estrutura do Projeto

```
app/
├── (tabs)/
│   ├── _layout.tsx          # Tab bar com 5 abas
│   ├── index.tsx            # Dashboard
│   ├── alerts.tsx           # Tela de alertas
│   ├── sensor-detail.tsx    # Detalhes do sensor
│   ├── settings.tsx         # Configurações
│   └── update-form.tsx      # Formulário de atualização
├── _layout.tsx              # Root layout com providers
└── oauth/callback.tsx       # Callback de autenticação

components/
├── sensor-card.tsx          # Card de sensor
├── alert-item.tsx           # Item de alerta
├── form-field.tsx           # Campo de formulário
└── screen-container.tsx     # Container com SafeArea

lib/
├── mission-context.tsx      # Context API para estado global
├── theme-provider.tsx       # Provider de tema
└── utils.ts                 # Utilitários

design.md                     # Documentação de design
todo.md                       # Lista de tarefas do projeto
```

## 🎯 Fluxos Principais

### Visualizar Status da Missão
1. Abrir app → Dashboard
2. Visualizar 4 cards com dados dos sensores
3. Tocar em um card → Tela de Detalhes

### Atualizar Dados
1. Tocar botão "Atualizar Dados" no Dashboard
2. Preencher formulário com validação
3. Tocar "Atualizar" → Dados salvos, retorna ao Dashboard

### Verificar Alertas
1. Tocar aba "Alertas"
2. Visualizar lista de alertas com severidade
3. Filtrar por tipo ou limpar alertas

### Configurar Limites
1. Tocar aba "Configurações"
2. Visualizar limites atuais
3. Resetar dados se necessário

## 🎨 Paleta de Cores

| Elemento | Cor | Uso |
|----------|-----|-----|
| Fundo | #0a0e27 | Background geral |
| Superfícies | #1a1f3a | Cards, painéis |
| Texto Principal | #e0e6ff | Textos principais |
| Texto Secundário | #8b92b8 | Textos secundários |
| Acento | #00d9ff | Botões, highlights |
| Sucesso | #00ff88 | Status OK |
| Aviso | #ffaa00 | Avisos |
| Erro | #ff3366 | Erros |

## 📝 Dados de Exemplo

O aplicativo inicia com dados de exemplo de uma missão fictícia:

- **Nome da Missão**: Missão Apolo-X
- **Status**: Ativa
- **Energia**: 85%
- **Comunicação**: 92%
- **Altitude**: 408 km
- **Temperatura**: 22°C

## 🔄 Persistência de Dados

Todos os dados são persistidos localmente usando AsyncStorage:

- Estado da missão (sensores, alertas, limites)
- Preferências do usuário
- Histórico de alertas

Os dados são automaticamente carregados ao iniciar o app e salvos a cada atualização.

## ✨ Recursos Adicionais

- **Validação em tempo real** de formulários
- **Feedback visual** com cores temáticas
- **Indicadores de status** para cada sensor
- **Timestamps** para todas as operações
- **Responsividade** em diferentes tamanhos de tela

## 👥 Integrantes do Projeto

**Nome Completo**: [Leonardo Bacelar, Pedro Mendes, Alexabdre Campao]
**RM**: [565564,562242,563346]











