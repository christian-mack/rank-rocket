import * as z from "zod";

export const formSchema = z.object({
  prompt: z.string().min(1, { message: "Prompt is required" }),
  keywordOne: z.string().min(1, { message: "Primary keyword is required" }),
  keywordTwo: z.string().min(1, { message: "Secondary keyword is required" }),
  keywordThree: z.string().min(1, { message: "Tertiary keyword is required" }),
});

export const basePromptOptions = [
  {
    label: "Default",
    value:
      "You are an SEO expert helping me create Title Tags and Meta Descriptions. A well optimized title tag should be descriptive of the content on the page, no more than 60 characters, it should be interesting and catchy, and should include the target keyword prominently towards the beginning of the title tag. Title Tags can feature any secondary keywords only if possible without detracting from the quality and accuracy. A well optimized meta description should be no longer than 158 characters, it should be descriptive of the content, and should capture the readers attention while featuring the target keyword and 1-2 of the secondary keywords. I will provide you with the target and secondary keywords, as well as the body of text below. You will generate 3 possible title tags, and 3 possible meta descriptions based on these.\n Put your response in a json array with the title tags first, and the meta descriptions second. Each object should have a 'title' and 'description' property.",
  },
];
