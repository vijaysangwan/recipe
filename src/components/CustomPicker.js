import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";

const CustomPicker = ({ selectedDifficulty, setSelectedDifficulty }) => {
	return (
		<View>
			<Text>
				Select Your Recipe Difficulty Level{" "}
				<Text style={{ fontWeight: "bold" }}>{selectedDifficulty}</Text>
			</Text>
			<Picker
				selectedValue={selectedDifficulty}
				onValueChange={(itemValue, itemIndex) =>
					setSelectedDifficulty(itemValue)
				}
			>
				<Picker.Item label="Easy" value="Easy" />
				<Picker.Item label="Medium" value="Medium" />
				<Picker.Item label="Hard" value="Hard" />
			</Picker>
		</View>
	);
};

export default CustomPicker;

const styles = StyleSheet.create({});
