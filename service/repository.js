import pool from '../helper/dbConnect.js';

const findAll = async () => {
  let connection;
  try {
    connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM blogs ORDER BY id DESC');
    return rows;
  } catch (err) {
    console.error('findAll error:', err.message);
    throw err;
  } finally {
    if (connection) connection.release();
  }
};

const findById = async (id) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM blogs WHERE id = ?', [Number(id)]);
    return rows[0] ?? null;
  } catch (err) {
    console.error('findById error:', err.message);
    throw err;
  } finally {
    if (connection) connection.release();
  }
};

const create = async (payload = {}) => {
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    const [result] = await connection.query(
      'INSERT INTO blogs (title, content, image) VALUES (?, ?, ?)',
      [payload.title ?? '', payload.content ?? '', payload.image ?? null]
    );

    const [rows] = await connection.query('SELECT * FROM blogs WHERE id = ?', [result.insertId]);
    await connection.commit();
    return rows[0] ?? null;
  } catch (err) {
    if (connection) await connection.rollback();
    console.error('create error:', err.message);
    throw err;
  } finally {
    if (connection) connection.release();
  }
};

const update = async (id, payload = {}) => {
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    const [existingRows] = await connection.query('SELECT * FROM blogs WHERE id = ?', [Number(id)]);
    const existing = existingRows[0];

    if (!existing) {
      await connection.rollback();
      return null;
    }

    const title = payload.title ?? existing.title;
    const content = payload.content ?? existing.content;
    const image = payload.image ?? existing.image;

    await connection.query(
      'UPDATE blogs SET title = ?, content = ?, image = ? WHERE id = ?',
      [title, content, image, Number(id)]
    );

    const [updatedRows] = await connection.query('SELECT * FROM blogs WHERE id = ?', [Number(id)]);
    await connection.commit();
    return updatedRows[0] ?? null;
  } catch (err) {
    if (connection) await connection.rollback();
    console.error('update error:', err.message);
    throw err;
  } finally {
    if (connection) connection.release();
  }
};

const remove = async (id) => {
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    const [existingRows] = await connection.query('SELECT * FROM blogs WHERE id = ?', [Number(id)]);
    const existing = existingRows[0];

    if (!existing) {
      await connection.rollback();
      return null;
    }

    await connection.query('DELETE FROM blogs WHERE id = ?', [Number(id)]);
    await connection.commit();
    return existing;
  } catch (err) {
    if (connection) await connection.rollback();
    console.error('remove error:', err.message);
    throw err;
  } finally {
    if (connection) connection.release();
  }
};

const test = () => {
  console.log('This is test function in blog.repository.js');
};

const repository = {
  findAll,
  findById,
  create,
  update,
  remove,
  test,
};

export default repository;