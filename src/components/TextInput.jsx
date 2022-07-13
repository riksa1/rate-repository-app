import { TextInput as NativeTextInput } from "react-native";

const TextInput = ({ style, ...props }) => {
  const textInputStyle = [style];

  return <NativeTextInput style={[textInputStyle, { height: 50 }]} {...props} />;
};

export default TextInput;
