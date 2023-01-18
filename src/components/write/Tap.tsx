import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React from 'react';
import useEditor2 from './hooks/useCreatePost';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import Highlight from '@tiptap/extension-highlight';
import TypographyExtension from '@tiptap/extension-typography';
import UnderlineExtension from '@tiptap/extension-underline';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Dropcursor from '@tiptap/extension-dropcursor';
import Code from '@tiptap/extension-code';
import Link from '@tiptap/extension-link';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import CharacterCount from '@tiptap/extension-character-count';
import TextAlign from '@tiptap/extension-text-align';
import Focus from '@tiptap/extension-focus';
import { ColorHighlighter } from './ColourHighlighter';
import { useMemo } from 'react';
import ProjectCreateContentToolbar from './Toolbar';
import UniqueID from './UniqueID';
import TableOfContents from './TableOfContents';
import { ArrowLink } from '../common/ArrowButton';
import { LinkButton } from '../common/Button';
import Tags from '../tags/Tags';
import TagsForm from '../tags/TagsForm';
import Bold from '../../svg/bold';
import Italic from '../../svg/italic';

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex w-full flex-wrap px-[2rem] border-2 bg-slate-300">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'is-active' : ''}>
        <Bold />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'is-active' : ''}>
        <Italic />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive('strike') ? 'is-active' : ''}>
        strike
      </button>
      {/* <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={editor.isActive('code') ? 'is-active' : ''}>
        code
      </button>
      <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
        clear marks
      </button>
      <button onClick={() => editor.chain().focus().clearNodes().run()}>
        clear nodes
      </button> */}
      {/* <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive('paragraph') ? 'is-active' : ''}>
        paragraph
      </button> */}
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}>
        h1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}>
        h2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}>
        h3
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}>
        h4
      </button>

      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'is-active' : ''}>
        bullet list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'is-active' : ''}>
        ordered list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive('codeBlock') ? 'is-active' : ''}>
        code block
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? 'is-active' : ''}>
        blockquote
      </button>
      <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        horizontal rule
      </button>
      <button onClick={() => editor.chain().focus().setHardBreak().run()}>
        hard break
      </button>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}>
        undo
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}>
        redo
      </button>
    </div>
  );
};

const tag = [];

const Tap = () => {
  const { handleSubmit } = useEditor2();

  const editor = useEditor({
    editorProps: {
      attributes: {
        class: 'my-6 focus:outline-none',
        'data-test': 'editor',
      },
    },
    extensions: [
      StarterKit,
      Subscript,
      Superscript,
      Highlight,
      TypographyExtension,
      UnderlineExtension,
      Document,
      Paragraph,
      Text,
      Dropcursor,
      Code,
      Link,

      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Focus.configure({
        className: 'has-focus',
        mode: 'all',
      }),
      ColorHighlighter,

      TableOfContents,
      UniqueID.configure({
        types: ['block'],
      }),
    ],
    content: `
  
    
    `,
  });

  const a = editor?.getHTML();

  return (
    <div className="grid grid-cols-12 h-full relative">
      <div className="flex flex-col flex-1 min-h-[0] col-span-3 bg-slate-100 ">
        <div className="border-2 h-full border-red-500 grid grid-rows-12">
          <div className="pt-[3rem] text-4xl">설명</div>
        </div>
      </div>

      <div className="min-h-[0] flex-1 flex flex-col col-span-9 ">
        <div className="grid min-h-[0] flex-1 col-span-9 grid-rows-12">
          <div className="px-[2rem] row-span-2 border-2 border-red-500">
            <input
              className="text-4xl font-bold focus:outline-none w-full mmd:text-[2rem] pt-[3rem]"
              name="title"
              placeholder="제목을 입력하세요"
            />
            <div className="border-2 w-6/12 mt-[1.5rem] h-1 " />
          </div>

          <div className="row-span-1 border-2">
            <MenuBar editor={editor} />
          </div>

          <div className="row-span-9 w-full border-2 border-red-500 overflow-scroll">
            <EditorContent editor={editor} className=" " />
          </div>
        </div>
      </div>

      {/* <div className="fixed flex bottom-0 z-50 w-[50%] px-4 bg-white shadow-lg shadow-slate-700 h-[4.2rem] items-center justify-between mxl:w-full">
        <div>
          <ArrowLink direction="left" href={'/'} textSize="small">
            뒤로가기
          </ArrowLink>
        </div>

        <div onClick={e => handleSubmit(e, a)}>
          <LinkButton className="text-zinc-600">완료</LinkButton>
        </div>
      </div> */}
    </div>
  );
};

export default Tap;