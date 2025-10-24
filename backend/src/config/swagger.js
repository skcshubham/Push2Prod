const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Push2Prod API",
      version: "1.0.0",
      description: "API documentation for Push2Prod - A Tinder for Developers",
      contact: {
        name: "Shubham",
      },
    },
    servers: [
      {
        url: "http://localhost:8000",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "token",
        },
      },
      schemas: {
        User: {
          type: "object",
          required: ["firstName", "emailId", "password"],
          properties: {
            firstName: {
              type: "string",
              minLength: 2,
              maxLength: 50,
              example: "John",
            },
            lastName: {
              type: "string",
              example: "Doe",
            },
            emailId: {
              type: "string",
              format: "email",
              example: "john.doe@example.com",
            },
            password: {
              type: "string",
              minLength: 8,
              example: "SecurePassword123",
            },
            age: {
              type: "number",
              minimum: 18,
              example: 25,
            },
            gender: {
              type: "string",
              enum: ["male", "female", "others"],
              example: "male",
            },
            photoUrl: {
              type: "string",
              format: "uri",
              example: "https://example.com/photo.jpg",
            },
            about: {
              type: "string",
              example: "Full-stack developer passionate about building amazing applications",
            },
            skills: {
              type: "array",
              items: {
                type: "string",
              },
              example: ["JavaScript", "React", "Node.js", "MongoDB"],
            },
          },
        },
        SignUpRequest: {
          type: "object",
          required: ["firstName", "emailId", "password"],
          properties: {
            firstName: {
              type: "string",
              minLength: 2,
              maxLength: 50,
              example: "John",
            },
            lastName: {
              type: "string",
              example: "Doe",
            },
            emailId: {
              type: "string",
              format: "email",
              example: "john.doe@example.com",
            },
            password: {
              type: "string",
              minLength: 8,
              example: "SecurePassword123",
            },
          },
        },
        LoginRequest: {
          type: "object",
          required: ["emailId", "password"],
          properties: {
            emailId: {
              type: "string",
              format: "email",
              example: "john.doe@example.com",
            },
            password: {
              type: "string",
              example: "SecurePassword123",
            },
          },
        },
        Error: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Error occurred",
            },
          },
        },
      },
    },
    tags: [
      {
        name: "Auth",
        description: "Authentication endpoints",
      },
      {
        name: "Profile",
        description: "User profile management",
      },
      {
        name: "Requests",
        description: "Connection request management",
      },
      {
        name: "Users",
        description: "User discovery and connection requests",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
