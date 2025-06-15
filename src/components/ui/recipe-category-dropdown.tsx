"use client";

import { useQuery } from "@tanstack/react-query";
import { Input } from "./input";
import { Label } from "./label";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./select";

const fetchCategory = async () => {
  const res = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );
  const data = await res.json();
  console.log(data.categories);
  return data.categories;
};
export function RecipeCategoryDropdown() {
  const [category, setCategory] = useState("");
  const { data, error, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategory,
  });

  return (
    <div className="grid gap-2">
      <Select>
        <Label htmlFor="category">Category</Label>
        <SelectTrigger className="w-full bg-white">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Category</SelectLabel>
            {data?.map((categories: any) => (
              <div key={categories.strCategory}>
                <SelectItem
                  value={categories.strCategory ?? ""}
                  onClick={() => {
                    setCategory(categories.strCategory);
                  }}
                >
                  {categories.strCategory}
                </SelectItem>
              </div>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
