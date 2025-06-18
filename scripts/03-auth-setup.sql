-- Create a function to handle new user signups
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert user profile
  INSERT INTO public.users (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'New User'),
    COALESCE(NEW.raw_user_meta_data->>'role', 'client')
  );

  -- If user is a freelancer, create freelancer profile
  IF COALESCE(NEW.raw_user_meta_data->>'role', 'client') IN ('freelancer', 'superfreelancer') THEN
    INSERT INTO public.freelancers (user_id, business_name, bio, commission_rate, is_verified)
    VALUES (
      NEW.id,
      COALESCE(NEW.raw_user_meta_data->>'full_name', 'New User') || '''s Business',
      'New freelancer on PayVidi',
      CASE 
        WHEN COALESCE(NEW.raw_user_meta_data->>'role', 'client') = 'superfreelancer' THEN 7.5
        ELSE 10.0
      END,
      CASE 
        WHEN COALESCE(NEW.raw_user_meta_data->>'role', 'client') = 'superfreelancer' THEN true
        ELSE false
      END
    );
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signups
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert demo users for testing
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at, raw_user_meta_data, is_super_admin, role)
VALUES 
  (
    '00000000-0000-0000-0000-000000000001',
    'admin@payvidi.com',
    crypt('admin123', gen_salt('bf')),
    NOW(),
    NOW(),
    NOW(),
    '{"full_name": "PayVidi Admin", "role": "admin"}',
    false,
    'authenticated'
  ),
  (
    '11111111-1111-1111-1111-111111111111',
    'john@designer.com',
    crypt('freelancer123', gen_salt('bf')),
    NOW(),
    NOW(),
    NOW(),
    '{"full_name": "John Smith", "role": "freelancer"}',
    false,
    'authenticated'
  ),
  (
    '22222222-2222-2222-2222-222222222222',
    'sarah@creative.com',
    crypt('super123', gen_salt('bf')),
    NOW(),
    NOW(),
    NOW(),
    '{"full_name": "Sarah Johnson", "role": "superfreelancer"}',
    false,
    'authenticated'
  )
ON CONFLICT (id) DO NOTHING;

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE freelancers ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Users can read their own data
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);

-- Freelancers can manage their own data
CREATE POLICY "Freelancers can view own profile" ON freelancers FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Freelancers can update own profile" ON freelancers FOR UPDATE USING (auth.uid() = user_id);

-- Projects access control
CREATE POLICY "Freelancers can manage own projects" ON projects FOR ALL USING (
  auth.uid() IN (SELECT user_id FROM freelancers WHERE id = projects.freelancer_id)
);

-- Admins can access everything
CREATE POLICY "Admins can access all data" ON users FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);

CREATE POLICY "Admins can access all freelancers" ON freelancers FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);

CREATE POLICY "Admins can access all projects" ON projects FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);

CREATE POLICY "Admins can access all payments" ON payments FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);
