const configSwagger = {
  openapi: '3.0.0',
  info: {
    title: 'RentalX Documentation',
    description: 'This is an API Rent',
    version: '1.0.0',
    contact: {
      email: 'johndoe@domain.com',
    },
  },
  paths: {
    '/api/sessions': {
      post: {
        tags: ['Session'],
        summary: 'Authentication user',
        description: 'Authentication user',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: {
                    type: 'string',
                  },
                  password: {
                    type: 'string',
                  },
                },
              },
              example: {
                email: 'johndoe@example.com',
                password: '123456',
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Success',
          },
          400: {
            description: 'Email or password incorrect',
          },
        },
      },
    },
    '/api/refresh-token': {
      post: {
        tags: ['Session'],
        summary: 'Refresh token',
        description: 'Refresh token to user',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  token: {
                    type: 'string',
                  },
                },
              },
              example: {
                token:
                  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFwcC5yZW50eC5kZXYiLCJpYXQiOjE2MzY3NzI2MTgsImV4cCI6MTYzOTM2NDYxOCwic3ViIjoiZDJhNDFjNzktNDU1Yy00YmZmLTlmMzYtZDcyODM4M2Q1ZGRmIn0.-Be_KJorK_TtOb96xF0M9HIWYlfg2CEhsNRVCjR32jY',
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Success',
          },
          400: {
            description: 'jwt malformed or jwt must be provided',
          },
        },
      },
    },
    '/api/password/forgot': {
      post: {
        tags: ['Session'],
        summary: 'Forgot password',
        description: 'Forgot password',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: {
                    type: 'string',
                  },
                },
              },
              example: {
                token: 'johndoe@example.com',
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Success',
          },
          400: {
            description: 'User does not exists',
          },
        },
      },
    },
    '/api/password/reset': {
      post: {
        tags: ['Session'],
        summary: 'Reset password',
        description: 'Reset password',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  password: {
                    type: 'string',
                  },
                },
              },
              example: {
                password: '12345678',
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Success',
          },
          400: {
            description: 'Token invalid or token expired',
          },
        },
      },
    },
    '/api/accounts': {
      post: {
        tags: ['Account'],
        summary: 'Register user',
        description: 'Register user',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                  },
                  email: {
                    type: 'string',
                  },
                  password: {
                    type: 'string',
                  },
                  driver_license: {
                    type: 'string',
                  },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Created',
          },
          400: {
            description: 'User already exists',
          },
        },
      },
    },
    '/api/accounts/avatar': {
      patch: {
        tags: ['Account'],
        summary: 'Upload avatar user',
        description: 'Upload avatar user',
        security: [
          {
            bearerAuth: [],
          },
        ],
        requestBody: {
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                properties: {
                  avatar: {
                    type: 'file',
                  },
                },
              },
            },
          },
        },
        responses: {
          204: {
            description: 'Success with none content',
          },
          400: {
            description: 'User does not exists',
          },
        },
      },
    },
    '/api/categories': {
      post: {
        tags: ['Category'],
        summary: 'Create a category',
        description: 'Create a new category',
        security: [
          {
            bearerAuth: [],
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                  },
                  description: {
                    type: 'string',
                  },
                },
                example: {
                  name: 'Category name sample',
                  description: 'Category description sample',
                },
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Created',
          },
          '500': {
            descriptiom: 'Category already exists.',
          },
        },
      },
      get: {
        tags: ['Category'],
        summary: 'List all categories',
        description: 'List all categories',
        responses: {
          '200': {
            description: 'Success',
          },
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    name: {
                      type: 'string',
                    },
                    description: {
                      type: 'string',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/api/categories/import': {
      post: {
        tags: ['Category'],
        summary: 'Import categories',
        description: 'Import categories',
        security: [
          {
            bearerAuth: [],
          },
        ],
        requestBody: {
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                properties: {
                  file: {
                    type: 'file',
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Success',
          },
          400: {
            description: 'Bad request',
          },
        },
      },
    },
    '/api/categories/{id}': {
      get: {
        tags: ['Category'],
        summary: 'Get a category',
        description: 'Get a category',
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: 'id',
            in: 'header',
            description: 'String ID of the user to retrieve.',
            required: true,
            schema: {
              type: 'string',
              minimum: 1,
            },
          },
        ],
        responses: {
          200: {
            description: 'List a category',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'string',
                    },
                    name: {
                      type: 'string',
                    },
                    description: {
                      type: 'string',
                    },
                    created_at: {
                      type: 'date',
                    },
                    updated_at: {
                      type: 'date',
                    },
                  },
                },
              },
            },
          },
          400: {
            description: 'Category not found',
          },
        },
      },
      put: {
        tags: ['Category'],
        summary: 'Update a category',
        description: 'Update a category',
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: 'id',
            in: 'header',
            description: 'String ID of the user to retrieve.',
            required: true,
            schema: {
              type: 'string',
              minimum: 1,
            },
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                  },
                  description: {
                    type: 'string',
                  },
                },
                example: {
                  name: 'Category update name',
                  description: 'Category update description',
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Success',
          },
          '400': {
            descriptiom: 'Category does not exists',
          },
        },
      },
      delete: {
        tags: ['Category'],
        summary: 'Delete a category',
        description: 'Delete a category',
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: 'id',
            in: 'header',
            description: 'String ID of the user to retrieve.',
            required: true,
            schema: {
              type: 'string',
              minimum: 1,
            },
          },
        ],
        responses: {
          204: {
            description: 'Success with none content',
            400: {
              description: 'Category not found',
            },
          },
        },
      },
    },
    '/api/specifications': {
      get: {
        tags: ['Specification'],
        summary: 'List all Specifications',
        description: 'List all Specifications',
        responses: {
          200: {
            description: 'A list all users',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: {
                        type: 'string',
                      },
                      email: {
                        type: 'string',
                        example: 'Specification Name',
                      },
                      description: {
                        type: 'string',
                        example: 'Specification Description',
                      },
                      created_at: {
                        type: 'date',
                        example: '2021-10-29T06:33:54.341Z',
                      },
                      updated_at: {
                        type: 'date',
                        example: '2021-10-29T06:33:54.341Z',
                      },
                    },
                  },
                },
              },
            },
          },
          400: {
            description: 'User does not administrador.',
          },
        },
      },
      post: {
        tags: ['Specification'],
        summary: 'Create a new Specification',
        description: 'Created new Specification',
        security: [
          {
            bearerAuth: [],
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                  },
                  description: {
                    type: 'string',
                  },
                },
                example: {
                  name: 'Specification name',
                  description: 'Specification description',
                },
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Success with none content',
          },
          '400': {
            descriptiom: 'Specification already exists',
          },
        },
      },
    },
    '/api/cars': {
      post: {
        tags: ['Car'],
        summary: 'Create a new Car',
        description: 'Created new Car',
        security: [
          {
            bearerAuth: [],
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                  },
                  description: {
                    type: 'string',
                  },
                  brand: {
                    type: 'string',
                  },
                  license_plate: {
                    type: 'string',
                  },
                  fine_amount: {
                    type: 'number',
                  },
                  daily_rate: {
                    type: 'number',
                  },
                  category_id: {
                    type: 'string',
                  },
                },
                example: {
                  name: 'Specification name',
                  description: 'Specification description',
                },
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Created no content',
          },
          '400': {
            descriptiom: 'Car already exists',
          },
        },
      },
    },
    '/api/cars/available': {
      get: {
        tags: ['Car'],
        summary: 'List cars available',
        description: 'List all cars available',
        responses: {
          200: {
            description: 'A list all users',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: {
                        type: 'string',
                      },
                      name: {
                        type: 'string',
                        example: 'Car Name',
                      },
                      description: {
                        type: 'string',
                        example: 'Car Description',
                      },
                      brand: {
                        type: 'string',
                        example: 'Brand Car',
                      },
                      license_plate: {
                        type: 'string',
                        example: 'Car license plate',
                      },
                      daily_rate: {
                        type: 'string',
                        example: 'Car daily rate',
                      },
                      fine_amount: {
                        type: 'string',
                        example: 'Car amount',
                      },
                      category_id: {
                        type: 'string',
                        example: 'Car with category id',
                      },
                      created_at: {
                        type: 'date',
                        example: '2021-10-29T06:33:54.341Z',
                      },
                      updated_at: {
                        type: 'date',
                        example: '2021-10-29T06:33:54.341Z',
                      },
                    },
                  },
                },
              },
            },
          },
          400: {
            description: 'No cars registered yet',
          },
        },
      },
    },
    '/api/cars/specifications/{id}': {
      post: {
        tags: ['Car'],
        summary: 'Create Car with Specification',
        description: 'Create Car with Specification',
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: 'id',
            in: 'header',
            description: 'String ID of the user to retrieve.',
            required: true,
            schema: {
              type: 'string',
              minimum: 1,
            },
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  specifications_id: {
                    type: 'string',
                  },
                },
                example: {
                  specifications_id: 'uuid',
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Success',
          },
          '400': {
            descriptiom: 'Specification already exists',
          },
        },
      },
    },
    '/api/cars/images/{id}': {
      post: {
        tags: ['Car'],
        summary: 'Upload Image for Car',
        description: 'Upload Image for Car',
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'Car ID',
            required: true,
            schema: {
              type: 'string',
              minimum: 1,
            },
          },
        ],
        requestBody: {
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                properties: {
                  images: {
                    type: 'array',
                    items: {
                      type: 'string',
                      format: 'binary',
                    },
                  },
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Success',
          },
          '400': {
            descriptiom: 'Car does not exists',
          },
        },
      },
    },
    '/api/rentals': {
      post: {
        tags: ['Rental'],
        summary: 'Create a new Rental',
        description: 'Create a new Rental',
        security: [
          {
            bearerAuth: [],
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  expected_return_date: {
                    type: 'string',
                  },
                  car_id: {
                    type: 'string',
                  },
                },
                example: {
                  expected_return_date: '2021-11-01T06:18:32.518Z',
                  car_id: '0a7646d0-127e-4e7d-8b70-9990379093ef',
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Success',
          },
          '400': {
            descriptiom: 'Rental already exists',
          },
        },
      },
    },
    '/api/rentals/devolution/{id}': {
      post: {
        tags: ['Rental'],
        summary: 'Devolution Rental of Car',
        description: 'Devolution Rental of Car',
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'Car ID',
            required: true,
            schema: {
              type: 'string',
              minimum: 1,
            },
          },
        ],
        responses: {
          '200': {
            description: 'Success',
          },
          '400': {
            descriptiom: 'Rental does not exists',
          },
        },
      },
    },
    '/api/rentals/user': {
      get: {
        tags: ['Rental'],
        summary: 'List Rentals by user',
        description: 'List rentals by user',
        security: [
          {
            bearerAuth: [],
          },
        ],
        responses: {
          '200': {
            description: 'Success',
          },
          '401': {
            descriptiom: 'Token is missign',
          },
        },
      },
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
};

export { configSwagger };
