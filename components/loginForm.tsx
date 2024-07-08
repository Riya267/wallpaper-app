import React, { useContext, useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { theme } from '@/constants/theme';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Password too short!').required('Required'),
});

interface LoginFormProps {
  handleLogin: (values: { email: string; password: string }) => {};
  isLoading: boolean;
}

const LoginForm = ({ handleLogin, isLoading }: LoginFormProps) => {
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={LoginSchema}
      onSubmit={(values) => {
        handleLogin(values);
      }}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
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
          <Pressable
            onPress={handleSubmit as (values: any) => void}
            style={styles.loginButton}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color={theme.colors.white} />
            ) : (
              <Text style={styles.buttonText}>Login</Text>
            )}
          </Pressable>
        </View>
      )}
    </Formik>
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

export default LoginForm;
