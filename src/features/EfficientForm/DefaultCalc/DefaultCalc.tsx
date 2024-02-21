import { RadioChangeEvent } from 'antd';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { RadioButton, RadioGroup, Space } from 'components';
import { isEmpty } from 'lodash';
import React, { useEffect } from 'react';
import {
  calculateTotalCoefficentFromData,
  resetCalcData,
  selectCalcData,
  setCalcData,
} from '../efficientFormSlice';
import { DEFAULT_CALC_VALUES } from './DefaultCalc.consts';
import './DefaultCalc.scss';

export const DefaultCalc: React.FC = React.memo(() => {
  const dispatch = useAppDispatch();
  const calcData = useAppSelector(selectCalcData);

  useEffect(() => {
    dispatch(
      setCalcData({
        [DEFAULT_CALC_VALUES[0].id]: {
          duration: 1,
          coefficent: DEFAULT_CALC_VALUES[0].value,
        },
      })
    );
  }, [dispatch]);

  const handleRadioChange = (e: RadioChangeEvent, id: number) => {
    dispatch(resetCalcData());
    dispatch(
      setCalcData({
        [id]: { duration: 1, coefficent: Number(e.target.value) },
      })
    );
  };
  useEffect(() => {
    if (!isEmpty(calcData)) {
      dispatch(calculateTotalCoefficentFromData());
    }
  }, [calcData, dispatch]);
  return (
    <div className="default-calc-wrapper">
      <RadioGroup
        optionType="default"
        className="radio-group"
        defaultValue={DEFAULT_CALC_VALUES[0].value}
      >
        <Space direction="vertical">
          {DEFAULT_CALC_VALUES.map(({ id, title, value }) => (
            <RadioButton
              key={id}
              className="radio"
              value={value}
              label={`${title} - ${value}`}
              onChange={(e) => handleRadioChange(e, id)}
            />
          ))}
        </Space>
      </RadioGroup>
    </div>
  );
});
