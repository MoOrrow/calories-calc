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
};

export const useNotification = () => {
  const [api, contextHolder] = notification.useNotification();

  return {
    contextHolder,
    openNotification: ({
      type,
      config: { duration = 2, ...restConfig },
    }: TOpenNotification) => {
      api.destroy();
      api[type]({
        className: cn('notification', `notification-${type}`),
        duration,
        ...restConfig,
      });
    },
  };
};
