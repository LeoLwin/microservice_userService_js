const mongoose = require('mongoose');
const { Blog } = require('../model/blogModel');
const Response = require('../helper/responseStatus');

const countBlogs = async () => Blog.countDocuments();

const findBlogs = async (page, perPage) => {
  return Blog.find()
    .skip((page - 1) * perPage)
    .limit(perPage)
    .sort({ createdAt: -1 });
};

const creatBlog = async (title, content, session) => {
  const blog = new Blog({ title, content });
  return blog.save({ session });
};

const updateBlog = async (id, title, content, session) => {
  return Blog.findByIdAndUpdate(id, { title, content }, { new: true, session });
};

const deleteBlog = async (id, session) => {
  return Blog.findByIdAndDelete(id, { session });
};

const runInTransaction = async (operations) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const result = await operations(session);
    await session.commitTransaction();
    session.endSession();
    return result;
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    const errorMessage = err instanceof Error ? err.message : String(err);
    return Response.UNKNOWN(errorMessage);
  }
};

module.exports = {
  countBlogs,
  findBlogs,
  creatBlog,
  updateBlog,
  deleteBlog,
  runInTransaction,
};
