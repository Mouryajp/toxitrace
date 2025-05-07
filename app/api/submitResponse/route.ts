import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const audio = formData.get('audio') as File;
    const answers = formData.get('answers') as string;

    if (!audio || !answers) {
      return NextResponse.json({ error: 'Missing audio or answers.' }, { status: 400 });
    }

    // Convert audio blob to Buffer
    const buffer = Buffer.from(await audio.arrayBuffer());

    // Ensure uploads folder at the root
    const uploadDir = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, `recording_${Date.now()}.webm`);
    fs.writeFileSync(filePath, buffer);

    // Log the answers
    const parsedAnswers = JSON.parse(answers);
    console.log('✅ Answers:', parsedAnswers);
    console.log('✅ Audio file saved to:', filePath);

    return NextResponse.json({ message: 'Submission successful' });
  } catch (error) {
    console.error('❌ Error in /submitResponse:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
