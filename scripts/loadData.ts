import fs from "fs";
import path from "path";
import { DataAPIClient } from "@datastax/astra-db-ts";
import { PuppeteerWebBaseLoader } from "@langchain/community/document_loaders/web/puppeteer";
import { GoogleGenerativeAI } from "@google/generative-ai"; // Google AI Import
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import "dotenv/config";

type SimilarityMetric = "dot_product" | "cosine" | "euclidean";

const {
  ASTRA_DB_NAMSPACE,
  ASTRA_DB_COLLECTION,
  ASTRA_DB_API_ENDPOINT,
  ASTRA_DB_APPLICATION_TOKEN,
  OPENAI_API_KEY,
} = process.env;

const genAI = new GoogleGenerativeAI(OPENAI_API_KEY as string); // Initialize Google AI
const model = genAI.getGenerativeModel({ model: "embedding-001" }); // Use embedding model

// const mhData = [
//   "https://www.who.int/news-room/fact-sheets/detail/mental-health-strengthening-our-response",
//   "https://www.who.int/health-topics/mental-health#:~:text=WHO%20Response-,Overview,integral%20to%20our%20well%2Dbeing.",
//   "https://www.healthline.com/health/toxic-work-environment",
//   "https://www.verywellmind.com/how-a-toxic-work-environment-may-affect-mental-health-4165338",
// ];

const client = new DataAPIClient(ASTRA_DB_APPLICATION_TOKEN as string);
const db = client.db(ASTRA_DB_API_ENDPOINT || "", {
  namespace: ASTRA_DB_NAMSPACE,
});
const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 512,
  chunkOverlap: 100,
});

const createCollection = async (
  similarityMetric: SimilarityMetric = "dot_product"
) => {
  const res = await db.createCollection(ASTRA_DB_COLLECTION || "", {
    vector: {
      dimension: 768, // Google's embeddings usually have 768 dimensions
      metric: similarityMetric,
    },
  });
  console.log(res);
};

// const loadSampleData = async () => {
//   const collection = await db.collection(ASTRA_DB_COLLECTION || "");
//   for await (const url of mhData) {
//     const content = await scrapePage(url);
//     const chunks = await splitter.splitText(content);
//     for await (const chunk of chunks) {
//       const embeddingResponse = await model.embedContent([chunk]);

//       const vector = embeddingResponse.embedding.values;

//       const res = await collection.insertOne({
//         $vector: vector,
//         text: chunk,
//       });
//       console.log(res);
//     }
//   }
// };

// const scrapePage = async (url: string) => {
//   const loader = new PuppeteerWebBaseLoader(url, {
//     launchOptions: {
//       headless: true,
//     },
//     gotoOptions: {
//       waitUntil: "domcontentloaded",
//     },
//     evaluate: async (page, browser) => {
//       const result = await page.evaluate(() => document.body.innerHTML);
//       await browser.close();
//       return result;
//     },
//   });
//   return (await loader.scrape())?.replace(/>[^>]*>?/gm, "|");
// };

const loadSampleData = async () => {
  const collection = await db.collection(ASTRA_DB_COLLECTION || "");
  const pdfDir = path.join(__dirname, "docs");
  const files = fs.readdirSync(pdfDir).filter((file) => file.endsWith(".pdf"));

  for (const file of files) {
    const loader = new PDFLoader(path.join(pdfDir, file));
    const docs = await loader.load();
    for (const doc of docs) {
      const chunks = await splitter.splitText(doc.pageContent);
      for (const chunk of chunks) {
        const embeddingResponse = await model.embedContent([chunk]);
        const vector = embeddingResponse.embedding.values;
        const res = await collection.insertOne({
          $vector: vector,
          text: chunk,
        });
        console.log(res);
      }
    }
  }
};

createCollection().then(() => loadSampleData());