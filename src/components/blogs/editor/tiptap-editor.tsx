"use client";

import { useEditor, EditorContent } from "@tiptap/react";
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
  onChange?: (html: string, json: any) => void;
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
        },
      }),
      Underline,
      Superscript,
      Subscript,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Image,
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
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class: cn(
          "prose prose-sm sm:prose dark:prose-invert focus:outline-none max-w-none",
          "prose-headings:font-semibold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl",
          "prose-p:my-2 prose-img:rounded-md",
          "prose-pre:bg-[#1a1a1a] prose-code:text-white",
          "prose-blockquote:border-l-primary-purple prose-blockquote:text-gray-300"
        ),
      },
    },
    onUpdate: ({ editor }) => {
      if (onChange) {
        onChange(editor.getHTML(), editor.getJSON());
      }
    },
    editable: !readOnly,
  });

  // Fix for hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Card className={cn("p-4 overflow-hidden bg-[#1a1a1a] border-[#333] text-white", className)}>
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
