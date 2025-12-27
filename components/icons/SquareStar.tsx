import { LucideProps } from 'lucide-react-native';
import { Path, Rect, Svg } from 'react-native-svg';

export function SquareStar({ size = 24, color = "currentColor", ...props }: LucideProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <Rect width="18" height="18" x="3" y="3" rx="2" />
      <Path d="m12 8 1.2 2.9 3.1.5-2.2 2.3.5 3.1L12 15.3l-2.6 1.5.5-3.1-2.2-2.3 3.1-.5Z" />
    </Svg>
  );
}
