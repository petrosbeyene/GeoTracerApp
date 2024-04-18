import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import * as Linking from 'expo-linking';
import { useVerifyEmailMutation } from '../authService';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types';
import { useBetterURL } from '../../../hooks/useBetterURL';

type EmailVerificaitonNavigationProp = NativeStackNavigationProp<RootStackParamList, 'EmailVerification'>;

const EmailVerification: React.FC = () => {
    const navigation = useNavigation<EmailVerificaitonNavigationProp>();
    const [verifyEmail, { isLoading, isSuccess, isError }] = useVerifyEmailMutation();
    const url = useBetterURL();
    
    useEffect(() => {
        if (url) {
            let data = Linking.parse(url as any);
            console.log("Parsed link data:", data);
            if (data.path === 'confirm-email' && data.queryParams?.token) {
                console.log("Token received:", data.queryParams.token);
                verifyEmail(data.queryParams.token)
                .unwrap()
                .then((response) => console.log('Success response:', response.status))
                .catch((error) => console.log('Error response:', error));
            }
        }
        else {
            console.log(url)
        }
    }, [url]);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {isLoading && <Text>Verifying your email...</Text>}
            {isSuccess && (
                <>
                    <Text>Email verified successfully!</Text>
                    <Button title="Go to Login" onPress={() => navigation.navigate('SignIn')} />
                </>
            )}
            {isError && <Text>Failed to verify email. Please try again or contact support.</Text>}
        </View>
    );
};

export default EmailVerification;