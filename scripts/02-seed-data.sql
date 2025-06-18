-- Insert platform settings
INSERT INTO platform_settings (key, value, description) VALUES
('default_commission_rate', '10.0', 'Default commission rate for new freelancers'),
('max_file_size', '500', 'Maximum file size in MB'),
('allowed_file_types', '["jpg", "png", "pdf", "mp4", "mp3", "wav", "psd", "ai"]', 'Allowed file types for upload'),
('preview_duration_limit', '300', 'Maximum preview duration in seconds'),
('download_link_expiry', '168', 'Download link expiry in hours'),
('watermark_enabled', 'true', 'Enable watermarks by default'),
('payment_gateways', '["stripe", "paypal", "razorpay"]', 'Available payment gateways');

-- Insert admin user
INSERT INTO users (id, email, full_name, role) VALUES
('00000000-0000-0000-0000-000000000001', 'admin@payvidi.com', 'PayVidi Admin', 'admin');

-- Insert sample freelancers
INSERT INTO users (id, email, full_name, role) VALUES
('11111111-1111-1111-1111-111111111111', 'john@designer.com', 'John Smith', 'freelancer'),
('22222222-2222-2222-2222-222222222222', 'sarah@creative.com', 'Sarah Johnson', 'superfreelancer'),
('33333333-3333-3333-3333-333333333333', 'mike@developer.com', 'Mike Wilson', 'freelancer');

-- Insert freelancer profiles
INSERT INTO freelancers (id, user_id, subdomain, subdomain_status, business_name, bio, commission_rate, total_earnings, total_projects, approval_rating, is_verified) VALUES
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', 'johndesign', 'approved', 'John Design Studio', 'Professional graphic designer with 5+ years experience', 10.0, 15000.00, 25, 4.8, false),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '22222222-2222-2222-2222-222222222222', 'sarahcreative', 'approved', 'Sarah Creative Agency', 'Award-winning creative director and brand strategist', 7.5, 45000.00, 78, 4.9, true),
('cccccccc-cccc-cccc-cccc-cccccccccccc', '33333333-3333-3333-3333-333333333333', 'mikedev', 'approved', 'Mike Development', 'Full-stack developer specializing in web applications', 10.0, 8500.00, 12, 4.7, false);

-- Insert project folders
INSERT INTO project_folders (id, freelancer_id, name, color) VALUES
('f1111111-1111-1111-1111-111111111111', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Logo Designs', '#FF6B6B'),
('f2222222-2222-2222-2222-222222222222', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Web Designs', '#4ECDC4'),
('f3333333-3333-3333-3333-333333333333', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Brand Identity', '#45B7D1'),
('f4444444-4444-4444-4444-444444444444', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Marketing Materials', '#96CEB4');

-- Insert sample projects
INSERT INTO projects (id, freelancer_id, client_email, client_name, title, description, category, price, status, folder_id, tags) VALUES
('p1111111-1111-1111-1111-111111111111', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'client1@example.com', 'Tech Startup Inc', 'Logo Design for Tech Startup', 'Modern, minimalist logo design for a technology startup', 'Logo Design', 500.00, 'preview_sent', 'f1111111-1111-1111-1111-111111111111', ARRAY['logo', 'tech', 'startup']),
('p2222222-2222-2222-2222-222222222222', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'client2@example.com', 'Restaurant Chain', 'Website Redesign', 'Complete website redesign for restaurant chain', 'Web Design', 2500.00, 'approved', 'f2222222-2222-2222-2222-222222222222', ARRAY['website', 'restaurant', 'redesign']),
('p3333333-3333-3333-3333-333333333333', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'client3@example.com', 'Fashion Brand', 'Brand Identity Package', 'Complete brand identity including logo, colors, typography', 'Branding', 3500.00, 'paid', 'f3333333-3333-3333-3333-333333333333', ARRAY['branding', 'fashion', 'identity']),
('p4444444-4444-4444-4444-444444444444', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'client4@example.com', 'E-commerce Store', 'Custom Web Application', 'Custom e-commerce platform with advanced features', 'Development', 8500.00, 'draft', null, ARRAY['development', 'ecommerce', 'custom']);

-- Insert sample comments
INSERT INTO comments (id, project_id, client_email, client_name, content, timestamp_position, status) VALUES
('c1111111-1111-1111-1111-111111111111', 'p1111111-1111-1111-1111-111111111111', 'client1@example.com', 'Tech Startup Inc', 'Love the concept! Can we try a different color scheme?', null, 'active'),
('c2222222-2222-2222-2222-222222222222', 'p2222222-2222-2222-2222-222222222222', 'client2@example.com', 'Restaurant Chain', 'The navigation looks great. Can we add a reservation system?', null, 'resolved'),
('c3333333-3333-3333-3333-333333333333', 'p3333333-3333-3333-3333-333333333333', 'client3@example.com', 'Fashion Brand', 'Perfect! This captures our brand essence perfectly.', null, 'active');

-- Insert sample payments
INSERT INTO payments (id, project_id, freelancer_id, client_email, amount, commission_amount, freelancer_amount, status, processed_at) VALUES
('pay11111-1111-1111-1111-111111111111', 'p3333333-3333-3333-3333-333333333333', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'client3@example.com', 3500.00, 262.50, 3237.50, 'completed', NOW() - INTERVAL '2 days');

-- Insert sample messages
INSERT INTO messages (id, project_id, sender_email, sender_name, sender_type, content) VALUES
('m1111111-1111-1111-1111-111111111111', 'p1111111-1111-1111-1111-111111111111', 'john@designer.com', 'John Smith', 'freelancer', 'Hi! I''ve uploaded the initial logo concepts. Please take a look and let me know your thoughts.'),
('m2222222-2222-2222-2222-222222222222', 'p1111111-1111-1111-1111-111111111111', 'client1@example.com', 'Tech Startup Inc', 'client', 'Thanks John! The designs look great. I left some feedback on the preview.');

-- Insert activity logs
INSERT INTO activity_logs (user_id, project_id, action, details) VALUES
('11111111-1111-1111-1111-111111111111', 'p1111111-1111-1111-1111-111111111111', 'project_created', '{"project_title": "Logo Design for Tech Startup"}'),
('22222222-2222-2222-2222-222222222222', 'p3333333-3333-3333-3333-333333333333', 'payment_received', '{"amount": 3500.00, "commission": 262.50}'),
('11111111-1111-1111-1111-111111111111', 'p2222222-2222-2222-2222-222222222222', 'preview_approved', '{"client_email": "client2@example.com"}');
