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
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
          HTMLAttributes: {
            class: 'relative cursor-text block',
          },
        },
      }),
      Underline,
      Superscript,
      Subscript,
      TextAlign.configure({
        types: ["heading", "paragraph", "image"],
        alignments: ["left", "center", "right"],
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
          return true; // Let editor handle image drops
        }
        return false;
      },
      handleKeyDown: (view, event) => {
        // Allow writing next to images without removing them
        if (event.key === 'Backspace') {
          const { empty, anchor } = view.state.selection;
          const node = view.state.doc.nodeAt(anchor);
          if (empty && node?.type.name === 'image') {
            return true; // Prevent backspace from deleting image
          }
        }
        return false;
      },
      handleClick: (view, pos, event) => {
        // Prevent accidental image selection/deletion
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
          "prose-headings:font-semibold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl",
          "prose-p:my-2 prose-img:rounded-md prose-img:my-4 prose-img:mx-auto",
          "prose-pre:bg-[#1a1a1a] prose-code:text-white",
          "prose-blockquote:border-l-primary-purple prose-blockquote:text-gray-300",
          "[&_.ProseMirror-selectednode]:ring-2 [&_.ProseMirror-selectednode]:ring-primary-purple"
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
    parseOptions: {
      preserveWhitespace: 'full',
    },
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
