import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Loader2, X } from "lucide-react";
import { searchProductsQuick, QuickSearchProduct } from "@/lib/shopify";
import { cn } from "@/lib/utils";

interface SearchAutocompleteProps {
  variant: "desktop" | "mobile";
  placeholder?: string;
  autoFocus?: boolean;
  onSubmitted?: () => void;
  onClose?: () => void;
}

export function SearchAutocomplete({
  variant,
  placeholder = "Search batteries...",
  autoFocus,
  onSubmitted,
  onClose,
}: SearchAutocompleteProps) {
  const [value, setValue] = useState("");
  const [results, setResults] = useState<QuickSearchProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(-1);
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  // Debounced fetch
  useEffect(() => {
    const term = value.trim();
    if (term.length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const ctrl = new AbortController();
    const timer = setTimeout(async () => {
      const r = await searchProductsQuick(term, 6);
      if (!ctrl.signal.aborted) {
        setResults(r);
        setLoading(false);
        setHighlight(-1);
      }
    }, 200);
    return () => {
      ctrl.abort();
      clearTimeout(timer);
    };
  }, [value]);

  // Click outside to close
  useEffect(() => {
    if (variant !== "desktop") return;
    const onDoc = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [variant]);

  const goToProduct = (handle: string) => {
    navigate(`/product/${handle}`);
    setValue("");
    setResults([]);
    setOpen(false);
    onSubmitted?.();
  };

  const goToSearch = (term: string) => {
    const trimmed = term.trim();
    if (!trimmed) return;
    navigate(`/products?search=${encodeURIComponent(trimmed)}`);
    setValue("");
    setResults([]);
    setOpen(false);
    onSubmitted?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((h) => Math.min(h + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => Math.max(h - 1, -1));
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const showDropdown = open && value.trim().length >= 2;

  const dropdown = (
    <div
      className={cn(
        "bg-popover border border-border rounded-lg shadow-lg overflow-hidden",
        variant === "desktop"
          ? "absolute top-full right-0 mt-2 w-80 lg:w-96 z-50"
          : "mt-2 w-full"
      )}
    >
      {loading && (
        <div className="flex items-center justify-center py-6 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin mr-2" />
          Searching...
        </div>
      )}
      {!loading && results.length === 0 && (
        <div className="py-6 text-center text-sm text-muted-foreground">
          No matches for "{value.trim()}"
        </div>
      )}
      {!loading && results.length > 0 && (
        <ul className="max-h-96 overflow-y-auto py-1">
          {results.map((p, i) => (
            <li key={p.id}>
              <button
                type="button"
                onMouseEnter={() => setHighlight(i)}
                onClick={() => goToProduct(p.handle)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 text-left transition-colors",
                  highlight === i ? "bg-accent" : "hover:bg-accent/60"
                )}
              >
                <div className="w-10 h-10 shrink-0 rounded bg-secondary overflow-hidden flex items-center justify-center">
                  {p.imageUrl ? (
                    <img
                      src={p.imageUrl}
                      alt={p.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <Search className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{p.title}</div>
                  {p.vendor && (
                    <div className="text-xs text-muted-foreground truncate">{p.vendor}</div>
                  )}
                </div>
                {p.price && (
                  <div className="text-sm font-semibold shrink-0">
                    ${parseFloat(p.price.amount).toFixed(2)}
                  </div>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
      {!loading && (
        <button
          type="button"
          onClick={() => goToSearch(value)}
          className="w-full px-3 py-2.5 text-sm text-center font-medium border-t border-border hover:bg-accent transition-colors"
        >
          View all results for "{value.trim()}"
        </button>
      )}
    </div>
  );

  return (
    <div ref={containerRef} className={cn("relative", variant === "mobile" && "w-full")}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (highlight >= 0 && results[highlight]) {
            goToProduct(results[highlight].handle);
          } else {
            goToSearch(value);
          }
        }}
        className={cn(
          "flex items-center gap-2",
          variant === "desktop" ? "animate-fade-in" : "relative"
        )}
      >
        {variant === "mobile" && (
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        )}
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          autoFocus={autoFocus}
          className={cn(
            "h-9 text-sm bg-secondary rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-primary/20",
            variant === "desktop"
              ? "w-40 lg:w-56 px-4 shrink-0"
              : "w-full h-10 pl-10 pr-4"
          )}
        />
        {variant === "desktop" && onClose && (
          <button
            type="button"
            onClick={() => {
              setValue("");
              setOpen(false);
              onClose();
            }}
            className="shrink-0 inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-accent transition-colors"
            aria-label="Close search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </form>
      {showDropdown && dropdown}
    </div>
  );
}
