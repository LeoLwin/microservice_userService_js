const logic = require('./logic');
const Response = require('../helper/responseStatus');

const blogService = {
  name: 'blog',
  actions: {
    list: {
      params: {
        current: { type: 'number', optional: true },
        limit: { type: 'number', optional: true },
      },
      async handler(ctx) {
        try {
          const { current, limit } = ctx.params;
          console.log('List Params : ', { current, limit });
          return await logic.listBlogs(current, limit);
        } catch (error) {
          console.error('Error fetching blogs:', error.message);
          return Response.UNKNOWN(error.message);
        }
      },
    },

    get: {
      params: {
        id: 'string',
      },
      async handler(ctx) {
        try {
          const { id } = ctx.params;

          if (!id) {
            return Response.INVALID_ARGUMENT('ID parameter is required');
          }

          return await logic.getBlog(id);
        } catch (error) {
          console.error('Error fetching blog:', error.message);
          return Response.UNKNOWN(error.message);
        }
      },
    },

    create: {
      params: {
        title: 'string',
        content: 'string',
        image: { type: 'string', optional: true },
      },
      async handler(ctx) {
        try {
          const { title, content, image } = ctx.params;
          return await logic.createBlog({ title, content, image });
        } catch (error) {
          console.error('Error creating blog:', error.message);
          return Response.UNKNOWN(error.message);
        }
      },
    },

    update: {
      params: {
        id: 'string',
        title: { type: 'string', optional: true },
        content: { type: 'string', optional: true },
        image: { type: 'string', optional: true },
      },
      async handler(ctx) {
        try {
          const { id, ...updates } = ctx.params;
          return await logic.updateBlog(id, updates);
        } catch (error) {
          console.error('Error updating blog:', error.message);
          return Response.UNKNOWN(error.message);
        }
      },
    },

    delete: {
      params: {
        id: 'string',
      },
      async handler(ctx) {
        try {
          const { id } = ctx.params;
          return await logic.deleteBlog(id);
        } catch (error) {
          console.error('Error deleting blog:', error.message);
          return Response.UNKNOWN(error.message);
        }
      },
    },
  },
};

module.exports = blogService;
