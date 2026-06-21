-- Run this once in your Supabase SQL Editor (https://supabase.com/dashboard)
-- Project: cwjzbpbekkxqllkcnxtf

-- ─── PRODUCTS ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS products (
  id         BIGINT PRIMARY KEY,
  emoji      TEXT    DEFAULT '📦',
  name       TEXT    NOT NULL,
  brand      TEXT    DEFAULT '',
  category   TEXT    DEFAULT 'Baby Diapers',
  price      NUMERIC NOT NULL DEFAULT 0,
  old_price  NUMERIC DEFAULT 0,
  badge      TEXT    DEFAULT '',
  rating     NUMERIC DEFAULT 4.5,
  card_bg    TEXT    DEFAULT '#FFFFFF',
  stock      INT     DEFAULT 0,
  sizes      JSONB   DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read products"  ON products FOR SELECT USING (true);
CREATE POLICY "Anon insert products"  ON products FOR INSERT WITH CHECK (true);
CREATE POLICY "Anon update products"  ON products FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Anon delete products"  ON products FOR DELETE USING (true);

INSERT INTO products (id, emoji, name, brand, category, price, old_price, badge, rating, card_bg, stock)
VALUES
  (1,  '👶', 'Pampers New Born (S)',     'Pampers',     'Baby Diapers',   449, 599, 'Best Seller', 4.8, '#FDE8ED', 50),
  (2,  '✨', 'Huggies Wonder Pants (L)', 'Huggies',     'Baby Diapers',   549, 699, 'Top Pick',    4.7, '#E8F4FD', 40),
  (3,  '🌸', 'MamyPoko Pants (XL)',      'MamyPoko',    'Baby Diapers',   399, 499, 'Sale',        4.6, '#F3E8FD', 35),
  (4,  '🏥', 'Friends Adult Diaper (L)', 'Friends',     'Adult Diapers',  349, 429, 'Best Seller', 4.5, '#E8FDF0', 30),
  (5,  '🧻', 'Johnsons Baby Wipes',      'Johnson''s',  'Baby Wipes',     199, 249, 'New Arrival', 4.9, '#FDFDE8', 60),
  (6,  '🌺', 'Stayfree Pads XL',         'Stayfree',    'Sanitary Pads',   89, 110, '',            4.4, '#F3E8FD', 80),
  (7,  '🌿', 'Himalaya Rash Cream',      'Himalaya',    'Rash Cream',     149, 179, 'Best Seller', 4.8, '#E8FDF0', 45),
  (8,  '💧', 'Johnsons Baby Lotion',     'Johnson''s',  'Baby Lotion',    249, 299, '',            4.7, '#E8F4FD', 55),
  (9,  '☁️', 'Johnsons Baby Powder',     'Johnson''s',  'Baby Powder',    189, 220, '',            4.6, '#FDFDE8', 50),
  (10, '🌻', 'Dabur Baby Massage Oil',   'Dabur',       'Baby Oil',       175, 210, 'New Arrival', 4.5, '#FDE8ED', 40)
ON CONFLICT (id) DO NOTHING;

-- ─── LOYALTY SETTINGS ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS loyalty_settings (
  id                 TEXT    PRIMARY KEY DEFAULT 'default',
  signup_points      INT     DEFAULT 50,
  referral_points    INT     DEFAULT 20,
  referrer_points    INT     DEFAULT 50,
  points_mode        TEXT    DEFAULT 'per_rupee',
  rupees_per_point   NUMERIC DEFAULT 10,
  points_per_order   INT     DEFAULT 10,
  silver_discount    NUMERIC DEFAULT 5,
  gold_threshold     INT     DEFAULT 500,
  gold_discount      NUMERIC DEFAULT 10,
  platinum_threshold INT     DEFAULT 1500,
  platinum_discount  NUMERIC DEFAULT 15,
  updated_at         TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE loyalty_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read loyalty"  ON loyalty_settings FOR SELECT USING (true);
CREATE POLICY "Anon insert loyalty"  ON loyalty_settings FOR INSERT WITH CHECK (true);
CREATE POLICY "Anon update loyalty"  ON loyalty_settings FOR UPDATE USING (true) WITH CHECK (true);

INSERT INTO loyalty_settings (id) VALUES ('default') ON CONFLICT (id) DO NOTHING;
