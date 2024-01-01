import { Schema, model, models } from "mongoose";

const PromptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  prompt: {
    type: String,
    required: [true, "Prompt is required"],
  },
  tag: {
    type: String,
    required: [true, "Tag is required"],
  },
});

// Either get the prompt that already exists in the models objet
// or, if it doesnt exist
// create a new "Prompt", based on the PromptSchema
const Prompt = models.Prompt || model("Prompt", PromptSchema)

export default Prompt;
