"use client";

import { useState } from "react";
import * as z from "zod";
import { Code } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { CreateChatCompletionRequestMessage } from "openai/resources/chat/completions";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";

import Heading from "@/components/heading";
import { formSchema } from "./constants";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Empty } from "@/components/empty";
import Loader from "@/components/loader";
import { cn } from "@/lib/utils";
import UserAvatar from "@/components/user-avatar";
import BotAvatar from "@/components/bot-avatar";

const CodePage = () => {
  const router = useRouter();
  const [messages, setMessages] = useState<
    CreateChatCompletionRequestMessage[]
  >([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const conversationPairs = [];
  let currentPair: CreateChatCompletionRequestMessage[] = [];

  messages.forEach((message) => {
    if (message.role === "user") {
      if (currentPair.length > 0) {
        conversationPairs.push(currentPair);
        currentPair = [];
      }
      currentPair.push(message);
    } else if (message.role === "assistant" && currentPair.length > 0) {
      currentPair.push(message);
      conversationPairs.push(currentPair);
      currentPair = [];
    }
  });

  if (currentPair.length > 0) {
    conversationPairs.push(currentPair);
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: CreateChatCompletionRequestMessage = {
        role: "user",
        content: values.prompt,
      };

      const newMessages = [...messages, userMessage];

      const response = await axios.post("/api/code", {
        messages: newMessages,
      });

      setMessages((current) => [...current, userMessage, response.data]);

      form.reset();
    } catch (error: any) {
      // TODO: Open pro modal
      console.log(error);
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title="Code Generation"
        description="Generate code using descriptive text"
        icon={Code}
        iconColor="text-green-700"
        bgColor="bg-green-700/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="rounded-lg border w-full p-4 px-3 mf:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="Simple toggle button using React Hooks."
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                className="col-span-12 lg:col-span-2 w-full"
                disabled={isLoading}
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 w-full rounded-lg flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}
          {messages.length === 0 && !isLoading && (
            <Empty label="No conversation started" />
          )}
          <div className="flex flex-col-reverse gap-y-4">
            {conversationPairs.map((pair, index) => (
              <div key={index} className="flex flex-col gap-y-4">
                {pair.map((message) => (
                  <div
                    key={message.content}
                    className={cn(
                      "p-8 w-full flex items-start gap-x-8 rounded-lg",
                      message.role === "user"
                        ? "bg-white border border-black/10"
                        : "bg-muted"
                    )}
                  >
                    {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                    <ReactMarkdown
                      components={{
                        pre: ({ node, ...props }) => (
                          <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
                            <pre {...props} />
                          </div>
                        ),
                        code: ({node, ...props}) => (
                          <code className="bg-black/10 rounded-lg p-1" {...props}/>
                        )
                      }}
                      className="text-sm overflow-hidden leading-7"
                    >
                      {message.content || ""}
                    </ReactMarkdown>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodePage;
