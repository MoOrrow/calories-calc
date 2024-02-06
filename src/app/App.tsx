import { ConfigProvider } from 'antd';
import { RouterProvider } from 'react-router-dom';
import { router } from 'router';

export function App() {
  return (
    <ConfigProvider
      theme={{
        token: { fontFamily: 'Roboto, sans-serif' },
        components: {
          Layout: { bodyBg: '#ffffff', footerBg: '#001529' },
          Steps: { descriptionMaxWidth: 240 },
        },
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}

export default App;
