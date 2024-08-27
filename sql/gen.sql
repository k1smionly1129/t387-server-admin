-- 插入示例用户
INSERT IGNORE INTO users (username, password) VALUES ('admin', 'password123');

-- 插入示例角色
INSERT IGNORE INTO roles (name) VALUES ('admin'), ('user');

-- 插入示例权限
INSERT IGNORE INTO permissions (name) VALUES ('read'), ('write');

-- 分配角色给用户
INSERT IGNORE INTO user_roles (user_id, role_id) VALUES (1, 1);

-- 分配权限给角色
INSERT IGNORE INTO role_permissions (role_id, permission_id) VALUES (1, 1), (1, 2);
