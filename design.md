# Design - Central de Monitoramento de Missões Espaciais

## Visão Geral

Aplicativo mobile para monitoramento em tempo real de missões espaciais, com interface temática futurista inspirada em centros de controle de missão reais (NASA, SpaceX). O design segue a orientação de retrato (9:16) e uso com uma mão.

## Paleta de Cores

| Elemento | Cor | Uso |
|----------|-----|-----|
| **Fundo Principal** | #0a0e27 (Azul Escuro) | Background geral da app |
| **Superfícies** | #1a1f3a (Azul Mais Claro) | Cards, painéis |
| **Texto Principal** | #e0e6ff (Branco Azulado) | Textos principais |
| **Texto Secundário** | #8b92b8 (Cinza Azulado) | Textos secundários |
| **Acento Primário** | #00d9ff (Ciano) | Botões, highlights |
| **Status OK** | #00ff88 (Verde Neon) | Dados normais, status OK |
| **Alerta** | #ffaa00 (Laranja) | Avisos, status crítico |
| **Erro** | #ff3366 (Vermelho) | Erros, falhas |
| **Borda** | #2a3050 (Azul Escuro) | Bordas de cards |

## Telas Principais

### 1. **Dashboard Principal (Home)**
**Objetivo:** Visualizar status geral da missão em tempo real.

**Conteúdo:**
- Header com nome da missão e status geral (ativo/inativo)
- Grid de 4 cards de sensores principais:
  - **Energia**: Percentual de bateria, indicador visual
  - **Comunicação**: Força do sinal, latência
  - **Estabilidade Orbital**: Altitude, velocidade
  - **Temperatura**: Leitura de sensores internos
- Botão flutuante para acessar formulário de atualização
- Indicador de alertas ativos (badge com contador)

**Funcionalidade:**
- Dados carregados do AsyncStorage
- Atualização em tempo real (simulada)
- Navegação para telas de detalhe ao tocar em cards

---

### 2. **Tela de Alertas**
**Objetivo:** Visualizar e gerenciar alertas do sistema.

**Conteúdo:**
- Lista de alertas com:
  - Ícone de severidade (crítico, aviso, info)
  - Mensagem do alerta
  - Timestamp
  - Status (novo/lido)
- Filtros por tipo (crítico, aviso, info)
- Botão para limpar alertas

**Funcionalidade:**
- Alertas disparados quando parâmetros atingem limites críticos
- Persistência com AsyncStorage
- Marcar como lido

---

### 3. **Tela de Detalhes de Sensor**
**Objetivo:** Visualizar dados detalhados de um sensor específico.

**Conteúdo:**
- Nome do sensor
- Gráfico simples de histórico (últimas 10 leituras)
- Valor atual com indicador de status
- Limites (mín/máx)
- Histórico em lista

**Funcionalidade:**
- Navegação via tab bar ou card no dashboard
- Dados persistidos localmente

---

### 4. **Tela de Formulário de Atualização**
**Objetivo:** Permitir entrada e atualização de dados de sensores.

**Conteúdo:**
- Campos de entrada para cada sensor:
  - Energia (0-100%)
  - Comunicação (0-100%)
  - Altitude (km)
  - Temperatura (°C)
- Validação de campos (obrigatórios, limites numéricos)
- Botão "Atualizar" e "Cancelar"
- Mensagens de erro/sucesso

**Funcionalidade:**
- Validação em tempo real
- Persistência com AsyncStorage
- Retorno ao dashboard após sucesso

---

### 5. **Tela de Configurações**
**Objetivo:** Gerenciar configurações da aplicação.

**Conteúdo:**
- Tema (claro/escuro)
- Limites de alerta (personalizáveis)
- Informações da app
- Botão para resetar dados

**Funcionalidade:**
- Persistência de preferências
- Reset de dados com confirmação

---

## Fluxos de Usuário Principais

### Fluxo 1: Visualizar Status da Missão
1. Usuário abre app → Dashboard
2. Visualiza 4 cards com dados dos sensores
3. Toca em um card → Tela de Detalhes do Sensor

### Fluxo 2: Atualizar Dados
1. Usuário toca botão flutuante no Dashboard
2. Navega para Formulário de Atualização
3. Preenche campos com validação
4. Toca "Atualizar" → Dados salvos, retorna ao Dashboard

### Fluxo 3: Verificar Alertas
1. Usuário toca aba "Alertas"
2. Visualiza lista de alertas com severidade
3. Pode filtrar por tipo ou limpar alertas

### Fluxo 4: Configurar Limites
1. Usuário toca aba "Configurações"
2. Ajusta limites de alerta
3. Salva preferências

---

## Navegação (Expo Router)

```
app/
├── (tabs)/
│   ├── _layout.tsx          ← Tab bar com 4 abas
│   ├── index.tsx            ← Dashboard
│   ├── alerts.tsx           ← Alertas
│   ├── sensor-detail.tsx    ← Detalhes do Sensor
│   └── settings.tsx         ← Configurações
├── update-form.tsx          ← Modal de formulário
└── _layout.tsx              ← Root layout com providers
```

---

## Componentes Reutilizáveis

| Componente | Descrição |
|-----------|-----------|
| `SensorCard` | Card exibindo dados de um sensor |
| `AlertItem` | Item de alerta na lista |
| `StatusIndicator` | Indicador visual de status (OK/Alerta/Crítico) |
| `FormField` | Campo de formulário com validação |
| `HeaderBar` | Header temático com título e status |

---

## Requisitos Técnicos Implementados

- ✅ Context API para gerenciamento de estado global
- ✅ AsyncStorage para persistência local
- ✅ Expo Router para navegação
- ✅ Validação de formulários
- ✅ Design temático coerente (tema espacial)
- ✅ Alertas automáticos quando parâmetros críticos
- ✅ Dashboard com múltiplos sensores
