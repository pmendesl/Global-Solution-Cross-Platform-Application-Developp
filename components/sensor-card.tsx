import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { cn } from '@/lib/utils';

export interface SensorCardProps {
  title: string;
  value: number | string;
  unit: string;
  status: 'ok' | 'warning' | 'critical';
  onPress?: () => void;
  icon?: React.ReactNode;
}

export function SensorCard({
  title,
  value,
  unit,
  status,
  onPress,
  icon,
}: SensorCardProps) {
  const statusColors = {
    ok: 'border-success bg-success/10',
    warning: 'border-warning bg-warning/10',
    critical: 'border-error bg-error/10',
  };

  const statusTextColors = {
    ok: 'text-success',
    warning: 'text-warning',
    critical: 'text-error',
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
          'rounded-xl border-2 p-4 min-h-[140px] justify-between',
          statusColors[status]
        )}
      >
        {/* Header */}
        <View className="flex-row items-center justify-between mb-2">
          <Text className="text-sm font-semibold text-muted">{title}</Text>
          {icon && <View>{icon}</View>}
        </View>

        {/* Value */}
        <View className="flex-1 justify-center mb-2">
          <View className="flex-row items-baseline gap-1">
            <Text className="text-3xl font-bold text-foreground">{value}</Text>
            <Text className="text-lg text-muted">{unit}</Text>
          </View>
        </View>

        {/* Status Indicator */}
        <View className="flex-row items-center gap-2">
          <View
            className={cn(
              'w-2 h-2 rounded-full',
              status === 'ok' && 'bg-success',
              status === 'warning' && 'bg-warning',
              status === 'critical' && 'bg-error'
            )}
          />
          <Text className={cn('text-xs font-medium', statusTextColors[status])}>
            {status === 'ok' && 'Normal'}
            {status === 'warning' && 'Aviso'}
            {status === 'critical' && 'Crítico'}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
