import styled from "styled-components/native";
import { TextInput, TouchableOpacity } from "react-native";

export const StyledWrapper = styled.View`
  padding: 20px;
  background-color: #111;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const FormBox = styled.View`
  background-color: #111;
  border-radius: 5px;
  border: 2px solid #fefefe;
  padding: 20px;
  width: 280px;
  gap: 20px;
`;

export const ToggleRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

export const StyledInput = styled.TextInput`
  width: 100%;
  height: 40px;
  border-radius: 5px;
  border: 2px solid #fefefe;
  background-color: #111;
  color: #fefefe;
  font-size: 15px;
  font-weight: 600;
  padding: 5px 10px;
`;

export const ConfirmButton = styled.TouchableOpacity`
  margin-top: 20px;
  align-self: center;
  width: 120px;
  height: 40px;
  border-radius: 5px;
  border: 2px solid #fefefe;
  background-color: #111;
  align-items: center;
  justify-content: center;
`;

export const ConfirmText = styled.Text`
  font-size: 17px;
  font-weight: 600;
  color: #fefefe;
`;

export const StyledError = styled.Text`
  color: #ff4d4d;
  margin-top: 10px;
  font-weight: 500;
  text-align: center;
`;
