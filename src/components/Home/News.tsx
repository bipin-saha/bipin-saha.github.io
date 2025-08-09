"use client";
import Modal from "@/components/Modal";
import ImgSkeleton from "@/components/Skeleton/Img";
import { useUserAuth } from "@/context/userAuth";
import { databases } from "@/lib/appwrite";
import { Query } from "appwrite";
import { FC, FormEvent, useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { toast } from "react-toastify";

const colId = "6887f055001ee6815b89";

type NewsDocument = {
  $id: string;
  title?: string;
  date: string;
  content: string;
  ref: string;
};

const News = () => {
  const [news, setNews] = useState<NewsDocument[] | null>(null);
  const { user } = useUserAuth();
  const [update, setUpdate] = useState(false);

  const deleteNews = (id: string, e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user?.$id) return;
    setUpdate(true);
    databases
      .deleteDocument(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!, colId, id)
      .then(() => {
        toast.success("News deleted successfully!");
      })
      .catch((error) => {
        toast.error(`Error deleting news: ${error.message || "Unknown error"}`);
      })
      .finally(() => {
        setUpdate(false);
      });

    const modal = document.getElementById(`remove-${id}`);
    if (modal) {
      (modal as HTMLDialogElement).close();
    }
  };

  type NewsFormProps = {
    newsItem?: NewsDocument | null;
  };

  const NewsForm: FC<NewsFormProps> = ({ newsItem }) => {
    // Use local state for form data instead of shared singleNews
    const [formData, setFormData] = useState<NewsDocument>(() =>
      newsItem
        ? { ...newsItem }
        : {
            $id: "",
            title: "",
            date: "",
            content: "",
            ref: "",
          }
    );

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      // Validate URL if ref is provided
      if (formData.ref && formData.ref.trim() !== "") {
        try {
          new URL(formData.ref);
        } catch {
          toast.error(
            "Please enter a valid URL for the reference field or leave it empty."
          );
          return;
        }
      }

      if (newsItem) {
        // Update existing news
        databases
          .updateDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
            colId,
            formData.$id,
            {
              title: formData.title,
              date: formData.date,
              content: formData.content,
              ref: formData.ref || null, // Ensure empty string if no ref
            }
          )
          .then(() => {
            setNews(
              (prev) =>
                prev?.map((item) =>
                  item.$id === formData.$id ? formData : item
                ) || null
            );
            toast.success("News updated successfully!");
          })
          .catch((error) => {
            toast.error(
              `Error updating news: ${error.message || "Unknown error"}`
            );
          });
        const modal = document.getElementById(`update-${formData.$id}`);
        if (modal) {
          (modal as HTMLDialogElement).close();
        }
      } else {
        // Add new news
        setUpdate(true);
        databases
          .createDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
            colId,
            "unique()",
            {
              title: formData.title,
              date: formData.date,
              content: formData.content,
              ref: formData.ref || null, // Ensure empty string if no ref
            }
          )
          .then((res) => {
            setNews((prev) => [...(prev || []), { ...formData, $id: res.$id }]);
            toast.success("News added successfully!");
          })
          .catch((error) => {
            toast.error(
              `Error adding news: ${error.message || "Unknown error"}`
            );
          })
          .finally(() => {
            setUpdate(false);
          });
        const modal = document.getElementById("add-news");
        if (modal) {
          (modal as HTMLDialogElement).close();
        }
      }
    };
    return (
      <form
        className="flex flex-col gap-4 items-center"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className="input input-primary w-full max-w-4xl mt-7"
          value={formData.title || ""}
          placeholder="Title of the news"
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              title: e.target.value,
            }))
          }
        />
        <textarea
          className="textarea textarea-primary w-full max-w-4xl h-[150px]"
          placeholder="Content of the news"
          required
          value={formData.content || ""}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              content: e.target.value,
            }))
          }
        ></textarea>
        <input
          type="date"
          className="input input-primary w-full max-w-4xl"
          value={
            formData.date
              ? new Date(formData.date).toISOString().split("T")[0]
              : ""
          }
          required
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              date: e.target.value,
            }))
          }
        />
        <input
          type="text"
          className="input input-primary w-full max-w-4xl"
          value={formData.ref || ""}
          placeholder="Reference URL (optional - e.g., https://example.com"
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              ref: e.target.value,
            }))
          }
        />
        <button
          className={`btn w-40 mx-auto ${
            newsItem ? "btn-accent" : "btn-primary"
          }`}
          type="submit"
        >
          {newsItem ? "Update News" : "Add News"}
        </button>
      </form>
    );
  };

  useEffect(() => {
    databases
      .listDocuments(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!, colId, [
        Query.orderDesc("date"),
      ])
      .then((res) => {
        const newsDocs = res.documents.map((doc) => ({
          $id: doc.$id,
          title: doc.title,
          date: doc.date,
          content: doc.content,
          ref: doc.ref,
        })) as NewsDocument[];
        setNews(newsDocs);
      });
  }, [update]);

  if (!news?.length) {
    return <ImgSkeleton />;
  }

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl text-center font-bold my-10">Latest News</h1>
      {user?.$id && (
        <Modal id="add-news" title="Add News">
          <NewsForm key="add-news" newsItem={null} />
        </Modal>
      )}
      <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
        {news?.map((newsItem, i) => (
          <li key={newsItem.$id}>
            {i !== 0 && <hr />}
            <div className="timeline-middle">
              <FaCheckCircle />
            </div>
            <div
              className={`${
                i % 2 ? "timeline-end" : "timeline-start md:text-end"
              } md:mb-10 `}
            >
              <time className="font-mono italic">
                {new Date(newsItem.date).toLocaleDateString()}
              </time>
              <div className="text-lg font-black">
                {newsItem?.title || "Title"}
              </div>
              {newsItem.content}
              {newsItem?.ref && (
                <iframe
                  className="w-full rounded-2xl my-5"
                  src={newsItem.ref}
                />
              )}
              {user?.$id && (
                <div className="">
                  <Modal id={`update-${newsItem.$id}`} title="Update">
                    <NewsForm
                      key={`update-${newsItem.$id}`}
                      newsItem={newsItem}
                    />
                  </Modal>
                  <Modal id={`remove-${newsItem.$id}`} title="Remove">
                    <form
                      className="flex flex-col gap-4 items-center"
                      onSubmit={(e) => deleteNews(newsItem.$id, e)}
                    >
                      <h1 className="text-lg font-bold text-center my-5">
                        Are you sure you want to delete this news item?&nbsp;
                        <br />
                        {newsItem.title ? `"${newsItem.title}"` : ""}
                      </h1>
                      <button
                        className="btn btn-error w-40 mx-auto"
                        type="submit"
                      >
                        Remove
                      </button>
                    </form>
                  </Modal>
                </div>
              )}
            </div>
            {i !== news.length - 1 && <hr />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default News;
