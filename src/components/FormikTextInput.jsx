import { StyleSheet, View } from "react-native";
import { useField } from "formik";
import theme from "../theme";

import TextInput from "./TextInput";
import Text from "./Text";

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  errorText: {
    color: theme.colors.error,
    marginLeft: 10,
  },
});

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <View style={{ marginVertical: 10 }}>
      <TextInput
        onChangeText={(value) => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        {...props}
        style={[styles.input, { borderColor: showError ? theme.colors.error : "gray" }]}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </View>
  );
};

export default FormikTextInput;
