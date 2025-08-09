"use client";
import { Editor } from "@tinymce/tinymce-react";
import { useRef, useState, useEffect } from "react";
import type { Editor as TinyMCEEditor } from "tinymce";

const TinyEditor = ({
  initVal = "",
  actionFunc,
}: {
  initVal?: string;
  actionFunc: (val: string) => void;
}) => {
  const editorRef = useRef<TinyMCEEditor | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const act = () => {
    if (editorRef.current) {
      // console.log(editorRef.current.getContent());
      actionFunc(editorRef.current.getContent());
    }
  };

  if (!isMounted) {
    return (
      <div
        style={{
          height: 500,
          border: "1px solid #ccc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Loading editor...
      </div>
    );
  }

  return (
    <>
      <Editor
        apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY}
        onInit={(_evt, editor) => (editorRef.current = editor)}
        initialValue={initVal}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "math | undo redo | blocks | " +
            "bold italic forecolor superscript subscript | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
      <button type="button" className="btn btn-primary m-3" onClick={act}>
        Submit
      </button>
    </>
  );
};

export default TinyEditor;
