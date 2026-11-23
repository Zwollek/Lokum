import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { HomeScreen } from './HomeScreen.tsx';

describe('HomeScreen', () => {
  it('renders a loading spinner inside the main landmark', () => {
    render(<HomeScreen />);

    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
    expect(main.querySelector('[data-slot="spinner-icon"]')).toBeInTheDocument();
  });
});
