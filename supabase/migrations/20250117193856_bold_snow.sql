/*
  # Initial Schema Setup

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key)
      - `wallet_address` (text, unique)
      - `created_at` (timestamp)
      - `last_login` (timestamp)
      - `coins` (bigint)
      - `click_power` (int)
      - `auto_click_power` (int)
    
    - `upgrades`
      - `id` (uuid, primary key)
      - `profile_id` (uuid, foreign key)
      - `type` (text)
      - `level` (int)
      - `created_at` (timestamp)
    
    - `referrals`
      - `id` (uuid, primary key)
      - `referrer_id` (uuid, foreign key)
      - `referred_id` (uuid, foreign key)
      - `created_at` (timestamp)
      - `status` (text)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_address text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  last_login timestamptz DEFAULT now(),
  coins bigint DEFAULT 0,
  click_power int DEFAULT 1,
  auto_click_power int DEFAULT 0
);

-- Upgrades table
CREATE TABLE IF NOT EXISTS upgrades (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  type text NOT NULL,
  level int DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Referrals table
CREATE TABLE IF NOT EXISTS referrals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  referred_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  status text DEFAULT 'pending'
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE upgrades ENABLE ROW LEVEL SECURITY;
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT
  USING (wallet_address = current_user);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (wallet_address = current_user);

CREATE POLICY "Users can read own upgrades"
  ON upgrades FOR SELECT
  USING (
    profile_id IN (
      SELECT id FROM profiles WHERE wallet_address = current_user
    )
  );

CREATE POLICY "Users can create own upgrades"
  ON upgrades FOR INSERT
  WITH CHECK (
    profile_id IN (
      SELECT id FROM profiles WHERE wallet_address = current_user
    )
  );

CREATE POLICY "Users can read referrals"
  ON referrals FOR SELECT
  USING (
    referrer_id IN (
      SELECT id FROM profiles WHERE wallet_address = current_user
    ) OR
    referred_id IN (
      SELECT id FROM profiles WHERE wallet_address = current_user
    )
  );