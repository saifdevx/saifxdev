ALTER TABLE public.contact_submissions
  ADD CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$');

ALTER TABLE public.contact_submissions
  ADD CONSTRAINT name_length CHECK (length(name) <= 100);

ALTER TABLE public.contact_submissions
  ADD CONSTRAINT email_length CHECK (length(email) <= 255);

ALTER TABLE public.contact_submissions
  ADD CONSTRAINT message_length CHECK (length(message) <= 5000);