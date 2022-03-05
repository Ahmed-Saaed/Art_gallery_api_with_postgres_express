CREATE TABLE gallery_order (
  id SERIAL PRIMARY KEY,
  quantity INTEGER,
  art_id bigint REFERENCES gallery(id) ON UPDATE CASCADE ON DELETE CASCADE,
  order_id bigint REFERENCES orders(id) ON UPDATE CASCADE ON DELETE CASCADE
);