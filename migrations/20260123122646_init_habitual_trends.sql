--- Create an ENUM for habit types to distinguish between financial and medical/general habits
CREATE TYPE habit_type AS ENUM ('boolean', 'numeric');

-- Table to store the habit definitions
CREATE TABLE habits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL, -- Ties to your auth system
    name TEXT NOT NULL,
    description TEXT,
    h_type habit_type NOT NULL DEFAULT 'boolean',
    goal_value DECIMAL(12, 2), -- Optional goal (e.g., $100 saved or 8 hours sleep)
    category TEXT, -- e.g., 'Finance', 'Health', 'Mental'
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    is_archived BOOLEAN NOT NULL DEFAULT FALSE
);

-- Table to store the actual daily logs
CREATE TABLE habit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    habit_id UUID NOT NULL REFERENCES habits(id) ON DELETE CASCADE,
    entry_date DATE NOT NULL DEFAULT CURRENT_DATE,
    
    -- For 'boolean' habits: 1.0 = Success, 0.0 = Fail
    -- For 'numeric' habits: The actual value (e.g., 50.00)
    logged_value DECIMAL(12, 2) NOT NULL, 
    
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    -- Ensure a user can only have one log per habit per day
    UNIQUE (habit_id, entry_date)
);

-- Indexing for performance as your trends grow
CREATE INDEX idx_habit_logs_date ON habit_logs(entry_date);
CREATE INDEX idx_habits_user ON habits(user_id);