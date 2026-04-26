import type { VercelRequest, VercelResponse } from "@vercel/node";
import { initDB } from "../backend/db/index.js";

let appInstance: any = null;
let dbInitialized = false;

async function getApp() {
  if (appInstance) return appInstance;

  const express = await import("express");
  const cors = await import("cors");

  const app = express.default();

  // Middleware
  app.use(
    cors.default({
      origin: "*",
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization", "userId"],
      credentials: false,
    })
  );
  app.use(express.default.json());

  // Initialize database once
  if (!dbInitialized) {
    try {
      await initDB();
      dbInitialized = true;
    } catch (error) {
      console.error("Failed to initialize database:", error);
    }
  }

  // Import routes
  const authRoutes = (await import("../backend/routes/auth.js")).default;
  const bookingRoutes = (await import("../backend/routes/bookings.js")).default;
  const testimonialRoutes = (await import("../backend/routes/testimonials.js")).default;
  const couponRoutes = (await import("../backend/routes/coupons.js")).default;
  const adminRoutes = (await import("../backend/routes/admin.js")).default;

  // Routes
  app.use("/api/auth", authRoutes);
  app.use("/api/bookings", bookingRoutes);
  app.use("/api/testimonials", testimonialRoutes);
  app.use("/api/coupons", couponRoutes);
  app.use("/api/admin", adminRoutes);

  // Health check
  app.get("/api/health", (req: any, res: any) => {
    res.json({
      status: "ok",
      message: "Backend is running on Vercel serverless",
      timestamp: new Date().toISOString(),
    });
  });

  appInstance = app;
  return app;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    const app = await getApp();
    return app(req, res);
  } catch (error) {
    console.error("API error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
