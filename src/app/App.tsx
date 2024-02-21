import { ConfigProvider } from 'antd';
import { createContext } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from 'router';
import { useNotification, TOpenNotification } from 'utils';

export const NotificationContext = createContext<
  (arg: TOpenNotification) => void
>(() => {});

export function App() {
  const { contextHolder, openNotification } = useNotification();
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
      {contextHolder}
      <NotificationContext.Provider value={openNotification}>
        <RouterProvider router={router} />
      </NotificationContext.Provider>
    </ConfigProvider>
  );
}

export default App;
