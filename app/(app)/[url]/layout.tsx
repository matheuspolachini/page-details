"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const params = useParams<{ url: string }>();

  const onInputChange = useDebouncedCallback((newValue: string) => {
    router.push(`/${newValue}`);
  }, 600);

  return (
    <main className="mx-auto max-w-5xl py-2">
      <div className="flex items-center justify-center gap-3">
        <Input
          type="text"
          defaultValue={params.url}
          onChange={(e) => onInputChange(e.target.value)}
          className="h-9 max-w-xl"
          autoFocus
        />
        <Button className="" size={"sm"}>
          Search
        </Button>
      </div>
      {children}
    </main>
  );
}
