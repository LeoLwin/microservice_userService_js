const { ServiceBroker } = require('moleculer');
const logic = require('./logic');
const Response = require('../helper/responseStatus');
const { Blog } = require('../model/blogModel');

const blogService = {
  name: 'blog',
  actions: {
    list: {
      params: {
        current: 'number',
        limit: 'number',
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

          const blog = await Blog.findById(id);

          if (!blog) {
            return Response.NOT_FOUND('Blog not found');
          }

          return Response.OK(blog, 'Blog fetched successfully');
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
      },
      async handler(ctx) {
        const { title, content } = ctx.params;

        try {
          const result = await logic.createBlog(title, content);
          console.log('Result 98', result);
          return result;
        } catch (error) {
          console.error('Error creating blog:', error.message);
          return { message: 'Error creating blog', error: error.message };
        }
      },
    },

    update: {
      params: {
        id: 'string',
        title: { type: 'string', optional: true },
        content: { type: 'string', optional: true },
      },
      async handler(ctx) {
        try {
          const { id, ...updates } = ctx.params;
          const blog = await Blog.findByIdAndUpdate(id, updates, { new: true });

          if (!blog) {
            return Response.NOT_FOUND('Blog not found');
          }

          return Response.OK(blog, 'Blog updated successfully');
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
          const blog = await Blog.findByIdAndDelete(id);

          if (!blog) {
            return Response.NOT_FOUND('Blog not found');
          }

          return Response.OK(blog, 'Blog deleted successfully');
        } catch (error) {
          console.error('Error deleting blog:', error.message);
          return Response.UNKNOWN(error.message);
        }
      },
    },
  },
};

module.exports = blogService;
