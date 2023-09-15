import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { Controller } from "react-hook-form";
import { colors } from "../Constant";

const CustomInput = ({ placeholder, control, name, label }) => {
	return (
		<View style={{ marginVertical: 10 }}>
			<Controller
				control={control}
				rules={
					{
						// required: true,
					}
				}
				name={name}
				render={({ field: { onChange, onBlur, value } }) => (
					<View>
						{label ? <Text> {label}</Text> : null}

						<TextInput
							value={value}
							placeholder={placeholder}
							onChangeText={onChange}
							onBlur={onBlur}
							style={styles.inputContainer}
							// keyboardType={name === "calories" ? "numeric" : "default"}
							// keyboardType="ph"
						/>
					</View>
				)}
			/>
		</View>
	);
};

export default CustomInput;

const styles = StyleSheet.create({
	inputContainer: {
		borderWidth: 1,
		borderColor: colors.COLOR_PRIMARY,
		paddingVertical: 10,
		paddingHorizontal: 8,
		borderRadius: 4,
		fontSize: 18,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.1,
		shadowRadius: 7,
	},
});
