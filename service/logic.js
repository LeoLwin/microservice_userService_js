const repo = require('./repository');
const Response = require('../helper/responseStatus');

const listBlogs = async (current = 1, limit = 10) => {
  const page = Math.max(Number(current), 1);
  const perPage = Math.max(Number(limit), 1);

  const blogs = await repo.findAll();
  const total = blogs.length;

  if (total === 0) {
    return Response.NOT_FOUND('No blogs found');
  }

  const startIndex = (page - 1) * perPage;
  const paginatedBlogs = blogs.slice(startIndex, startIndex + perPage);

  const data = {
    list: paginatedBlogs,
    pagination: {
      current: page,
      limit: perPage,
      totalPages: Math.ceil(total / perPage),
      totalRows: total,
    },
  };

  return Response.OK(data, 'Blogs fetched successfully');
};

const getBlog = async (id) => {
  const blog = await repo.findById(id);

  if (!blog) {
    return Response.NOT_FOUND('Blog not found');
  }

  return Response.OK(blog, 'Blog fetched successfully');
};

const createBlog = async (payload = {}) => {
  const blog = await repo.create(payload);

  if (!blog) {
    return Response.NOT_IMPLEMENTED('Blog could not be created');
  }

  return Response.OK(blog, 'Blog created successfully');
};

const updateBlog = async (id, payload = {}) => {
  const blog = await repo.update(id, payload);

  if (!blog) {
    return Response.NOT_FOUND('Blog not found');
  }

  return Response.OK(blog, 'Blog updated successfully');
};

const deleteBlog = async (id) => {
  const blog = await repo.remove(id);

  if (!blog) {
    return Response.NOT_FOUND('Blog not found');
  }

  return Response.OK(blog, 'Blog deleted successfully');
};

module.exports = {
  listBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
};
