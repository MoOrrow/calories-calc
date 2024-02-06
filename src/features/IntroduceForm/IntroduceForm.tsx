import { Title, TitleVariant, TitleWeight } from 'components';
import { TITLE } from './IntroduceForm.consts';
import './IntroduceForm.scss';

export const IntroduceForm: React.FC = () => {
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
        <div className="tab-container"></div>
      </div>
    </div>
  );
};
