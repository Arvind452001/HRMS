import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { submitInterviewReviewApi } from "../../../api/interviewApi";

const InterviewReviewModal = ({
  interview = {},
  mode = "edit",
  onClose,
  onSuccess,
}) => {
  const isViewMode = mode === "view";

  const [rating, setRating] = useState(0);
  const [recommendation, setRecommendation] =
    useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] =
    useState(false);

  // SET INITIAL VALUES
  useEffect(() => {
    if (interview) {
      setRating(interview?.rating || 0);
      setRecommendation(
        interview?.recommendation || ""
      );
      setFeedback(interview?.feedback || "");
    }
  }, [interview]);

  // SUBMIT HANDLER
  const handleSubmit = async () => {
    if (isViewMode) return;

    if (
      !rating ||
      !recommendation ||
      !feedback.trim()
    ) {
      return Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please fill all fields",
      });
    }

    try {
      setLoading(true);

      const payload = {
        rating,
        recommendation,
        feedback,
      };

      const response =
        await submitInterviewReviewApi(
          interview?._id,
          payload
        );

      await Swal.fire({
        icon: "success",
        title: "Success",
        text:
          response?.message ||
          "Review submitted successfully",
      });

      if (onSuccess) {
        onSuccess();
      }

      if (onClose) {
        onClose();
      }

    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Failed",
        text:
          error?.response?.data?.message ||
          error?.message ||
          "Something went wrong",
      });

    } finally {
      setLoading(false);
    }
  };

  // RECOMMENDATION OPTIONS
  const recommendationOptions = [
    {
      value: "strong_hire",
      label: "Strong Hire",
      activeClass:
        "border-green-500 bg-green-100 text-green-700",
    },
    {
      value: "hire",
      label: "Hire",
      activeClass:
        "border-indigo-500 bg-indigo-100 text-indigo-700",
    },
    {
      value: "on_hold",
      label: "On Hold",
      activeClass:
        "border-yellow-500 bg-yellow-100 text-yellow-700",
    },
    {
      value: "reject",
      label: "Reject",
      activeClass:
        "border-red-500 bg-red-100 text-red-700",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">

      {/* MODAL */}
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl overflow-hidden">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-3">

          <div className="flex items-center justify-between">

            <div>
              <h2 className="text-lg font-semibold text-white">
                {isViewMode
                  ? "Interview Review"
                  : "Submit Review"}
              </h2>

              <p className="text-xs text-indigo-100">
                Candidate Evaluation
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="h-8 w-8 rounded-full bg-white/20 text-white hover:bg-white/30 flex items-center justify-center transition"
            >
              ✕
            </button>

          </div>
        </div>

        {/* BODY */}
        <div className="p-4 space-y-4">

          {/* CANDIDATE INFO */}
          <div className="flex items-center gap-3 border border-slate-200 rounded-xl p-3 bg-slate-50">

            {/* AVATAR */}
            <div className="h-11 w-11 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold">
              {interview?.candidate?.fullName
                ?.charAt(0)
                ?.toUpperCase() || "C"}
            </div>

            {/* INFO */}
            <div className="flex-1 min-w-0">

              <h3 className="text-sm font-semibold text-slate-900 truncate">
                {interview?.candidate?.fullName ||
                  "Candidate"}
              </h3>

              <p className="text-xs text-slate-500 mt-1">
                {interview?.roundType ||
                  "Technical"}{" "}
                •{" "}
                {interview?.scheduledDate
                  ? new Date(
                      interview?.scheduledDate
                    ).toLocaleDateString(
                      "en-IN"
                    )
                  : "N/A"}
              </p>

              <p
                className={`text-xs font-medium mt-1 ${
                  interview?.status ===
                  "completed"
                    ? "text-green-600"
                    : "text-yellow-600"
                }`}
              >
                {interview?.status ||
                  "Scheduled"}
              </p>

            </div>

          </div>

          {/* RATING */}
          <div>

            <label className="block text-sm font-medium text-slate-700 mb-2">
              Rating
            </label>

            <div className="flex gap-1">

              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  disabled={isViewMode}
                  onClick={() =>
                    setRating(star)
                  }
                  className={`text-3xl transition-all duration-200 ${
                    star <= rating
                      ? "text-yellow-400"
                      : "text-slate-300"
                  } ${
                    !isViewMode
                      ? "hover:scale-110 cursor-pointer"
                      : "cursor-default"
                  }`}
                >
                  ★
                </button>
              ))}

            </div>

            <p className="text-xs text-slate-500 mt-1">
              Selected Rating: {rating}/5
            </p>

          </div>

          {/* RECOMMENDATION */}
          <div>

            <label className="block text-sm font-medium text-slate-700 mb-2">
              Recommendation
            </label>

            <div className="flex flex-wrap gap-2">

              {recommendationOptions.map(
                (item) => (
                  <button
                    key={item.value}
                    type="button"
                    disabled={isViewMode}
                    onClick={() =>
                      setRecommendation(
                        item.value
                      )
                    }
                    className={`px-3 py-2 rounded-lg border text-xs font-medium transition-all duration-200 ${
                      recommendation ===
                      item.value
                        ? item.activeClass
                        : "border-slate-300 bg-white text-slate-700"
                    } ${
                      !isViewMode
                        ? "hover:shadow-sm cursor-pointer"
                        : "cursor-default"
                    }`}
                  >
                    {item.label}
                  </button>
                )
              )}

            </div>

          </div>

          {/* FEEDBACK */}
          <div>

            <label className="block text-sm font-medium text-slate-700 mb-2">
              Feedback
            </label>

            <textarea
              rows={4}
              disabled={isViewMode}
              value={feedback}
              onChange={(e) =>
                setFeedback(
                  e.target.value
                )
              }
              placeholder="Write interview feedback..."
              className={`w-full rounded-xl border p-3 text-sm resize-none outline-none transition ${
                isViewMode
                  ? "bg-slate-100 border-slate-200 cursor-not-allowed"
                  : "border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              }`}
            />

          </div>

        </div>

        {/* FOOTER */}
        <div className="border-t bg-slate-50 px-4 py-3 flex items-center justify-end gap-2">

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-slate-300 text-sm font-medium text-slate-700 hover:bg-slate-100 transition"
          >
            Close
          </button>

          {!isViewMode && (
            <button
              type="button"
              disabled={loading}
              onClick={handleSubmit}
              className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition disabled:opacity-50"
            >
              {loading
                ? "Submitting..."
                : "Submit"}
            </button>
          )}

        </div>

      </div>
    </div>
  );
};

export default InterviewReviewModal;