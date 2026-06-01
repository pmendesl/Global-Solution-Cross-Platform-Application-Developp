import { ScrollView, View, Text, Pressable } from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { useMission } from '@/lib/mission-context';
import { SensorCard } from '@/components/sensor-card';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';

function getSensorStatus(
  value: number,
  min: number,
  max: number
): 'ok' | 'warning' | 'critical' {
  if (value < min || value > max) return 'critical';
  if (value < min + (max - min) * 0.2 || value > max - (max - min) * 0.2) {
    return 'warning';
  }
  return 'ok';
}

export default function HomeScreen() {
  const { state, addAlert } = useMission();
  const router = useRouter();
  const { sensors, limits } = state;

  // Check for critical values and add alerts
  useEffect(() => {
    const checkCriticalValues = () => {
      const alerts = [];

      if (sensors.energy < limits.energyMin) {
        alerts.push({
          id: `energy-${Date.now()}`,
          type: 'critical' as const,
          message: `Energia crítica: ${sensors.energy}%`,
          timestamp: new Date().toISOString(),
          read: false,
          sensorType: 'energy' as const,
        });
      }

      if (sensors.communication < limits.communicationMin) {
        alerts.push({
          id: `comm-${Date.now()}`,
          type: 'critical' as const,
          message: `Comunicação fraca: ${sensors.communication}%`,
          timestamp: new Date().toISOString(),
          read: false,
          sensorType: 'communication' as const,
        });
      }

      if (
        sensors.altitude < limits.altitudeMin ||
        sensors.altitude > limits.altitudeMax
      ) {
        alerts.push({
          id: `altitude-${Date.now()}`,
          type: 'warning' as const,
          message: `Altitude fora do intervalo: ${sensors.altitude}km`,
          timestamp: new Date().toISOString(),
          read: false,
          sensorType: 'altitude' as const,
        });
      }

      if (
        sensors.temperature < limits.temperatureMin ||
        sensors.temperature > limits.temperatureMax
      ) {
        alerts.push({
          id: `temp-${Date.now()}`,
          type: 'warning' as const,
          message: `Temperatura anômala: ${sensors.temperature}°C`,
          timestamp: new Date().toISOString(),
          read: false,
          sensorType: 'temperature' as const,
        });
      }

      alerts.forEach((alert) => addAlert(alert));
    };

    checkCriticalValues();
  }, [sensors, limits, addAlert]);

  const energyStatus = getSensorStatus(
    sensors.energy,
    limits.energyMin,
    limits.energyMax
  );
  const communicationStatus = getSensorStatus(
    sensors.communication,
    limits.communicationMin,
    100
  );
  const altitudeStatus = getSensorStatus(
    sensors.altitude,
    limits.altitudeMin,
    limits.altitudeMax
  );
  const temperatureStatus = getSensorStatus(
    sensors.temperature,
    limits.temperatureMin,
    limits.temperatureMax
  );

  const unreadAlerts = state.alerts.filter((a) => !a.read).length;

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-6">
          {/* Header */}
          <View className="gap-2 mb-2">
            <View className="flex-row items-center justify-between">
              <Text className="text-3xl font-bold text-foreground">
                {state.missionName}
              </Text>
              <View
                className={`px-3 py-1 rounded-full ${
                  state.isActive ? 'bg-success/20' : 'bg-error/20'
                }`}
              >
                <Text
                  className={`text-xs font-semibold ${
                    state.isActive ? 'text-success' : 'text-error'
                  }`}
                >
                  {state.isActive ? '● Ativa' : '● Inativa'}
                </Text>
              </View>
            </View>
            <Text className="text-muted text-sm">
              Última atualização: {new Date(sensors.lastUpdated).toLocaleTimeString('pt-BR')}
            </Text>
          </View>

          {/* Alerts Badge */}
          {unreadAlerts > 0 && (
            <Pressable
              onPress={() => router.push('/(tabs)/alerts')}
              style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
            >
              <View className="bg-error/20 border border-error rounded-lg p-3 flex-row items-center gap-2">
                <Text className="text-xl">⚠️</Text>
                <Text className="text-error font-semibold flex-1">
                  {unreadAlerts} alerta{unreadAlerts !== 1 ? 's' : ''} não lido{unreadAlerts !== 1 ? 's' : ''}
                </Text>
                <Text className="text-error">→</Text>
              </View>
            </Pressable>
          )}

          {/* Sensor Cards Grid */}
          <View className="gap-4">
            <View className="flex-row gap-4">
              <View className="flex-1">
                <SensorCard
                  title="Energia"
                  value={sensors.energy}
                  unit="%"
                  status={energyStatus}
                  onPress={() => router.push({ pathname: '/(tabs)/sensor-detail', params: { type: 'energy' } })}
                />
              </View>
              <View className="flex-1">
                <SensorCard
                  title="Comunicação"
                  value={sensors.communication}
                  unit="%"
                  status={communicationStatus}
                  onPress={() => router.push({ pathname: '/(tabs)/sensor-detail', params: { type: 'communication' } })}
                />
              </View>
            </View>

            <View className="flex-row gap-4">
              <View className="flex-1">
                <SensorCard
                  title="Altitude"
                  value={sensors.altitude}
                  unit="km"
                  status={altitudeStatus}
                  onPress={() => router.push({ pathname: '/(tabs)/sensor-detail', params: { type: 'altitude' } })}
                />
              </View>
              <View className="flex-1">
                <SensorCard
                  title="Temperatura"
                  value={sensors.temperature}
                  unit="°C"
                  status={temperatureStatus}
                  onPress={() => router.push({ pathname: '/(tabs)/sensor-detail', params: { type: 'temperature' } })}
                />
              </View>
            </View>
          </View>

          {/* Action Button */}
          <Pressable
            onPress={() => router.push('/(tabs)/update-form')}
            style={({ pressed }) => [{ opacity: pressed ? 0.9 : 1 }]}
          >
            <View className="bg-primary rounded-lg py-4 items-center">
              <Text className="text-background font-bold text-lg">
                ➕ Atualizar Dados
              </Text>
            </View>
          </Pressable>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
