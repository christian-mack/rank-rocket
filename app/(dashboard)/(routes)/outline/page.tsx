"use client";

import { useState } from "react";
import * as z from "zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { basePromptOptions, outlineFormSchema } from "./constants";
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
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Loader, BadgeInfo, Bot } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import ReactMarkdown from "react-markdown";

const OutlinePage = () => {
  const router = useRouter();
  const [messages, setMessages] = useState<any[]>([]);
  const [formattedMessages, setFormattedMessages] = useState<any[]>([]);

  const form = useForm<z.infer<typeof outlineFormSchema>>({
    // TODO: Determine if zod resolver is needed. Currently, that application doesn't work with it.
    // resolver: zodResolver(outlineFormSchema),
    defaultValues: {
      prompt: "",
      template: "",
      topic: "",
      targetKeywords: "",
      possibleTitle: "",
      targetAudience: "",
      thesis: "",
      brandRelevance: "",
      searchIntent: "",
      uniqueContent: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (data: z.infer<typeof outlineFormSchema>) => {
    // Finds the selected template from the basePromptOptions array and returns it.
    const reqTemplate = basePromptOptions.find(
      (bp) => bp.label === data.template || "Default"
    );

    // TODO: add an alert for each error
    if (!reqTemplate)
      return console.error("outline route: onSubmit: reqTemplate is required.");

    const topic = data.topic ? "Topic: " + data.topic + "\n" : "";
    const possibleTitle = data.possibleTitle
      ? "Possible title: " + data.possibleTitle + "\n"
      : "";
    const targetAudience = data.targetAudience
      ? data.targetAudience + "\n"
      : "";
    const thesis = data.thesis ? data.thesis + "\n" : "";
    const brandRelevance = data.brandRelevance
      ? data.brandRelevance + "\n"
      : "";
    const searchIntent = data.searchIntent ? data.searchIntent + "\n" : "";
    const uniqueContent = data.uniqueContent ? data.uniqueContent + "\n" : "";

    const finalPrompt = `${reqTemplate.value}\n${topic}${possibleTitle}${targetAudience}${thesis}${brandRelevance}${searchIntent}${uniqueContent}`;

    try {
      const userInput: any = {
        role: "user",
        content: finalPrompt,
      };

      const newMessages = [...messages, userInput];

      const response = await axios.post("/api/outline", {
        messages: newMessages,
      });

      setMessages((current) => [...current, userInput, response.data]);
      console.log("response", response.data.content);
      setFormattedMessages(response.data.content);
      form.reset();
    } catch (error) {
      console.log(finalPrompt + "\n\n" + messages);
      // TODO: Open pro modal
      console.log("\n** [Outline page error] **\n\n", error);
    } finally {
      router.refresh();
    }
  };

  console.log(formattedMessages);

  return (
    <TooltipProvider>
      <section className="flex flex-col w-full h-full">
        <div className="w-full">
          <h1>Generate detailed content outlines</h1>
        </div>
        <div className="flex flex-row">
          <div className="w-6/12">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="rounded-lg border w-full p-4 px-3 md:px-6">
                <div className="flex flex-col sm:w-full">
                  <div className="flex justify-between flex-row-reverse">
                    <Button
                      className="w-1/5 mt-6 hover:shadow-md"
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
                                Choose a template that has been engineered to
                                help the model generate responses that are more
                                relevant to your needs. If you are unsure,
                                choose Default.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                          <Select
                            {...field}
                            disabled={isLoading}
                            onValueChange={field.onChange}
                            value={field.value}
                            defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue
                                  defaultValue={"Default" || field.value}
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="w-full">
                              {basePromptOptions.map((option, index) => (
                                <SelectItem key={index} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex w-full justify-between flex-col grid-cols-3 gap-3 mt-4">
                    <FormField
                      name="topic"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <Tooltip>
                            <TooltipTrigger>
                              <FormLabel className="flex items-center">
                                Topic
                                <BadgeInfo className="w-3.5 ml-1" />
                              </FormLabel>
                            </TooltipTrigger>
                            <TooltipContent className="w-96">
                              <p>
                                What is the topic of your content? For example:{" "}
                                <b>customer effort scores</b>
                              </p>
                            </TooltipContent>
                          </Tooltip>
                          <FormControl>
                            <Input
                              className="focus-visible:ring-0 focus-visible:ring-transparent"
                              disabled={isLoading}
                              placeholder="customer effort scores"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="possibleTitle"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <Tooltip>
                            <TooltipTrigger>
                              <FormLabel className="flex items-center">
                                Possible Title
                                <BadgeInfo className="w-3.5 ml-1" />
                              </FormLabel>
                            </TooltipTrigger>
                            <TooltipContent className="w-96">
                              <p>
                                What is a possible title for your content? For
                                example: <b>What is a customer effort score?</b>
                              </p>
                            </TooltipContent>
                          </Tooltip>
                          <FormControl>
                            <Input
                              className="focus-visible:ring-0 focus-visible:ring-transparent"
                              disabled={isLoading}
                              placeholder="What is a customer effort score?"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="targetAudience"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <Tooltip>
                            <TooltipTrigger>
                              <FormLabel className="flex items-center">
                                Target Audience
                                <BadgeInfo className="w-3.5 ml-1" />
                              </FormLabel>
                            </TooltipTrigger>
                            <TooltipContent className="w-96">
                              <p>
                                Who is the target audience for your content? For
                                example:{" "}
                                <b>
                                  Customer support teams looking for ways to
                                  measure and improve their customer support
                                  programs.
                                </b>
                              </p>
                            </TooltipContent>
                          </Tooltip>
                          <FormControl>
                            <Input
                              className="focus-visible:ring-0 focus-visible:ring-transparent"
                              disabled={isLoading}
                              placeholder="customer support teams looking for ways to measure and improve their customer support programs"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="mt-4">
                    <FormField
                      name="thesis"
                      render={({ field }) => (
                        <FormItem className="mb-6">
                          <Tooltip>
                            <TooltipTrigger>
                              <FormLabel className="flex items-center">
                                Thesis
                                <BadgeInfo className="w-3.5 ml-1" />
                              </FormLabel>
                            </TooltipTrigger>
                            <TooltipContent className="w-96">
                              <p>
                                What is the thesis of your content? For example:{" "}
                                <b>
                                  Customer effort scores are a great way to
                                  measure customer support programs...
                                </b>
                              </p>
                            </TooltipContent>
                          </Tooltip>
                          <FormControl>
                            <Textarea
                              className="focus-visible:ring-0 focus-visible:ring-transparent h-40"
                              disabled={isLoading}
                              placeholder="Provide your thesis here."
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="mt-4">
                    <FormField
                      name="brandRelevance"
                      render={({ field }) => (
                        <FormItem className="mb-6">
                          <Tooltip>
                            <TooltipTrigger>
                              <FormLabel className="flex items-center">
                                Brand Relevance
                                <BadgeInfo className="w-3.5 ml-1" />
                              </FormLabel>
                            </TooltipTrigger>
                            <TooltipContent className="w-96">
                              <p>
                                How is your brand relevant to the topic? For
                                example:{" "}
                                <b>
                                  Acme is a customer support software company
                                  that helps customer support teams measure and
                                  improve their customer support programs...
                                </b>
                              </p>
                            </TooltipContent>
                          </Tooltip>
                          <FormControl>
                            <Textarea
                              className="focus-visible:ring-0 focus-visible:ring-transparent h-40"
                              disabled={isLoading}
                              placeholder="Provide your brand relevance here."
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="mt-4">
                    <FormField
                      name="searchIntent"
                      render={({ field }) => (
                        <FormItem className="mb-6">
                          <Tooltip>
                            <TooltipTrigger>
                              <FormLabel className="flex items-center">
                                Search Intent
                                <BadgeInfo className="w-3.5 ml-1" />
                              </FormLabel>
                            </TooltipTrigger>
                            <TooltipContent className="w-96">
                              <p>
                                What is the search intent of your content? For
                                example:{" "}
                                <b>
                                  The search intent of this content is to
                                  provide a detailed overview of customer effort
                                  scores.
                                </b>
                              </p>
                            </TooltipContent>
                          </Tooltip>
                          <FormControl>
                            <Textarea
                              className="focus-visible:ring-0 focus-visible:ring-transparent h-40"
                              disabled={isLoading}
                              placeholder="Provide your search intent."
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="mt-4">
                    <FormField
                      name="uniqueContent"
                      render={({ field }) => (
                        <FormItem className="mb-6">
                          <Tooltip>
                            <TooltipTrigger>
                              <FormLabel className="flex items-center">
                                Unique Content
                                <BadgeInfo className="w-3.5 ml-1" />
                              </FormLabel>
                            </TooltipTrigger>
                            <TooltipContent className="w-96">
                              <p>
                                What is the content of your content? For
                                example:{" "}
                                <b>
                                  This is the content that the model will use to
                                  generate ideas for your title and description.
                                </b>
                              </p>
                            </TooltipContent>
                          </Tooltip>
                          <FormControl>
                            <Textarea
                              className="focus-visible:ring-0 focus-visible:ring-transparent h-40"
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
          <div className="w-6/12">
            {formattedMessages.length > 0 && (
              <div className="w-full h-full flex items-start rounded-lg bg-muted">
                <Alert>
                  <Bot className="h-4 w-4" />
                  {/* <AlertTitle className="mb-3">{message.title}</AlertTitle> */}
                  <AlertDescription>{formattedMessages}</AlertDescription>
                </Alert>
              </div>
            )}
          </div>
        </div>
      </section>
    </TooltipProvider>
  );
};

export default OutlinePage;
