
-- Drop the old broken SELECT policy if it exists
DROP POLICY IF EXISTS "Admins can view submissions" ON public.contact_submissions;

-- Create a proper deny-all SELECT policy (no one can read via API)
CREATE POLICY "No public read access"
  ON public.contact_submissions
  FOR SELECT
  TO anon, authenticated
  USING (false);
