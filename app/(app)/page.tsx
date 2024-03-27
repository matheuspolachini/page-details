"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  url: z.string().min(1, { message: "Enter a URL" }),
});

export default function Page() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    router.push(`/${values.url}`);
  }

  return (
    <div className="h-screen w-screen bg-gray-100">
      <main
        className="al container flex min-h-screen flex-col items-center
      pt-72"
      >
        <h1 className="text-3xl font-bold">Get information about a web page</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full max-w-3xl"
          >
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">URL</FormLabel>
                  <FormControl>
                    <Input
                      autoFocus={true}
                      placeholder="Start typing..."
                      className="mt-5 w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="sr-only">
                    Display info about a URL
                  </FormDescription>
                  <FormMessage className="sr-only" />
                </FormItem>
              )}
            />
            <Button type="submit" className="mx-auto mt-10 block" size="lg">
              Search
            </Button>
          </form>
        </Form>
      </main>
    </div>
  );
}
