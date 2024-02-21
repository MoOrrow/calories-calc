import { ArrowLeftOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  Button,
  InputNumber,
  Select,
  Title,
  TitleVariant,
  TitleWeight,
} from 'components';
import { selectTotalCalories } from 'features/ActivityForm';
import { selectTotalCoefficent } from 'features/EfficientForm';
import { useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { GOAL_OPTIONS, GOAL_PERCENT, Goal, TITLE } from './SummaryForm.consts';
import './SummaryForm.scss';
import {
  calculateCaloriesByCoefficent,
  selectCaloriesByCoefficent,
  selectCurrentGoal,
  selectGoalValue,
  setCurrentGoal,
  setGoalValue,
} from './summaryFormSlice';
import { debounce } from 'lodash';

export const SummaryForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const totalCoefficent = useAppSelector(selectTotalCoefficent) || 1;
  const totalCalories = useAppSelector(selectTotalCalories);
  const caloriesByCoefficent = useAppSelector(selectCaloriesByCoefficent);
  const currentGoal = useAppSelector(selectCurrentGoal);
  const goalValue = useAppSelector(selectGoalValue);

  const handleGoalSelectChange = (value: Goal) => {
    dispatch(setCurrentGoal(Goal[value]));
    dispatch(setGoalValue(GOAL_PERCENT[Goal[value]]));
  };

  const handleGoalinputChange = (value: number | null) => {
    dispatch(setGoalValue(value || 0));
  };

  const debouncedGoalInputChange = useCallback(
    debounce(handleGoalinputChange, 300),
    []
  );

  useEffect(() => {
    if (!totalCalories) navigate('/form?step=0');
    if (!totalCoefficent) navigate('/form?step=1');

    dispatch(
      calculateCaloriesByCoefficent({
        calories: totalCalories,
        coefficent: totalCoefficent,
      })
    );
  }, [
    goalValue,
    currentGoal,
    totalCoefficent,
    navigate,
    totalCalories,
    dispatch,
  ]);

  return (
    <div className="summary">
      <Title
        className="title"
        variant={TitleVariant.h2}
        weight={TitleWeight.medium}
      >
        {TITLE}
      </Title>
      <div className="content-wrapper">
        <div className="goal">
          <Select
            className="goal-select"
            defaultValue={Goal.maintain}
            options={GOAL_OPTIONS}
            onChange={handleGoalSelectChange}
          />
          {currentGoal !== Goal.maintain && (
            <InputNumber
              className="goal-input"
              defaultValue={goalValue || 0}
              min={0}
              max={30}
              onChange={(val: number | null) => debouncedGoalInputChange(val)}
            />
          )}
        </div>
        <div className=""></div>
      </div>
      <div className="button-wrapper">
        <Button
          type="default"
          className="button-back"
          onClick={() => navigate('/form?step=1')}
          icon={<ArrowLeftOutlined />}
        >
          Назад
        </Button>
      </div>
    </div>
  );
};
