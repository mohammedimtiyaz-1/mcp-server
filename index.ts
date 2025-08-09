import {
  McpServer,
  ResourceTemplate,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// 1. Create server
const server = new McpServer({
  name: "Echo Server",
  version: "1.0.0",
});

// 2. Add a Tool
server.tool("echo", { message: z.string() }, async ({ message }) => ({
  content: [{ type: "text", text: `Tool echo: ${message}` }],
}));

// 3. Add a Resource
server.resource(
  "echo",
  new ResourceTemplate("echo://{message}", { list: undefined }),
  async (uri, { message }) => ({
    contents: [{ uri: uri.href, text: `Resource echo: ${message}` }],
  })
);

// 4. Add a Prompt
server.prompt("echo", { message: z.string() }, ({ message }) => ({
  messages: [
    {
      role: "user",
      content: {
        type: "text",
        text: `Please process this message: ${message}`,
      },
    },
  ],
}));

// 5. Connect via stdio
const transport = new StdioServerTransport();
await server.connect(transport);
