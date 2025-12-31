-- Create table for caching Google Business reviews
CREATE TABLE public.google_reviews (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    review_id TEXT NOT NULL UNIQUE,
    author_name TEXT NOT NULL,
    profile_photo_url TEXT,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT,
    relative_time TEXT,
    create_time TIMESTAMPTZ,
    fetched_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.google_reviews ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (reviews are public data)
CREATE POLICY "Anyone can view Google reviews" 
ON public.google_reviews 
FOR SELECT 
USING (true);

-- Create policy for service role to manage reviews (edge function)
CREATE POLICY "Service role can manage reviews" 
ON public.google_reviews 
FOR ALL 
USING (auth.role() = 'service_role');

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION public.update_google_reviews_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_google_reviews_updated_at
BEFORE UPDATE ON public.google_reviews
FOR EACH ROW
EXECUTE FUNCTION public.update_google_reviews_updated_at();

-- Create index for faster queries
CREATE INDEX idx_google_reviews_fetched_at ON public.google_reviews(fetched_at DESC);
CREATE INDEX idx_google_reviews_rating ON public.google_reviews(rating);