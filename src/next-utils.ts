import next from "next";

const PORT = Number(process.env.PORT) || 3000;

export const nextApp = next({
  dev: process.env.NODE_ENV !== "production",
  port: PORT,
});

// allows self-hosting in Next.js; forward logic to Next.js
export const nextHandler = nextApp.getRequestHandler();
