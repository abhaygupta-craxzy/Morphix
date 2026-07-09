/**
 * POST /api/generate
 * Streams the AI website generation pipeline via Server-Sent Events (SSE).
 */

import { NextRequest } from "next/server";
import { runGenerationPipeline } from "@/lib/generation-engine";

export const runtime = "nodejs";
export const maxDuration = 120; // 2 minutes max for full generation

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { prompt, websiteType, projectName } = body as {
    prompt: string;
    websiteType: string;
    projectName: string;
  };

  if (!prompt?.trim()) {
    return new Response(JSON.stringify({ error: "Prompt is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const send = (event: string, data: unknown) => {
        const chunk = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
        controller.enqueue(encoder.encode(chunk));
      };

      try {
        const pipeline = runGenerationPipeline(
          prompt,
          websiteType || "Landing Page",
          projectName || "My Website"
        );

        for await (const event of pipeline) {
          send(event.type, event.data);
          // Small delay to let the client process each chunk
          await new Promise((r) => setTimeout(r, 50));
        }
      } catch (err) {
        send("error", {
          message: err instanceof Error ? err.message : "Unknown error",
        });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
