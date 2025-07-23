// import swaggerJSDoc from "swagger-jsdoc";

// const options: swaggerJSDoc.Options = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "SmeGear Backend Endpoints",
//       version: "1.0.0",
//     },
//     servers: [
//       {
//         url: "https://smegear.vercel.app", 
//         description: "Production server",
//       },
//       {
//         url: "http://localhost:3000",
//         description: "Local dev server",
//       },
//     ],
//   },
//   apis: ["./app/api/**/*.ts"], 
// };

// export const swaggerSpec = swaggerJSDoc(options);


// lib/swagger.ts

import { createSwaggerSpec } from 'next-swagger-doc';

export function getApiDocs() {
  return createSwaggerSpec({
    apiFolder: './app/api', 
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'SMEGear API Docs',
        version: '1.0',
      },
      servers: [
      {
        url: "https://smegear.vercel.app", 
        description: "Production server",
      },
      {
        url: "http://localhost:3000",
        description: "Local dev server",
      },
      ]
    
    },
  });
}
