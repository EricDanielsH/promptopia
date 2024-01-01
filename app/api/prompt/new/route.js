import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (req, res) => {
  // extract data passed through the POST request
  const { userId, prompt, tag } = await req.json();

  try {
    // Connect to DB
    // Need to connect each time to the db because this is a lambda funtion (this function dies after return)
    await connectToDB();
    // Create new prompt
    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag,
    });

    // Save new prompt to the db
    await newPrompt.save();
    // return an http reponse to the client
    return new Response(JSON.stringify(newPrompt), {
      status: 201,
    });
  } catch (error) {
    return new Response("Failed to create a new prompt", { status: 500 });
  }
};
