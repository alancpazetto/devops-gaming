import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Steps } from '../../steps';
import { StepConfig } from '../../types/StepConfig';
import { getLocale } from '../../../paraglide/runtime';

type StepsContextValues = {
  currentStep: number;
  stepsConfig: StepConfig[];
  currentMarkdown: string;
};

const StepsContext = createContext<StepsContextValues>({
  currentStep: 0,
  stepsConfig: [],
  currentMarkdown: '',
});

type StepsProviderProps = {
  children: React.ReactNode;
};

export function StepsProvider({ children }: StepsProviderProps) {
  const locale = getLocale();
  const [currentStep, setCurrentStep] = useState(0);
  const [loadedMarkdown, setLoadedMarkdown] = useState('');

  const values = useMemo<StepsContextValues>(
    () => ({
      currentStep: 0,
      stepsConfig: Steps,
      currentMarkdown: loadedMarkdown,
    }),
    [loadedMarkdown]
  );

  useEffect(() => {
    import(`../../steps/${locale}/${currentStep + 1}/content.md?raw`).then(
      (res) => {
        setLoadedMarkdown(res.default);
      }
    );
  }, [currentStep, locale]);

  return (
    <StepsContext.Provider value={values}>{children}</StepsContext.Provider>
  );
}

export function useStepsProvider() {
  return useContext(StepsContext);
}
