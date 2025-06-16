"use client";

import { useQuery } from "@tanstack/react-query";
import { Label } from "./label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

type Props = {
  label?: string;
  name: string;
  apiEndpoint: string;
  value: string;
  onChange?: (value: string) => void;
  getKey: (item: any) => string;
  getLabel: (item: any) => string;
};

const fetchCategory = async ({ apiEndpoint }: { apiEndpoint: string }) => {
  const res = await fetch(apiEndpoint);
  const data = await res.json();
  return data.meals;
};

export function Dropdown({
  label,
  name,
  apiEndpoint,
  value,
  onChange,
  getKey,
  getLabel,
}: Props) {
  const { data, error, isLoading } = useQuery({
    queryKey: [apiEndpoint],
    queryFn: () => fetchCategory({ apiEndpoint }),
  });

  return (
    <div className="grid gap-2">
      <Select name={name} value={getKey(value)} onValueChange={onChange}>
        <Label htmlFor="category">{label}</Label>
        <SelectTrigger className="w-full bg-white">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <div key={getKey(value)}>
              {data?.map((value: any) => (
                <SelectItem key={getKey(value)} value={getKey(value)}>
                  {getLabel(value)}
                </SelectItem>
              ))}
            </div>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
