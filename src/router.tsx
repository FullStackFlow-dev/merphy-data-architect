import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    // Keep trailing slashes as-is: the static prerenderer requests "/route/"
    // and any 307 to "/route" breaks static export (redirects are not followed).
    trailingSlash: "preserve",
  });

  return router;
};
