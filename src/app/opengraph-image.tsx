import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Code Snippet Generator";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(to right, #9ec33a, #2487c7, #9ec33a)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px",
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            background: "white",
            backgroundClip: "text",
            color: "transparent",
            marginBottom: 24,
            textAlign: "center",
          }}
        >
          Code Snippet Generator
        </div>
        <div
          style={{
            fontSize: 32,
            color: "white",
            textAlign: "center",
          }}
        >
          Create beautiful code snippets for your social media in seconds
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
