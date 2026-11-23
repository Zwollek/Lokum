import { describe, expect, it, jest } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';
import { HomeScreen } from './HomeScreen';

// HeroUI Native components rely on Reanimated/Worklets, which have no runtime in Jest.
// Screen tests check our composition; HeroUI rendering is covered by E2E tests on a device.
jest.mock('heroui-native/spinner', () => {
  const { View } = require('react-native');
  return {
    Spinner: (props: { size?: string }) => <View testID="spinner" {...props} />,
  };
});

describe('HomeScreen', () => {
  it('renders a large loading spinner', async () => {
    await render(<HomeScreen />);

    expect(screen.getByTestId('spinner')).toHaveProp('size', 'lg');
  });
});
