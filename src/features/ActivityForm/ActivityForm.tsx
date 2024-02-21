import { InputNumber, RadioChangeEvent } from 'antd';
import { NotificationContext } from 'app';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  Button,
  Form,
  FormItem,
  RadioButton,
  RadioGroup,
  Title,
  TitleVariant,
  TitleWeight,
} from 'components';
import { useCallback, useContext, useEffect, useId } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { NotificationTypes } from 'utils';
import {
  ActivityFormFieldNames,
  ActivityFromGender,
  TITLE,
  genderByName,
  validateMessages,
} from './ActivityForm.consts';
import './ActivityForm.scss';
import { ActivityFormValues, TInputFormFields } from './ActivityForm.types';
import {
  calculateTotalCalories,
  resetForm,
  selectCalcValues,
  selectTotalCalories,
  setCalcValues,
} from './activityFormSlice';
import { debounce } from 'lodash';

export const ActivityForm: React.FC = () => {
  const id = useId();
  const navigate = useNavigate();
  const location = useLocation();
  const [form] = Form.useForm();
  const calories = useAppSelector(selectTotalCalories);
  const calcValues = useAppSelector(selectCalcValues);
  const { age, gender, weight, height } = calcValues;
  const dispatch = useAppDispatch();
  const openNotification = useContext(NotificationContext);

  useEffect(() => {
    form.setFieldsValue({
      [ActivityFormFieldNames.age]: age,
      [ActivityFormFieldNames.gender]: gender,
      [ActivityFormFieldNames.height]: height,
      [ActivityFormFieldNames.weight]: weight,
    });
  }, []);

  useEffect(() => {
    if (location?.state?.from === 'step=1') {
      openNotification({
        type: NotificationTypes.info,
        config: {
          message: 'Необходимо заполнить форму "Подсчет базовых калорий"',
        },
      });
    }
  }, [location, openNotification]);

  const inputFormFields: TInputFormFields[] = [
    {
      name: ActivityFormFieldNames.height,
      prefixText: 'Рост (см)',
      placeholder: '164',
      type: 'number',
      rules: [{ type: 'number' }, { required: true }],
      defaultValue: height || 0,
    },
    {
      name: ActivityFormFieldNames.weight,
      prefixText: 'Текущий вес (кг)',
      placeholder: '51',
      rules: [{ type: 'number' }, { required: true }],
      defaultValue: weight || 0,
    },
    {
      name: ActivityFormFieldNames.age,
      prefixText: 'Возраст',
      placeholder: '26',
      type: 'number',
      rules: [{ type: 'number', min: 1, max: 100 }, { required: true }],
      defaultValue: age || 0,
    },
  ];

  const onGenderChange = (e: RadioChangeEvent) => {
    dispatch(
      setCalcValues({
        [ActivityFormFieldNames.gender]: e.target.value,
      } as ActivityFormValues)
    );
    dispatch(calculateTotalCalories());
  };

  const handleInputChange = ({
    name,
    value,
  }: {
    name: string;
    value: number;
  }) => {
    dispatch(
      setCalcValues({
        [name as ActivityFormFieldNames]: value,
      } as any)
    );
    dispatch(calculateTotalCalories());
  };

  const debouncedHandleInputChange = useCallback(
    debounce(handleInputChange, 200),
    []
  );

  useEffect(() => {}, [calcValues]);

  const onFinish = () => {
    navigate('/form?step=1');
  };
  const onFinishFailed = () => {
    resetForm();
  };
  return (
    <Form
      form={form}
      className="activity-form"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      validateMessages={validateMessages}
      labelWrap
    >
      <Title
        className="form-title"
        variant={TitleVariant.h2}
        weight={TitleWeight.medium}
      >
        {TITLE}
      </Title>
      <div className="form-wrapper">
        <Title
          className="form-title"
          variant={TitleVariant.h4}
          weight={TitleWeight.regular}
        >
          Введи данные о себе:
        </Title>
        <div className="form-fields">
          <div className="form-field gender-wrapper">
            <FormItem label="Пол">
              <RadioGroup
                buttonStyle="solid"
                onChange={onGenderChange}
                defaultValue={gender || ActivityFromGender.female}
              >
                <RadioButton
                  value={ActivityFromGender.female}
                  label={genderByName[ActivityFromGender.female]}
                />
                <RadioButton
                  value={ActivityFromGender.male}
                  label={genderByName[ActivityFromGender.male]}
                />
              </RadioGroup>
            </FormItem>
          </div>
          {inputFormFields.map((item) => (
            <div key={`${id}-${item.name}`} className="form-field">
              <FormItem
                name={item.name}
                label={item.prefixText}
                colon
                required={false}
                rules={item.rules}
              >
                <InputNumber
                  className="field-number"
                  placeholder={item.placeholder}
                  defaultValue={item.defaultValue}
                  onChange={(value: any) =>
                    debouncedHandleInputChange({
                      name: item.name,
                      value: value,
                    })
                  }
                  controls={false}
                />
              </FormItem>
            </div>
          ))}
        </div>
        <div className="result-group">
          <p className="result-title">Твоя базовая потребность в калориях:</p>
          <p className="result-value">{calories} Ккал</p>
        </div>
      </div>
      <FormItem className="form-actions">
        <Button type="primary" htmlType="submit" className="form-submit">
          Далее
        </Button>
      </FormItem>
    </Form>
  );
};
