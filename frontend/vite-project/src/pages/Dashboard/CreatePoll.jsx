/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { UserContext } from "../../context/UserContext";
import useUserAuth from "../../hooks/useUserAuth";
import { useState } from "react";
import { POLL_TYPE } from "../../utils/data";
import OptionImageSelector from "../../components/input/OptionImageSelector";
import OptionInput from "../../components/input/OptionInput";
import uploadImage from "../../utils/uploadImage";
import toast from "react-hot-toast";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const CreatePoll = () => {
  useUserAuth();
  const { user, onPollCreateOrDelete } = useContext(UserContext);

  const [pollData, setPollData] = useState({
    question: "",
    type: "",
    options: [],
    imageOptions: [],
    error: "",
  });

  const handleValueChange = (key, value) => {
    setPollData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearData = () => {
    setPollData({
      question: "",
      type: "",
      options: [],
      imageOptions: [],
      error: "",
    });
  };

  const updateImageAndGetLink = async (imageOptions) => {
    // Map over image options and create promises for each image upload
    const optionPromises = imageOptions.map(async (imageOption) => {
      try {
        // Attempt to upload each image
        const imgUploadRes = await uploadImage(imageOption.file);
        // Return the image URL or an empty string if upload fails
        return imgUploadRes.imageUrl || "";
      } catch (error) {
        console.log(error);
        // Show error toast if image upload fails
        toast.error(`Error uploading image: ${imageOption.file.name}`);
        // Return empty string for failed uploads
        return "";
      }
    });

    // Wait for all image upload promises to resolve
    const optionArr = await Promise.all(optionPromises);
    return optionArr;
  };

  const getOptions = async () => {
    switch (pollData.type) {
      case "single-choice":
        // For text-based polls, return options directly
        return pollData.options;
      case "image-based": {
        // For image-based polls, upload images and get their URLs
        const option = await updateImageAndGetLink(pollData.imageOptions);
        return option;
      }
      default:
        // For unknown poll types, return an empty array
        return [];
    }
  };
  // Create a New Poll
  const handleCreatePoll = async () => {
    const { question, type, options, imageOptions, error } = pollData;

    if (!question || !type) {
      // console.log("CREATE:", { question, type, options, error });
      handleValueChange("error", "Question & Type are required");
      return;
    }

    if (type === "single-choice" && options.length < 2) {
      handleValueChange("error", "Enter at least two options");
      return;
    }

    if (type === "image-based" && imageOptions.length < 2) {
      handleValueChange("error", "Enter at least two image options");
      return;
    }

    // console.log("NO err", { pollData });

    handleValueChange("error", "");
    // Proceed with creating the poll (API call or further processing)
    const optionData = await getOptions();

    try {
      const response = await axiosInstance.post(API_PATHS.POLLS.CREATE, {
        question,
        type,
        options: optionData,
        creatorId: user._id,
      });

      if (response) {
        toast.success("Poll Created Successfully!");
        onPollCreateOrDelete();
        clearData();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
        handleValueChange("error", error.response.data.message);
      } else {
        handleValueChange("error", "Something went wrong. Please try again.");
      }
    }
  };

  return (
    <DashboardLayout activeMenu="Create Poll">
      <div className="bg-gray-100/80 my-5 p-5 rounded-lg mx-auto">
        <h2 className="text-lg text-black font-medium">Create Poll</h2>
        <div className="mt-3">
          <label className="text-xs font-medium text-slate-600">
            Poll Question:
          </label>
          <textarea
            placeholder="Enter your question here"
            className="w-full text-[13px] text-black outline-none bg-slate-200/80 p-2 rounded-md mt-2"
            rows={4}
            value={pollData.question}
            onChange={(e) => handleValueChange("question", e.target.value)}
          />
        </div>

        <div className="mt-3">
          <label className="text-xs font-medium text-slate-600">
            Poll type:
          </label>
          <div className="flex gap-4 flex-wrap mt-3">
            {POLL_TYPE.map((item) => (
              <div
                key={item.value}
                className={`option-chip ${
                  pollData.type === item.value
                    ? "text-white bg-primary border-primary"
                    : "border-[#D4BEE4]"
                }`}
                onClick={() => handleValueChange("type", item.value)}
              >
                {item.label}
              </div>
            ))}
          </div>
        </div>

        {pollData.type === "single-choice" && (
          <div className="mt-5">
            <label className="text-xs font-medium text-slate-600">
              OPTIONS
            </label>
            <div className="mt-3">
              <OptionInput
                optionList={pollData.options}
                setOptionList={(value) => handleValueChange("options", value)}
              />
            </div>
          </div>
        )}

        {pollData.type === "image-based" && (
          <div className="mt-5">
            <label className="text-xs font-medium text-slate-600">
              IMAGE OPTIONS
            </label>
            <div className="mt-3">
              <OptionImageSelector
                imageList={pollData.imageOptions}
                setImageList={(value) =>
                  handleValueChange("imageOptions", value)
                }
              />
            </div>
          </div>
        )}

        {pollData.error && (
          <p className="text-xs font-medium text-red-500 mt-5">
            {pollData.error}
          </p>
        )}
        <button className="btn-primary py-2 mt-6" onClick={handleCreatePoll}>
          CREATE
        </button>
      </div>
    </DashboardLayout>
  );
};

export default CreatePoll;
