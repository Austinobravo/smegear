import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "SmeGear Backend Endpoints",
      version: "1.0.0",
    },
  },
  apis: ["./app/api/**/*.ts"], 
};

export const swaggerSpec = swaggerJSDoc(options);
