const mysql = require('mysql2/promise');
require('dotenv').config();
// mysql.createPool()을 사용하여 커넥션 풀을 생성합니다.
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

console.log('MySQL Connection Pool 생성 완료');

// 생성된 풀 객체를 다른 파일에서 사용할 수 있도록 내보냅니다.
module.exports = pool;
