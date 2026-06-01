import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { cn } from '@/lib/utils';

export interface FormFieldProps {
  label: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  keyboardType?: 'default' | 'numeric' | 'decimal-pad' | 'email-address';
  min?: number;
  max?: number;
  required?: boolean;
  hint?: string;
}

export function FormField({
  label,
  placeholder,
  value,
  onChangeText,
  error,
  keyboardType = 'default',
  min,
  max,
  required = false,
  hint,
}: FormFieldProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className="gap-2">
      <View className="flex-row items-center gap-1">
        <Text className="text-sm font-semibold text-foreground">{label}</Text>
        {required && <Text className="text-error">*</Text>}
      </View>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        placeholderTextColor="#8b92b8"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={cn(
          'rounded-lg px-4 py-3 text-foreground',
          'border-2 bg-surface',
          isFocused
            ? 'border-primary'
            : error
              ? 'border-error'
              : 'border-border'
        )}
        style={{
          color: '#e0e6ff',
          fontSize: 16,
        }}
      />

      {hint && !error && (
        <Text className="text-xs text-muted">{hint}</Text>
      )}

      {error && (
        <View className="flex-row items-center gap-1">
          <Text className="text-xs text-error">⚠️ {error}</Text>
        </View>
      )}
    </View>
  );
}
