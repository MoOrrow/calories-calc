import {
  Button,
  Form,
  FormItem,
  RadioButton,
  RadioGroup,
  Space,
} from 'components';
import { TDefaultCalc } from './DeafultCalc.types';
import { RadioChangeEvent } from 'antd';
import { useEffect } from 'react';
import React from 'react';

export const DefaultCalc: React.FC<TDefaultCalc> = React.memo(
  ({ items, onChange }) => {
    const [form] = Form.useForm();

    useEffect(() => {
      onChange(items[0].value);
    }, []);

    const handleRadioChange = (e: RadioChangeEvent) => {
      onChange(e.target.value);
    };
    return (
      <Form form={form} className="calc-form">
        <FormItem rules={[{ required: true }]}>
          <RadioGroup
            optionType="default"
            className="calc-radio-group"
            defaultValue={items[0].value}
          >
            <Space direction="vertical">
              {items.map(({ id, title, value }) => (
                <RadioButton
                  key={id}
                  className="calc-radio"
                  value={value}
                  label={`${title} - ${value}`}
                  onChange={handleRadioChange}
                />
              ))}
            </Space>
          </RadioGroup>
        </FormItem>
      </Form>
    );
  }
);
