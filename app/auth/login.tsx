import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { theme } from '@/constants/Theme';
import { useRouter } from 'expo-router';
import { login } from '@/services/auth';
import { AppContext } from '@/context/AppContext';
import { auth } from '@/util/firebase';
import LoginForm from '@/components/LoginForm';

const Login = () => {
  const router = useRouter();
  const { signIn } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  const handleRegisterClick = () => {
    router.push({ pathname: "/Auth/Register" } as never);
  };

  const handleLogin = async (values: { email: string, password: string }) => {
    setLoading(true);
    const isLoggedIn: Record<string, string> = await login(values.email, values.password) as any;
    setLoading(false);
    if (isLoggedIn) {
      signIn(auth.currentUser?.displayName as string);
      router.push({ pathname: "/(tabs)/Home/" } as never);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 2 / 4 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Text style={styles.title}>
          Login to <Text style={styles.titleHighlight}>PixelGenie</Text>
        </Text>
        <LoginForm isLoading={loading} handleLogin={handleLogin}/>
        <TouchableOpacity onPress={handleRegisterClick} style={styles.registerButton}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: theme.colors.background,
  },
  title: {
    fontSize: 25,
    color: theme.colors.white,
    margin: 20,
    textAlign: 'center',
  },
  titleHighlight: {
    color: theme.colors.pink,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.gray,
    padding: 15,
    marginBottom: 20,
    borderRadius: 15,
    fontSize: 18,
    color: theme.colors.white,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  loginButton: {
    padding: 15,
    borderWidth: 2,
    borderRadius: 2,
    borderColor: theme.colors.pink,
    backgroundColor: theme.colors.pink,
    marginBottom: 10,
    alignItems: 'center',
  },
  registerButton: {
    padding: 15,
    borderWidth: 2,
    borderRadius: 2,
    borderColor: theme.colors.pink,
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 18,
    color: theme.colors.white,
    textAlign: 'center',
  },
});

export default Login;
