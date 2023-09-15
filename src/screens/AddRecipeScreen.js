import {
	StyleSheet,
	Text,
	TextInput,
	View,
	Pressable,
	SafeAreaView,
	TouchableOpacity,
	ScrollView,
	Image,
} from "react-native";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import CustomInput from "../components/CustomInput";
import supabase from "../services/supabase";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../Constant";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import CustomSlider from "../components/CustomSlider";
import CustomPicker from "../components/CustomPicker";
import { decode } from "base64-arraybuffer";
const AddRecipeScreen = ({ navigation }) => {
	// Init Local States
	const [recipeSteps, setRecipeSteps] = useState("");
	const [recipeTitle, setRecipeTitle] = useState("");
	const [cookingTime, setCookingTime] = useState(20);
	const [selectedDifficulty, setSelectedDifficulty] = useState("Easy");
	const [selectedImage, setSelectedImage] = useState(null);
	console.log(typeof cookingTime);
	console.log("selected image ", selectedImage);
	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const onSubmit = async (recipeData) => {
		// console.log({ recipeData });
		const imageUrl = await uploadImage(selectedImage);

		const { name, description, step1, step2, calories } = recipeData;
		const { error } = await supabase
			.from("recipes")
			.insert({
				name,
				description,
				cookingTime,
				difficulty: selectedDifficulty,
				step1,
				step2,
				calories,
				image: imageUrl,
			})
			.select();
		// console.log({ data });
		if (error) {
			console.log(error);
			throw new Error("Recipe could not be added");
		}
		reset();
	};

	// Image Picker

	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		console.log(result);

		if (!result.canceled) {
			console.log(result.assets[0].uri);
			setSelectedImage(result.assets[0].uri);
		}
	};

	// Upload image
	const uploadImage = async (uri) => {
		const imgUri = uri.replace("file://", "");
		try {
			// Read the image file as a base64 string
			const base64 = await FileSystem.readAsStringAsync(uri, {
				encoding: "base64",
			});
			const filePath = `recipe_images/${Date.now()}.jpg`; // Upload the base64-encoded image to Supabase storage
			const { data, error } = await supabase.storage
				.from("recipeImage") // Replace with your actual bucket name
				.upload(filePath, decode(base64), {
					contentType: "image/jpeg",
				});

			if (error) {
				console.error("Error uploading image:", error);
			} else {
				console.log("Image uploaded successfully:", data);
				return data.url; // Return the URL of the uploaded image
			}
		} catch (error) {
			console.error("Error uploading image:", error);
			throw error;
		}
	};

	// Return
	return (
		<View style={{ flex: 1, marginBottom: 60 }}>
			<SafeAreaView style={{ marginTop: 20 }}>
				<TouchableOpacity
					style={{ marginHorizontal: 16 }}
					onPress={() => navigation.goBack()}
				>
					<Ionicons
						name="arrow-back-circle-sharp"
						size={34}
						color={colors.COLOR_PRIMARY}
					/>
				</TouchableOpacity>
			</SafeAreaView>

			<View style={{ marginHorizontal: 16, flex: 1 }}>
				<Text>Recipe Form</Text>
				<ScrollView showsVerticalScrollIndicator={false}>
					<CustomInput
						placeholder={"enter recipe title"}
						name={"title"}
						control={control}
					/>
					{errors.title && (
						<Text style={{ color: "red" }}>This is required.</Text>
					)}

					<CustomInput
						placeholder={"enter recipe description"}
						name={"description"}
						control={control}
					/>

					{/* Input for recipe cooking time */}
					<CustomSlider
						cookingTime={cookingTime}
						setCookingTime={setCookingTime}
					/>
					{/* Input For Recipe Difficulty level */}
					<CustomPicker
						selectedDifficulty={selectedDifficulty}
						setSelectedDifficulty={setSelectedDifficulty}
					/>
					{/* Input For Recipe Calories  */}
					<CustomInput
						placeholder={"enter recipe calories"}
						name={"calories"}
						control={control}
					/>
					{errors.ratings && (
						<Text style={{ color: "red" }}>This is required.</Text>
					)}
					{/* Input For Recipe Steps  */}
					<Text
						style={{ alignSelf: "center", fontWeight: "bold", marginTop: 40 }}
					>
						Recipe Cooking Steps
					</Text>
					<CustomInput
						placeholder={"enter step 1 "}
						name={"step1"}
						control={control}
						label={"Step 1"}
					/>
					{errors.ratings && (
						<Text style={{ color: "red" }}>This is required.</Text>
					)}
					<CustomInput
						placeholder={"enter step 2"}
						name={"step2"}
						control={control}
						label={"Step 2"}
					/>
					{errors.ratings && (
						<Text style={{ color: "red" }}>This is required.</Text>
					)}
					<CustomInput
						placeholder={"enter step 3"}
						name={"step3"}
						control={control}
						label={"Step 3"}
					/>
					{errors.ratings && (
						<Text style={{ color: "red" }}>This is required.</Text>
					)}
					<CustomInput
						placeholder={"enter step 4"}
						name={"step4"}
						control={control}
						label={"Step 4"}
					/>
					{errors.ratings && (
						<Text style={{ color: "red" }}>This is required.</Text>
					)}

					{/* Input for recipe image  */}
					<Image
						source={{ uri: selectedImage }}
						style={{ height: 100, width: 100 }}
					/>
					<TouchableOpacity style={styles.addCta} onPress={pickImage}>
						<Text style={{ color: colors.COLOR_LIGHT, fontWeight: "bold" }}>
							Upload
						</Text>
					</TouchableOpacity>

					{/* Add Recipe Ui  */}
					<TouchableOpacity
						style={styles.addCta}
						onPress={handleSubmit(onSubmit)}
					>
						<Text style={{ color: colors.COLOR_LIGHT, fontWeight: "bold" }}>
							ADD{" "}
						</Text>
					</TouchableOpacity>
				</ScrollView>
			</View>
		</View>
	);
};

export default AddRecipeScreen;

const styles = StyleSheet.create({
	addCta: {
		backgroundColor: colors.COLOR_PRIMARY,
		width: 100,
		alignItems: "center",
		paddingVertical: 10,
		marginVertical: 6,
		borderRadius: 6,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.5,
		shadowRadius: 7,
	},
});
