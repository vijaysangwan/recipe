import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	Pressable,
	Image,
	ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import supabase from "../services/supabase";
import { FontAwesome } from "@expo/vector-icons";
const UserDetailScreen = ({ route, navigation }) => {
	const [recipeDetail, setRecipeDetail] = useState([]);
	const { item } = route.params;
	// console.log({ recipeDetail });
	// console.log(item);
	useEffect(() => {
		const getUserRecipes = async () => {
			try {
				const { data, error } = await supabase
					.from("recipes")
					.select("*")
					.eq("id", item.id);

				setRecipeDetail(data);
				if (error) {
					console.error("Error fetching data:", error);
				} else {
					// 'data' contains the fetched records
					console.log("Fetched data from supabase:", data);
				}
			} catch (error) {
				console.error("An error occurred:", error);
			}
		};

		getUserRecipes();
	}, []);
	return (
		<View style={{ backgroundColor: item.color, flex: 1 }}>
			<SafeAreaView style={{ flexDirection: "row", marginHorizontal: 16 }}>
				<Pressable style={{ flex: 1 }} onPress={() => navigation.goBack()}>
					<FontAwesome name={"arrow-circle-left"} size={28} color="white" />
				</Pressable>

				<FontAwesome name={"heart-o"} size={28} color="white" />
			</SafeAreaView>
			{recipeDetail.map((recipe) => {
				console.log("rceipe is ", recipe);
				return (
					<View
						style={{
							backgroundColor: "#fff",
							flex: 1,
							marginTop: 140,
							borderTopLeftRadius: 56,
							borderTopRightRadius: 56,
							alignItems: "center",
							paddingHorizontal: 16,
						}}
					>
						<View
							style={{
								// backgroundColor: "red",
								height: 300,
								width: 300,
								position: "absolute",
								top: -150,
								// marginBottom: 130,
							}}
						>
							<Image
								source={item.image}
								style={{
									width: "100%",
									height: "100%",
									resizeMode: "contain",
								}}
							/>
						</View>

						{/* Recipe Name */}
						<Text style={{ marginTop: 150, fontSize: 28, fontWeight: "bold" }}>
							{recipe.name}
						</Text>

						<View style={{ flex: 1 }}>
							<ScrollView showsVerticalScrollIndicator={false}>
								{/* Recipe Description */}
								<Text style={{ fontSize: 20, marginVertical: 16 }}>
									{recipe.description}
								</Text>

								{/* Recipe Extra Details */}

								<View
									style={{
										flexDirection: "row",
										justifyContent: "space-between",
										// width: "100%",
										// backgroundColor: "green",
									}}
								>
									<View
										style={{
											backgroundColor: "rgba(255, 0, 0, 0.38)",
											// paddingHorizontal: 16,
											paddingVertical: 26,
											borderRadius: 8,
											alignItems: "center",
											width: 100,
										}}
									>
										<Text style={{ fontSize: 40 }}>⏰</Text>
										<Text style={{ fontSize: 20, fontWeight: 400 }}>
											{`${recipe.cookingTime.toFixed()} mins`}
										</Text>
									</View>
									<View
										style={{
											backgroundColor: "rgba(135, 206, 235, 0.8)",
											// paddingHorizontal: 16,
											paddingVertical: 26,
											borderRadius: 8,
											alignItems: "center",
											width: 100,
											// marginHorizontal: 24,
										}}
									>
										<Text style={{ fontSize: 40 }}>🥣</Text>
										<Text style={{ fontSize: 20, fontWeight: 400 }}>
											{recipe.difficulty}
										</Text>
									</View>
									<View
										style={{
											backgroundColor: "rgba(255, 165, 0, 0.48)",
											// paddingHorizontal: 16,
											paddingVertical: 26,
											borderRadius: 8,
											alignItems: "center",
											width: 100,
										}}
									>
										<Text style={{ fontSize: 40 }}>🔥</Text>
										<Text style={{ fontSize: 20, fontWeight: 400 }}>
											{`${recipe.calories} cal`}
										</Text>
									</View>
								</View>

								{/* Recipe Ingredients  */}

								<View style={{ alignSelf: "flex-start", marginVertical: 22 }}>
									<Text
										style={{ fontSize: 22, fontWeight: "600", marginBottom: 6 }}
									>
										Ingredients:
									</Text>

									{recipeDetail?.ingredients?.map((ingredient, index) => {
										return (
											<View
												style={{
													flexDirection: "row",
													alignItems: "center",
													marginVertical: 4,
												}}
												key={index}
											>
												<View
													style={{
														backgroundColor: "red",
														height: 10,
														width: 10,
														borderRadius: 5,
													}}
												></View>
												<Text style={{ fontSize: 18, marginLeft: 6 }}>
													{ingredient}
												</Text>
											</View>
										);
									})}
								</View>

								{/* Recipe Steps */}

								<View style={{ alignSelf: "flex-start", marginVertical: 22 }}>
									<Text
										style={{ fontSize: 22, fontWeight: "600", marginBottom: 6 }}
									>
										Steps:
									</Text>
									<Text
										style={{
											fontSize: 18,
											marginLeft: 6,
											marginVertical: 6,
										}}
									>
										{` 1) ${recipe.step1}`}
									</Text>
									<Text
										style={{
											fontSize: 18,
											marginLeft: 6,
											marginVertical: 6,
										}}
									>
										{` 2) ${recipe.step2}`}
									</Text>
								</View>
							</ScrollView>
						</View>
					</View>
				);
			})}
		</View>
	);
};

export default UserDetailScreen;

const styles = StyleSheet.create({});
