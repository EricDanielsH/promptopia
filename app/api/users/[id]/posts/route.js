import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

// Params get populated with dynamic variables (id in this case)
export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const prompts = await Prompt.find({ creator: params.id }).populate(
      "creator"
    );
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to get prompts of a profile", { status: 500 });
  }
};
