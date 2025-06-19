const { pool } = require('../../database')

exports.create = async(name, path, size) => {
    const queury = `INSERT INTO files (name, path) VALUES (?, ?)`;
    return await pool.query(queury, [name, path]);
}