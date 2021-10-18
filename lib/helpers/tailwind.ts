const tailwindConfig = require("./../../tailwind.config");
export const getTailwindColor = (
  color: "primary" | "accent" | "info" | "success" | "danger" | "warn" | "gray"
): {
  light: string;
  DEFAULT: string;
  dark: string;
  50;
  100;
  200;
  300;
  400;
  500;
  600;
  700;
  800;
  900;
} => {
  return tailwindConfig.theme.extend.colors[color];
};
