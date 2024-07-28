import { AppProps } from "next/app";
import { UserProvider } from "@/context/userContext";
import { appWithTranslation } from "next-i18next";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { useState } from "react";
import { useRouter } from "next/router";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "@/styles/globals.css";
import "@/styles/custom.css";

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  const router = useRouter();

  const excludedRoutes = ["/auth/validate-mail/"];

  const isExcludedRoute = excludedRoutes.some((route) =>
    router.pathname.includes(route),
  );

  if (isExcludedRoute) return <Component {...pageProps} />;

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <UserProvider>
          <Component {...pageProps} />
          <SpeedInsights />
        </UserProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default appWithTranslation(MyApp);
