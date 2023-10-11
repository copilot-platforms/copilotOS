"use client";

import StarterKit from "@tiptap/starter-kit";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import ListItem from "@tiptap/extension-list-item";
import { EditorContextValue, EditorProvider, PureEditorContent } from "@tiptap/react";
import { TiptapMenuBar } from "@/components/TiptapMenuBar";
import { putDocument } from "../actions/putDocument";
import Image from "@tiptap/extension-image";
import { postImage } from "../actions/postImage";
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
    const form = new FormData();
    form.append("body", file);
    const { url } = await postImage(form);
    return url;
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    // Do something with the files
    const file = acceptedFiles[0];
    const url = await handleUpload(file);
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
        slotBefore={<TiptapMenuBar name={
          name
        } onUpload={handleUpload} />}
      >
        <input {...getInputProps()} />
      </EditorProvider>
    </div>
  );
}
