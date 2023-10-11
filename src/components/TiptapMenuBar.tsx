import { useCurrentEditor } from "@tiptap/react";
import cx from "classnames";
import { useRef } from "react";
const style = {
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
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
    <div style={style}>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={cx("tiptap-menu-btn", {
          "is-active": editor.isActive("bold"),
        })}
      >
        bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={cx("tiptap-menu-btn", {
          "is-active": editor.isActive("italic"),
        })}
      >
        italic
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={cx("tiptap-menu-btn", {
          "is-active": editor.isActive("strike"),
        })}
      >
        strike
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={cx("tiptap-menu-btn", {
          "is-active": editor.isActive("code"),
        })}
      >
        code
      </button>
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={cx("tiptap-menu-btn", {
          "is-active": editor.isActive("paragraph"),
        })}
      >
        paragraph
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={cx("tiptap-menu-btn", {
          "is-active": editor.isActive("heading", { level: 1 }),
        })}
      >
        h1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={cx("tiptap-menu-btn", {
          "is-active": editor.isActive("heading", { level: 2 }),
        })}
      >
        h2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={cx("tiptap-menu-btn", {
          "is-active": editor.isActive("heading", { level: 3 }),
        })}
      >
        h3
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={cx("tiptap-menu-btn", {
          "is-active": editor.isActive("heading", { level: 5 }),
        })}
      >
        h4
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={cx("tiptap-menu-btn", {
          "is-active": editor.isActive("heading", { level: 5 }),
        })}
      >
        h5
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={cx("tiptap-menu-btn", {
          "is-active": editor.isActive("heading", { level: 6 }),
        })}
      >
        h6
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={cx("tiptap-menu-btn", {
          "is-active": editor.isActive("bulletlist"),
        })}
      >
        bullet list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={cx("tiptap-menu-btn", {
          "is-active": editor.isActive("orderedList"),
        })}
      >
        ordered list
      </button>

      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        className="tiptap-menu-btn"
      >
        undo
      </button>
      <button
        className="tiptap-menu-btn"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        redo
      </button>

      <button className="tiptap-menu-btn">
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
    </div>
  );
};
