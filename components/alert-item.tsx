import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { cn } from '@/lib/utils';
import { Alert } from '@/lib/mission-context';

export interface AlertItemProps {
  alert: Alert;
  onPress?: () => void;
  onDelete?: () => void;
}

export function AlertItem({ alert, onPress, onDelete }: AlertItemProps) {
  const typeColors = {
    critical: 'bg-error/10 border-error',
    warning: 'bg-warning/10 border-warning',
    info: 'bg-primary/10 border-primary',
  };

  const typeIcons = {
    critical: '⚠️',
    warning: '⚡',
    info: 'ℹ️',
  };

  const typeLabels = {
    critical: 'Crítico',
    warning: 'Aviso',
    info: 'Informação',
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Agora';
    if (minutes < 60) return `${minutes}m atrás`;
    if (hours < 24) return `${hours}h atrás`;
    if (days < 7) return `${days}d atrás`;
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.8 : 1,
        },
      ]}
    >
      <View
        className={cn(
          'border-l-4 rounded-lg p-4 mb-3 flex-row items-start justify-between',
          typeColors[alert.type],
          !alert.read && 'opacity-100',
          alert.read && 'opacity-60'
        )}
      >
        <View className="flex-1 flex-row gap-3">
          <Text className="text-2xl">{typeIcons[alert.type]}</Text>
          <View className="flex-1">
            <View className="flex-row items-center gap-2 mb-1">
              <Text className="font-semibold text-foreground text-sm">
                {typeLabels[alert.type]}
              </Text>
              {!alert.read && (
                <View className="w-2 h-2 rounded-full bg-primary" />
              )}
            </View>
            <Text className="text-foreground text-sm leading-relaxed">
              {alert.message}
            </Text>
            <Text className="text-muted text-xs mt-2">
              {formatTime(alert.timestamp)}
            </Text>
          </View>
        </View>
        {onDelete && (
          <Pressable
            onPress={onDelete}
            style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
            className="ml-2"
          >
            <Text className="text-muted text-lg">✕</Text>
          </Pressable>
        )}
      </View>
    </Pressable>
  );
}
