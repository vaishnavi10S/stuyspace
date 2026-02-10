CREATE DATABASE IF NOT EXISTS studyspace_db;
USE studyspace_db;


-- admin table

CREATE TABLE admin (
    admin_id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- students table

CREATE TABLE students (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- resource table (Admin only)

CREATE TABLE resource (
    resource_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    subject VARCHAR(100) NOT NULL,
    file_path VARCHAR(255) NOT NULL,
    uploaded_by_admin INT,
    FOREIGN KEY (uploaded_by_admin) REFERENCES admin(admin_id)
        ON DELETE SET NULL
);

-- student_uploads table

CREATE TABLE student_uploads (
    upload_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    subject VARCHAR(100) NOT NULL,
    file_path VARCHAR(255) NOT NULL,
    FOREIGN KEY (student_id) REFERENCES students(student_id)
        ON DELETE CASCADE
);

-- Insert Admin (Developer) Account

INSERT INTO admin (email, password)
VALUES ('admin@studyspace.com', 'admin123');


-- Test Student Registration (Sample Data)

INSERT INTO students (email, password)
VALUES ('student1@test.com', 'student123');

-- Admin Resource Upload (Public)

INSERT INTO resource (title, subject, file_path, uploaded_by_admin)
VALUES (
  'Pandas Notes',
  'Data Visualization',
  'uploads/unit_1_pandas_lib.docx',
  1
),

(
  'Unit 1 Data Science',
  'Software Project Management',
  'uploads/Unit_1_Data_Science.pptx',
  1
),

(
  'Unit 2 SPM',
  'Software Project Management',
  'uploads/UNIT - 2 SPM.pdf',
  1
),

(
  'Unit 3 SPM',
  'Software Project Management',
  'uploads/unit 3 spm.pptx',
  1
),

(
  'Unit 1 R Programming',
  'R Programming',
  'uploads/Unit 1 R.pptx',
  1
),

(
  'Unit 2 R Programming',
  'R Programming',
  'uploads/Unit 2 R.pptx',
  1
),

(
  'Unit 3 R Programming',
  'R Programming',
  'uploads/Unit 3 R.pptx',
  1
),

(
  'Unit 1 DM',
  'Digital Marketing',
  'uploads/Digital Marketing Unit 1.pptx',
  1
),

(
  'Unit 2 DM',
  'Digital Marketing',
  'uploads/Digital Marketing Unit 2.pptx',
  1
),

(
  'Unit 3 DM',
  'Digital Marketing',
  'uploads/Digital Marketing Unit 3.pptx',
  1
),

(
  'Unit 1 DWDM',
  'Data Warehousing and Data Mining',
  'uploads/Data Warehousing and Data Mining Unit-1.pptx',
  1
),

(
  'Unit 2 DWDM',
  'Data Warehousing and Data Mining',
  'uploads/Data Warehousing and Data Mining Unit-2.pptx',
  1
),

(
  'Unit 3 DWDM',
  'Data Warehousing and Data Mining',
  'uploads/Data Warehousing and Data Mining Unit-3.pptx',
  1
);

-- Student Private Upload

INSERT INTO student_uploads
(student_id, title, subject, file_path)
VALUES (
  1,
  'My Pandas Notes',
  'Data Visualization',
  'uploads/unit_1_pandas_lib.docx'
);

-- Canvas Drawings Table

CREATE TABLE canvas_drawings (
    drawing_id INT AUTO_INCREMENT PRIMARY KEY,
    space_name VARCHAR(200) NOT NULL,
    student_email VARCHAR(100) NOT NULL,
    image_data LONGBLOB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);




