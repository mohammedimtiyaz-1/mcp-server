import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const mcpServer = new McpServer({ name: "MCP lab", version: "1.0.0" });
const transport = new StdioServerTransport();

await mcpServer.connect(transport);
