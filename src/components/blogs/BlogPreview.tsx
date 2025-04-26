"use client";

import { useEffect } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface BlogPreviewProps {
  content: string;
}

export function BlogPreview({ content }: BlogPreviewProps) {
  useEffect(() => {
    console.log(content);
    
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
      className="prose prose-sm sm:prose dark:prose-invert max-w-none prose-headings:tracking-tight prose-p:my-2 prose-img:rounded-md prose-img:my-4 prose-img:mx-auto prose-img:max-w-[600px] prose-img:max-h-[500px] prose-img:object-contain prose-pre:bg-[#1a1a1a] prose-code:text-white prose-blockquote:border-l-primary-purple prose-blockquote:text-gray-300 prose-ul:ml-4 prose-ul:space-y-1 prose-ol:ml-4 prose-ol:space-y-1 prose-li:my-1 [&>ul]:mt-4 [&>ol]:mt-4 [&>ul]:mb-4 [&>ol]:mb-4 [&_h1]:text-4xl [&_h1]:font-bold [&_h1]:my-6 [&_h1]:tracking-tight [&_h1]:text-white [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:my-5 [&_h2]:tracking-tight [&_h2]:text-white [&_h3]:text-2xl [&_h3]:font-bold [&_h3]:my-4 [&_h3]:tracking-tight [&_h3]:text-white [&_h1]:mt-10 [&_h2]:mt-8 [&_h3]:mt-6 [&_h1]:mb-6 [&_h2]:mb-5 [&_h3]:mb-4"
    />
  );
}
