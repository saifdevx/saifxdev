
-- Drop existing broken policies
DROP POLICY IF EXISTS "Admins can view submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Anyone can submit contact form" ON public.contact_submissions;

-- Recreate INSERT policy: anyone can submit but only insert their own data
CREATE POLICY "Anyone can submit contact form"
ON public.contact_submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (
  -- Basic validation: name and email must not be empty
  length(trim(name)) > 0 AND length(trim(email)) > 0 AND length(trim(message)) > 0
);
