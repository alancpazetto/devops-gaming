import { StepsProvider } from './providers/StepsProvider';

type ProvidersProps = {
  children: React.ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return <StepsProvider>{children}</StepsProvider>;
}
