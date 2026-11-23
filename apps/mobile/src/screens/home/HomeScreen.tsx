import { Spinner } from 'heroui-native/spinner';
import { View } from 'react-native';

// Placeholder screen confirming that HeroUI Native and Uniwind are wired up.
export function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Spinner size="lg" />
    </View>
  );
}
