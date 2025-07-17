import React, { useState } from "react";
import {
  Text,
  ActivityIndicator,
  Switch,
} from "react-native";
import {
    StyledWrapper,
    FormBox,
    ToggleRow,
    StyledInput,
    ConfirmButton,
    ConfirmText,
    StyledError,
  } from "./LoginScreen.styles";
import { auth } from "../../firebase/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const LoginScreen = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // user auth 
  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err: any) {
      setError(err.message.replace("Firebase: ", ""));
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledWrapper>
      <FormBox>
        <ToggleRow>
          <Text style={{ fontSize: 18, fontWeight: "600", color: "#fefefe" }}>
            {isSignup ? "Sign up" : "Log in"}
          </Text>
          <Text style={{ fontSize: 20, fontWeight: "600", color: "#fefefe"}}>Mile Man🏃‍♂️</Text>
          <Switch value={isSignup} onValueChange={setIsSignup} />
        </ToggleRow>

        {isSignup && (
          <StyledInput
            placeholder="Name"
            placeholderTextColor="#7e7e7e"
            value={name}
            onChangeText={setName}
          />
        )}
        <StyledInput
          placeholder="Email"
          placeholderTextColor="#7e7e7e"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <StyledInput
          placeholder="Password"
          placeholderTextColor="#7e7e7e"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {error ? <StyledError>{error}</StyledError> : null}

        <ConfirmButton onPress={handleSubmit} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <ConfirmText>{isSignup ? "Confirm" : "Let's go →"}</ConfirmText>
          )}
        </ConfirmButton>
      </FormBox>
    </StyledWrapper>
  );
};

export default LoginScreen;
