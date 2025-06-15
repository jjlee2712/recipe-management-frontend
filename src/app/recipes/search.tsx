"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RecipeCategoryDropdown } from "@/components/ui/recipe-category-dropdown";

export function Search() {
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
        console.log(searchParams.toString());
      }}
    >
      <div className="mx-4 grid grid-cols-4 gap-x-4">
        <div className="grid gap-y-2">
          <Label htmlFor="s">Meal Name</Label>
          <Input name="s" />
        </div>
        <div>
          <RecipeCategoryDropdown />
        </div>
      </div>
      <div className="mx-4 mt-2 flex justify-start">
        <Button type="submit">Search</Button>
      </div>
    </form>
  );
}
