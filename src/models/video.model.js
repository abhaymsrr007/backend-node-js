import mongoose, { Schema } from "mongoose";

import mongooseAggregatePaginateV2 from "mongoose-aggregate-paginate-v2";
const videoSchema = new Schema(
  {
    videofile: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    duration: {
      type: Number, // from cloudinary
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },

    videoUrl: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
    dislikes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comments",
      },
    ],
  },
  { timestamps: true }
);

videoSchema.plugin(mongooseAggregatePaginateV2);

export const Videos = mongoose.model("Videos", videoSchema);
