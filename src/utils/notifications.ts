export const requestNotificationPermission = async () => {
  if (!('Notification' in window)) {
    return false;
  }

  const permission = await Notification.requestPermission();
  return permission === 'granted';
};

const NOTIFICATION_INTERVALS = [30, 15, 10, 5];

export const scheduleNotification = (title: string, startTime: Date) => {
  const now = new Date();

  NOTIFICATION_INTERVALS.forEach((minutes) => {
    const notificationTime = new Date(startTime.getTime() - minutes * 60000);
    const timeUntilNotification = notificationTime.getTime() - now.getTime();

    if (timeUntilNotification > 0) {
      setTimeout(() => {
        if (Notification.permission === 'granted') {
          new Notification(`Lembrete: ${title}`, {
            body: `Esta tarefa começará em ${minutes} minutos`,
            icon: '/notification-icon.png',
          });
        }
      }, timeUntilNotification);
    }
  });
};