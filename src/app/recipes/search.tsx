"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dropdown } from "@/components/ui/dropdown";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function Search() {
  const [category, setCategory] = useState();
  const [area, setArea] = useState();
  const router = useRouter();

  return (
    <form
      method="GET"
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const searchParams = new URLSearchParams();
        for (const [key, value] of formData.entries()) {
          searchParams.append(key, value.toString());
        }
        const url = new URL(window.location.href);
        url.search = searchParams.toString();
        router.push(url.toString());
      }}
    >
      <div className="mx-4 grid grid-cols-4 gap-x-4">
        <div className="grid gap-y-2">
          <Label htmlFor="s">Meal Name</Label>
          <Input name="s" />
        </div>
        <div>
          <Dropdown
            label="Category"
            name="c"
            apiEndpoint="https://www.themealdb.com/api/json/v1/1/list.php?c=list"
            value={category ?? ""}
            getKey={(item) => item.strCategory}
            getLabel={(item) => item.strCategory}
          />
        </div>
        <div>
          <Dropdown
            label="Area"
            name="a"
            apiEndpoint="https://www.themealdb.com/api/json/v1/1/list.php?a=list"
            value={area ?? ""}
            getKey={(item) => item.strArea}
            getLabel={(item) => item.strArea}
          />
        </div>
        {/* <div>
          <Dropdown
            label="Ingredients"
            name="i"
            apiEndpoint="https://www.themealdb.com/api/json/v1/1/list.php?i=list"
            value={category ?? ""}
            getKey={(item) => item.strIngredient}
            getLabel={(item) => item.strIngredient}
          />
        </div> */}
      </div>
      <div className="mx-4 mt-2 flex justify-start">
        <Button type="submit">Search</Button>
      </div>
    </form>
  );
}
