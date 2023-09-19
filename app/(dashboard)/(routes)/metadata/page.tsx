"use client";

import { useState } from "react";
import * as z from "zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { basePromptOptions, metadataFormSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Loader, BadgeInfo, Bot } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const MetadataPage = () => {
  const router = useRouter();
  const [messages, setMessages] = useState<any[]>([]);
  const [formattedMessages, setFormattedMessages] = useState<any[]>([]);

  const form = useForm<z.infer<typeof metadataFormSchema>>({
    // TODO: Determine if zod resolver is needed. Currently, that application doesn't work with it.
    // resolver: zodResolver(metadataFormSchema),
    defaultValues: {
      prompt: "",
      template: "",
      keywordOne: "",
      keywordTwo: "",
      keywordThree: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (data: z.infer<typeof metadataFormSchema>) => {
    const basePrompt = basePromptOptions.find((bp) => bp.label === "Default");

    // TODO: add an alert for each error
    if (!basePrompt) return;

    const keywordOne = data.keywordOne
      ? "The primary keyword is " + data.keywordOne + ".\n"
      : "";

    const keywordTwo = data.keywordTwo
      ? "The secondary keyword is " + data.keywordTwo + ".\n"
      : "";

    const keywordThree = data.keywordThree ? data.keywordThree + ".\n" : "";

    const finalPrompt =
      basePrompt.value + keywordOne + keywordTwo + keywordThree;

    try {
      const userInput: any = {
        role: "user",
        content: finalPrompt,
      };

      const newMessages = [...messages, userInput];

      const response = await axios.post("/api/metadata", {
        messages: newMessages,
      });

      setMessages((current) => [...current, userInput, response.data]);
      console.log("response", response.data.content);
      setFormattedMessages(eval(response.data.content));
      form.reset();
    } catch (error) {
      // TODO: Open pro modal
      console.log("\n** [Metadata page error] **\n\n", error);
    } finally {
      router.refresh();
    }
  };

  // console.log(formattedMessages.map((message) => message));

  return (
    <section className="flex w-full h-full flex-col text-purple-lightestPurple mt-24 px-6 items-center">
      <div className="flex flex-col max-w-screen-xl w-full">
        <TooltipProvider>
          <div className="flex flex-row items-center w-full">
            <div className="w-6/12">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="rounded-lg border w-full p-4 px-3 md:px-6 bg-purple-midPurple border-none">
                  <div className="flex flex-col sm:w-full">
                    <div className="flex justify-between flex-row-reverse">
                      <Button
                        className="w-1/5 mt-6 hover:shadow-md"
                        variant="purplePrimary"
                        size="lg"
                        disabled={isLoading}>
                        {isLoading ? <Loader /> : "Generate"}
                      </Button>
                      <FormField
                        name="template"
                        render={({ field }) => (
                          <FormItem className="col-span-12 lg:col-span-2">
                            <Tooltip>
                              <TooltipTrigger>
                                <FormLabel className="flex items-center">
                                  Template
                                  <BadgeInfo className="w-3.5 ml-1" />
                                </FormLabel>
                              </TooltipTrigger>
                              <TooltipContent className="w-96">
                                <p>
                                  Choose a template to help the model generate
                                  responses that have been engineered to be more
                                  relevant to each use case.
                                </p>
                              </TooltipContent>
                            </Tooltip>
                            <Select
                              {...field}
                              disabled={isLoading}
                              onValueChange={field.onChange}
                              value={field.value}
                              defaultValue={field.value}>
                              <FormControl className="bg-purple-dark border-none text-purple-lightestPurple focus-visible:border-none">
                                <SelectTrigger className="w-full">
                                  <SelectValue
                                    defaultValue={"Default" || field.value}
                                  />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="w-full bg-purple-dark border-none text-purple-lightestPurple focus-visible:border-none">
                                {basePromptOptions.map((option, index) => (
                                  <SelectItem
                                    key={index}
                                    value={option.value}
                                    className="bg-purple-dark border-none text-purple-lightestPurple focus-visible:border-none">
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex w-full justify-between flex-col sm:flex-row grid-cols-3 gap-3 mt-4">
                      <FormField
                        name="keywordOne"
                        render={({ field }) => (
                          <FormItem className="w-full sm:w-52">
                            <Tooltip>
                              <TooltipTrigger>
                                <FormLabel className="flex items-center">
                                  Primary Keyword
                                  <BadgeInfo className="w-3.5 ml-1" />
                                </FormLabel>
                              </TooltipTrigger>
                              <TooltipContent className="w-96">
                                <p>
                                  Add a keyword to help the model generate more
                                  relevant suggestions.
                                </p>
                              </TooltipContent>
                            </Tooltip>
                            <FormControl>
                              <Input
                                className="focus-visible:ring-0 focus-visible:ring-transparent bg-purple-dark border-none text-purple-lightestPurple focus-visible:border-none"
                                disabled={isLoading}
                                placeholder="data collection"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        name="keywordTwo"
                        render={({ field }) => (
                          <FormItem className="w-full sm:w-52">
                            <Tooltip>
                              <TooltipTrigger>
                                <FormLabel className="flex items-center">
                                  Secondary Keyword
                                  <BadgeInfo className="w-3.5 ml-1" />
                                </FormLabel>
                              </TooltipTrigger>
                              <TooltipContent className="w-96">
                                <p>
                                  This will help the model generate more
                                  relevant suggestions as well but not as
                                  important as the primary keyword.
                                </p>
                              </TooltipContent>
                            </Tooltip>
                            <FormControl>
                              <Input
                                className="focus-visible:ring-0 focus-visible:ring-transparent bg-purple-dark border-none text-purple-lightestPurple focus-visible:border-none"
                                disabled={isLoading}
                                placeholder="collecting data"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        name="keywordThree"
                        render={({ field }) => (
                          <FormItem className="w-full sm:w-52">
                            <Tooltip>
                              <TooltipTrigger>
                                <FormLabel className="flex items-center">
                                  Tertiary Keyword
                                  <BadgeInfo className="w-3.5 ml-1" />
                                </FormLabel>
                              </TooltipTrigger>
                              <TooltipContent className="w-96">
                                <p>
                                  This will help the model generate more
                                  relevant suggestions but will not be as
                                  important as the primary and secondary
                                  keywords.
                                </p>
                              </TooltipContent>
                            </Tooltip>
                            <FormControl>
                              <Input
                                className="focus-visible:ring-0 focus-visible:ring-transparent bg-purple-dark border-none text-purple-lightestPurple focus-visible:border-none"
                                disabled={isLoading}
                                placeholder="data gathering"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="mt-4">
                      <FormField
                        name="prompt"
                        render={({ field }) => (
                          <FormItem className="mb-6">
                            <Tooltip>
                              <TooltipTrigger>
                                <FormLabel className="flex items-center">
                                  Content
                                  <BadgeInfo className="w-3.5 ml-1" />
                                </FormLabel>
                              </TooltipTrigger>
                              <TooltipContent className="w-96">
                                <p>
                                  The best way to use this is to take all your
                                  content directly from the source you are
                                  writing about. For example, if you are writing
                                  about a book, take the summary from the back
                                  of the book. If you are writing about a movie,
                                  take the summary from IMDB. If you are writing
                                  about a product, take the description from the
                                  product page. The more content you give the
                                  model, the better the final output will be.
                                </p>
                              </TooltipContent>
                            </Tooltip>
                            <FormControl>
                              <Textarea
                                className="focus-visible:ring-0 focus-visible:ring-transparent h-64 bg-purple-dark border-none text-purple-lightestPurple focus-visible:border-none"
                                disabled={isLoading}
                                placeholder="This is the content that the model will use to generate ideas for your title and description."
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </form>
              </Form>
            </div>
            <div className="w-6/12 px-6 ">
              <div className="flex flex-col content-around">
                {formattedMessages.map(
                  (message, index) =>
                    message.role !== "user" && (
                      <div
                        key={index}
                        className="w-full h-full flex items-start rounded-lg pb-2">
                        <Alert className="bg-muted bg-purple-midPurple border-none">
                          <Bot className="h-5 w-5 fill-purple-lightestPurple" />
                          <AlertTitle className="mb-3 text-white">
                            {message.title}
                          </AlertTitle>
                          <AlertDescription className="text-purple-lightestPurple">
                            {message.description}
                          </AlertDescription>
                        </Alert>
                      </div>
                    )
                )}
              </div>
            </div>
          </div>
        </TooltipProvider>
      </div>
    </section>
  );
};

export default MetadataPage;
