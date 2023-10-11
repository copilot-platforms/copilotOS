import { useCurrentEditor } from "@tiptap/react";
import cx from "classnames";
import Image from "next/image";
import { useRef } from "react";
import styled from "styled-components";

const MenuBarContainer = styled.div`
  width: fit-content;
  margin: 0 auto;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc;
  color: #fff;
  padding: 5px;
  gap: 5px;
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: #fff;
`;
export const TiptapMenuBar = ({
  onUpload,
}: {
  onUpload: (file: File) => Promise<string | undefined>;
}) => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const { editor } = useCurrentEditor();

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];
    const url = await onUpload(file);
    if (!url) {
      return;
    }
    editor?.chain().focus().setImage({ src: url }).run();
  };

  if (!editor) {
    return null;
  }

  return (
    <MenuBarContainer>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={cx(
          "bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center",
          {
            "is-active": editor.isActive("bold"),
          },
        )}
      >
        <Image width={20} height={20} src="/bold.svg" alt="bold" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={cx(
          "bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center",
          {
            "is-active": editor.isActive("italic"),
          },
        )}
      >
        <Image width={20} height={20} src="/italic.svg" alt="bold" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={cx(
          "bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center",
          {
            "is-active": editor.isActive("strike"),
          },
        )}
      >
        <Image width={20} height={20} src="/strike.svg" alt="bold" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={cx(
          "bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center",
          {
            "is-active": editor.isActive("code"),
            "opacity-50 cursor-not-allowed": !editor
              .can()
              .chain()
              .focus()
              .toggleCode()
              .run(),
          },
        )}
      >
        <Image width={20} height={20} src="/code.svg" alt="bold" />
      </button>
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={cx(
          "bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center",
          {
            "is-active": editor.isActive("paragraph"),
          },
        )}
      >
        P
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={cx(
          "bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center",
          {
            "is-active": editor.isActive("heading", { level: 1 }),
          },
        )}
      >
        h1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={cx(
          "bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center",
          {
            "is-active": editor.isActive("heading", { level: 2 }),
          },
        )}
      >
        h2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={cx(
          "bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center",
          {
            "is-active": editor.isActive("heading", { level: 3 }),
          },
        )}
      >
        h3
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={cx(
          "bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center",
          {
            "is-active": editor.isActive("heading", { level: 5 }),
          },
        )}
      >
        h4
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={cx(
          "bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center",
          {
            "is-active": editor.isActive("heading", { level: 5 }),
          },
        )}
      >
        h5
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={cx(
          "bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center",
          {
            "is-active": editor.isActive("heading", { level: 6 }),
          },
        )}
      >
        h6
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={cx(
          "bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center",
          {
            "is-active": editor.isActive("bulletlist"),
          },
        )}
      >
        <Image width={20} height={20} src="/list.svg" alt="bold" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={cx(
          "bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center",
          {
            "is-active": editor.isActive("orderedList"),
          },
        )}
      >
        ordered list
      </button>

      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
      >
        undo
      </button>
      <button
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        redo
      </button>

      <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
        <input
          id="upload"
          hidden
          accept="image/*"
          name="file"
          ref={inputFileRef}
          type="file"
          onChange={onFileChange}
          required
        />
        <label htmlFor="upload">image</label>
      </button>
    </MenuBarContainer>
  );
};
