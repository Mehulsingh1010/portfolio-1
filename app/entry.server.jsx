import { PassThrough } from "stream";
import * as ReactDOMServer from "react-dom/server";
import { Response } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import { isbot } from "isbot";

const ABORT_DELAY = 5000;

export default function handleRequest(
  request,
  responseStatusCode,
  responseHeaders,
  remixContext,
) {
  return isbot(request.headers.get("user-agent"))
    ? handleBotRequest(
        request,
        responseStatusCode,
        responseHeaders,
        remixContext
      )
    : handleBrowserRequest(
        request,
        responseStatusCode,
        responseHeaders,
        remixContext
      );
}

async function handleBotRequest(
  request,
  responseStatusCode,
  responseHeaders,
  remixContext
) {
  const { pipe, abort } = await ReactDOMServer.renderToPipeableStream(
    <RemixServer
      context={remixContext}
      url={request.url}
      abortDelay={ABORT_DELAY}
    />,
    {
      onAllReady() {
        const body = new PassThrough();
        responseHeaders.set("Content-Type", "text/html");
        return new Response(body, {
          headers: responseHeaders,
          status: responseStatusCode,
        });
      },
      onShellError(error) {
        console.error(error);
        responseHeaders.set("Content-Type", "text/html");
        return new Response(
          `<h1>Shell Error</h1><pre>${error.stack}</pre>`,
          {
            status: 500,
            headers: responseHeaders,
          }
        );
      },
    }
  );
  setTimeout(abort, ABORT_DELAY);
}

async function handleBrowserRequest(
  request,
  responseStatusCode,
  responseHeaders,
  remixContext
) {
  const { pipe, abort } = await ReactDOMServer.renderToPipeableStream(
    <RemixServer
      context={remixContext}
      url={request.url}
      abortDelay={ABORT_DELAY}
    />,
    {
      onShellReady() {
        const body = new PassThrough();
        responseHeaders.set("Content-Type", "text/html");
        return new Response(body, {
          headers: responseHeaders,
          status: responseStatusCode,
        });
      },
      onShellError(error) {
        console.error(error);
        responseHeaders.set("Content-Type", "text/html");
        return new Response(
          `<h1>Shell Error</h1><pre>${error.stack}</pre>`,
          {
            status: 500,
            headers: responseHeaders,
          }
        );
      },
    }
  );
  setTimeout(abort, ABORT_DELAY);
}