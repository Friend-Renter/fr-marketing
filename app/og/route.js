// app/og/route.js
import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") || "FR";
  const subtitle = searchParams.get("subtitle") || "Local car rentals made simple";

  // brand colors
  const green = "#427454";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#ffffff",
          color: "#111827",
          padding: "64px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
          <div style={{ width: 20, height: 20, background: green, borderRadius: 4 }} />
          <div style={{ fontSize: 28, fontWeight: 700 }}>FR</div>
        </div>
        <div style={{ fontSize: 56, fontWeight: 800, lineHeight: 1.1 }}>{title}</div>
        <div style={{ marginTop: 18, fontSize: 28, color: "#374151" }}>{subtitle}</div>
        <div
          style={{
            marginTop: 40,
            display: "inline-flex",
            padding: "8px 14px",
            borderRadius: 8,
            border: `2px solid ${green}`,
            color: green,
            fontSize: 22,
            fontWeight: 700,
          }}
        >
          fr.com
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
