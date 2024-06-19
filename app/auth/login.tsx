import React, { useContext, useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity, Pressable, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { theme } from '@/constants/theme';
import { useRouter } from 'expo-router';
import { getDocument, login } from '@/util/auth';
import { misc } from '@/constants/misc';
import { AppContext } from '@/context/appContext';
import { User, UserInfo } from 'firebase/auth';
import { auth } from '@/util/firebase';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Password too short!').required('Required'),
});

const Login = () => {
  const router = useRouter();
  const { signIn } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  const handleRegisterClick = () => {
    router.push({ pathname: "/auth/register" } as never);
  };

  const handleLogin = async (values: { email: string, password: string }) => {
    setLoading(true);
    const isLoggedIn: Record<string, string> = await login(values.email, values.password) as any;
    setLoading(false);
    if (isLoggedIn) {
      signIn(auth.currentUser?.displayName as string);
      router.push({ pathname: "/(tabs)/home/" } as never);
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
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={values => {
            handleLogin(values);
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View>
              <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                placeholderTextColor={theme.colors.gray}
              />
              {errors.email && touched.email ? (
                <Text style={styles.errorText}>{errors.email}</Text>
              ) : null}
              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                placeholderTextColor={theme.colors.gray}
              />
              {errors.password && touched.password ? (
                <Text style={styles.errorText}>{errors.password}</Text>
              ) : null}
              <Pressable onPress={handleSubmit as (values: any) => void} style={styles.loginButton}>
                {loading ? (
                  <ActivityIndicator size="small" color={theme.colors.white} />
                ) : (
                  <Text style={styles.buttonText}>Login</Text>
                )}
              </Pressable>
            </View>
          )}
        </Formik>
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
