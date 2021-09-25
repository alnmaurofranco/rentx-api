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
    '/api/categories': {
      post: {
        tags: ['Category'],
        summary: 'Create a category',
        description: 'Create a new category',
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
  },
};

export { configSwagger };
