import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// Three different types of request

// GET (read) to get one prompts
export const GET = async (request, { params }) => {
  try {
    // Connect to DB
    await connectToDB();

    // Get the prompts
    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) return new Response("Prompt not found", { status: 404 });

    // Return response to client
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Couldn't fetch all prompts", { status: 500 });
  }
};

// PATCH (update)
export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();

  try {
    // Connect to database
    await connectToDB();
    // Find existing prompt
    const existingPrompt = await Prompt.findById(params.id);

    if (!existingPrompt) return new Response("Prompt wansn't found", 404);

    // Update prompt and tag
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    // Save it
    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to update prompt", { status: 500 });
  }
};

// DELETE (delete)
export const DELETE = async (request, { params }) => {
  try {
    // Connect to database
    await connectToDB();

    // Find prompt and remove
    await Prompt.findByIdAndDelete(params.id);

    return new Response("Prompt deleted succesfully", { status: 200 });
  } catch (error) {
    return new Response("Couldn't delete the prompt", { status: 500 });
  }
};
