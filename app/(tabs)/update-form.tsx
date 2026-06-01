import { ScrollView, View, Text, Pressable, Alert } from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { useMission } from '@/lib/mission-context';
import { FormField } from '@/components/form-field';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function UpdateFormScreen() {
  const router = useRouter();
  const { state, updateSensors } = useMission();
  const { sensors, limits } = state;

  const [energy, setEnergy] = useState(sensors.energy.toString());
  const [communication, setCommunication] = useState(sensors.communication.toString());
  const [altitude, setAltitude] = useState(sensors.altitude.toString());
  const [temperature, setTemperature] = useState(sensors.temperature.toString());

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Energy validation
    if (!energy) {
      newErrors.energy = 'Campo obrigatório';
    } else {
      const energyNum = parseFloat(energy);
      if (isNaN(energyNum)) {
        newErrors.energy = 'Deve ser um número';
      } else if (energyNum < 0 || energyNum > 100) {
        newErrors.energy = 'Deve estar entre 0 e 100%';
      }
    }

    // Communication validation
    if (!communication) {
      newErrors.communication = 'Campo obrigatório';
    } else {
      const commNum = parseFloat(communication);
      if (isNaN(commNum)) {
        newErrors.communication = 'Deve ser um número';
      } else if (commNum < 0 || commNum > 100) {
        newErrors.communication = 'Deve estar entre 0 e 100%';
      }
    }

    // Altitude validation
    if (!altitude) {
      newErrors.altitude = 'Campo obrigatório';
    } else {
      const altNum = parseFloat(altitude);
      if (isNaN(altNum)) {
        newErrors.altitude = 'Deve ser um número';
      } else if (altNum < 0) {
        newErrors.altitude = 'Deve ser um valor positivo';
      }
    }

    // Temperature validation
    if (!temperature) {
      newErrors.temperature = 'Campo obrigatório';
    } else {
      const tempNum = parseFloat(temperature);
      if (isNaN(tempNum)) {
        newErrors.temperature = 'Deve ser um número';
      } else if (tempNum < -100 || tempNum > 100) {
        newErrors.temperature = 'Temperatura inválida';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      Alert.alert('Validação', 'Por favor, corrija os erros no formulário');
      return;
    }

    updateSensors({
      energy: parseFloat(energy),
      communication: parseFloat(communication),
      altitude: parseFloat(altitude),
      temperature: parseFloat(temperature),
    });

    Alert.alert('Sucesso', 'Dados atualizados com sucesso!', [
      {
        text: 'OK',
        onPress: () => router.back(),
      },
    ]);
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-6">
          {/* Header */}
          <View className="gap-2">
            <Text className="text-3xl font-bold text-foreground">
              Atualizar Dados
            </Text>
            <Text className="text-muted">Insira os novos valores dos sensores</Text>
          </View>

          {/* Form Fields */}
          <View className="gap-4">
            <FormField
              label="Energia"
              placeholder="0-100"
              value={energy}
              onChangeText={setEnergy}
              error={errors.energy}
              keyboardType="decimal-pad"
              required
              hint="Percentual de carga da bateria (0-100%)"
            />

            <FormField
              label="Comunicação"
              placeholder="0-100"
              value={communication}
              onChangeText={setCommunication}
              error={errors.communication}
              keyboardType="decimal-pad"
              required
              hint="Força do sinal (0-100%)"
            />

            <FormField
              label="Altitude"
              placeholder="km"
              value={altitude}
              onChangeText={setAltitude}
              error={errors.altitude}
              keyboardType="decimal-pad"
              required
              hint="Altura orbital em quilômetros"
            />

            <FormField
              label="Temperatura"
              placeholder="°C"
              value={temperature}
              onChangeText={setTemperature}
              error={errors.temperature}
              keyboardType="decimal-pad"
              required
              hint="Temperatura interna em graus Celsius"
            />
          </View>

          {/* Info Box */}
          <View className="bg-primary/10 border border-primary rounded-lg p-4">
            <Text className="text-foreground font-semibold mb-2">ℹ️ Limites Atuais</Text>
            <Text className="text-muted text-sm leading-relaxed">
              Energia: {limits.energyMin}% - {limits.energyMax}%{'\n'}
              Comunicação: {limits.communicationMin}%+{'\n'}
              Altitude: {limits.altitudeMin} - {limits.altitudeMax} km{'\n'}
              Temperatura: {limits.temperatureMin}° - {limits.temperatureMax}°C
            </Text>
          </View>

          {/* Buttons */}
          <View className="gap-3">
            <Pressable
              onPress={handleSubmit}
              style={({ pressed }) => [{ opacity: pressed ? 0.9 : 1 }]}
            >
              <View className="bg-primary rounded-lg py-4 items-center">
                <Text className="text-background font-bold text-lg">
                  ✓ Atualizar
                </Text>
              </View>
            </Pressable>

            <Pressable
              onPress={handleCancel}
              style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
            >
              <View className="bg-surface border border-border rounded-lg py-4 items-center">
                <Text className="text-foreground font-semibold">Cancelar</Text>
              </View>
            </Pressable>
          </View>

          <View className="h-8" />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
