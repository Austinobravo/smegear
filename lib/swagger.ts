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
      ],
      components: {
        securitySchemes: {
          BearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT', 
          },
        },
      },
      security: [
        {
          BearerAuth: [], // applies globally to all endpoints
        },
      ],
    },
  });
}
