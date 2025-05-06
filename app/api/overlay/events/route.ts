import { NextResponse } from "next/server";
import { addConnection, removeConnection } from "@/lib/notification-service";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const creatorId = searchParams.get("creatorId");

  if (!creatorId) {
    return NextResponse.json(
      { message: "ID do criador é obrigatório" },
      { status: 400 }
    );
  }

  // Configurar cabeçalhos para SSE
  const responseHeaders = new Headers();
  responseHeaders.set("Content-Type", "text/event-stream");
  responseHeaders.set("Cache-Control", "no-cache, no-transform");
  responseHeaders.set("Connection", "keep-alive");
  responseHeaders.set("X-Accel-Buffering", "no"); // Para Nginx

  // Usar uma interface estendida para o source
  interface CustomSource extends UnderlyingByteSource {
    controller?: ReadableStreamController<Uint8Array>;
  }

  const source: CustomSource = {
    type: "bytes",
    start(controller) {
      // Armazenar o controller no objeto source
      this.controller = controller;

      // Adicionar esta conexão ao mapa de conexões
      addConnection(creatorId, controller);

      // Enviar evento inicial para confirmar conexão
      controller.enqueue(new TextEncoder().encode(": connected\n\n"));
    },
    cancel(reason) {
      // Remover esta conexão quando fechada
      if (this.controller) {
        removeConnection(creatorId, this.controller);
      }
    },
  };

  const stream = new ReadableStream(source);

  return new Response(stream, {
    headers: responseHeaders,
  });
}
