CREATE TABLE orders (
  id BIGSERIAL PRIMARY KEY,
  status VARCHAR(64),
  user_id bigint REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
);