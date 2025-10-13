export const THEME_CONSTANTS = {
  COLORS: {
    PRIMARY: "purple.600",
    PRIMARY_HOVER: "purple.700",
    PRIMARY_ACTIVE: "purple.800",
    SECONDARY: "purple.50",
    ACCENT: "purple.500",
    TEXT_PRIMARY: "gray.900",
    TEXT_SECONDARY: "gray.600",
    TEXT_MUTED: "gray.400",
    BACKGROUND_LIGHT: "gray.50",
    BACKGROUND_DARK: "gray.900",
    WHITE: "white",
  },

  SPACING: {
    XS: 2,
    SM: 4,
    MD: 6,
    LG: 8,
    XL: 12,
    XXL: 16,
    SECTION: 20,
  },

  RADIUS: {
    SM: "sm",
    MD: "md",
    LG: "lg",
    XL: "xl",
    FULL: "full",
  },

  SHADOWS: {
    SM: "sm",
    MD: "md",
    LG: "lg",
    XL: "xl",
  },

  GRADIENTS: {
    HERO: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    PRIMARY: "linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)",
    SECONDARY: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
  },

  FONT_SIZES: {
    SM: "sm",
    MD: "md",
    LG: "lg",
    XL: "xl",
    "2XL": "2xl",
    "3XL": "3xl",
    "4XL": "4xl",
  },

  SIZES: {
    SM: "sm",
    MD: "md",
    LG: "lg",
    XL: "xl",
  },

  BREAKPOINTS: {
    MOBILE: "base",
    TABLET: "md",
    DESKTOP: "lg",
    LARGE: "xl",
  },
} as const;
