// "use client";

// import SwaggerUI from "swagger-ui-react";
// import "swagger-ui-react/swagger-ui.css";

// export default function SwaggerPage() {
//   return (
//     <SwaggerUI url="/api/swagger" />
//   );
// }

// "use client";

// import { RedocStandalone } from "redoc";

// export default function SwaggerPage() {
//   return (
//     <RedocStandalone
//       specUrl="/api/swagger"
//       options={{
//         theme: {
//           colors: {
//             primary: {
//               main: '#070854', 
//             },
//           },
//         },
//       }}
//     />
//   );
// }
// 'use client';

// import { useEffect, useRef } from 'react';
// import { SwaggerUIBundle } from 'swagger-ui-dist';
// import 'swagger-ui-dist/swagger-ui.css';

// export default function PageContent({ spec }: { spec: any }) {
//   const swaggerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (!swaggerRef.current || !spec) return;
//     SwaggerUIBundle({
//       domNode: swaggerRef.current,
//       spec,
//     });
//   }, []);

//   return <div className="swagger-ui-wrapper" ref={swaggerRef} />;
// }

// "use client";

// import { useEffect, useRef } from "react";
// import { getAbsoluteFSPath } from "swagger-ui-dist";

// export default function SwaggerPage() {
//   const uiRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const loadSwagger = async () => {
//       const SwaggerUI = await import("swagger-ui");
//       SwaggerUI.default({
//         domNode: uiRef.current!,
//         url: "/api/swagger", // your OpenAPI route
//         // presets: [SwaggerUI.presets.apis],
//         layout: "BaseLayout",
//       });
//     };

//     loadSwagger();
//   }, []);

//   return (
//     <>
//       <link
//         rel="stylesheet"
//         href="https://unpkg.com/swagger-ui-dist/swagger-ui.css"
//       />
//       <div ref={uiRef} className="min-h-screen bg-white" />
//     </>
//   );
// }

import { getApiDocs } from '@/lib/swagger';
import PageContent from './page-content';

export default async function SwaggerPage() {
  const spec = getApiDocs();
  return <PageContent spec={spec} />;
}

