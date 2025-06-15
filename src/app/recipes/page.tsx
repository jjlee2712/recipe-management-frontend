import { RecipeCard } from "@/components/ui/recipe-card";
import { useQuery } from "@tanstack/react-query";
import { Search } from "./search";
export default function Page() {
  return (
    <div>
      <Search />
      <RecipeCard />
    </div>
  );
}
