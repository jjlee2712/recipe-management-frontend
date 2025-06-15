"use client";

import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

const fetchRecipes = async () => {
  console.log("fetching recipes");
  const res = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s="
  );
  const data = await res.json();
  return data.meals;
};

export function RecipeCard() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["recipes"],
    queryFn: fetchRecipes,
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
