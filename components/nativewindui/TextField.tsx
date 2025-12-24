import { TextInput, TextInputProps, View, Text } from 'react-native';
import { cn } from '@/lib/cn';
import { useColorScheme } from '@/lib/useColorScheme';
import { COLORS } from '@/theme/colors';

interface TextFieldProps extends TextInputProps {
  label?: string;
  leftView?: React.ReactNode;
  rightView?: React.ReactNode;
  errorMessage?: string;
}

export function TextField({
  className,
  label,
  leftView,
  rightView,
  errorMessage,
  ...props
}: TextFieldProps) {
  const { colors } = useColorScheme();

  return (
    <View className="flex-1 gap-1">
        <View className="flex-row items-center gap-2">
        {leftView}
        {label && (
            <View className="w-24 justify-center">
             <Text className="text-foreground text-base font-medium">{label}</Text>
            </View>
        )}
        <TextInput
            className={cn(
            'flex-1 text-base text-foreground py-1',
            className
            )}
            placeholderTextColor={colors.muted}
            {...props}
        />
        {rightView}
        </View>
        {errorMessage && (
            <Text className="text-destructive text-xs px-1">{errorMessage}</Text>
        )}
    </View>
  );
}
