import { ScrollView, View, Text, Pressable } from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { useMission } from '@/lib/mission-context';
import { AlertItem } from '@/components/alert-item';

export default function AlertsScreen() {
  const { state, removeAlert, markAlertRead, clearAlerts } = useMission();

  const criticalAlerts = state.alerts.filter((a) => a.type === 'critical');
  const warningAlerts = state.alerts.filter((a) => a.type === 'warning');
  const infoAlerts = state.alerts.filter((a) => a.type === 'info');

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-4">
          {/* Header */}
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-3xl font-bold text-foreground">Alertas</Text>
            {state.alerts.length > 0 && (
              <Pressable
                onPress={clearAlerts}
                style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
              >
                <Text className="text-primary font-semibold text-sm">Limpar</Text>
              </Pressable>
            )}
          </View>

          {state.alerts.length === 0 ? (
            <View className="flex-1 items-center justify-center py-12">
              <Text className="text-4xl mb-4">✓</Text>
              <Text className="text-foreground font-semibold text-lg mb-2">
                Sem alertas
              </Text>
              <Text className="text-muted text-center">
                Todos os parâmetros estão dentro dos limites normais
              </Text>
            </View>
          ) : (
            <View className="gap-6">
              {/* Critical Alerts */}
              {criticalAlerts.length > 0 && (
                <View className="gap-2">
                  <Text className="text-error font-bold text-sm">
                    CRÍTICOS ({criticalAlerts.length})
                  </Text>
                  <View className="gap-2">
                    {criticalAlerts.map((alert) => (
                      <AlertItem
                        key={alert.id}
                        alert={alert}
                        onPress={() => markAlertRead(alert.id)}
                        onDelete={() => removeAlert(alert.id)}
                      />
                    ))}
                  </View>
                </View>
              )}

              {/* Warning Alerts */}
              {warningAlerts.length > 0 && (
                <View className="gap-2">
                  <Text className="text-warning font-bold text-sm">
                    AVISOS ({warningAlerts.length})
                  </Text>
                  <View className="gap-2">
                    {warningAlerts.map((alert) => (
                      <AlertItem
                        key={alert.id}
                        alert={alert}
                        onPress={() => markAlertRead(alert.id)}
                        onDelete={() => removeAlert(alert.id)}
                      />
                    ))}
                  </View>
                </View>
              )}

              {/* Info Alerts */}
              {infoAlerts.length > 0 && (
                <View className="gap-2">
                  <Text className="text-primary font-bold text-sm">
                    INFORMAÇÕES ({infoAlerts.length})
                  </Text>
                  <View className="gap-2">
                    {infoAlerts.map((alert) => (
                      <AlertItem
                        key={alert.id}
                        alert={alert}
                        onPress={() => markAlertRead(alert.id)}
                        onDelete={() => removeAlert(alert.id)}
                      />
                    ))}
                  </View>
                </View>
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
