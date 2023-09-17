import * as z from "zod";

export const metadataFormSchema = z.object({
  prompt: z.string().min(1, { message: "Prompt is required" }),
  template: z.string().min(1, { message: "A template is required" }),
  keywordOne: z.string().min(1, { message: "Primary keyword is required" }),
  keywordTwo: z.string().min(1, { message: "Secondary keyword is required" }),
  keywordThree: z.string().min(1, { message: "Tertiary keyword is required" }),
});

// This is where all templates will be stored for now. They will be stored in a database in the future.
interface BasePromptOption {
  label: "Default" | "Outline";
  value: string;
}

export const basePromptOptions: BasePromptOption[] = [
  {
    label: "Default",
    value:
      "You are an SEO expert helping me create Title Tags and Meta Descriptions. A well optimized title tag should be descriptive of the content on the page, no more than 60 characters, it should be interesting and catchy, and should include the target keyword prominently towards the beginning of the title tag. Title Tags can feature any secondary keywords only if possible without detracting from the quality and accuracy. A well optimized meta description should be no longer than 158 characters, it should be descriptive of the content, and should capture the readers attention while featuring the target keyword and 1-2 of the secondary keywords. I will provide you with the target and secondary keywords, as well as the body of text below. You will generate 3 possible title tags, and 3 possible meta descriptions based on these.\n Put your response in a json array in string format, with the title tags first, and the meta descriptions second. Each object should have a 'title' and 'description' property.\n",
  },
  {
    label: "Outline",
    value: `I need you to serve as my expert in content marketing and SEO, in order to create an outline for a piece of informational blog content that will given to writers to complete. 

    For you to do this well, I will need to provide you with some information to ensure the outline is relevant for the brand that will write the content, and to make sure it is well optimized for SEO. I will provide you with details about the topic that this content will be about, as well as what I need included in the outline. 
    
    These are the details I will provide you about the topic this content will be about. The outline will need to incorporate all of the following information into it:
    
    Topic: ****[this is the high level topic that the outline will be about]
    
    Target keywords: [I will tell you the keywords this content should target for SEO. These keywords will need to be featured naturally in headers, without sounding like they were forced in.]
    
    Possible title: ****[I will provide one or more possible titles for you to use to guide the outline]
    
    Target Audience: [I will tell you about the audience this content is intended for, in order for you to ensure the outline provided will resonate with that audience.]
    
    Thesis: ****[I will tell you the purpose the content is intended to serve, so you can ensure the outline is structured in a way that satisfies the thesis.]
    
    Brand Relevance: [I will tell you how this topic relates to the brand that will write the content, so you can ensure the outline is relevant for that brand, and so you can work that into the outline itself.]
    
    Search Intent: [I will provide you with information on information that needs to be included in this content in order to satisfy the search intent of readers. Search intent refers to the information a possible customer is looking for that led them to search for one of the target keywords. The outline should provide a clear path towards including this information.]
    
    How Our Content Will Be Unique: [I will provide you with information on how our content can be unique and provide additional value to readers when compared to the content that is currently ranking well in google. This will also be important for understanding how to make the outline unique to the brand this will be written for.]
    
    This is what I need you to include in your outline, and the style to write it in, once I've provided you with the above information:
    
    - An outline including blog sections, formatted as headers like <h2> or <h3>, to help guide a content writer through creating a piece of content. The headers must not include closing tags at the end of them.  Here is an example of how the headers should be formatted:
        - <h2> An H2 should be formatted like this, with no closing tag.
            - <h3> An H3 should be formatted like this, including the indentation.
    - Underneath each of the suggested headers, provide 1-4 sentences of context that explain the type of information a writer should include within that section of content. The context should include mentions of how the section will provide an opportunity to include a unique angle, information relevant to the brand, or a way to work in elements of the thesis. When providing context between an H2 and an H3, include instructions for the writer to add 2-3 lead in sentences between an H2 and the first H3. Here is an example of how this should look:
        - <h2> An H2 should be formatted like this.
            - This is where context should go. Writer to add 2-3 lead in sentences before H3s.
            - <h3> An H3 should be formatted like this, including the indentation.
                - This is where 1-4 sentences context should go.
    - This outline will need an introduction, however we do not need a header for it. For the introduction, simply instruct the writer in bullet point format to add a short introduction before the first H2.
    - H2s should be clear & descriptive section heads that serve as the title for that section.
    - H3s should match each other in style/format, while being clearly related to the H2 they're underneath. You should include as many H3s within an H2 as necessary to provide the reader with all of the information they would need to understand the concept or question posed by the H2. It is very important to make sure H3s support or explain the H2 above them.
    - The outline should read as a TOC that when skimmed provides a clear overview on what the content is about.
    - The outline should prominently feature ALL primary and secondary keywords in the headers, ideally in the H2s.
    - There should be at least one H2 section that clearly ties the topic into our clients position, product, funnel, or worldview. If possible, work in the brand’s narrative or relevance to the topic throughout the brief, without making it too focused on the brand. \n Here is the information specific to this content for you to use to create this outline:\n`,
  },
];
