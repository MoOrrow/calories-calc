import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import cn from 'classnames';
import { InputNumber } from 'components';
import { useEffect } from 'react';
import {
  NotificationTypes,
  WindowSize,
  useNotification,
  useWindowSize,
} from 'utils';
import {
  calculateTotalCoefficentFromData,
  calculateTotalDuration,
  changePersonalCalcData,
  resetTotalCoefficent,
  selectDurationHash,
  selectPersonalCalcData,
  selectTotalCoefficent,
  selectTotalDuration,
  setDuration,
} from '../efficientFormSlice';
import './IndividualCalc.scss';
import {
  TIndividualCalcData,
  TIndividualCalcDataChild,
} from './IndividualCalc.types';

export const IndividualCalc: React.FC = () => {
  const { width } = useWindowSize();
  const dispatch = useAppDispatch();
  const calcData = useAppSelector(selectPersonalCalcData);
  const totalDuration = useAppSelector(selectTotalDuration);
  const durationHash = useAppSelector(selectDurationHash);
  const totalCoefficent = useAppSelector(selectTotalCoefficent);
  const { contextHolder, openNotification } = useNotification({
    message: 'Сумма занчения полей не должна превышать 24 часа',
    duration: 2,
  });

  useEffect(() => {
    if (totalDuration !== 24) {
      dispatch(resetTotalCoefficent());
    } else {
      dispatch(calculateTotalCoefficentFromData());
    }
  }, [totalDuration]);

  const handleBlur = ({
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
        setDuration({
          [key]: { duration: value, coefficent: value * coefficent },
        })
      );
      dispatch(changePersonalCalcData());
      dispatch(calculateTotalDuration());
    }
  };

  useEffect(() => {
    if (totalDuration > 24) {
      openNotification(NotificationTypes.error);
    }
  }, [totalDuration]);

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

        console.log(record.coefficent);

        return (
          <div>
            {contextHolder}
            <InputNumber
              controls={false}
              value={record.duration}
              min={0}
              max={24}
              onBlur={(e) =>
                handleBlur({
                  value: Number(e.target.value),
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
    <div className="calc-wrapper">
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
                  {totalDuration}
                </Table.Summary.Cell>
              </Table.Summary.Row>
              <Table.Summary.Row>
                <Table.Summary.Cell index={0} align="right">
                  Твой коэффициент физической активности
                </Table.Summary.Cell>
                <Table.Summary.Cell index={1}></Table.Summary.Cell>
                <Table.Summary.Cell index={2} align="center">
                  {totalCoefficent || 0}
                </Table.Summary.Cell>
              </Table.Summary.Row>
            </Table.Summary>
          );
        }}
      />
    </div>
  );
};
