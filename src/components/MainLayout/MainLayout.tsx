import { Layout } from 'antd';
import './MainLayout.scss';
import { TMainLayout } from './MainLayout.types';

const { Header, Footer, Content } = Layout;

export const MainLayout: React.FC<TMainLayout> = ({ children = '' }) => (
  <Layout className="layout">
    <Header></Header>
    <Content className="layout-content">
      <div className="main-wrapper">{children}</div>
    </Content>
    <Footer></Footer>
  </Layout>
);
