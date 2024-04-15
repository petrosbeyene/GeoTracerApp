import React from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { useLoginMutation } from '../authService';
import { saveToken, getToken } from '../../../utils/authToken';

// Validation schema
const SignInSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const SignInScreen: React.FC = () => {
  const [login, { isLoading, isError, error }] = useLoginMutation();
  const navigation = useNavigation();

  const handleFormSubmit = async (values: any) => {
    try {
      const data = await login(values).unwrap();
      if (data && data.access) {
        await saveToken(data.access);
        Alert.alert('Login Success', 'You are successfully logged in!');
        // Optional: Navigate to another screen
        // navigation.navigate('HomeScreen');
        const token = await getToken(); // Ensure you await the token
        console.log(token);
      }
    } catch (err) {
      Alert.alert('Login Failed', 'Invalid email or password');
    }
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={SignInSchema}
      onSubmit={handleFormSubmit}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

          <TextInput
            style={styles.input}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
            placeholder="Password"
            secureTextEntry
            autoCapitalize="none"
          />
          {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

          <Button onPress={() => handleSubmit()} title="Login" />
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
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 5,
  },
});

export default SignInScreen;