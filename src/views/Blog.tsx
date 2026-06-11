import { useEffect, useState } from "react";
import { Link } from "@/lib/router";
import { PageBreadcrumb } from "@/components/layout/PageBreadcrumb";
import { SEOHead } from "@/components/SEOHead";
import { fetchBlogArticles, ShopifyArticle } from "@/lib/shopify";
import { blogIndexUrl } from "@/lib/blogUrls";
import { getBlogFallbackImage } from "@/lib/blogFallbackImages";
import { Calendar, ArrowRight, User } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Blog() {
  const [articles, setArticles] = useState<ShopifyArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadArticles() {
      setIsLoading(true);
      const data = await fetchBlogArticles('faq', 20);
      setArticles(data);
      setIsLoading(false);
    }
    loadArticles();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-NZ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Blog"
        description="News, guides, and tips on LiFePO4 batteries, solar energy, and off-grid power solutions from SOK Battery NZ."
        canonical={blogIndexUrl()}
        ogType="website"
      />
      <PageBreadcrumb />
      {/* Hero Section */}
      <section className="py-16 md:py-24 border-b border-border">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              News & Guides
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Expert insights, tutorials, and updates on lithium battery technology and off-grid power solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 md:py-24">
        <div className="container">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-[16/10] rounded-xl" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              ))}
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No articles found.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <Link
                  key={article.node.id}
                  to={`/FAQ/${article.node.handle}`}
                  className="group block"
                >
                  <article className="h-full flex flex-col">
                    {/* Image */}
                    <div className="aspect-[16/10] rounded-xl overflow-hidden bg-secondary/50 mb-4">
                      <img
                        src={article.node.image?.url || getBlogFallbackImage(article.node.handle)}
                        alt={article.node.image?.altText || article.node.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        {formatDate(article.node.publishedAt)}
                      </span>
                      {article.node.author && (
                        <span className="flex items-center gap-1.5">
                          <User className="h-3.5 w-3.5" />
                          {article.node.author.name}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {article.node.title}
                    </h2>

                    {/* Excerpt */}
                    {article.node.excerpt && (
                      <p className="text-muted-foreground line-clamp-3 flex-1">
                        {article.node.excerpt}
                      </p>
                    )}

                    {/* Read more */}
                    <div className="mt-4 flex items-center gap-2 text-sm font-medium text-primary">
                      Read article
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

    </div>
  );
}
