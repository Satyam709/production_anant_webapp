import { Node, mergeAttributes, type Command } from "@tiptap/core";
import katex from "katex";

export interface MathOptions {
  katexOptions?: katex.KatexOptions;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    mathInline: {
      setMathInline: (content: string) => ReturnType;
    };
    mathBlock: {
      setMathBlock: (content: string) => ReturnType;
    };
  }
}

export const MathInline = Node.create<MathOptions>({
  name: "mathInline",
  group: "inline",
  inline: true,
  atom: true,

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
        default: "",
        parseHTML: (element: HTMLElement) =>
          element.getAttribute("data-content"),
        renderHTML: (attributes: { content: string }) => {
          return {
            "data-content": attributes.content,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'span[data-type="math-inline"]',
        getAttrs: (element) => {
          if (typeof element === "string") return false;
          return {
            content: element.getAttribute("data-content"),
          };
        },
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    const content = node.attrs.content;
    try {
      const rendered = katex.renderToString(content, {
        ...this.options.katexOptions,
        displayMode: false,
      });

      return [
        "span",
        mergeAttributes(HTMLAttributes, {
          "data-type": "math-inline",
          "data-content": content,
          "data-math": "true",
        }),
        ["span", { class: "math-render" }, rendered],
      ];
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Invalid math";
      return [
        "span",
        mergeAttributes(HTMLAttributes, {
          "data-type": "math-inline",
          "data-content": content,
          class: "text-red-500",
          title: errorMsg,
        }),
        ["span", { class: "math-render text-red-500" }, `\\(${content}\\)`],
      ];
    }
  },

  addCommands() {
    return {
      setMathInline:
        (content: string): Command =>
        ({ tr, dispatch }) => {
          if (dispatch) {
            const node = this.type.create({ content });
            tr.replaceSelectionWith(node);
          }
          return true;
        },
    };
  },
});

export const MathBlock = Node.create<MathOptions>({
  name: "mathBlock",

  addOptions() {
    return {
      katexOptions: {
        throwOnError: false,
      },
    };
  },

  group: "block",
  inline: false,
  isolating: true,
  atom: true,

  addAttributes() {
    return {
      content: {
        default: "",
        parseHTML: (element: HTMLElement) =>
          element.getAttribute("data-content"),
        renderHTML: (attributes: { content: string }) => {
          return {
            "data-content": attributes.content,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="math-block"]',
        getAttrs: (element) => {
          if (typeof element === "string") return false;
          return {
            content: element.getAttribute("data-content"),
          };
        },
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    const content = node.attrs.content;
    try {
      const rendered = katex.renderToString(content, {
        ...this.options.katexOptions,
        displayMode: true,
      });

      return [
        "div",
        mergeAttributes(HTMLAttributes, {
          "data-type": "math-block",
          "data-content": content,
          "data-math": "true",
          class: "my-4 text-center",
        }),
        ["div", { class: "math-render" }, rendered],
      ];
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Invalid math";
      return [
        "div",
        mergeAttributes(HTMLAttributes, {
          "data-type": "math-block",
          "data-content": content,
          class: "text-red-500 my-4 text-center",
          title: errorMsg,
        }),
        ["div", { class: "math-render text-red-500" }, `\\[${content}\\]`],
      ];
    }
  },

  addCommands() {
    return {
      setMathBlock:
        (content: string): Command =>
        ({ tr, dispatch }) => {
          if (dispatch) {
            const node = this.type.create({ content });
            tr.replaceSelectionWith(node);
          }
          return true;
        },
    };
  },
});
