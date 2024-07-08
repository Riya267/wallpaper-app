import { theme } from '@/constants/theme';
import { AppContext } from '@/context/appContext';
import { reauthenticateUser, removeUser } from '@/util/auth';
import React, { useContext, useState } from 'react';
import {
  View,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

const ReauthenticateModal: React.FC = () => {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { state, toggleReauthicateModalVisibility } = useContext(AppContext);
  const handleReauthenticate = async () => {
    setIsLoading(true);
    const isReauthicated = await reauthenticateUser(password);
    console.log('isReauthicated', isReauthicated);
    if (isReauthicated) {
      setIsLoading(false);
      handleClose();
      await removeUser();
    }
  };

  const handleClose = () => {
    toggleReauthicateModalVisibility(false);
    setPassword('');
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={state.openReauthicateModal}
      onRequestClose={handleClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Please enter your password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            accessible={true}
            accessibilityLabel="Password Input"
          />
          <TouchableOpacity
            onPress={handleReauthenticate}
            style={styles.button}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color={theme.colors.white} />
            ) : (
              <Text style={styles.buttonText}>Reauthenticate</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleClose}
            style={[styles.button, styles.buttonClose]}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: 300,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: theme.colors.background,
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    marginTop: 10,
    width: '100%',
  },
  buttonClose: {
    backgroundColor: theme.colors.gray,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ReauthenticateModal;
