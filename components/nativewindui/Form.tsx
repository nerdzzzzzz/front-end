import { View, ViewProps } from 'react-native';
import { cn } from '@/lib/cn';

function Form({ children, className, ...props }: ViewProps) {
  return (
    <View className={cn('gap-4', className)} {...props}>
      {children}
    </View>
  );
}

function FormSection({ children, className, ...props }: ViewProps) {
  return (
    <View className={cn('bg-card rounded-xl overflow-hidden', className)} {...props}>
      {children}
    </View>
  );
}

function FormItem({ children, className, ...props }: ViewProps) {
  return (
    <View
      className={cn(
        'flex-row items-center px-4 py-3 bg-card border-b border-border/50',
        'last:border-b-0',
        className
      )}
      {...props}
    >
      {children}
    </View>
  );
}

export { Form, FormSection, FormItem };
