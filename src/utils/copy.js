import toast from "react-hot-toast";

export const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success("Текст скопійовано");
      })
      .catch((err) => {
        toast.error("Не вдалося скопіювати текст:", err);
      });
  };