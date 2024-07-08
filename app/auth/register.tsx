import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Pressable, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { theme } from '@/constants/theme';
import { useRouter } from 'expo-router';
import { register } from '@/util/auth';

const RegisterSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  userName: Yup.string().required('Required'),
  password: Yup.string().min(6, 'Password too short!').required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'Passwords must match')
    .required('Required'),
});

const Register = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLoginClick = () => {
    router.push({ pathname: "/auth/login" } as never);
  };

  const handleRegister = async (values: { email: string, password: string, userName: string }, resetForm: any) => {
    setLoading(true);
    await register(values.email, values.password, values.userName);
    setLoading(false);
    resetForm();
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 3 / 4 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Text style={styles.title}>
          Register to <Text style={styles.titleHighlight}>PixelGenie</Text>
        </Text>
        <Formik
          initialValues={{ email: '', userName: '', password: '', confirmPassword: '' }}
          validationSchema={RegisterSchema}
          onSubmit={(values, { resetForm }) => {
            handleRegister(values, resetForm);
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
                placeholder="Username"
                onChangeText={handleChange('userName')}
                onBlur={handleBlur('userName')}
                value={values.userName}
                placeholderTextColor={theme.colors.gray}
              />
              {errors.userName && touched.userName ? (
                <Text style={styles.errorText}>{errors.userName}</Text>
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
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                secureTextEntry
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                value={values.confirmPassword}
                placeholderTextColor={theme.colors.gray}
              />
              {errors.confirmPassword && touched.confirmPassword ? (
                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
              ) : null}
              <Pressable onPress={handleSubmit as (values: any) => void} style={styles.registerButton}>
                {loading ? (
                  <ActivityIndicator size="small" color={theme.colors.white} />
                ) : (
                  <Text style={styles.buttonText}>Register</Text>
                )}
              </Pressable>
            </View>
          )}
        </Formik>
        <TouchableOpacity onPress={handleLoginClick} style={styles.loginButton}>
          <Text style={styles.buttonText}>Login</Text>
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
  registerButton: {
    padding: 15,
    borderWidth: 2,
    borderRadius: 2,
    borderColor: theme.colors.pink,
    backgroundColor: theme.colors.pink,
    marginBottom: 10,
    alignItems: 'center',
  },
  loginButton: {
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

export default Register;
