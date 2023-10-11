"use client";

import StarterKit from "@tiptap/starter-kit";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import ListItem from "@tiptap/extension-list-item";
import { EditorContextValue, EditorProvider, PureEditorContent } from "@tiptap/react";
import { TiptapMenuBar } from "@/components/TiptapMenuBar";
import { putDocument } from "../actions/putDocument";
import Image from "@tiptap/extension-image";
import type { PutBlobResult } from "@vercel/blob";
import { useCallback, useRef } from "react";
import { useDropzone } from "react-dropzone";
export default function Edit({
  document,
  name,
}: {
  document: string;
  name: PageName;
}) {
  const extensions = [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
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

  const editorRef = useRef<EditorContextValue['editor']| null >(null);

  const handleUpload = async (file: File) => {
    const response = await fetch(`/api/tiptap/upload?filename=${file.name}`, {
      method: "POST",
      body: file,
    });

    const newBlob = (await response.json()) as PutBlobResult;

    return newBlob.url;
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    // Do something with the files
    const file = acceptedFiles[0];
    const url = await handleUpload(file);
    console.info(url);
    if (!url) {
      return;
    }
    editorRef.current?.chain().focus().insertContent({
      type: "image",
      attrs: {
        src: url,
      },
    }).run();
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noClick: true,
  });
  return (
    <div
      {...getRootProps()}
      className={
        isDragActive ? "bg-gray-100 border-dashed border-2 border-gray-300" : ""
      }
    >
      <EditorProvider
        onUpdate={({ editor }) => putDocument(name, editor.getHTML())}
        onCreate={({ editor }) => {
          editorRef.current = editor as EditorContextValue['editor'];
        }}
        content={document}
        extensions={extensions}
        slotBefore={<TiptapMenuBar onUpload={handleUpload} />}
      >
        <input {...getInputProps()} />
      </EditorProvider>
    </div>
  );
}
