"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2 } from "lucide-react";

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Set search query from URL params (if any)
  useEffect(() => {
    const query = searchParams.get("q") || "";
    setSearchQuery(query);
  }, [searchParams]);

  // Handle the search and clear query functionality
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (!query.trim()) {
      // If search query is empty, clear the URL search params and restore products
      startTransition(() => {
        router.push(pathname); // Push to the current pathname without query params
      });
    } else {
      // If search query is valid, update the URL with the new search query
      startTransition(() => {
        router.push(`${pathname}?q=${encodeURIComponent(query.trim())}`);
      });
    }
  };

  return (
    <div className="relative flex items-center w-full max-w-md">
      <Input
        type="search"
        placeholder="Search products..."
        value={searchQuery}
        onChange={handleSearch}
        className="pr-10"
      />
      <Button
        type="button"
        size="icon"
        variant="ghost"
        className="absolute right-0 top-0 h-full"
        disabled={isPending}
      >
        {isPending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Search className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}
