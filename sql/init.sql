-- 创建数据库
-- CREATE DATABASE IF NOT EXISTS t387;

-- 使用数据库
USE t387;

-- 创建用户表
CREATE TABLE IF NOT EXISTS users (`id` INT AUTO_INCREMENT PRIMARY KEY, `username` VARCHAR(50) NOT NULL UNIQUE, `password` VARCHAR(255) NOT NULL);

-- 创建角色表
CREATE TABLE IF NOT EXISTS roles (`id` INT AUTO_INCREMENT PRIMARY KEY,`name` VARCHAR(50) NOT NULL UNIQUE);

-- 创建权限表
CREATE TABLE IF NOT EXISTS permissions (`id` INT AUTO_INCREMENT PRIMARY KEY,`name` VARCHAR(50) NOT NULL UNIQUE);

-- 用户与角色的关联表
CREATE TABLE IF NOT EXISTS user_roles (user_id INT,role_id INT,FOREIGN KEY (user_id) REFERENCES users(id),FOREIGN KEY (role_id) REFERENCES roles(id),PRIMARY KEY (user_id, role_id));

-- 角色与权限的关联表
CREATE TABLE IF NOT EXISTS role_permissions (role_id INT,permission_id INT,FOREIGN KEY (role_id) REFERENCES roles(id),FOREIGN KEY (permission_id) REFERENCES permissions(id),PRIMARY KEY (role_id, permission_id));
