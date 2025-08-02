import { useEffect, useRef, useState } from "react";
import Header from "./Header";
import OpenAI from "openai";
import useMovies from "./useMovies";
import Carrousel from "./Carrousel";

const GptSearch = () => {
  const searchPrompt = useRef();
  const { library, libraryArray } = useMovies();

  const [recommendations, setRecommendations] = useState([]);
  const [conversation, setConversation] = useState([]);

  useEffect(() => {
    if (libraryArray && libraryArray.length > 0 && conversation.length == 0) {
      const systemPrompt = {
        role: "system",
        content: `You are a movie recommendation assistant. You have access to a library of movies and TV shows. 
        
            When a user asks for recommendations, analyze their request and return movie IDs that best match their criteria.

            Available movies: ${JSON.stringify(libraryArray, null, 2)}

            Instructions:
            - Understand the user's preferences (genre, mood, themes, etc.)
            - Match movies based on titles, ratings, themes in overviews, and release years
            - Return your response as a JSON object with an array of movie IDs
            - Include only movies that genuinely match the request
            - Prioritize higher-rated movies when multiple options exist`,
      };
      setConversation([systemPrompt]);
    }
  }, [libraryArray]);

  const [model, setModel] = useState("gpt-4.1-nano-2025-04-14");

  const client = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const recommendationSchema = {
    type: "object",
    properties: {
      recommendations: {
        type: "array",
        items: {
          type: "object",
          properties: {
            movie_id: { type: "number" },
            reason: { type: "string" },
          },
          required: ["movie_id", "reason"],
        },
      },
      explanation: { type: "string" },
    },
    required: ["recommendations", "explanation"],
  };

  const promptAi = async () => {
    const promptValue = searchPrompt.current.value;
    if (!promptValue.trim()) return;
    searchPrompt.current.value = "";
    setConversation([
      ...conversation,
      { role: "user", content: promptValue },
      { role: "assistant", content: "Analyzing your request..." },
    ]);

    try {
      const response = await client.chat.completions.create({
        model: model,
        messages: [...conversation, { role: "user", content: promptValue }],
        response_format: {
          type: "json_schema",
          json_schema: {
            name: "movie_recommendations",
            schema: recommendationSchema,
          },
        },
      });

      console.log("BEGIN");

      console.log(response);
      const result = JSON.parse(response.choices[0].message.content);
      console.log(result);

      const movieIds = result.recommendations.map((rec) => rec.movie_id);
      console.log(movieIds);

      console.log("END");

      const filteredMovies = library.all.filter((movie) =>
        movieIds.includes(movie.id)
      );

      setConversation([
        ...conversation,
        { role: "user", content: promptValue },
        { role: "assistant", content: result.explanation },
      ]);

      setRecommendations(filteredMovies);
    } catch (error) {
      console.error("Error getting recommendations:", error);
      setConversation([
        ...conversation,
        { role: "user", content: promptValue },
        {
          role: "assistant",
          content:
            "Sorry, I encountered an error processing your request. Please try again.",
        },
      ]);
    }
  };

  console.log("conversation");
  console.log(conversation);

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <div className="max-w-4xl mx-auto px-4 pt-32">
        <div className="flex gap-2 mb-8">
          <input
            type="text"
            placeholder="Ask me anything..."
            className="flex-1 p-4 bg-gray-900 text-white rounded border border-gray-700 focus:outline-none focus:border-red-600"
            ref={searchPrompt}
            onKeyDown={(e) => e.key === "Enter" && promptAi()}
          />
          <button
            onClick={promptAi}
            className="px-6 py-4 bg-red-600 hover:bg-red-700 text-white rounded font-medium"
          >
            Send
          </button>

          <select
            className="p-4 bg-gray-900 text-white rounded border border-gray-700 focus:outline-none focus:border-red-600"
            onChange={(e) => setModel(e.target.value)}
          >
            <option value="gpt-4.1-nano-2025-04-14">GPT-4.1 nano</option>
            <option value="gpt-4o-mini-2024-07-18">GPT-4o mini</option>
          </select>
        </div>
        <h1 className="text-white">{model}</h1>

        <div className="space-y-4">
          {conversation
            // .filter((message) => message.role != "system")
            .map((message, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg ${
                  message.role === "user"
                    ? "bg-red-600 ml-12"
                    : "bg-gray-800 mr-12"
                }`}
              >
                <div className="text-sm opacity-70 mb-1">
                  {message.role === "user" ? "You" : "AI"}
                </div>
                <div>{message.content}</div>
              </div>
            ))}
        </div>
        <Carrousel library={recommendations} section={"section"} />
      </div>
    </div>
  );
};

export default GptSearch;
