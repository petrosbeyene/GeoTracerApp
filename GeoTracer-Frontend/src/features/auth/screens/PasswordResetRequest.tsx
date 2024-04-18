import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { usePasswordResetMutation } from '../authService';

const PasswordResetRequest: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [passwordReset, { isSuccess, isError, isLoading, error }] = usePasswordResetMutation();

    const handleSubmit = () => {
        passwordReset({ email });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Password Reset Request</Text>
            {isSuccess && (
                <Text style={styles.successAlert}>
                    If an account with the provided email exists, you will receive a password reset email shortly.
                </Text>
            )}
            {isError && <Text style={styles.failureAlert}>{'An error occurred'}</Text>}
            <TextInput
                style={styles.input}
                onChangeText={setEmail}
                value={email}
                placeholder="Enter email"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
            />
            <Button
                onPress={handleSubmit}
                title={isLoading ? 'Sending...' : 'Submit'}
                color="#007bff"
                disabled={isLoading}
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
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        width: '100%',
        marginBottom: 20,
    },
    successAlert: {
        color: 'green',
    },
    failureAlert: {
        color: 'red',
    }
});

export default PasswordResetRequest;
