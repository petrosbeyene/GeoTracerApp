export type RootStackParamList = {
    HomeScreen: undefined;
    SignIn: undefined;
    SignUp: undefined;
    EmailVerification: undefined;
    PasswordResetRequest: undefined;
    PasswordResetConfirm: undefined;
    LocationTracker: undefined;
};

export interface LocationCoords {
    latitude: number,
    longitude: number,
    accuracy: number | null;
    altitude: number | null;
    speed: number | null;
    heading: number | null;
    timestamp: string;
}