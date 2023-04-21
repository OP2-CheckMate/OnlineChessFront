import { Alert } from 'react-native';

type LeaveGameAlertProps = {
  onConfirm: () => void;
};

export const LeaveGameAlert = ({ onConfirm }: LeaveGameAlertProps) => {
  const showAlert = () => {
    Alert.alert(
      'Leave game',
      'Are you sure you want to leave the game?',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: onConfirm,
        },
      ],
      { cancelable: false }
    );
  };

  return { showAlert };
};
