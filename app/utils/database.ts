import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
    "https://vsppwpqrbtitzwgnrfjt.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZzcHB3cHFyYnRpdHp3Z25yZmp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEyMDY2MzgsImV4cCI6MjA3Njc4MjYzOH0.c0HKBCotKITh7d-uzzM0JgGd0hYrKbVVP6VDE33no_w"
);

export default supabase;