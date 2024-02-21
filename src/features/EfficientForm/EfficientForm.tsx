import { ArrowLeftOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Button, Tabs, Title, TitleVariant, TitleWeight } from 'components';
import { selectTotalCalories } from 'features/ActivityForm';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DefaultCalc } from './DefaultCalc';
import { EfficientTabs, TAB_ITEMS, TITLE } from './EfficientForm.consts';
import './EfficientForm.scss';
import { IndividualCalc } from './IndividualCalc';
import {
  resetEfficientForm,
  selectCurrentTabId,
  selectTotalCoefficent,
  setCurrentTabId,
} from './efficientFormSlice';

export const EfficientForm: React.FC = () => {
  const calories = useAppSelector(selectTotalCalories);
  const coefficent = useAppSelector(selectTotalCoefficent);
  const currentTab = useAppSelector(selectCurrentTabId);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleTabClick = (id: EfficientTabs) => {
    dispatch(resetEfficientForm());
    dispatch(setCurrentTabId(id));
  };

  const onNextButtonClick = () => {
    navigate('/form?step=2');
  };

  useEffect(() => {
    if (!calories) {
      navigate('/form?step=0', { state: { from: 'step=1' } });
    }
  }, [calories, navigate]);

  return (
    <div className="efficient">
      <Title
        className="title"
        variant={TitleVariant.h2}
        weight={TitleWeight.medium}
      >
        {TITLE}
      </Title>
      <div className="content-wrapper">
        <div className="tab-container">
          <Tabs
            onTabClick={(value) => {
              handleTabClick(value as EfficientTabs);
            }}
            defaultActiveKey={EfficientTabs.default}
            items={TAB_ITEMS.map(({ id, label }) => ({
              key: id,
              label: label,
            }))}
            type="card"
          />
          {currentTab === EfficientTabs.default && <DefaultCalc />}
          {currentTab === EfficientTabs.individual && <IndividualCalc />},
        </div>
      </div>
      <div className="button-wrapper">
        <Button
          type="default"
          className="button-back"
          onClick={() => navigate('/form?step=0')}
          icon={<ArrowLeftOutlined />}
        >
          Назад
        </Button>
        <Button
          disabled={!coefficent}
          type="primary"
          className="button-submit"
          onClick={onNextButtonClick}
        >
          Далее
        </Button>
      </div>
    </div>
  );
};
