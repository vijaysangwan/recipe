import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Slider from "react-native-slider";
import { colors } from "../Constant";

const CustomSlider = ({ cookingTime, setCookingTime }) => {
	// const [value, setValue] = useState(20);
	return (
		<View style={{ marginVertical: 32 }}>
			<Text style={{ marginBottom: 16 }}>
				Recipe Cooking Time{" "}
				<Text
					style={{ fontWeight: "bold" }}
				>{`${cookingTime.toFixed()} minutes`}</Text>
			</Text>
			<View
				style={{
					backgroundColor: colors.COLOR_LIGHT,
					borderRadius: 6,
					paddingHorizontal: 12,
					paddingVertical: 12,
					// marginVertical: 32,
				}}
			>
				<Slider
					minimumValue={2}
					maximumValue={90}
					// value={value}
					thumbTintColor={colors.COLOR_PRIMARY}
					onValueChange={(value) => setCookingTime(value)}
				/>
			</View>
		</View>
	);
};

export default CustomSlider;

const styles = StyleSheet.create({});
