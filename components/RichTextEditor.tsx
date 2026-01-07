"use client"
import React, { useEffect } from 'react';
import { useEditor, EditorContent, type Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import { Bold, Italic, Underline as UnderlineIcon, List, ListOrdered } from 'lucide-react';

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center p-2 border-b border-slate-200 gap-1">
      <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={`p-2 rounded ${editor.isActive('bold') ? 'bg-slate-200' : 'hover:bg-slate-100'}`} aria-label="Bold">
        <Bold className="w-4 h-4 text-slate-600" />
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={`p-2 rounded ${editor.isActive('italic') ? 'bg-slate-200' : 'hover:bg-slate-100'}`} aria-label="Italic">
        <Italic className="w-4 h-4 text-slate-600" />
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} className={`p-2 rounded ${editor.isActive('underline') ? 'bg-slate-200' : 'hover:bg-slate-100'}`} aria-label="Underline">
        <UnderlineIcon className="w-4 h-4 text-slate-600" />
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={`p-2 rounded ${editor.isActive('bulletList') ? 'bg-slate-200' : 'hover:bg-slate-100'}`} aria-label="Bullet List">
        <List className="w-4 h-4 text-slate-600" />
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={`p-2 rounded ${editor.isActive('orderedList') ? 'bg-slate-200' : 'hover:bg-slate-100'}`} aria-label="Ordered List">
        <ListOrdered className="w-4 h-4 text-slate-600" />
      </button>
    </div>
  );
};

export default function RichTextEditor({ content, onChange }: { content: string, onChange: (newContent: string) => void }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: { keepMarks: true, keepAttributes: false },
        orderedList: { keepMarks: true, keepAttributes: false },
      }),
      Underline,
    ],
    content: content,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose max-w-none p-4 focus:outline-none min-h-[300px]',
      },
    },
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor && editor.getHTML() !== content) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  return (
    <div className="bg-white border border-slate-200 rounded-lg">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}