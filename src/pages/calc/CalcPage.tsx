import { MainLayout, Steps } from 'components';
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { calcStepItems } from './const';
import { ActivityForm, IntroduceForm } from 'features';

export const CalcPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryStep = searchParams.get('step');
  const [currentStep, setCurrentStep] = useState<number>(0);
  useEffect(() => {
    setCurrentStep(Number(queryStep));
  }, [queryStep]);
  const changeStep = useCallback(
    (value: number) => {
      searchParams.set('step', value.toString());
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams]
  );
  return (
    <MainLayout>
      <Steps
        onChange={changeStep}
        current={currentStep}
        items={calcStepItems}
      ></Steps>
      {currentStep === 0 && <ActivityForm />}
      {currentStep === 1 && <IntroduceForm />}
      {currentStep === 2 && <div>Шаг 3</div>}
    </MainLayout>
  );
};
