import {
	StyleSheet,
	View,
	Text,
	SafeAreaView,
	ScrollView,
	Pressable,
	TouchableOpacity,
} from "react-native";
import React from "react";
import Header from "../components/Header";
import SearchFilter from "../components/SearchFilter";
import CategoriesFilter from "../components/CategoriesFilter";
import RecipeCard from "../components/RecipeCard";
import { colors, recipeList } from "../Constant";

const RecipeListScreen = ({ navigation, route }) => {
	const { userEmail } = route.params;
	const userName = userEmail.split("@")[0];
	return (
		<SafeAreaView style={{ flex: 1, marginHorizontal: 16 }}>
			{/* render header */}
			<Header headerText={`hi, ${userName}`} headerIcon={"bell-o"} />

			{/* Search Filter */}
			<SearchFilter icon="search" placeholder={"enter your fav recipe"} />

			{/* Categories filter */}

			<View style={{ marginTop: 22 }}>
				<Text style={{ fontSize: 22, fontWeight: "bold" }}>Categories</Text>
				{/* Categories list */}
				<CategoriesFilter />
			</View>

			{/* Recipe List Filter */}

			<View style={{ marginTop: 22, flex: 1 }}>
				<View style={{ flexDirection: "row" }}>
					<Text style={{ fontSize: 22, fontWeight: "bold", flex: 1 }}>
						Recipes
					</Text>
					<Pressable onPress={() => navigation.navigate("AddRecipe")}>
						<Text style={{ fontSize: 22, fontWeight: "bold" }}>Add Recipe</Text>
					</Pressable>
				</View>
				{/* Recipes list */}

				<RecipeCard recipeData={recipeList} />
			</View>
			<TouchableOpacity
				onPress={() => navigation.navigate("UserRecipe")}
				style={{
					marginTop: 30,
					backgroundColor: colors.COLOR_PRIMARY,
					paddingHorizontal: 10,
					paddingVertical: 12,
					borderRadius: 6,
				}}
			>
				<Text>View More Recipes</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
};

export default RecipeListScreen;

const styles = StyleSheet.create({});
