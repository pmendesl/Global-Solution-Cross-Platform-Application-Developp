import { ScrollView, View, Text } from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { useMission } from '@/lib/mission-context';
import { useLocalSearchParams } from 'expo-router';

type SensorType = 'energy' | 'communication' | 'altitude' | 'temperature';

export default function SensorDetailScreen() {
  const { type } = useLocalSearchParams<{ type: string }>();
  const { state } = useMission();

  const sensorType = (type || 'energy') as SensorType;
  const { sensors, limits } = state;

  const sensorInfo = {
    energy: {
      title: 'Energia',
      value: sensors.energy,
      unit: '%',
      min: limits.energyMin,
      max: limits.energyMax,
      description: 'Nível de carga da bateria da espaçonave',
    },
    communication: {
      title: 'Comunicação',
      value: sensors.communication,
      unit: '%',
      min: limits.communicationMin,
      max: 100,
      description: 'Força do sinal de comunicação com a base',
    },
    altitude: {
      title: 'Altitude',
      value: sensors.altitude,
      unit: 'km',
      min: limits.altitudeMin,
      max: limits.altitudeMax,
      description: 'Altura orbital acima da superfície terrestre',
    },
    temperature: {
      title: 'Temperatura',
      value: sensors.temperature,
      unit: '°C',
      min: limits.temperatureMin,
      max: limits.temperatureMax,
      description: 'Temperatura interna da espaçonave',
    },
  };

  const info = sensorInfo[sensorType];
  const isNormal = info.value >= info.min && info.value <= info.max;
  const isWarning =
    info.value < info.min + (info.max - info.min) * 0.2 ||
    info.value > info.max - (info.max - info.min) * 0.2;

  const getPercentage = () => {
    const range = info.max - info.min;
    const position = info.value - info.min;
    return Math.max(0, Math.min(100, (position / range) * 100));
  };

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-6">
          {/* Header */}
          <View className="gap-2">
            <Text className="text-3xl font-bold text-foreground">
              {info.title}
            </Text>
            <Text className="text-muted">{info.description}</Text>
          </View>

          {/* Large Value Display */}
          <View
            className={`rounded-2xl p-6 items-center justify-center ${
              isNormal
                ? 'bg-success/10 border border-success'
                : isWarning
                  ? 'bg-warning/10 border border-warning'
                  : 'bg-error/10 border border-error'
            }`}
          >
            <View className="flex-row items-baseline gap-2 mb-2">
              <Text className="text-5xl font-bold text-foreground">
                {info.value}
              </Text>
              <Text className="text-2xl text-muted">{info.unit}</Text>
            </View>
            <Text
              className={`font-semibold ${
                isNormal
                  ? 'text-success'
                  : isWarning
                    ? 'text-warning'
                    : 'text-error'
              }`}
            >
              {isNormal
                ? '✓ Normal'
                : isWarning
                  ? '⚡ Aviso'
                  : '⚠️ Crítico'}
            </Text>
          </View>

          {/* Progress Bar */}
          <View className="gap-3">
            <View className="flex-row justify-between">
              <Text className="text-sm font-semibold text-muted">Intervalo Normal</Text>
              <Text className="text-sm font-semibold text-foreground">
                {getPercentage().toFixed(0)}%
              </Text>
            </View>
            <View className="h-3 bg-surface rounded-full overflow-hidden">
              <View
                className="h-full bg-primary rounded-full"
                style={{ width: `${getPercentage()}%` }}
              />
            </View>
            <View className="flex-row justify-between">
              <Text className="text-xs text-muted">Mín: {info.min}</Text>
              <Text className="text-xs text-muted">Máx: {info.max}</Text>
            </View>
          </View>

          {/* Stats */}
          <View className="gap-3">
            <Text className="text-sm font-semibold text-foreground mb-2">
              Estatísticas
            </Text>
            <View className="bg-surface rounded-lg p-4 gap-3">
              <View className="flex-row justify-between items-center">
                <Text className="text-muted">Valor Atual</Text>
                <Text className="text-foreground font-semibold">
                  {info.value} {info.unit}
                </Text>
              </View>
              <View className="h-px bg-border" />
              <View className="flex-row justify-between items-center">
                <Text className="text-muted">Mínimo</Text>
                <Text className="text-foreground font-semibold">
                  {info.min} {info.unit}
                </Text>
              </View>
              <View className="h-px bg-border" />
              <View className="flex-row justify-between items-center">
                <Text className="text-muted">Máximo</Text>
                <Text className="text-foreground font-semibold">
                  {info.max} {info.unit}
                </Text>
              </View>
              <View className="h-px bg-border" />
              <View className="flex-row justify-between items-center">
                <Text className="text-muted">Última Atualização</Text>
                <Text className="text-foreground font-semibold text-xs">
                  {new Date(sensors.lastUpdated).toLocaleTimeString('pt-BR')}
                </Text>
              </View>
            </View>
          </View>

          {/* Info Message */}
          {!isNormal && (
            <View className="bg-warning/10 border border-warning rounded-lg p-4">
              <Text className="text-warning font-semibold mb-1">
                {isWarning ? '⚡ Aviso' : '⚠️ Crítico'}
              </Text>
              <Text className="text-foreground text-sm">
                {isWarning
                  ? 'Este parâmetro está se aproximando dos limites. Monitore com atenção.'
                  : 'Este parâmetro atingiu um nível crítico. Ação imediata pode ser necessária.'}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
