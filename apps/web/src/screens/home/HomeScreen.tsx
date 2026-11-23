import { Spinner } from '@heroui/react';

// Placeholder screen confirming that HeroUI and Tailwind CSS are wired up.
export function HomeScreen() {
  return (
    <main className="flex min-h-svh items-center justify-center bg-background">
      <Spinner size="lg" />
    </main>
  );
}
