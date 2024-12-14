import type { NextConfig } from "next";
import { withPigment } from "@pigment-css/nextjs-plugin";
import { createTheme } from "@mui/material";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/**",
      },
    ],
  },
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
