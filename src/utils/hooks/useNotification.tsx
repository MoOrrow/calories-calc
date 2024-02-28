import { NotificationArgsProps, notification } from 'antd';
import cn from 'classnames';

export enum NotificationTypes {
  success = 'success',
  error = 'error',
  info = 'info',
  warning = 'warning',
}

export type TOpenNotification = {
  type: NotificationTypes;
  config: NotificationArgsProps;
  stack?: boolean;
};

export const useNotification = () => {
  const [api, contextHolder] = notification.useNotification();

  return {
    contextHolder,
    openNotification: ({
      type,
      config: { duration = 2, ...restConfig },
      stack = false,
    }: TOpenNotification) => {
      if (!stack) {
        api.destroy();
      }
      api[type]({
        className: cn('notification', `notification-${type}`),
        duration,
        ...restConfig,
      });
    },
  };
};
