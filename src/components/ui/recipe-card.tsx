"use client";

import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

const fetchRecipes = async ({
  mealName,
  category,
}: {
  mealName: string;
  category: string;
}) => {
  const url = new URL("https://www.themealdb.com/api/json/v1/1/search.php");
  url.searchParams.set("s", mealName);
  url.searchParams.set("c", category);

  const res = await fetch(url.toString());
  const data = await res.json();
  return data.meals;
};

export function RecipeCard() {
  const searchParams = useSearchParams();
  const mealName = searchParams.get("s") ?? "";
  const category = searchParams.get("c") ?? "";

  const { data, error, isLoading } = useQuery({
    queryKey: ["recipes", mealName, category],
    queryFn: () => fetchRecipes({ mealName, category }),
  });

  return (
    <div className="flex flex-wrap">
      {data?.map((recipe: any) => (
        <div key={recipe.idMeal} className="m-4">
          <Card>
            <CardHeader>
              <CardTitle>{recipe.strMeal}</CardTitle>
              <CardDescription>{recipe.strCategory}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
              <Image
                className="rounded-sm"
                src={recipe.strMealThumb}
                alt="recipe"
                width={200}
                height={200}
                key={recipe.idMeal}
              ></Image>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}
