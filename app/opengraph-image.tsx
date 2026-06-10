import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Credentia — Every document for every step of life";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          backgroundColor: "#efd536",
          display: "flex",
          flexDirection: "column",
          padding: "0",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* Category tabs at top */}
        <div style={{ display: "flex", flexDirection: "row", gap: 0, paddingLeft: 48, paddingTop: 0 }}>
          {[
            { label: "EDUCATION", bg: "#efd536", color: "#232323", border: "2px solid #c8b82e" },
            { label: "TRAVEL", bg: "#8bcef7", color: "#232323", border: "none" },
            { label: "CIVIC", bg: "#be3738", color: "#fff", border: "none" },
            { label: "LAW", bg: "#6f00ed", color: "#fff", border: "none" },
          ].map((tab) => (
            <div
              key={tab.label}
              style={{
                backgroundColor: tab.bg,
                color: tab.color,
                fontSize: 18,
                fontWeight: 700,
                letterSpacing: "0.1em",
                paddingTop: 12,
                paddingBottom: 16,
                paddingLeft: 24,
                paddingRight: 24,
                borderRadius: "12px 12px 0 0",
                marginRight: 4,
                border: tab.border,
                borderBottom: "none",
                display: "flex",
                alignItems: "center",
              }}
            >
              {tab.label}
            </div>
          ))}
        </div>

        {/* Main card body */}
        <div
          style={{
            flex: 1,
            backgroundColor: "#efd536",
            borderRadius: "0 24px 24px 24px",
            marginLeft: 48,
            marginRight: 48,
            marginBottom: 48,
            padding: "40px 60px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            boxShadow: "0 2px 40px rgba(0,0,0,0.08)",
          }}
        >
          {/* Top row: logo right */}
          <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 12 }}>
            {/* Folder icon — simplified */}
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              <div
                style={{
                  width: 36,
                  height: 10,
                  backgroundColor: "#6f00ed",
                  borderRadius: "6px 6px 0 0",
                  marginLeft: 16,
                  opacity: 0.9,
                }}
              />
              <div
                style={{
                  width: 56,
                  height: 36,
                  backgroundColor: "#6f00ed",
                  borderRadius: "0 8px 8px 8px",
                }}
              />
            </div>
            <span style={{ fontSize: 28, fontWeight: 700, color: "#351459", letterSpacing: "-0.02em" }}>
              Credentia
            </span>
          </div>

          {/* Headline */}
          <div style={{ display: "flex", flexDirection: "column", gap: 28, flex: 1, justifyContent: "center", paddingTop: 16 }}>
            <div
              style={{
                fontSize: 72,
                fontWeight: 700,
                color: "#232323",
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                maxWidth: 760,
              }}
            >
              A Platform to guide you on the document you need for every phase of your life
            </div>
            <div
              style={{
                fontSize: 26,
                color: "#505050",
                lineHeight: 1.5,
                letterSpacing: "-0.01em",
                maxWidth: 620,
              }}
            >
              Type it. We&apos;ll tell you every document you need, why, and where to get it.
            </div>
          </div>

          {/* Bottom row: url */}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <span style={{ fontSize: 22, fontWeight: 700, color: "#232323", letterSpacing: "-0.02em" }}>
              Credentia.site
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
