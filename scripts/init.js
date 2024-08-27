const fs = require("fs");
const mysql = require("mysql2");
const dbconfig = require("../config/db.config.json");
// 创建数据库连接
const db = mysql.createConnection({
  host: dbconfig.host,
  user: dbconfig.user,
  password: dbconfig.password,
});

// 连接到数据库
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.stack);
    return;
  }
  console.log("Connected to MySQL database.");

  // 读取 SQL 文件
  fs.readFile("./sql/init.sql", "utf8", (err, sql) => {
    if (err) {
      console.error("Error reading SQL file:", err);
      db.end();
      return;
    }

    // 执行 SQL 文件中的语句
    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error executing SQL:", err);
      } else {
        console.log("SQL executed successfully:", result);
      }
      db.end(); // 关闭数据库连接
    });
  });
});
