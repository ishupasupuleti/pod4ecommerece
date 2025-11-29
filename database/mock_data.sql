-- Mock Product Data for E-Commerce
-- Run this SQL in your Supabase SQL Editor after running schema.sql
-- This will insert sample products for testing

-- Insert Mock Products
INSERT INTO products (name, description, price, category, image_url, stock) VALUES
-- Electronics
('iPhone 15 Pro', 'Latest iPhone with A17 Pro chip, 48MP camera, and titanium design. Available in multiple storage options.', 999.99, 'Electronics', 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500', 50),
('Samsung Galaxy S24', 'Flagship Android phone with AI features, 200MP camera, and 120Hz display. Premium design and performance.', 899.99, 'Electronics', 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500', 45),
('MacBook Pro 16"', 'Powerful laptop with M3 Pro chip, 16-inch Liquid Retina display, and up to 22 hours battery life.', 2499.99, 'Electronics', 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500', 30),
('Sony WH-1000XM5', 'Premium noise-cancelling headphones with 30-hour battery, LDAC support, and exceptional sound quality.', 399.99, 'Electronics', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500', 75),
('iPad Air', 'Versatile tablet with M2 chip, 10.9-inch display, and Apple Pencil support. Perfect for work and creativity.', 599.99, 'Electronics', 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500', 60),

-- Clothing
('Classic White T-Shirt', '100% cotton premium t-shirt. Comfortable fit, breathable fabric, perfect for everyday wear. Available in multiple sizes.', 29.99, 'Clothing', 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500', 200),
('Denim Jeans', 'Classic blue denim jeans with stretch comfort. Durable fabric, modern fit, perfect for casual occasions.', 79.99, 'Clothing', 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500', 150),
('Leather Jacket', 'Genuine leather jacket with quilted lining. Stylish design, perfect for cool weather. Available in black and brown.', 299.99, 'Clothing', 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500', 40),
('Running Shoes', 'Lightweight running shoes with cushioned sole and breathable mesh upper. Perfect for jogging and workouts.', 129.99, 'Clothing', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500', 100),
('Winter Coat', 'Warm winter coat with down insulation. Waterproof exterior, perfect for cold weather. Multiple color options.', 199.99, 'Clothing', 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=500', 80),

-- Home & Kitchen
('Coffee Maker', 'Programmable coffee maker with 12-cup capacity. Auto shut-off, reusable filter, and thermal carafe.', 89.99, 'Home & Kitchen', 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=500', 60),
('Air Fryer', 'Large capacity air fryer with digital display. Healthy cooking with 80% less oil. Multiple cooking presets.', 149.99, 'Home & Kitchen', 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e4?w=500', 45),
('Stand Mixer', 'Professional stand mixer with 5.5-quart bowl. Multiple attachments included. Perfect for baking enthusiasts.', 349.99, 'Home & Kitchen', 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=500', 25),
('Bedding Set', 'Luxury cotton bedding set with pillowcases and duvet cover. Soft, breathable, and machine washable.', 79.99, 'Home & Kitchen', 'https://images.unsplash.com/photo-1586105251261-72a756497a11?w=500', 90),
('Dining Table Set', 'Modern dining table with 4 chairs. Solid wood construction, elegant design, perfect for small spaces.', 599.99, 'Home & Kitchen', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500', 15),

-- Books
('The Great Gatsby', 'Classic American novel by F. Scott Fitzgerald. Set in the Jazz Age, exploring themes of wealth and love.', 12.99, 'Books', 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500', 500),
('To Kill a Mockingbird', 'Pulitzer Prize-winning novel by Harper Lee. A timeless story of justice and childhood innocence.', 14.99, 'Books', 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500', 450),
('1984', 'Dystopian novel by George Orwell. A powerful warning about totalitarianism and surveillance society.', 13.99, 'Books', 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500', 400),
('Pride and Prejudice', 'Romantic novel by Jane Austen. A classic tale of love, class, and social expectations.', 11.99, 'Books', 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500', 350),
('The Catcher in the Rye', 'Coming-of-age novel by J.D. Salinger. A controversial and influential work of American literature.', 13.49, 'Books', 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500', 300),

-- Sports & Outdoors
('Yoga Mat', 'Premium non-slip yoga mat with carrying strap. Eco-friendly material, perfect for yoga and fitness.', 39.99, 'Sports & Outdoors', 'https://images.unsplash.com/photo-1601925260368-ae2f83d5ab7d?w=500', 120),
('Dumbbell Set', 'Adjustable dumbbell set with weight range 5-50 lbs. Space-saving design, perfect for home gym.', 199.99, 'Sports & Outdoors', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500', 50),
('Tennis Racket', 'Professional tennis racket with carbon fiber frame. Lightweight, powerful, perfect for all skill levels.', 149.99, 'Sports & Outdoors', 'https://images.unsplash.com/photo-1622163642998-8bd907df3a0e?w=500', 70),
('Camping Tent', '4-person camping tent with rainfly. Easy setup, waterproof, perfect for outdoor adventures.', 179.99, 'Sports & Outdoors', 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=500', 40),
('Bicycle', 'Mountain bike with 21-speed gears and front suspension. Durable frame, perfect for trails and city riding.', 499.99, 'Sports & Outdoors', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500', 20),

-- Beauty & Personal Care
('Skincare Set', 'Complete skincare routine with cleanser, toner, serum, and moisturizer. Natural ingredients, for all skin types.', 89.99, 'Beauty & Personal Care', 'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=500', 100),
('Perfume Collection', 'Luxury fragrance set with 3 different scents. Long-lasting, elegant packaging, perfect gift.', 129.99, 'Beauty & Personal Care', 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=500', 80),
('Hair Dryer', 'Professional hair dryer with ionic technology. Fast drying, reduces frizz, multiple heat settings.', 79.99, 'Beauty & Personal Care', 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=500', 60),
('Makeup Brush Set', 'Premium makeup brush set with 12 brushes. Soft synthetic bristles, professional quality.', 49.99, 'Beauty & Personal Care', 'https://images.unsplash.com/photo-1583241805004-4c4e3c3269b5?w=500', 150),
('Face Mask Set', 'Sheet mask set with 10 different varieties. Hydrating, brightening, and anti-aging formulas.', 24.99, 'Beauty & Personal Care', 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500', 200);

-- Verify the data was inserted
SELECT COUNT(*) as total_products FROM products;
SELECT category, COUNT(*) as count FROM products GROUP BY category ORDER BY count DESC;

