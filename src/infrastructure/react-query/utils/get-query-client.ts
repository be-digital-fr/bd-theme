import { isServer, QueryClient } from "@tanstack/react-query";

/**
 * Creates and configures a new QueryClient instance
 * 
 * @returns {QueryClient} Configured QueryClient instance with default options
 */
function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { 
        // Cache results for 1 minute before considering them stale
        staleTime: 60 * 1000 
      },
    },
  });
}

// Singleton QueryClient instance for browser environment
let browserQueryClient: QueryClient | undefined;

/**
 * Gets a QueryClient instance based on the execution environment
 * 
 * - For server-side rendering: Creates a new QueryClient instance each time
 * - For client-side: Reuses a singleton QueryClient instance
 * 
 * This approach prevents memory leaks on the server while maintaining
 * a persistent cache on the client.
 * 
 * @returns {QueryClient} QueryClient instance
 */
export default function getQueryClient() {
  if (isServer) {
    // Create new instance for each server request to prevent cross-request state pollution
    return makeQueryClient();
  } else {
    // Reuse or create singleton instance for browser environment
    if (!browserQueryClient) {
      browserQueryClient = makeQueryClient();
    }

    return browserQueryClient;
  }
}
