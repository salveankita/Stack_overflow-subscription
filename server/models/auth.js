import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    about: { type: String },
    tags: { type: [String] },
    joinedOn: { type: Date, default: Date.now },
    plan: {
        name: { type: String },
        amount: { type: Number },
        description: { type: String },
    },
    questionsPosted: {
        count: { type: Number, default: 0 },
        lastPostedAt: { type: Date },
    },
});

export default mongoose.model("User", userSchema)