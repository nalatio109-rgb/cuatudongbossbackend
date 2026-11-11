import express from "express";
import {
  getReviews,
  createReview,
  deleteReview
} from "../controllers/reviewController.js";

const router = express.Router();

router.route("/")
  .get(getReviews)
  .post(createReview);

// QUY TẮC: Chỉ cho phép xóa (DELETE), tuyệt đối KHÔNG có route PUT/PATCH (sửa)
router.route("/:id")
  .delete(deleteReview);

export default router;

