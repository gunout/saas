CREATE TABLE quotes (
  id SERIAL PRIMARY KEY,
  client_id INTEGER REFERENCES users(id),
  professional_id INTEGER REFERENCES professionals(id),
  mobile_home_config JSONB NOT NULL,
  site_info JSONB NOT NULL,
  status VARCHAR(20) CHECK (status IN ('draft', 'sent', 'accepted', 'refused', 'completed')),
  total_price DECIMAL(12,2),
  construction_timeline INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ
);