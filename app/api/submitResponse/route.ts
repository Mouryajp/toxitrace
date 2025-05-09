import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const audio = formData.get("audio") as File;
    const answers = formData.get("answers") as string;
    const occupation = formData.get("occupation") as string;
    const age = formData.get("age") as string;
    const gender = formData.get("gender") as string;
    console.log("✅ Audio file saved to:", audio);
    if (!audio || !answers || !occupation || !age || !gender) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    // Prepare the data to send to FastAPI
    const formDataToSend = new FormData();
    formDataToSend.append("occupation", occupation);
    formDataToSend.append("age", age);
    formDataToSend.append("gender", gender);
    formDataToSend.append("answers", answers);
    formDataToSend.append("voice_file", audio); // Directly send the received audio file

    // Use the environment variable for the FastAPI endpoint URL
    const fastApiUrl = process.env.NEXT_PUBLIC_FASTAPI_URL;

    if (!fastApiUrl) {
      return NextResponse.json(
        { error: "FastAPI endpoint is not set in environment variables." },
        { status: 500 }
      );
    }
    console.log("formDataToSend:", fastApiUrl);

    // Call the FastAPI endpoint
    const fastApiResponse = await fetch(fastApiUrl, {
      method: "POST",
      body: formDataToSend,
    });

    const responseData = await fastApiResponse.json();
      console.log("response",responseData);

    if (fastApiResponse.ok) {
      // Return the response from FastAPI back to the client
      return NextResponse.json({
        message: "Prediction successful",
        user_details: {
          occupation,
          age,
          gender,
        },
        survey_result: responseData.survey_result,
        audio_result: responseData.audio_result,
      });
      
    } else {
      return NextResponse.json(
        { error: responseData.error || "FastAPI prediction failed." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("❌ Error in /submitResponse:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// import { NextRequest, NextResponse } from 'next/server';
// import fs from 'fs';
// import path from 'path';

// export async function POST(req: NextRequest) {
//   try {
//     const formData = await req.formData();

//     const audio = formData.get('audio') as File;
//     const answers = formData.get('answers') as string;

//     if (!audio || !answers) {
//       return NextResponse.json({ error: 'Missing audio or answers.' }, { status: 400 });
//     }

//     // Convert audio blob to Buffer
//     const buffer = Buffer.from(await audio.arrayBuffer());

//     // Ensure uploads folder at the root
//     const uploadDir = path.join(process.cwd(), 'uploads');
//     if (!fs.existsSync(uploadDir)) {
//       fs.mkdirSync(uploadDir, { recursive: true });
//     }

//     const filePath = path.join(uploadDir, `recording_${Date.now()}.webm`);
//     fs.writeFileSync(filePath, buffer);

//     // Log the answers
//     const parsedAnswers = JSON.parse(answers);
//     console.log('✅ Answers:', parsedAnswers);
//     console.log('✅ Audio file saved to:', filePath);

//     return NextResponse.json({ message: 'Submission successful' });
//   } catch (error) {
//     console.error('❌ Error in /submitResponse:', error);
//     return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
//   }
// }
