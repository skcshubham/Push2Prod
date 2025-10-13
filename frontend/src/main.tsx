import { ChakraProvider, createSystem, defaultConfig } from "@chakra-ui/react";

import App from "./App.tsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { theme } from "./theme";

const system = createSystem({
  ...defaultConfig,
  theme: {
    ...defaultConfig.theme,
    ...theme,
  },
  cssVarsRoot: ":host, :root",
});

const style = document.createElement("style");
style.textContent = `
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
  
  @keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: translateY(30px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes countUp {
    0% {
      opacity: 0;
      transform: scale(0.8);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
`;
document.head.appendChild(style);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider value={system}>
      <App />
    </ChakraProvider>
  </StrictMode>
);
