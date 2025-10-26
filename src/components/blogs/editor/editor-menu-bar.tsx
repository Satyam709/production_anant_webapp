'use client';

import { Editor } from '@tiptap/react';
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Image,
  Italic,
  Link,
  List,
  ListOrdered,
  Quote,
  Redo,
  Strikethrough,
  Subscript,
  Superscript,
  Table,
  Underline,
  Undo,
} from 'lucide-react';

import { MathModal } from '@/components/blogs/editor/math-modal';
import { Button } from '@/components/ui/Button';
import { Separator } from '@/components/ui/Separator';
import { Toggle } from '@/components/ui/Toggle';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { cn } from '@/lib/utils';

interface EditorMenuBarProps {
  editor: Editor | null;
  className?: string;
}

export function EditorMenuBar({ editor, className }: EditorMenuBarProps) {
  if (!editor) {
    return null;
  }

  return (
    <div
      className={cn(
        'flex flex-wrap gap-1 p-1 rounded-md border border-[#333] mb-2 bg-[#1a1a1a] sticky top-0 z-10',
        className
      )}
    >
      <div className="flex flex-wrap items-center gap-1">
        <Toggle
          size="sm"
          variant="outline"
          pressed={editor.isActive('bold')}
          onPressedChange={() => editor.chain().focus().toggleBold().run()}
          aria-label="Toggle bold"
          className="data-[state=on]:bg-primary-purple/20 data-[state=on]:text-primary-purple data-[state=on]:border-primary-purple"
        >
          <Bold className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          variant="outline"
          pressed={editor.isActive('italic')}
          onPressedChange={() => editor.chain().focus().toggleItalic().run()}
          aria-label="Toggle italic"
          className="data-[state=on]:bg-primary-purple/20 data-[state=on]:text-primary-purple data-[state=on]:border-primary-purple"
        >
          <Italic className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          variant="outline"
          pressed={editor.isActive('underline')}
          onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
          aria-label="Toggle underline"
          className="data-[state=on]:bg-primary-purple/20 data-[state=on]:text-primary-purple data-[state=on]:border-primary-purple"
        >
          <Underline className="h-4 w-4" />
        </Toggle>

        <Toggle
          size={'sm'}
          variant="outline"
          pressed={editor.isActive('link')}
          onPressedChange={() => {
            const url = editor.isActive('link')
              ? false // If link is active, unset it
              : window.prompt('Enter the URL:', 'https://');

            if (url === false) {
              editor.chain().focus().unsetLink().run();
            } else if (url) {
              editor
                .chain()
                .focus()
                .setLink({ href: url, target: '_blank' })
                .run();
            }
          }}
          aria-label="Toggle link"
          className="data-[state=on]:bg-primary-purple/20 data-[state=on]:text-primary-purple data-[state=on]:border-primary-purple"
        >
          <Link className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="sm"
          variant="outline"
          pressed={editor.isActive('strike')}
          onPressedChange={() => editor.chain().focus().toggleStrike().run()}
          aria-label="Toggle strikethrough"
          className="data-[state=on]:bg-primary-purple/20 data-[state=on]:text-primary-purple data-[state=on]:border-primary-purple"
        >
          <Strikethrough className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          variant="outline"
          pressed={editor.isActive('code')}
          onPressedChange={() => editor.chain().focus().toggleCode().run()}
          aria-label="Toggle code"
          className="data-[state=on]:bg-primary-purple/20 data-[state=on]:text-primary-purple data-[state=on]:border-primary-purple"
        >
          <Code className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          variant="outline"
          pressed={editor.isActive('superscript')}
          onPressedChange={() =>
            editor.chain().focus().toggleSuperscript().run()
          }
          aria-label="Toggle superscript"
          className="data-[state=on]:bg-primary-purple/20 data-[state=on]:text-primary-purple data-[state=on]:border-primary-purple"
        >
          <Superscript className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          variant="outline"
          pressed={editor.isActive('subscript')}
          onPressedChange={() => editor.chain().focus().toggleSubscript().run()}
          aria-label="Toggle subscript"
          className="data-[state=on]:bg-primary-purple/20 data-[state=on]:text-primary-purple data-[state=on]:border-primary-purple"
        >
          <Subscript className="h-4 w-4" />
        </Toggle>
      </div>

      <Separator orientation="vertical" className="h-8" />

      <div className="flex flex-wrap items-center gap-1">
        <ToggleGroup
          type="single"
          className="bg-[#1a1a1a] border-[#333] [&_[data-state=on]]:bg-primary-purple/20 [&_[data-state=on]]:text-primary-purple [&_[data-state=on]]:border-primary-purple"
          value={
            editor.isActive('heading', { level: 1 })
              ? 'heading-1'
              : editor.isActive('heading', { level: 2 })
                ? 'heading-2'
                : editor.isActive('heading', { level: 3 })
                  ? 'heading-3'
                  : ''
          }
        >
          <ToggleGroupItem
            value="heading-1"
            aria-label="Heading 1"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
          >
            <Heading1 className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="heading-2"
            aria-label="Heading 2"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
          >
            <Heading2 className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="heading-3"
            aria-label="Heading 3"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
          >
            <Heading3 className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <Separator orientation="vertical" className="h-8" />

      <div className="flex flex-wrap items-center gap-1">
        <Toggle
          size="sm"
          variant="outline"
          pressed={editor.isActive('bulletList')}
          onPressedChange={() =>
            editor.chain().focus().toggleBulletList().run()
          }
          aria-label="Toggle bullet list"
          className="data-[state=on]:bg-primary-purple/20 data-[state=on]:text-primary-purple data-[state=on]:border-primary-purple"
        >
          <List className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          variant="outline"
          pressed={editor.isActive('orderedList')}
          onPressedChange={() =>
            editor.chain().focus().toggleOrderedList().run()
          }
          aria-label="Toggle ordered list"
          className="data-[state=on]:bg-primary-purple/20 data-[state=on]:text-primary-purple data-[state=on]:border-primary-purple"
        >
          <ListOrdered className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          variant="outline"
          pressed={editor.isActive('blockquote')}
          onPressedChange={() =>
            editor.chain().focus().toggleBlockquote().run()
          }
          aria-label="Toggle blockquote"
          className="data-[state=on]:bg-primary-purple/20 data-[state=on]:text-primary-purple data-[state=on]:border-primary-purple"
        >
          <Quote className="h-4 w-4" />
        </Toggle>
      </div>

      <Separator orientation="vertical" className="h-8" />

      <div className="flex flex-wrap items-center gap-1">
        <ToggleGroup
          type="single"
          className="bg-[#1a1a1a] border-[#333] [&_[data-state=on]]:bg-primary-purple/20 [&_[data-state=on]]:text-primary-purple [&_[data-state=on]]:border-primary-purple"
          value={
            editor.isActive({ textAlign: 'left' })
              ? 'left'
              : editor.isActive({ textAlign: 'center' })
                ? 'center'
                : editor.isActive({ textAlign: 'right' })
                  ? 'right'
                  : 'left'
          }
        >
          <ToggleGroupItem
            value="left"
            aria-label="Align left"
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
          >
            <AlignLeft className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="center"
            aria-label="Align center"
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
          >
            <AlignCenter className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="right"
            aria-label="Align right"
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
          >
            <AlignRight className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <Separator orientation="vertical" className="h-8" />

      <div className="flex flex-wrap items-center gap-1">
        <Button
          variant="outline"
          size="sm"
          className="border-[#333] hover:bg-[#252525]"
          onClick={() =>
            editor
              .chain()
              .focus()
              .setImage({
                src: window.prompt('Enter the URL of the image:', '') || '',
              })
              .run()
          }
          aria-label="Insert image"
        >
          <Image className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="border-[#333] hover:bg-[#252525]"
          onClick={() =>
            editor
              .chain()
              .focus()
              .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
              .run()
          }
          aria-label="Insert table"
        >
          <Table className="h-4 w-4" />
        </Button>
        <MathModal editor={editor} />
      </div>

      <Separator orientation="vertical" className="h-8" />

      <div className="flex flex-wrap items-center gap-1 ml-auto">
        <Button
          variant="outline"
          size="sm"
          className="border-[#333] hover:bg-[#252525]"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          aria-label="Undo"
        >
          <Undo className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="border-[#333] hover:bg-[#252525]"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          aria-label="Redo"
        >
          <Redo className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
