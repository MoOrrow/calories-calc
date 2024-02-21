import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { NotificationContext } from 'app';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import cn from 'classnames';
import { InputNumber } from 'components';
import React, { useCallback, useContext, useEffect } from 'react';
import { NotificationTypes, WindowSize, useWindowSize } from 'utils';
import {
  calculateTotalCoefficentFromData,
  calculateTotalDuration,
  changepersonalCalcDataSource,
  resetTotalCoefficent,
  selectTotalCoefficent,
  selectTotalDuration,
  selectpersonalCalcDataSource,
  setCalcData,
} from '../efficientFormSlice';
import './IndividualCalc.scss';
import {
  TIndividualCalcData,
  TIndividualCalcDataChild,
} from './IndividualCalc.types';
import { debounce } from 'lodash';

export const IndividualCalc: React.FC = React.memo(() => {
  const { width } = useWindowSize();
  const dispatch = useAppDispatch();
  const calcData = useAppSelector(selectpersonalCalcDataSource);
  const totalDuration = useAppSelector(selectTotalDuration);
  const totalCoefficent = useAppSelector(selectTotalCoefficent);
  const openNotification = useContext(NotificationContext);

  useEffect(() => {
    if (totalDuration > 24) {
      openNotification({
        type: NotificationTypes.error,
        config: {
          message: 'Сумма занчения полей не должна превышать 24 часа',
          duration: 2,
        },
      });
    }
  }, [totalDuration, openNotification]);

  useEffect(() => {
    if (totalDuration !== 24) {
      if (totalCoefficent) {
        dispatch(resetTotalCoefficent());
      }
    } else {
      dispatch(calculateTotalCoefficentFromData());
    }
  }, [totalDuration, totalCoefficent, dispatch]);

  const handleChange = ({
    value,
    key,
    coefficent,
  }: {
    value: number;
    key: number;
    coefficent: number;
  }) => {
    if (value >= 0) {
      dispatch(
        setCalcData({
          [key]: { duration: value, coefficent: value * coefficent },
        })
      );
      dispatch(changepersonalCalcDataSource());
      dispatch(calculateTotalDuration());
    }
  };

  const handleDebouncedChange = useCallback(debounce(handleChange, 200), []);

  const columns: ColumnsType<TIndividualCalcData> = [
    {
      title: 'Вид деятельности',
      dataIndex: 'name',
      key: 'name',
      width: width < WindowSize.sm ? 140 : 600,
    },
    {
      title: 'Длительность (часы)',
      width: width < WindowSize.sm ? 140 : 200,
      key: 'key',
      align: 'center',
      render: (record: TIndividualCalcData | TIndividualCalcDataChild) => {
        if (!('duration' in record)) {
          return null;
        }

        return (
          <div>
            <InputNumber
              controls={false}
              defaultValue={record.duration}
              value={record.duration}
              min={0}
              onChange={(value) =>
                handleDebouncedChange({
                  value: Number(value),
                  key: record.key,
                  coefficent: record.coefficent,
                })
              }
            />
            <p className="mobile-help">Коэффицент: {record.coefficent}</p>
          </div>
        );
      },
    },
    {
      title: 'Коэффицент',
      dataIndex: 'coefficent',
      width: 100,
      align: 'center',
      key: 'key',
      responsive: ['sm'],
    },
  ];
  return (
    <div className="individual-calc-wrapper">
      <Table
        bordered
        pagination={false}
        dataSource={[...calcData]}
        columns={columns}
        expandable={{
          defaultExpandAllRows: true,
        }}
        scroll={{ x: width < WindowSize.sm ? 320 : 0 }}
        summary={(record) => {
          return (
            <Table.Summary>
              <Table.Summary.Row>
                <Table.Summary.Cell index={0} align="right">
                  Значение должно быть равно 24 часам
                </Table.Summary.Cell>
                <Table.Summary.Cell
                  index={1}
                  align="center"
                  className={cn('summary-cell', {
                    'summary-cell-red': totalDuration > 24,
                  })}
                >
                  <div tabIndex={0} id="duration">
                    {totalDuration}
                  </div>
                </Table.Summary.Cell>
              </Table.Summary.Row>
              <Table.Summary.Row>
                <Table.Summary.Cell index={0} align="right">
                  Твой коэффициент физической активности
                </Table.Summary.Cell>
                <Table.Summary.Cell index={1}></Table.Summary.Cell>
                <Table.Summary.Cell
                  index={2}
                  align="center"
                  className={cn('total-coefficent', {
                    'total-coefficent-fill': !!totalCoefficent,
                  })}
                >
                  {totalCoefficent || 0}
                </Table.Summary.Cell>
              </Table.Summary.Row>
            </Table.Summary>
          );
        }}
      />
    </div>
  );
});
