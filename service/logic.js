const repo = require('./repository');
const Response = require('../helper/responseStatus');

const listBlogs = async (current = 1, limit = 10) => {
  const page = Math.max(Number(current), 1);
  const perPage = Math.max(Number(limit), 1);

  const total = await repo.countBlogs();

  if (total === 0) {
    return Response.NOT_FOUND('No blogs found');
  }

  const blogs = await repo.findBlogs(page, perPage);

  const data = {
    by: blogs,
    pagination: {
      current: page,
      limit: perPage,
      rowsPerPage: Math.ceil(total / perPage),
      total,
    },
  };

  return Response.OK(data, 'Blogs fetched successfully');
};

const createBlog = async (title, content) => {
  return repo.runInTransaction(async (session) => {
    const blog = await repo.creatBlog(title, content, session);
    console.log('Created Blog :', blog);

    if (!blog || !blog._id) {
      return Response.NOT_IMPLEMENTED('Blog could not be created');
    }

    return Response.OK(blog, 'Blog created successfully');
  });
};

module.exports = {
  listBlogs,
  createBlog,
};
