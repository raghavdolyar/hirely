import 'dotenv/config';
import fs from 'fs/promises';
import { generateInterviewReport, generateResumePdf } from './ai.service.js';

async function loadTestData() {
  const raw = await fs.readFile('./sample.json', 'utf-8');
  return JSON.parse(raw);
}

async function testInterviewReport(data) {
  console.log('--- generateInterviewReport ---');
  const report = await generateInterviewReport(data);
  console.log(JSON.stringify(report, null, 2));

  if (
    typeof report.matchScore !== 'number' ||
    report.matchScore < 0 ||
    report.matchScore > 100
  ) {
    console.error('FAIL: matchScore out of range:', report.matchScore);
  } else {
    console.log('PASS: matchScore in range');
  }

  for (const field of [
    'technicalQuestions',
    'behavioralQuestions',
    'skillGaps',
    'preparationPlan',
    'title',
  ]) {
    if (report[field] === undefined) {
      console.error(`FAIL: missing field "${field}"`);
    }
  }
}

async function testResumePdf(data) {
  console.log('--- generateResumePdf ---');
  const pdfBuffer = await generateResumePdf(data);
  await fs.writeFile('./test-resume-output.pdf', pdfBuffer);
  console.log(
    `PASS: wrote ${pdfBuffer.length} bytes to test-resume-output.pdf`,
  );
}

async function main() {
  const data = await loadTestData();

  try {
    await testInterviewReport(data);
  } catch (err) {
    console.error('generateInterviewReport threw:', err);
  }

  try {
    await testResumePdf(data);
  } catch (err) {
    console.error('generateResumePdf threw:', err);
  }
}

main();
