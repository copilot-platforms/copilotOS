"use client";

import StarterKit from "@tiptap/starter-kit";
import Youtube from "@tiptap/extension-youtube";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import ListItem from "@tiptap/extension-list-item";
import { EditorProvider, Node } from "@tiptap/react";
import { TiptapMenuBar } from "@/components/TiptapMenuBar";
import { putDocument } from "../actions/putDocument";
import Image from "@tiptap/extension-image";
import { postImage } from "../actions/postImage";
import CalloutExtension from "@/components/tiptap/CalloutExtension";



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
    Youtube.configure({
      inline: true,
    }),
    CalloutExtension
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
      slotBefore={<TiptapMenuBar onUpload={handleUpload} name={name} />}
    >
      {null}
    </EditorProvider>
  );
}
