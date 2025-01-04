import React, { useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import { Colors } from '@/constants/Colors'; // Adjust to your project

interface ILogoutModalProps {
  visible: boolean;
  onClose: () => void;
  onLogout: () => void;
  title?: string;
  message?: string;
  logoutText?: string;
  cancelText?: string;
  animationDuration?: number;
}

const LogoutConfirmationModal = ({
  visible,
  onClose,
  onLogout,
  title = 'Confirm Logout',
  message = 'Are you sure you want to log out?',
  logoutText = 'Logout',
  cancelText = 'Cancel',
  animationDuration = 300,
}: ILogoutModalProps) => {
  const scaleAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: animationDuration,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(scaleAnim, {
        toValue: 0,
        duration: animationDuration,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, animationDuration]);

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={onClose}
      onDismiss={onClose}
    >
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.modalContainer,
            { transform: [{ scale: scaleAnim }] },
          ]}
        >
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buttonCancel} onPress={onClose}>
              <Text style={styles.cancelText}>{cancelText}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonLogout} onPress={onLogout}>
              <Text style={styles.logoutText}>{logoutText}</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.black,
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: Colors.black,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  buttonCancel: {
    flex: 1,
    backgroundColor: Colors.mainColor,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonLogout: {
    flex: 1,
    backgroundColor: Colors.red,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelText: {
    color: Colors.white,
    fontWeight: 'bold',
  },
  logoutText: {
    color: Colors.white,
    fontWeight: 'bold',
  },
});

export default LogoutConfirmationModal;