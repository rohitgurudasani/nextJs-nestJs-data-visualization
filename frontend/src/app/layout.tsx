import * as React from "react";
import Box from "@mui/material/Box";
import ThemeRegistry from "../components/ThemeRegistry";
import { AuthContextProvider } from "@/components/AuthProvider";
import CustomAppBar from "@/components/CustomAppBar";

export const metadata = {
  title: "Next.js",
  description: "Next.js App Router",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <AuthContextProvider>
            <CustomAppBar />

            <Box
              component="main"
              sx={{
                mt: "74px",
              }}
            >
              {children}
            </Box>
          </AuthContextProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
