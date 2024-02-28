import { ArrowLeftOutlined } from '@ant-design/icons';
import { NotificationContext } from 'app';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  Button,
  InputNumber,
  QuestionTooltip,
  Select,
  Title,
  TitleVariant,
  TitleWeight,
} from 'components';
import { selectCalcValues, selectTotalCalories } from 'features/ActivityForm';
import { selectTotalCoefficent } from 'features/EfficientForm';
import { debounce } from 'lodash';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NotificationTypes } from 'utils';
import {
  GOAL_OPTIONS,
  GOAL_PERCENT,
  GPK_UNIT,
  Goal,
  MAX_PERCENT_VALUE,
  NUTRITION_PREFIX,
  NUTRITION_TOOLTIP,
  NUTRITION_UNIT,
  NutritionName,
  TITLE,
} from './SummaryForm.consts';
import './SummaryForm.scss';
import { TNutritionDataFields } from './SummaryForm.types';
import {
  calculateCaloriesByCoefficent,
  calculateNutritionByData,
  calculateNutritionPercents,
  selectCaloriesByCoefficent,
  selectCurrentGoal,
  selectGoalValue,
  selectNutritionData,
  selectPercentSum,
  setCurrentGoal,
  setGoalValue,
  setNutriotionData,
} from './summaryFormSlice';

export const SummaryForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const totalCoefficent = useAppSelector(selectTotalCoefficent) || 1;
  const totalCalories = useAppSelector(selectTotalCalories);
  const caloriesByCoefficent = useAppSelector(selectCaloriesByCoefficent);
  const nutritionData = useAppSelector(selectNutritionData);
  const currentGoal = useAppSelector(selectCurrentGoal);
  const goalValue = useAppSelector(selectGoalValue);
  const percentSum = useAppSelector(selectPercentSum);
  const { weight } = useAppSelector(selectCalcValues);
  const [showResult, setShowResult] = useState(false);

  const handleGoalSelectChange = (value: Goal) => {
    setShowResult(false);
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

  const handleNutritionInputChange = (value: number, name: NutritionName) => {
    setShowResult(false);
    dispatch(setNutriotionData({ name: name, data: { percent: value } }));
  };

  const debouncedNutritionInputChange = useCallback(
    debounce(handleNutritionInputChange, 500),
    []
  );

  const handleCalcButtonClick = () => {
    if (percentSum !== MAX_PERCENT_VALUE) {
      return;
    }
    dispatch(calculateNutritionByData({ weight }));
    setShowResult(true);
  };

  useEffect(() => {
    dispatch(calculateNutritionPercents());
  }, [nutritionData]);

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
              controls={false}
              className="goal-input"
              defaultValue={goalValue || 0}
              addonAfter="%"
              min={0}
              max={30}
              onChange={(val: number | null) => debouncedGoalInputChange(val)}
            />
          )}
        </div>
        <div className="fields">
          <div className="data">
            {Object.entries(nutritionData).map(
              ([nutritionName, values]: [string, TNutritionDataFields]) => {
                const name = NutritionName[nutritionName as NutritionName];
                return (
                  <div className="input-field" key={name}>
                    <p className="input-prefix">{`${NUTRITION_PREFIX[name]} :`}</p>
                    <div className="input-wrapper">
                      <InputNumber
                        controls={false}
                        defaultValue={values.percent}
                        value={values.percent}
                        addonAfter="%"
                        onChange={(value: number | null) => {
                          debouncedNutritionInputChange(Number(value), name);
                        }}
                      />
                      <QuestionTooltip
                        className="input-tooltip"
                        title={NUTRITION_TOOLTIP[name]}
                      />
                    </div>
                  </div>
                );
              }
            )}

            <div className="disclaimer">
              {percentSum !== MAX_PERCENT_VALUE ? (
                <p className="disclaimer-text">
                  {`Сумма значений поля не должна ${
                    percentSum > 100 ? 'превышать' : 'быть меньше'
                  } 100%`}
                </p>
              ) : null}
            </div>
            <div className="calc-button-wrapper">
              <Button
                className="calc-button"
                type="primary"
                onClick={handleCalcButtonClick}
                disabled={percentSum !== MAX_PERCENT_VALUE}
              >
                Пересчитать
              </Button>
            </div>
          </div>
          {showResult && (
            <div className="result">
              <Title variant={TitleVariant.h4} className="result-title">
                Результат
              </Title>

              <div className="result-fields">
                {Object.entries(nutritionData).map(
                  ([nutritionName, values]: [string, TNutritionDataFields]) => {
                    const name = NutritionName[nutritionName as NutritionName];
                    return (
                      <div className="result-field" key={name}>
                        <p className="result-prefix">
                          {NUTRITION_PREFIX[name]}
                        </p>
                        <p className="result-content">
                          <span className="result-value">
                            {`${values.totalResult} ${NUTRITION_UNIT}`}
                          </span>
                          <span className="result-gpk">{`(${values.gpk} ${GPK_UNIT})`}</span>
                        </p>
                      </div>
                    );
                  }
                )}
              </div>
              <div className="result-calories">
                <p className="calories-prefix">калории</p>
                <p className="calories-value">{`${caloriesByCoefficent}`}</p>
              </div>
            </div>
          )}
        </div>
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
