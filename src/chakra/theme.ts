import '@fontsource/open-sans/300.css';
import '@fontsource/open-sans/400.css';
import '@fontsource/open-sans/700.css';
import { extendTheme } from "@chakra-ui/react"

// 2. Call `extendTheme` and pass your custom values
export const theme = extendTheme({
  colors: {
    brand: {
      100: "#1a1b1d",
      200: "#f6f6f6",
    },
  },
  fonts: {
    body: "Open Sans, sans-serif",
  },
  styles: {
    global: () => ({
      body: {
        bg: "#1a1b1d",
      },
    }),
  },
  components: {
    // Button
  },
})