-- Create inquiries table for Vercel Postgres
CREATE TABLE IF NOT EXISTS inquiries (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(100),
  country VARCHAR(100),
  service VARCHAR(255),
  message TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON inquiries(created_at DESC);