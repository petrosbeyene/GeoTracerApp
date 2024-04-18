import React from 'react';
import { View, TextInput, Button, Text, Alert, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useRegisterMutation } from '../authService';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types';

type SignUpNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SignUp'>;


const SignUpSchema = Yup.object().shape({
  username: Yup.string()
    .matches(/^[a-zA-Z0-9_\.]*$/, 'Only alphanumeric characters, underscores, and periods are allowed in your username.')
    .required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password1: Yup.string().required('Password is required'),
  password2: Yup.string()
    .oneOf([Yup.ref('password1'), null as any], 'Passwords must match')
    .required('Password confirmation is required'),
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
});

const SignUpScreen: React.FC = () => {
    const [register, { isLoading, isSuccess, isError, error }] = useRegisterMutation();
    const navigation = useNavigation<SignUpNavigationProp>();

    const handleFormSubmit = async (values: any) => {
        try {
          await register({
            username: values.username,
            email: values.email,
            password1: values.password1,
            password2: values.password2,
            first_name: values.firstName,
            last_name: values.lastName,
          }).unwrap();
          Alert.alert('Success', 'You have registered successfully, and verification email is sent to your inbox!');
          // navigation.navigate('SignIn');
          console.log(values)
        } catch (err) {
          Alert.alert('Error', 'Failed to register: ' + err);
          console.log(err)
        }
    };
    return (
    <Formik
        initialValues={{ username: '', email: '', password1: '', password2: '', firstName: '', lastName: '' }}
        validationSchema={SignUpSchema}
        onSubmit={handleFormSubmit}
    >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={styles.container}>
            <TextInput style={styles.input}
            onChangeText={handleChange('username')}
            onBlur={handleBlur('username')}
            value={values.username}
            placeholder="Username"
            />
            {touched.username && errors.username && <Text style={styles.errorText}>{errors.username}</Text>}

            <TextInput style={styles.input}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
            placeholder="Email"
            keyboardType="email-address"
            />
            {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

            <TextInput style={styles.input}
            onChangeText={handleChange('password1')}
            onBlur={handleBlur('password1')}
            value={values.password1}
            placeholder="Password"
            secureTextEntry
            />
            {touched.password1 && errors.password1 && <Text style={styles.errorText}>{errors.password1}</Text>}

            <TextInput style={styles.input}
            onChangeText={handleChange('password2')}
            onBlur={handleBlur('password2')}
            value={values.password2}
            placeholder="Confirm Password"
            secureTextEntry
            />
            {touched.password2 && errors.password2 && <Text style={styles.errorText}>{errors.password2}</Text>}

            <TextInput style={styles.input}
            onChangeText={handleChange('firstName')}
            onBlur={handleBlur('firstName')}
            value={values.firstName}
            placeholder="First Name"
            />
            {touched.firstName && errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}

            <TextInput style={styles.input}
            onChangeText={handleChange('lastName')}
            onBlur={handleBlur('lastName')}
            value={values.lastName}
            placeholder="Last Name"
            />
            {touched.lastName && errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}
            <Button onPress={() => handleSubmit()} title="Sign Up" />
        </View>
        )}
    </Formik>
    )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
  },
  errorText: {
    color: 'red',
    marginBottom: 5,
  },
});

export default SignUpScreen;