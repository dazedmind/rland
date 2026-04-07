"use client";

import { startTransition, useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { cn } from "@/lib/utils";

const DEBOUNCE_MS = 300;

type NewsFeedSearchProps = {
  /** Called with trimmed query after typing pauses (debounced); filtering stays client-side. */
  onDebouncedQueryChange: (query: string) => void;
};

export default function NewsFeedSearch({ onDebouncedQueryChange }: NewsFeedSearchProps) {
  const [expanded, setExpanded] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const debouncedQuery = useDebouncedValue(inputValue.trim(), DEBOUNCE_MS);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const onQueryChangeRef = useRef(onDebouncedQueryChange);
  onQueryChangeRef.current = onDebouncedQueryChange;

  useEffect(() => {
    startTransition(() => {
      onQueryChangeRef.current(debouncedQuery);
    });
  }, [debouncedQuery]);

  useEffect(() => {
    if (expanded) inputRef.current?.focus();
  }, [expanded]);

  const collapseIfFocusOutside = (e: React.FocusEvent<HTMLDivElement>) => {
    const next = e.relatedTarget as Node | null;
    if (next && containerRef.current?.contains(next)) return;
    setExpanded(false);
  };

  return (
    <div
      ref={containerRef}
      role="search"
      aria-expanded={expanded}
      onBlur={collapseIfFocusOutside}
      className={cn(
        // flex-row-reverse: icon stays on the right; width grows left so items before this in the row don’t shift.
        "flex flex-row-reverse items-stretch rounded-full border border-neutral-200 bg-white overflow-hidden shrink-0 h-10",
        "transition-[width] duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] motion-reduce:transition-none"
      )}
      style={{
        width: expanded ? "min(18rem, calc(100vw - 2rem))" : "2.5rem",
      }}
    >
      <button
        type="button"
        aria-label={expanded ? "Search" : "Open search"}
        onClick={() => {
          if (!expanded) setExpanded(true);
        }}
        className="flex shrink-0 w-10 items-center justify-center text-neutral-600 hover:text-primary hover:bg-primary/5 transition-colors cursor-pointer rounded-r-full"
      >
        <Search className="size-4" aria-hidden />
      </button>

      <div
        className={cn("min-w-0 flex flex-1 items-center overflow-hidden", !expanded && "pointer-events-none")}
        aria-hidden={!expanded}
      >
        <input
          ref={inputRef}
          type="search"
          tabIndex={expanded ? 0 : -1}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setExpanded(false);
              inputRef.current?.blur();
            }
          }}
          placeholder="Search articles…"
          aria-label="Search articles"
          className={cn(
            "w-full min-w-0 bg-transparent py-2 pl-3 pr-1 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none",
            "transition-[transform] duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] motion-reduce:transition-none",
            expanded ? "translate-x-0" : "translate-x-3 motion-reduce:translate-x-0"
          )}
        />
      </div>
    </div>
  );
}
