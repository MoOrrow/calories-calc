import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Button, Tabs, Title, TitleVariant, TitleWeight } from 'components';
import { selectTotalCalories } from 'features/ActivityForm';
import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DefaultCalc } from './DefaultCalc';
import { DEFAULT_CALC_VALUES, TAB_ITEMS, TITLE } from './EfficientForm.consts';
import './EfficientForm.scss';
import { IndividualCalc } from './IndividualCalc';
import {
  resetTotalCoefficent,
  selectTotalCoefficent,
  setTotalCoefficent,
} from './efficientFormSlice';

export const EfficientForm: React.FC = () => {
  const calories = useAppSelector(selectTotalCalories);
  const coefficent = useAppSelector(selectTotalCoefficent);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const changeTotalCoefficent = useCallback(
    (value: number) => {
      dispatch(setTotalCoefficent(value));
    },
    [dispatch]
  );

  const handleTabClick = () => {
    dispatch(resetTotalCoefficent());
  };

  useEffect(() => {
    /* if (!calories) {
      navigate('/');
    } */
  }, []);

  return (
    <div className="introduce-layout">
      <Title
        className="layout-title"
        variant={TitleVariant.h2}
        weight={TitleWeight.medium}
      >
        {TITLE}
      </Title>
      <div className="layout-wrapper">
        <div className="tab-container">
          <Tabs
            onTabClick={handleTabClick}
            defaultActiveKey="1"
            items={TAB_ITEMS.map(({ id, label }) => ({
              key: id.toString(),
              label: label,
              children:
                id === 0 ? (
                  <DefaultCalc
                    onChange={changeTotalCoefficent}
                    items={DEFAULT_CALC_VALUES}
                  />
                ) : (
                  <IndividualCalc></IndividualCalc>
                ),
            }))}
            type="card"
          />
        </div>
      </div>
      <div className="button-wrapper">
        <Button disabled={!coefficent} type="primary" className="button-submit">
          Далее
        </Button>
      </div>
    </div>
  );
};
