import mongoose, { isValidObjectId } from "mongoose";
import { Video } from "../models/video.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

// Get all videos with query, sort, pagination
const getAllVideos = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    query,
    sortBy = "createdAt",
    sortType = "desc",
    userId,
  } = req.query;

  const filter = {};
  if (query) {
    filter.title = { $regex: query, $options: "i" };
  }
  if (userId && isValidObjectId(userId)) {
    filter.owner = userId;
  }

  const sortOptions = {};
  sortOptions[sortBy] = sortType === "asc" ? 1 : -1;

  const videos = await Video.find(filter)
    .sort(sortOptions)
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .populate("owner", "username avatar");

  const total = await Video.countDocuments(filter);

  return res.json(
    new ApiResponse(
      200,
      { videos, total, page: Number(page), limit: Number(limit) },
      "Videos fetched successfully"
    )
  );
});

// const publishAVideo = asyncHandler(async (req, res) => {
//     const { title, description} = req.body
//     // TODO: get video, upload to cloudinary, create video
// })

const publishAVideo = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  const owner = req.user._id;

  if (!req.file) {
    throw new ApiError(400, "Video file is required");
  }

  const videoUpload = await uploadOnCloudinary(req.file.path, "video");
  if (!videoUpload?.url) {
    throw new ApiError(500, "Video upload failed");
  }

  let thumbnailUrl = "";
  if (req.body.thumbnail) {
    const thumbUpload = await uploadOnCloudinary(req.body.thumbnail, "image");
    thumbnailUrl = thumbUpload?.url || "";
  }

  const video = await Video.create({
    title,
    description,
    videoUrl: videoUpload.url,
    thumbnail: thumbnailUrl,
    owner,
  });

  return res.status(201).json(new ApiResponse(200, video));
});

const getVideoById = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: get video by id
});

const updateVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: update video details like title, description, thumbnail
});

const deleteVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: delete video
});

const togglePublishStatus = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
});

export {
  getAllVideos,
  publishAVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
  togglePublishStatus,
};
