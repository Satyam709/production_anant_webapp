"use client";

import { useEffect } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface BlogPreviewProps {
  content: string;
}

export function BlogPreview({ content }: BlogPreviewProps) {
  useEffect(() => {
    // Find all math elements and render them with KaTeX
    const mathElements = document.querySelectorAll('[data-math="true"]');
    mathElements.forEach((element) => {
      const content = element.getAttribute('data-content');
      if (content) {
        const displayMode = element.getAttribute('data-type') === 'math-block';
        try {
          const rendered = katex.renderToString(content, {
            displayMode,
            throwOnError: false
          });
          const renderDiv = element.querySelector('.math-render');
          if (renderDiv) {
            renderDiv.innerHTML = rendered;
          }
        } catch (error) {
          console.error('KaTeX rendering error:', error);
        }
      }
    });
  }, [content]);

  return (
    <div 
      dangerouslySetInnerHTML={{ __html: content }}
      className="prose prose-sm sm:prose dark:prose-invert max-w-none prose-headings:font-semibold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:my-2 prose-img:rounded-md"
    />
  );
}
