'use client'

import StarterKit from '@tiptap/starter-kit'
import { Color } from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import ListItem from '@tiptap/extension-list-item'
import Image from '@tiptap/extension-image'
import {  EditorProvider } from '@tiptap/react'
import { TiptapMenuBar } from '@/components/TiptapMenuBar'
import { putDocument } from '../actions/putDocument'
import type { PutBlobResult } from '@vercel/blob';

export default function Edit({ document, name }: { document: string, name: PageName }) {
  const extensions = [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    // TextStyle.configure({ types: [ListItem.name] }),
    StarterKit.configure({
      bulletList: {
        keepMarks: true,
        keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
      },
      orderedList: {
        keepMarks: true,
        keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
      },
    }),
     Image,
  ];

  const handleUpload = async (file: any) => {
           const response = await fetch(
            `/api/tiptap/upload?filename=${file.name}`,
            {
              method: 'POST',
              body: file,
            },
          );
 
          const newBlob = (await response.json()) as PutBlobResult;
 
          return newBlob.url;
  }


  return (
    <EditorProvider
      onUpdate={({editor}) => putDocument(name, editor.getHTML())}
      content={document}
      extensions={extensions}
      slotBefore={<TiptapMenuBar onUpload={handleUpload}  />}
    >
    </EditorProvider>
  )
}
