import express from 'express';
import { authUser } from '../middlewares/auth.middleware.js';
import {
  generateInterviewReportController,
  getInterviewReportByIdController,
  getAllInterviewReportsController,
  generateResumePdfController,
} from '../controllers/interview.controller.js';
import upload from '../middlewares/file.middleware.js';

const router = express.Router();

router.post(
  '/',
  authUser,
  upload.single('resume'),
  generateInterviewReportController,
);

router.get('/report/:interviewId', authUser, getInterviewReportByIdController);

router.get('/', authUser, getAllInterviewReportsController);

router.post(
  '/resume/pdf/:interviewReportId',
  authUser,
  generateResumePdfController,
);

export default router;
