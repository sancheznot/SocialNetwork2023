import { Schema, model, models } from "mongoose";

const FollowSchema = new Schema({
  follows: {
    following: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      required: true,
    },
    follower: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      required: true,
    },
  },
});

export default models.Follow || model("Follow", FollowSchema);
