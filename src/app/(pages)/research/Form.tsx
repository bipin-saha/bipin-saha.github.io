import React from "react";

const Form = ({
  data,
}: {
  data?: {
    $id: string;
    title: string;
    content: string;
    ref?: string;
    code?: string;
    thumbnail?: string | null;
    time: string;
  };
}) => {
  return (
    <>
      <input
        className="input file-input file-input-primary w-full"
        type="file"
        name="thumbnail"
        accept="image/*"
      />
      <input
        className="input input-primary w-full"
        type="text"
        name="title"
        defaultValue={data?.title || ""}
        placeholder="title"
      />
      <textarea
        className="textarea textarea-primary w-full h-96"
        name="content"
        defaultValue={data?.content || ""}
        placeholder="Description of content"
      ></textarea>
      <input
        className="input input-primary w-full"
        type="text"
        name="ref"
        defaultValue={data?.ref || ""}
        placeholder="Reference Url"
      />
      <input
        className="input input-primary w-full"
        type="text"
        name="code"
        defaultValue={data?.code}
        placeholder="Code Url"
      />
      <input
        className="input input-primary w-full"
        type="date"
        name="time"
        defaultValue={
          data?.time
            ? new Date(data.time).toISOString().split("T")[0]
            : new Date().toISOString().split("T")[0]
        }
      />
    </>
  );
};

export default Form;
