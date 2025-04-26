"use client";

import { useEditor, EditorContent, JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorMenuBar } from "@/components/blogs/editor/editor-menu-bar";
import { MathInline, MathBlock } from "@/extensions/math-extension";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

export interface EditorProps {
  content?: string;
  onChange?: (html: string, json: JSONContent) => void;
  placeholder?: string;
  className?: string;
  readOnly?: boolean;
}

export default function TiptapEditor({
  content = "",
  onChange,
  placeholder = "Start writing your mathematics blog...",
  className,
  readOnly = false,
}: EditorProps) {
  const [mounted, setMounted] = useState(false);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
        bulletList: {
          HTMLAttributes: {
            class: 'list-disc ml-4 my-4 space-y-1',
          },
          keepMarks: true,
          keepAttributes: true,
        },
        orderedList: {
          HTMLAttributes: {
            class: 'list-decimal ml-4 my-4 space-y-1',
          },
          keepMarks: true,
          keepAttributes: true,
        },
        listItem: {
          HTMLAttributes: {
            class: 'pl-1 my-1',
          },
        },
        blockquote: {
          HTMLAttributes: {
            class: 'border-l-4 border-primary-purple pl-4 my-4'
          }
        },
        codeBlock: {
          HTMLAttributes: {
            class: 'bg-[#1a1a1a] rounded-md p-4 my-4'
          }
        },
        horizontalRule: {
          HTMLAttributes: {
            class: 'border-t border-gray-600 my-8'
          }
        },
      }),
      Underline,
      Superscript,
      Subscript,
      TextAlign.configure({
        types: ["heading", "paragraph", "image"],
        alignments: ["left", "center", "right"],
        defaultAlignment: 'left',
      }),
      Image.configure({
        inline: true,
        HTMLAttributes: {
          class: "rounded-lg max-w-full mx-auto my-4",
          contenteditable: false,
        },
        allowBase64: true,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      MathInline,
      MathBlock,
      Placeholder.configure({
        placeholder,
        showOnlyCurrent: false,
      }),
    ],
    content,
    editorProps: {
      handleDrop: (view, event, slice, moved) => {
        const isImage = event.dataTransfer?.files[0]?.type.startsWith('image');
        if (!moved && isImage) {
          return true;
        }
        return false;
      },
      handleKeyDown: (view, event) => {
        if (event.key === 'Enter') {
          const { state } = view;
          const { selection } = state;
          const { $from } = selection;
          const node = $from.node();

          if (node.type.name === 'heading') {
            event.preventDefault();
            // Create a new paragraph after heading
            view.dispatch(
              state.tr
                .split(selection.$to.pos, 1, [{ type: view.state.schema.nodes.paragraph }])
                .scrollIntoView()
            );
            return true;
          }

          if (node.type.name === 'list_item' && node.textContent === '') {
            // Exit list when Enter is pressed on empty list item
            const range = $from.blockRange(selection.$to);
            if (range) {
              view.dispatch(state.tr.lift(range, 0));
              return true;
            }
          }
        }

        if (event.key === 'Backspace') {
          const { empty, anchor } = view.state.selection;
          const node = view.state.doc.nodeAt(anchor);
          if (empty && node?.type.name === 'image') {
            return true;
          }
        }
        return false;
      },
      handleClick: (view, pos, event) => {
        const node = view.state.doc.nodeAt(pos);
        if (node?.type.name === 'image') {
          event.preventDefault();
          return true;
        }
        return false;
      },
      attributes: {
        class: cn(
          "prose prose-sm sm:prose dark:prose-invert focus:outline-none max-w-none",
          "prose-headings:tracking-tight",
          "prose-p:my-2 prose-img:rounded-md prose-img:my-4 prose-img:mx-auto",
          "prose-pre:bg-[#1a1a1a] prose-code:text-white",
          "prose-blockquote:border-l-primary-purple prose-blockquote:text-gray-300",
          "prose-ul:ml-4 prose-ul:space-y-1",
          "prose-ol:ml-4 prose-ol:space-y-1",
          "prose-li:my-1",
          "[&_.ProseMirror-selectednode]:ring-2 [&_.ProseMirror-selectednode]:ring-primary-purple",
          "[&>ul]:mt-4 [&>ol]:mt-4 [&>ul]:mb-4 [&>ol]:mb-4",
          // Heading styles
          "[&_h1]:text-4xl [&_h1]:font-bold [&_h1]:my-6 [&_h1]:tracking-tight [&_h1]:text-white",
          "[&_h2]:text-3xl [&_h2]:font-bold [&_h2]:my-5 [&_h2]:tracking-tight [&_h2]:text-white",
          "[&_h3]:text-2xl [&_h3]:font-bold [&_h3]:my-4 [&_h3]:tracking-tight [&_h3]:text-white",
          "[&_h1]:mt-10 [&_h2]:mt-8 [&_h3]:mt-6",
          "[&_h1]:mb-6 [&_h2]:mb-5 [&_h3]:mb-4"
        ),
      },
    },
    onUpdate: ({ editor }) => {
      if (onChange) {
        onChange(editor.getHTML(), editor.getJSON());
      }
    },
    editable: !readOnly,
    enableInputRules: true,
    enablePasteRules: true,
  });

  // Fix for hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Card
      className={cn(
        "p-4 overflow-hidden bg-[#1a1a1a] border-[#333] text-white",
        className
      )}
    >
      {!readOnly && editor && <EditorMenuBar editor={editor} />}
      <EditorContent
        editor={editor}
        className={cn(
          "min-h-[300px] focus-visible:outline-none p-4",
          readOnly ? "pointer-events-none" : ""
        )}
      />
    </Card>
  );
}
