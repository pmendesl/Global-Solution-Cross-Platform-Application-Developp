import { ScrollView, View, Text, Pressable, Alert } from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { useMission } from '@/lib/mission-context';

export default function SettingsScreen() {
  const { state, updateLimits, resetState } = useMission();

  const handleResetData = () => {
    Alert.alert(
      'Resetar Dados',
      'Tem certeza que deseja resetar todos os dados? Esta ação não pode ser desfeita.',
      [
        { text: 'Cancelar', onPress: () => {}, style: 'cancel' },
        {
          text: 'Resetar',
          onPress: () => resetState(),
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-6">
          {/* Header */}
          <View className="gap-2">
            <Text className="text-3xl font-bold text-foreground">
              Configurações
            </Text>
            <Text className="text-muted">Ajuste os limites de alerta</Text>
          </View>

          {/* Limits Section */}
          <View className="gap-4">
            <Text className="text-lg font-semibold text-foreground">
              Limites de Alerta
            </Text>

            {/* Energy Limits */}
            <View className="bg-surface rounded-lg p-4 gap-3">
              <Text className="font-semibold text-foreground mb-2">
                Energia (%)
              </Text>
              <View className="flex-row justify-between items-center">
                <Text className="text-muted">Mínimo</Text>
                <View className="bg-background rounded px-3 py-2">
                  <Text className="text-foreground font-semibold">
                    {state.limits.energyMin}%
                  </Text>
                </View>
              </View>
              <View className="flex-row justify-between items-center">
                <Text className="text-muted">Máximo</Text>
                <View className="bg-background rounded px-3 py-2">
                  <Text className="text-foreground font-semibold">
                    {state.limits.energyMax}%
                  </Text>
                </View>
              </View>
            </View>

            {/* Communication Limits */}
            <View className="bg-surface rounded-lg p-4 gap-3">
              <Text className="font-semibold text-foreground mb-2">
                Comunicação (%)
              </Text>
              <View className="flex-row justify-between items-center">
                <Text className="text-muted">Mínimo</Text>
                <View className="bg-background rounded px-3 py-2">
                  <Text className="text-foreground font-semibold">
                    {state.limits.communicationMin}%
                  </Text>
                </View>
              </View>
            </View>

            {/* Altitude Limits */}
            <View className="bg-surface rounded-lg p-4 gap-3">
              <Text className="font-semibold text-foreground mb-2">
                Altitude (km)
              </Text>
              <View className="flex-row justify-between items-center">
                <Text className="text-muted">Mínimo</Text>
                <View className="bg-background rounded px-3 py-2">
                  <Text className="text-foreground font-semibold">
                    {state.limits.altitudeMin} km
                  </Text>
                </View>
              </View>
              <View className="flex-row justify-between items-center">
                <Text className="text-muted">Máximo</Text>
                <View className="bg-background rounded px-3 py-2">
                  <Text className="text-foreground font-semibold">
                    {state.limits.altitudeMax} km
                  </Text>
                </View>
              </View>
            </View>

            {/* Temperature Limits */}
            <View className="bg-surface rounded-lg p-4 gap-3">
              <Text className="font-semibold text-foreground mb-2">
                Temperatura (°C)
              </Text>
              <View className="flex-row justify-between items-center">
                <Text className="text-muted">Mínimo</Text>
                <View className="bg-background rounded px-3 py-2">
                  <Text className="text-foreground font-semibold">
                    {state.limits.temperatureMin}°C
                  </Text>
                </View>
              </View>
              <View className="flex-row justify-between items-center">
                <Text className="text-muted">Máximo</Text>
                <View className="bg-background rounded px-3 py-2">
                  <Text className="text-foreground font-semibold">
                    {state.limits.temperatureMax}°C
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Info Section */}
          <View className="gap-4">
            <Text className="text-lg font-semibold text-foreground">
              Informações
            </Text>
            <View className="bg-surface rounded-lg p-4 gap-3">
              <View className="flex-row justify-between items-center">
                <Text className="text-muted">Missão</Text>
                <Text className="text-foreground font-semibold">
                  {state.missionName}
                </Text>
              </View>
              <View className="h-px bg-border" />
              <View className="flex-row justify-between items-center">
                <Text className="text-muted">Status</Text>
                <Text
                  className={`font-semibold ${
                    state.isActive ? 'text-success' : 'text-error'
                  }`}
                >
                  {state.isActive ? 'Ativa' : 'Inativa'}
                </Text>
              </View>
              <View className="h-px bg-border" />
              <View className="flex-row justify-between items-center">
                <Text className="text-muted">Versão</Text>
                <Text className="text-foreground font-semibold">1.0.0</Text>
              </View>
            </View>
          </View>

          {/* Reset Button */}
          <Pressable
            onPress={handleResetData}
            style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
          >
            <View className="bg-error/20 border border-error rounded-lg py-3 items-center">
              <Text className="text-error font-bold">🔄 Resetar Dados</Text>
            </View>
          </Pressable>

          <View className="h-8" />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
