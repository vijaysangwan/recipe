import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "../screens/WelcomeScreen";
import RecipeListScreen from "../screens/RecipeListScreen";
import RecipeDetailsScreen from "../screens/RecipeDetailsScreen";
import AddRecipeScreen from "../screens/AddRecipeScreen";
import LoginScreen from "../screens/LoginScreen";
import UserRecipeScreen from "../screens/UserRecipeScreen";
import UserDetailScreen from "../screens/UserDetailScreen";

const Stack = createNativeStackNavigator();
const AppNavigator = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{ headerShown: false }}>
				<Stack.Screen name="Login" component={LoginScreen} />

				<Stack.Screen name="Welcome" component={WelcomeScreen} />
				<Stack.Screen name="RecipeList" component={RecipeListScreen} />
				<Stack.Screen name="RecipeDetail" component={RecipeDetailsScreen} />
				<Stack.Screen name="AddRecipe" component={AddRecipeScreen} />
				<Stack.Screen name="UserRecipe" component={UserRecipeScreen} />
				<Stack.Screen name="UserRecipeDetail" component={UserDetailScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default AppNavigator;

const styles = StyleSheet.create({});
