import { NotificationArgsProps, notification } from 'antd';
import cn from 'classnames';

export enum NotificationTypes {
  success = 'success',
  error = 'error',
  info = 'info',
  warning = 'warning',
}

export const useNotification = (config: NotificationArgsProps) => {
  const [api, contextHolder] = notification.useNotification();

  return {
    contextHolder,
    openNotification: (type: NotificationTypes) => {
      api[type]({
        ...config,
        className: cn('notification', `notification-${type}`),
      });
    },
  };
};
