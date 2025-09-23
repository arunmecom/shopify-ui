import { useState, useEffect, useCallback } from 'react';

export function useSearch(posts = [], options = {}) {
  const {
    debounceMs = 300,
    minQueryLength = 2,
    maxResults = 10,
  } = options;

  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState('');

  // Debounce the search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [query, debounceMs]);

  // Perform search when debounced query changes
  useEffect(() => {
    if (!debouncedQuery || debouncedQuery.length < minQueryLength) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    const searchResults = posts
      .filter(post => {
        const searchTerm = debouncedQuery.toLowerCase();
        const title = post.frontmatter.title?.toLowerCase() || '';
        const description = post.frontmatter.description?.toLowerCase() || '';
        const content = post.content?.toLowerCase() || '';
        const tags = post.frontmatter.tags?.join(' ').toLowerCase() || '';

        return (
          title.includes(searchTerm) ||
          description.includes(searchTerm) ||
          content.includes(searchTerm) ||
          tags.includes(searchTerm)
        );
      })
      .map(post => ({
        ...post,
        relevanceScore: calculateRelevanceScore(post, debouncedQuery),
      }))
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, maxResults);

    setResults(searchResults);
    setIsSearching(false);
  }, [debouncedQuery, posts, minQueryLength, maxResults]);

  const search = useCallback((searchQuery) => {
    setQuery(searchQuery);
  }, []);

  const clearSearch = useCallback(() => {
    setQuery('');
    setResults([]);
  }, []);

  return {
    query,
    results,
    isSearching,
    search,
    clearSearch,
    hasResults: results.length > 0,
  };
}

function calculateRelevanceScore(post, query) {
  const searchTerm = query.toLowerCase();
  let score = 0;

  // Title match gets highest score
  if (post.frontmatter.title?.toLowerCase().includes(searchTerm)) {
    score += 10;
  }

  // Description match gets medium score
  if (post.frontmatter.description?.toLowerCase().includes(searchTerm)) {
    score += 5;
  }

  // Tag match gets medium score
  if (post.frontmatter.tags?.some(tag => tag.toLowerCase().includes(searchTerm))) {
    score += 5;
  }

  // Content match gets lower score
  if (post.content?.toLowerCase().includes(searchTerm)) {
    score += 1;
  }

  return score;
}
