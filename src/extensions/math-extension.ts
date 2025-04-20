import { Extension } from '@tiptap/core';
import katex from 'katex';

export interface MathOptions {
  katexOptions?: katex.KatexOptions;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    math: {
      setMathInline: (content: string) => ReturnType;
      setMathBlock: (content: string) => ReturnType;
    };
  }
}

export const MathInline = Extension.create<MathOptions>({
  name: 'mathInline',

  addOptions() {
    return {
      katexOptions: {
        throwOnError: false,
      },
    };
  },

  addAttributes() {
    return {
      content: {
        default: '',
        parseHTML: (element:any) => element.getAttribute('data-content'),
        renderHTML: (attributes:any) => {
          return {
            'data-content': attributes.content,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'span[data-type="math-inline"]',
        getAttrs: (node:any) => {
          if (typeof node === 'string') return null;
          const element = node as HTMLElement;
          return {
            content: element.getAttribute('data-content'),
          };
        },
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }: {node: any , HTMLAttributes: any}) {
    const content = node.attrs.content;
    let renderedContent = '';
    try {
      renderedContent = katex.renderToString(content, {
        ...this.options.katexOptions,
        displayMode: false,
      });
    } catch (error) {
      renderedContent = `<span class="text-red-500">${error}</span>`;
    }

    return [
      'span',
      {
        'data-type': 'math-inline',
        'data-content': content,
        ...HTMLAttributes,
      },
      {
        innerHTML: renderedContent,
      },
    ];
  },

  addCommands() {
    return {
      setMathInline:
        (content: string) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: {
              content,
            },
          });
        },
    };
  },
});

export const MathBlock = Extension.create<MathOptions>({
  name: 'mathBlock',

  addOptions() {
    return {
      katexOptions: {
        throwOnError: false,
      },
    };
  },

  group: 'block',
  content: 'inline*',

  addAttributes() {
    return {
      content: {
        default: '',
        parseHTML: (element:any) => element.getAttribute('data-content'),
        renderHTML: (attributes:any) => {
          return {
            'data-content': attributes.content,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="math-block"]',
        getAttrs: (node:any) => {
          if (typeof node === 'string') return null;
          const element = node as HTMLElement;
          return {
            content: element.getAttribute('data-content'),
          };
        },
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }: {node: any , HTMLAttributes: any}) {
    const content = node.attrs.content;
    let renderedContent = '';
    try {
      renderedContent = katex.renderToString(content, {
        ...this.options.katexOptions,
        displayMode: true,
      });
    } catch (error) {
      renderedContent = `<div class="text-red-500">${error}</div>`;
    }

    return [
      'div',
      {
        'data-type': 'math-block',
        'data-content': content,
        class: 'my-4 text-center',
        ...HTMLAttributes,
      },
      {
        innerHTML: renderedContent,
      },
    ];
  },

  addCommands() {
    return {
      setMathBlock:
        (content: string) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: {
              content,
            },
          });
        },
    };
  },
});