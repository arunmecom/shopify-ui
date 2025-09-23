import { useState, useEffect } from 'react';

export function useScrollSpy(ids, options = {}) {
  const {
    rootMargin = '-20% 0% -35% 0%',
    threshold = 0,
  } = options;

  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const elements = ids.map(id => document.getElementById(id)).filter(Boolean);
    
    if (elements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin,
        threshold,
      }
    );

    elements.forEach(element => {
      observer.observe(element);
    });

    return () => {
      elements.forEach(element => {
        observer.unobserve(element);
      });
    };
  }, [ids, rootMargin, threshold]);

  const scrollToElement = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return {
    activeId,
    scrollToElement,
  };
}

export function useTableOfContents(content) {
  const [headings, setHeadings] = useState([]);

  useEffect(() => {
    if (!content) {
      setHeadings([]);
      return;
    }

    // Extract headings from content
    const headingRegex = /^(#{1,6})\s+(.+)$/gm;
    const matches = [...content.matchAll(headingRegex)];
    
    const extractedHeadings = matches.map((match, index) => {
      const level = match[1].length;
      const text = match[2];
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .trim();

      return {
        id,
        text,
        level,
        index,
      };
    });

    setHeadings(extractedHeadings);
  }, [content]);

  const { activeId, scrollToElement } = useScrollSpy(
    headings.map(heading => heading.id)
  );

  return {
    headings,
    activeId,
    scrollToElement,
  };
}
