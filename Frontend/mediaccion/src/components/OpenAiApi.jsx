import { useState } from "react";
import OpenAI from "openai";


export default function OpenAiApi() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResponse("");

    try {
      const result = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "user", content: input }
        ]
      });

      const output = result.choices?.[0]?.message?.content || "Sin respuesta";
      setResponse(output);
    } catch (error) {
      console.error(error);
      setResponse("Error al consultar la API");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 w-full max-w-xl mx-auto flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Chat con OpenAI</h1>

      <input
        className="border rounded-xl p-3"
        placeholder="Escribe tu texto..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button
        onClick={sendMessage}
        className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl p-3 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Enviando..." : "Enviar"}
      </button>

      <div className="border rounded-xl p-4 min-h-[100px] bg-gray-50 whitespace-pre-wrap">
        {response}
      </div>
    </div>
  );
}