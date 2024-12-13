import type { NextConfig } from "next";
import { withPigment } from "@pigment-css/nextjs-plugin";
import { createTheme } from "@mui/material";

const nextConfig: NextConfig = {
  /* config options here */
};

export default withPigment(nextConfig, {
  theme: createTheme({
    cssVariables: {
      colorSchemeSelector: "class",
    },
    colorSchemes: { light: true, dark: true },
    typography: {
      fontFamily: "var(--font-roboto)",
    },
  }),
  transformLibraries: ["@mui/material"],
});
