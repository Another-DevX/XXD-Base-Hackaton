import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import PurchaseFlow from "./views/PurchaseFlow";
import Home from "./views/Home";
import Layout from "./Layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


function App() {
  const queryClient = new QueryClient();


  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />

        },
        {
          path: "/ticket",
          element: <PurchaseFlow />,
        },
      ]
    }
  ]);





  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>


  );
}

export default App;


{/* <h1>Hello world</h1>
      <ConnectWalletButton />
      <CryptoElements stripeOnramp={stripeOnrampPromise}>
        {clientSecret && (
          <OnrampElement
            id="onramp-element"
            clientSecret={clientSecret}
            appearance={{ theme: "dark" }}
            onChange={onChange}
            onReady={() => {}}
          />
        )}
      </CryptoElements>
      {message && <div id="onramp-message">{message}</div>} */}