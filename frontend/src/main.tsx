import { ChakraProvider, createSystem, defaultConfig } from "@chakra-ui/react";

import App from "./App.tsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

const system = createSystem(defaultConfig);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider value={system}>
      <App />
    </ChakraProvider>
  </StrictMode>
);
