// src/utils/tunedModel.jsx
import { toast } from "react-toastify";
const API_KEY = "AIzaSyCxt0PSZD8rdAYWuh-tGXp45-WtmCPtP-s"; // Hardcoded API key

const calculateWaterFootprint = async (query, setResult, setLoading) => {
  const forbiddenWords = ["human", "woman", "man", "body", "animal", "building"];
  const words = query.toLowerCase().split(" ");
  if (words.some((word) => forbiddenWords.includes(word))) {
    setResult("undefined");
    setLoading(false);
    return;
  }

  setLoading(true);
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Calculate the water footprint for ${query}, including breakdown by lifecycle stage (growing/production, processing, transportation, additives), total in liters, a relatable comparison, and three recommendations to reduce it with water savings estimates. Return ONLY a JSON object (no markdown, no backticks) with this exact structure:
                {
                  "breakdown": [
                    {
                      "stage": "string",
                      "amount": number,
                      "details": "string"
                    }
                  ],
                  "total": number,
                  "comparison": "string",
                  "tips": ["string"]
                }
                If the input contains 'human,' 'woman,' 'man,' 'body,' 'animal,' or 'building,' return only "undefined" as a string. For other terms, respond normally. Ensure the tips are detailed, each with a short sentence describing what will be saved (e.g., "Switch to reusable bags to save 50 liters per year").`,
                },
              ],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    let responseText = data.candidates[0].content.parts[0].text;

    // Clean up any markdown or backticks if present
    responseText = responseText.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    const parsedText = JSON.parse(responseText);

    setResult(parsedText);
  } catch (error) {
    console.error("Error calculating water footprint:", error);
    toast.error("Error calculating water footprint: " + error.message);
    setResult("Error occurred while calculating.");
  } finally {
    setLoading(false);
  }
};

const getMoreDetails = async (query, setMoreDetails, setLoadingDetails) => {
  const forbiddenWords = ["human", "woman", "man", "body", "animal", "building"];
  const words = query.toLowerCase().split(" ");
  if (words.some((word) => forbiddenWords.includes(word))) {
    setMoreDetails("undefined");
    setLoadingDetails(false);
    return;
  }

  setLoadingDetails(true);
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Provide a detailed breakdown of the water footprint for ${query}, including specific examples of water usage in growing/production/creation, processing, transportation, and additives (if applicable). Return ONLY a JSON object (no markdown, no backticks) with this structure:
                  {
                    "detailedBreakdown": [
                      {
                        "stage": "string",
                        "amount": number,
                        "example": "string"
                      }
                    ]
                  }
                  If the input contains 'human,' 'woman,' 'man,' 'body,' 'animal,' or 'building,' return only "undefined" as a string.`,
                },
              ],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    let responseText = data.candidates[0].content.parts[0].text;

    // Clean up any markdown or backticks if present
    responseText = responseText.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    const parsedText = JSON.parse(responseText);

    setMoreDetails(parsedText);
  } catch (error) {
    console.error("Error fetching more details:", error);
    toast.error("Error calculating water footprint: " + error.message);
    setMoreDetails("Error occurred while fetching more details.");
  } finally {
    setLoadingDetails(false);
  }
};

export { calculateWaterFootprint, getMoreDetails };