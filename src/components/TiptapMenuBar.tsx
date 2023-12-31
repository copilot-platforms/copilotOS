import { useCurrentEditor } from "@tiptap/react";
import cx from "classnames";
import styled from "styled-components";
import { useCallback, useRef } from "react";
import { ClientUrl } from "./ClientUrl";
import {
  MdImage,
  MdRedo,
  MdUndo,
  MdFormatBold,
  MdList,
  MdStrikethroughS,
  MdFormatItalic,
  MdTableView,
} from "react-icons/md";

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
  top: 10px;
  margin-bottom: 10px;
  z-index: 1;
  background-color: #000;
`;

export const TiptapMenuBar = ({
  onUpload,
  name,
  editable
}: {
  onUpload: (file: File) => Promise<string | undefined>;
  name: string;
  editable: boolean;
}) => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const { editor } = useCurrentEditor();
  const setLink = useCallback(() => {
    const previousUrl = editor?.getAttributes('link').href
    let url = window.prompt('URL', previousUrl)
    if (url === null) {
      return
    }
    if (url === '') {
      editor?.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }
    if (!(/^https?:\/\//.test(url))) {
      url = `//${url}`;
    }
   editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }, [editor])

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

  if (!editor || !editable) {
    return null;
  }

  return (
    <MenuBarContainer>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={cx(
          "bg-black-300 hover:bg-gray-400 text-white-800 text-xs py-2 px-4 rounded inline-flex items-center",
          {
            "bg-gray-400": editor.isActive("bold"),
          },
        )}
      >
        <MdFormatBold />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={cx(
          "bg-black-300 hover:bg-gray-400 text-white-800 text-xs py-2 px-4 rounded inline-flex items-center",
          {
            "bg-gray-400": editor.isActive("italic"),
          },
        )}
      >
        <MdFormatItalic />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={cx(
          "bg-black-300 hover:bg-bl-400 text-white-800 py-2 px-4 rounded inline-flex items-center",
          {
            "bg-gray-400": editor.isActive("strike"),
          },
        )}
      >
        <MdStrikethroughS />
      </button>
      <button onClick={setLink} className={cx("tiptap-menu-btn", {
          "is-active": editor.isActive("link"),
        })}>
         link
       </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={cx(
          "bg-black-300 hover:bg-gray-400 text-white-800 text-xs py-2 px-4 rounded inline-flex items-center",
          {
            "bg-gray-400": editor.isActive("code"),
            "opacity-50 cursor-not-allowed": !editor
              .can()
              .chain()
              .focus()
              .toggleCode()
              .run(),
          },
        )}
      >
        {"</>"}
      </button>
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={cx(
          "bg-black-300 hover:bg-gray-400 text-white-800 text-xs py-2 px-4 rounded inline-flex items-center",
          {
            "bg-gray-400": editor.isActive("paragraph"),
          },
        )}
      >
        P
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={cx(
          "bg-black-300 hover:bg-gray-400 text-white-800 text-xs py-2 px-4 rounded inline-flex items-center",
          {
            "bg-gray-400": editor.isActive("heading", { level: 1 }),
          },
        )}
      >
        h1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={cx(
          "bg-black-300 hover:bg-gray-400 text-white-800 text-xs py-2 px-4 rounded inline-flex items-center",
          {
            "bg-gray-400": editor.isActive("heading", { level: 2 }),
          },
        )}
      >
        h2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={cx(
          "bg-black-300 hover:bg-gray-400 text-white-800 text-xs py-2 px-4 rounded inline-flex items-center",
          {
            "bg-gray-400": editor.isActive("heading", { level: 3 }),
          },
        )}
      >
        h3
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={cx(
          "bg-black-300 hover:bg-gray-400 text-white-800 text-xs py-2 px-4 rounded inline-flex items-center",
          {
            "bg-gray-400": editor.isActive("heading", { level: 5 }),
          },
        )}
      >
        h4
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={cx(
          "bg-black-300 hover:bg-gray-400 text-white-800 text-xs py-2 px-4 rounded inline-flex items-center",
          {
            "bg-gray-400": editor.isActive("heading", { level: 5 }),
          },
        )}
      >
        h5
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={cx(
          "bg-black-300 hover:bg-gray-400 text-white-800 text-xs py-2 px-4 rounded inline-flex items-center",
          {
            "bg-gray-400": editor.isActive("heading", { level: 6 }),
          },
        )}
      >
        h6
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={cx(
          "bg-black-300 hover:bg-gray-400 text-white-800 text-xs py-2 px-4 rounded inline-flex items-center",
          {
            "bg-gray-400": editor.isActive("bulletlist"),
          },
        )}
      >
        <MdList />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={cx(
          "bg-black-300 hover:bg-gray-400 text-white-800 text-xs py-2 px-4 rounded inline-flex items-center",
          {
            "bg-gray-400": editor.isActive("orderedList"),
          },
        )}
      >
        <MdList />
      </button>

      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        className="bg-black-300 hover:bg-gray-400 text-white-800 text-xs py-2 px-4 rounded inline-flex items-center"
      >
        <MdUndo />
      </button>
      <button
        className="bg-black-300 hover:bg-gray-400 text-white-800 text-xs py-2 px-4 rounded inline-flex items-center"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        <MdRedo />
      </button>
      <button
        className="bg-black-300 hover:bg-gray-400 text-white-800 text-xs py-2 px-4 rounded inline-flex items-center"
        onClick={() =>
          editor
            .chain()
            .focus()
            .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
            .run()
        }
      >
        <MdTableView />
      </button>

      <button className="bg-black-300 hover:bg-gray-400 text-white-800 text-xs py-2 px-4 rounded inline-flex items-center">
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
        <label htmlFor="upload">
          <MdImage />
        </label>
      </button>

      <button
      onClick={() => {
        editor.chain().focus().insertContent('<callout><p>Callout</p></callout>').run()
      }}
      >callout</button>
      <ClientUrl name={name} />
    </MenuBarContainer>
  );
};
