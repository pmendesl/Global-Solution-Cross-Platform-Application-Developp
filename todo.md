# Project TODO - Central de Monitoramento de Missões Espaciais

## Fase 1: Configuração e Estrutura Base
- [x] Configurar tema com paleta de cores espacial (design.md)
- [x] Criar Context API para gerenciamento de estado global
- [x] Configurar AsyncStorage para persistência de dados
- [ ] Gerar logo/ícone temático para a app

## Fase 2: Telas e Navegação
- [x] Implementar tab bar com 5 abas (Dashboard, Alertas, Sensores, Configurações, Atualizar)
- [x] Criar tela Dashboard com cards de sensores
- [x] Criar tela de Alertas com lista e filtros
- [x] Criar tela de Detalhes de Sensor
- [x] Criar tela de Configurações
- [x] Implementar navegação com Expo Router

## Fase 3: Funcionalidades de Dados
- [x] Implementar gerenciamento de estado de sensores (Context API)
- [x] Criar estrutura de dados para sensores (energia, comunicação, altitude, temperatura)
- [x] Implementar persistência com AsyncStorage
- [x] Criar sistema de alertas automáticos
- [x] Implementar lógica de detecção de parâmetros críticos

## Fase 4: Formulários e Validação
- [x] Criar formulário de atualização de dados
- [x] Implementar validação de campos (obrigatórios, limites numéricos)
- [x] Criar validador de energia (0-100%)
- [x] Criar validador de comunicação (0-100%)
- [x] Criar validador de altitude (número positivo)
- [x] Criar validador de temperatura (número com limites)
- [x] Implementar feedback visual de erros

## Fase 5: Componentes Reutilizáveis
- [x] Criar componente SensorCard
- [x] Criar componente AlertItem
- [ ] Criar componente StatusIndicator
- [x] Criar componente FormField
- [ ] Criar componente HeaderBar

## Fase 6: Refinamento e Testes
- [x] Testar fluxo de visualização de dashboard
- [x] Testar atualização de dados
- [x] Testar sistema de alertas
- [x] Testar persistência de dados
- [x] Testar navegação entre telas
- [x] Verificar responsividade em diferentes tamanhos

## Fase 7: Entrega Final
- [x] Criar README.md com instruções
- [ ] Adicionar nomes e RMs dos integrantes
- [ ] Preparar commits demonstrando evolução
- [ ] Criar arquivo de entrega (txt com link do GitHub)
