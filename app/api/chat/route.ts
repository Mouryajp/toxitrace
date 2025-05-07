import { GoogleGenerativeAI } from "@google/generative-ai";
import { DataAPIClient } from "@datastax/astra-db-ts";

const {
  ASTRA_DB_NAMSPACE,
  ASTRA_DB_COLLECTION,
  ASTRA_DB_API_ENDPOINT,
  ASTRA_DB_APPLICATION_TOKEN,
  OPENAI_API_KEY, // Use your Google AI Studio key
} = process.env;

const genAI = new GoogleGenerativeAI(OPENAI_API_KEY as string);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" }); // Use Gemini model

const client = new DataAPIClient(ASTRA_DB_APPLICATION_TOKEN);
const db = client.db(ASTRA_DB_API_ENDPOINT || "", {
  namespace: ASTRA_DB_NAMSPACE,
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const latestMessage = messages[messages?.length - 1]?.content;

    let docContext = " ";

    // 🔹 Use Google AI for Embeddings
    const embeddingModel = genAI.getGenerativeModel({ model: "embedding-001" });
    const embeddingResponse = await embeddingModel.embedContent(latestMessage);

    const vector = embeddingResponse.embedding.values;

    try {
      const collection = await db.collection(ASTRA_DB_COLLECTION || " ");
      const cursor = collection.find(
        {},
        {
          sort: {
            $vector: vector, // Use Gemini's embedding vector
          },
          limit: 10,
        }
      );

      const documents = await cursor.toArray();
      const docsMap = documents?.map((doc) => doc.text);
      docContext = JSON.stringify(docsMap);
    } catch (error) {
      console.log(error);

      docContext = "";
    }

    // 🔹 Create the prompt template for Gemini
    const template = `You are Harmoni.AI, a compassionate mental health assistant. Your role is to provide users with accurate and supportive responses regarding mental health, stress, and well-being. 

When responding, prioritize empathy, factual accuracy, and encouragement. Below are some resources that might be helpful for the user:

Relevant Mental Health Resources:
- [World Health Organization (WHO)](https://www.who.int/health-topics/mental-health)
- [Mental Health America](https://www.mhanational.org/)
- [National Institute of Mental Health (NIMH)](https://www.nimh.nih.gov/)
- [Verywell Mind](https://www.verywellmind.com/)
- [CDC - Workplace Stress](https://www.cdc.gov/niosh/topics/stress/default.html)

Additionally, here are related insights from trusted sources:
${docContext} 

Please ensure your response is warm, non-judgmental, and helpful. If the user is in crisis, suggest seeking professional help or reaching out to crisis support services.

QUESTION: ${latestMessage}`;

    // 🔹 Send the request to Gemini API
    const response = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: template }] }],
    });

    const reply = await response.response.text();

    console.log("Response", reply);

    return new Response(JSON.stringify({ reply }), { 
        status: 200, 
        headers: { "Content-Type": "application/json" } 
      });
      
  } catch (error) {
    console.log(error);
    return new Response("Error processing request", { status: 500 });
  }
}
