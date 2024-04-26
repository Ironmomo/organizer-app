-- Create DB
CREATE DATABASE IF NOT EXISTS OrganizerDB;
-- Use DB
USE OrganizerDB;

-- task schema
CREATE TABLE IF NOT EXISTS task_table(
    task_id INT auto_increment,
    task_title varchar(50) NOT NULL,
    task_description varchar(250) NOT NULL,
    task_date DATETIME NOT NULL,
    CONSTRAINT PRIMARY KEY (task_id)
);
