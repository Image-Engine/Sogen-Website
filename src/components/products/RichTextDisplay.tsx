import { cn } from "@/lib/utils";

interface RichTextDisplayProps {
  html: string;
  className?: string;
}

export function RichTextDisplay({ html, className }: RichTextDisplayProps) {
  if (!html) {
    return <p className="text-muted-foreground">No description available.</p>;
  }

  return (
    <div
      className={cn(
        "prose prose-sm max-w-none",
        "prose-headings:text-foreground prose-headings:font-semibold",
        "prose-p:text-muted-foreground prose-p:leading-relaxed",
        "prose-strong:text-foreground prose-strong:font-semibold",
        "prose-ul:text-muted-foreground prose-ol:text-muted-foreground",
        "prose-li:marker:text-primary",
        "prose-a:text-primary prose-a:no-underline hover:prose-a:underline",
        "[&>*:first-child]:mt-0 [&>*:last-child]:mb-0",
        className
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
