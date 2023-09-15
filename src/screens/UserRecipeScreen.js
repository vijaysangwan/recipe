import {
	SafeAreaView,
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import supabase from "../services/supabase";
import { FontAwesome } from "@expo/vector-icons";
import { colors } from "../Constant";

const UserRecipeScreen = ({ navigation }) => {
	const [recipeData, setRecipeData] = useState([]);
	useEffect(() => {
		const getUserRecipes = async () => {
			try {
				const { data, error } = await supabase.from("recipes").select("*");
				setRecipeData(data);
				if (error) {
					console.error("Error fetching data:", error);
				} else {
					// 'data' contains the fetched records
					console.log("Fetched data:", data);
				}
			} catch (error) {
				console.error("An error occurred:", error);
			}
		};

		getUserRecipes();
	}, []);
	return (
		<SafeAreaView style={{ marginHorizontal: 16 }}>
			<SafeAreaView style={{ flexDirection: "row", marginHorizontal: 16 }}>
				<Pressable style={{ flex: 1 }} onPress={() => navigation.goBack()}>
					<FontAwesome
						name={"arrow-circle-left"}
						size={28}
						color={colors.COLOR_PRIMARY}
					/>
				</Pressable>

				<FontAwesome name={"heart-o"} size={28} color={colors.COLOR_PRIMARY} />
			</SafeAreaView>
			<Text>UserRecipeScreen</Text>
			<RecipeCard recipeData={recipeData} navigateToUserScreen={true} />
		</SafeAreaView>
	);
};

export default UserRecipeScreen;

const styles = StyleSheet.create({});
