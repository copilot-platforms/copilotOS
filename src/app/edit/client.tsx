"use client";

import StarterKit from "@tiptap/starter-kit";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import ListItem from "@tiptap/extension-list-item";
import { EditorProvider } from "@tiptap/react";
import { TiptapMenuBar } from "@/components/TiptapMenuBar";
import { putDocument } from "../actions/putDocument";
import Image from "@tiptap/extension-image";
import { postImage } from "../actions/postImage";
export default function Edit({
  document,
  name,
}: {
  document: string;
  name: PageName;
}) {
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

  const handleUpload = async (file: File) => {
    const form = new FormData();
    form.append("body", file);
    const { url } = await postImage(form);
    return url;
  };

  return (
    <EditorProvider
      onUpdate={({ editor }) => putDocument(name, editor.getHTML())}
      content={document}
      extensions={extensions}
      slotBefore={<TiptapMenuBar onUpload={handleUpload} />}
    >
      {null}
    </EditorProvider>
  );
}
