import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { fetchArticleByHandle, ShopifyArticle } from "@/lib/shopify";
import { Calendar, ArrowLeft, User } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export default function BlogArticle() {
  const { handle } = useParams<{ handle: string }>();
  const [article, setArticle] = useState<ShopifyArticle['node'] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadArticle() {
      if (!handle) return;
      setIsLoading(true);
      const data = await fetchArticleByHandle('faq', handle);
      setArticle(data);
      setIsLoading(false);
    }
    loadArticle();
  }, [handle]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-NZ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <article className="py-16 md:py-24">
          <div className="container max-w-3xl">
            <Skeleton className="h-8 w-32 mb-8" />
            <Skeleton className="h-12 w-full mb-4" />
            <Skeleton className="h-6 w-48 mb-8" />
            <Skeleton className="aspect-[16/9] rounded-xl mb-12" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </article>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="py-24 text-center">
          <div className="container">
            <h1 className="text-2xl font-bold mb-4">Article not found</h1>
            <p className="text-muted-foreground mb-8">The article you're looking for doesn't exist or has been removed.</p>
            <Link to="/blog">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <article className="py-16 md:py-24">
        <div className="container max-w-3xl">
          {/* Back link */}
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            {article.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-8 pb-8 border-b border-border">
            <span className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {formatDate(article.publishedAt)}
            </span>
            {article.author && (
              <span className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {article.author.name}
              </span>
            )}
          </div>

          {/* Featured Image */}
          {article.image && (
            <div className="aspect-[16/9] rounded-xl overflow-hidden bg-secondary/50 mb-12">
              <img
                src={article.image.url}
                alt={article.image.altText || article.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Content */}
          <div 
            className="prose prose-lg max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-p:text-muted-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-strong:text-foreground"
            dangerouslySetInnerHTML={{ __html: article.contentHtml }}
          />

          {/* Back to blog */}
          <div className="mt-16 pt-8 border-t border-border">
            <Link to="/blog">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to all articles
              </Button>
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
