import { PDFParse } from 'pdf-parse';
import {
  generateInterviewReport,
  generateResumePdf,
} from '../services/ai.service.js';
import InterviewReport from '../models/interview.model.js';

async function generateInterviewReportController(req, res) {
  if (!req.file) {
    return res.status(400).json({
      message: 'resume file is required',
    });
  }

  const { selfDescription, jobDescription } = req.body;

  if (!selfDescription || !jobDescription) {
    return res.status(400).json({
      message: 'Please provide selfDescription and jobDescription',
    });
  }

  const parser = new PDFParse({ data: req.file.buffer });
  const resumeContent = await parser.getText();
  await parser.destroy();

  const interviewReportByAi = await generateInterviewReport({
    resume: resumeContent.text,
    selfDescription,
    jobDescription,
  });

  const interviewReport = await InterviewReport.create({
    user: req.user.id,
    resume: resumeContent.text,
    selfDescription,
    jobDescription,
    ...interviewReportByAi,
  });

  res.status(201).json({
    message: 'Interview report generated successfully.',
    interviewReport,
  });
}

async function getInterviewReportByIdController(req, res) {
  const { interviewId } = req.params;
  const interviewReport = await InterviewReport.findOne({
    _id: interviewId,
    user: req.user.id,
  });

  if (!interviewReport) {
    return res.status(404).json({
      message: 'Interview report not found.',
    });
  }

  res.status(200).json({
    message: 'Interview report fetched successfully.',
    interviewReport,
  });
}

async function getAllInterviewReportsController(req, res) {
  const interviewReports = await InterviewReport.find({ user: req.user.id })
    .sort({ createdAt: -1 })
    .select(
      '-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan',
    );

  res.status(200).json({
    message: 'Interview reports fetched successfully.',
    interviewReports,
  });
}

async function generateResumePdfController(req, res) {
  const { interviewReportId } = req.params;
  const interviewReport = await InterviewReport.findOne({
    _id: interviewReportId,
    user: req.user.id,
  });

  if (!interviewReport) {
    return res.status(404).json({
      message: 'Interview report not found.',
    });
  }

  const { resume, jobDescription, selfDescription } = interviewReport;
  const pdfBuffer = await generateResumePdf({
    resume,
    jobDescription,
    selfDescription,
  });

  res.set({
    'Content-Type': 'application/pdf',
    'Content-Disposition': `attachment; filename=resume_${interviewReportId}.pdf`,
  });
  res.send(pdfBuffer);
}

export {
  generateInterviewReportController,
  getInterviewReportByIdController,
  getAllInterviewReportsController,
  generateResumePdfController,
};
