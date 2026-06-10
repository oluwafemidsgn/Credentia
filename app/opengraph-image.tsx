import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Credentia — Every document for every step of life";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Folder icon SVG — 3-layer purple folder matching the Figma logo-icon
const LOGO_SVG = encodeURIComponent(
  `<svg width="56" height="37" viewBox="0 0 37.1428 24.5" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path opacity="0.34" d="M32.0715 2.5C33.176 2.50004 34.0715 3.39546 34.0715 4.5V22.5C34.0715 23.6045 33.176 24.5 32.0715 24.5H5.07146C3.96689 24.5 3.07146 23.6046 3.07146 22.5V4.5C3.07146 3.39543 3.96689 2.5 5.07146 2.5H17.8215V2C17.8215 0.895431 18.7169 0 19.8215 0H29.0715C30.176 4.33088e-05 31.0715 0.895457 31.0715 2V2.5H32.0715Z" fill="#6F00ED"/>
    <path opacity="0.7" d="M33.8215 3.75C34.926 3.75004 35.8215 4.64546 35.8215 5.75V22.5C35.8215 23.6045 34.926 24.5 33.8215 24.5H3.32146C2.21689 24.5 1.32146 23.6046 1.32146 22.5V5.75C1.32146 4.64543 2.21689 3.75 3.32146 3.75H11.0715V3.25C11.0715 2.14543 11.9669 1.25 13.0715 1.25H22.3215C23.426 1.25004 24.3215 2.14546 24.3215 3.25V3.75H33.8215Z" fill="#6F00ED"/>
    <path d="M35.1432 5.5C36.315 5.50003 37.2352 6.50337 37.1354 7.6709L35.8531 22.6709C35.7644 23.7054 34.8983 24.5 33.86 24.5H3.28281C2.24445 24.5 1.37835 23.7054 1.28965 22.6709L0.00742237 7.6709C-0.0924279 6.50342 0.827897 5.50012 1.99961 5.5H3.32188V5C3.32188 3.89543 4.21731 3 5.32188 3H14.5719C15.6763 3.00022 16.5719 3.89557 16.5719 5V5.5H35.1432Z" fill="#6F00ED"/>
  </svg>`
);

const TAB_STYLE = (bg: string): React.CSSProperties => ({
  position: "absolute",
  top: 35,
  backgroundColor: bg,
  borderRadius: "22px 22px 0 0",
  padding: "14px 28px",
  display: "flex",
  alignItems: "center",
});

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          backgroundColor: "#ffffff",
          display: "flex",
          position: "relative",
        }}
      >
        {/* ── Tabs behind card (TRAVEL, CIVIC, LAW) ── */}
        <div style={{ ...TAB_STYLE("#8bcef7"), left: 240 }}>
          <span style={{ color: "#232323", fontSize: 20, fontWeight: 700, letterSpacing: "0.08em" }}>TRAVEL</span>
        </div>
        <div style={{ ...TAB_STYLE("#be3738"), left: 348 }}>
          <span style={{ color: "#ffffff", fontSize: 20, fontWeight: 700, letterSpacing: "0.08em" }}>CIVIC</span>
        </div>
        <div style={{ ...TAB_STYLE("#6f00ed"), left: 440 }}>
          <span style={{ color: "#ffffff", fontSize: 20, fontWeight: 700, letterSpacing: "0.08em" }}>LAW</span>
        </div>

        {/* ── Yellow card body ── */}
        <div
          style={{
            position: "absolute",
            left: 46,
            top: 73,
            width: 1108,
            height: 521,
            backgroundColor: "#efd536",
            borderRadius: 32,
            display: "flex",
          }}
        />

        {/* ── EDUCATION tab — on top of card ── */}
        <div style={{ ...TAB_STYLE("#efd536"), left: 94 }}>
          <span style={{ color: "#232323", fontSize: 20, fontWeight: 700, letterSpacing: "0.08em" }}>EDUCATION</span>
        </div>

        {/* ── Logo (top-right inside card) ── */}
        <div
          style={{
            position: "absolute",
            left: 958,
            top: 138,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`data:image/svg+xml;charset=utf-8,${LOGO_SVG}`}
            width={56}
            height={37}
            alt=""
          />
          <span style={{ fontSize: 22, fontWeight: 700, color: "#351459", letterSpacing: "-1px" }}>
            Credentia
          </span>
        </div>

        {/* ── Headline + subtitle ── */}
        <div
          style={{
            position: "absolute",
            left: 120,
            top: 189,
            width: 640,
            display: "flex",
            flexDirection: "column",
            gap: 28,
          }}
        >
          <div
            style={{
              fontSize: 48,
              fontWeight: 700,
              color: "#292929",
              lineHeight: 1.12,
              letterSpacing: "-1px",
            }}
          >
            A Platform to guide you on the document you need for every phase of your life
          </div>
          <div
            style={{
              fontSize: 24,
              color: "#505050",
              lineHeight: 1.4,
              letterSpacing: "-0.5px",
            }}
          >
            Type it. We'll tell you every document you need, why, and where to get it.
          </div>
        </div>

        {/* ── Credentia.site (bottom-right inside card) ── */}
        <div
          style={{
            position: "absolute",
            left: 963,
            top: 509,
            display: "flex",
          }}
        >
          <span style={{ fontSize: 20, fontWeight: 700, color: "#351459", letterSpacing: "-1px" }}>
            Credentia.site
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
