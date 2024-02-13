import { Form, Table } from 'antd';
import { Column, FormItem, InputNumber } from 'components';
import { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import {
  TDataChild,
  TDataSource,
  TIndividualCalc,
} from './IndividualCalc.types';
import './IndividualCalc.scss';
import { WindowSize, debounce, useWindowSize } from 'utils';
import { ColumnsType } from 'antd/es/table';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectPersonalCalcData } from '../efficientFormSlice';

export const IndividualCalc: React.FC<TIndividualCalc> = ({ dataSource }) => {
  const [form] = Form.useForm();
  const [data, setData] = useState(dataSource);
  const [reachGoal, setReachGoal] = useState(24);
  const dispatch = useAppDispatch();
  const calcData = useAppSelector(selectPersonalCalcData);
  const { width } = useWindowSize();
  useEffect(() => {
    console.log(data);
  }, [data]);
  const columns: ColumnsType<TDataSource> = [
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
      render: (record: TDataSource | TDataChild) => {
        if (!('duration' in record)) {
          return null;
        }

        /**
         * @todo  перенести в слайс, избавить компонент от логики.
         * Дописать в слейсе редюсер, принимающий ключ и значение поля
         */
        const handleInputChange = (
          value: typeof record.duration = 0
        ) => {
          const newData = data.map((rootItem) => ({
            ...rootItem,
            children: rootItem.children.map((item) => ({
              ...item,
              duration: item.key === record.key ? value : item.duration,
            })),
          })) as TDataSource[];

          console.log(newData);
          setData(newData);
        };

        return (
          <FormItem className="form-item form-item-duration">
            <InputNumber
              controls={false}
              defaultValue={record.duration}
              onChange={debounce(handleInputChange, 300)}
              min={0}
              max={24}
            />
            <p className="mobile-help">Коэффицент: {record.coefficent}</p>
          </FormItem>
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
    <Form form={form} className="calc-form">
      <div className="calc-wrapper">
        <Table
          bordered
          pagination={false}
          dataSource={[...data]}
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
                  <Table.Summary.Cell index={1} align="center">
                    {24 - reachGoal}
                  </Table.Summary.Cell>
                </Table.Summary.Row>
                <Table.Summary.Row>
                  <Table.Summary.Cell index={0} align="right">
                    Твой коэффициент физической активности
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={1}></Table.Summary.Cell>
                  <Table.Summary.Cell index={2} align="center">
                    test
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              </Table.Summary>
            );
          }}
        />
      </div>
    </Form>
  );
};
