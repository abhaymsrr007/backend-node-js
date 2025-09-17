import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
// import { User } from "../models/user.model.js";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, username, password } = req.body;
  console.log("-->>", fullName, email, username, password);

  const isValid = [fullName, email, username, password].some(
    (field) => field?.trim() === ""
  );
  if (isValid) {
    throw new ApiError(400, "fullname is requred.");
  }

  const exsitedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (exsitedUser) {
    res.json(new ApiError(409, "User with email or username already exsist."));
  }

  console.log("->>img", req.files);

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;
  if (!avatarLocalPath) {
    throw ApiError(400, "Avatar file is requred!");
  }
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw ApiError(400, "Avatar file is requred!");
  }

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findOne(user._id).select(
    "-password -refreshtoken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Somthing went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered Successfully"));
});

export { registerUser };
