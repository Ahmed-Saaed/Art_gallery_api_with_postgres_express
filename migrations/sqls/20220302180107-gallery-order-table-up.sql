CREATE TABLE gallery_order (
  id SERIAL PRIMARY KEY,
  quantity INTEGER,
  art_id bigint REFERENCES gallery(id),
  order_id bigint REFERENCES orders(id)
);