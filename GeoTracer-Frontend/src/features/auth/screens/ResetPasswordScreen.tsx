import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { useConfirmPasswordResetMutation } from '../authService';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types';


type ResetPasswordParamList = {
  ResetPassword: {
    uidb64: string;
    token: string;
  };
};

type ResetPasswordNavigationProp = NativeStackNavigationProp<RootStackParamList, 'EmailVerification'>;

const ResetPasswordScreen: React.FC = () => {
  const route = useRoute<RouteProp<ResetPasswordParamList, 'ResetPassword'>>();
  const navigation = useNavigation<ResetPasswordNavigationProp>();
  const { uidb64, token } = route.params;
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [confirmPasswordReset, { isLoading, isError, error }] = useConfirmPasswordResetMutation();


//   console.log("UserId and Token Recieved", uidb64, token)
  const handleSubmit = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }
    try {
        console.log("UserId and Token Received", uidb64, token);
        const response = await confirmPasswordReset({ 
          uid: uidb64, 
          token, 
          new_password1: newPassword, 
          new_password2: confirmPassword 
        }).unwrap();
      
        console.log('Success response:', response);
        Alert.alert("Success", "Password reset successful!");
        navigation.navigate('SignIn');
      } catch (err) {
        console.log('Error response:', err);
        Alert.alert("Error", "Password reset failed!");
        console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Your Password</Text>
      {isError && <Text style={styles.error}>{(error as any)?.data?.message || 'An error occurred'}</Text>}
      <TextInput
        style={styles.input}
        secureTextEntry
        placeholder="New Password"
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <TextInput
        style={styles.input}
        secureTextEntry
        placeholder="Confirm New Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <Button
        title="Reset Password"
        onPress={handleSubmit}
        disabled={isLoading}
        color="#007bff"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    width: '100%',
    marginBottom: 20,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  }
});

export default ResetPasswordScreen;