"use client";

import { useState } from "react";
import * as z from "zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { basePromptOptions, formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const MetadataPage = () => {
  const router = useRouter();
  const [messages, setMessages] = useState<any[]>([]);
  const [formattedMessages, setFormattedMessages] = useState<any[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    // resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    // TODO: Add logic to select base prompt
    // const basePrompt = basePromptOptions.find((bp) => bp.label === "Default");
    // console.log(basePrompt);

    try {
      const userInput: any = {
        role: "user",
        content: data.prompt,
      };

      const newMessages = [...messages, userInput];

      const response = await axios.post("/api/metadata", {
        messages: newMessages,
      });

      setMessages((current) => [...current, userInput, response.data]);

      form.reset();
    } catch (error) {
      // TODO: Open pro modal
      console.log("\n** [Metadata page error] **\n\n", error);
    } finally {
      router.refresh();
    }
  };

  return (
    <section className="">
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2">
            <Button
              className="col-span-12 lg:col-span-2 w-full"
              disabled={isLoading}>
              {isLoading ? "Loading..." : "Generate"}
            </Button>
            <FormField
              name="prompt"
              // control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-10">
                  <FormControl>
                    <Input
                      className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                      disabled={isLoading}
                      placeholder="Enter the prompt"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
      <div>
        <div className="flex">
          {messages.map(
            (message, index) =>
              message.role !== "user" && (
                <div key={index} className="flex flex-col">
                  <p className="text-gray-800">{message.content}</p>
                </div>
              )
          )}
        </div>
      </div>
    </section>
  );
};

export default MetadataPage;
