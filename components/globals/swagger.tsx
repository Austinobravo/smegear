
import Head from "next/head";

export default function SwaggerPage() {
  return (
    <>
      <Head>
        <title>API Docs</title>
        <link
          rel="stylesheet"
          href="https://unpkg.com/swagger-ui-dist/swagger-ui.css"
        />
      </Head>
      <div id="swagger-ui" />
      <script
        src="https://unpkg.com/swagger-ui-dist/swagger-ui-bundle.js"
        defer
        onLoad={() => {
          // @ts-ignore
          window.SwaggerUIBundle({
            url: "/api/swagger",
            dom_id: "#swagger-ui",
          });
        }}
      />
    </>
  );
}
