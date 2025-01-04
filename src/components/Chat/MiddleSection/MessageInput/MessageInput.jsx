import { useRef, useState } from "react";
import sendIcon from "../../../../assets/send.svg";
import { BsMic, BsPlusCircleDotted } from "react-icons/bs";
import defAvatar from "../../../../assets/images/avatar_default.png";
import styles from "./MessageInput.module.css";

function MessageInput({ addNewMessage }) {
  const [messageText, setMessageText] = useState("");
  const [previewFiles, setPreviewFiles] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const fileInputRef = useRef(null);

  const handleSend = () => {
    if (messageText.trim() || previewFiles.length) {
      if (messageText.trim()) {
        const newMessage = {
          sender: "manager",
          author: "Ліза (менеджер)",
          text: messageText,
          avatar: defAvatar,
          time: new Date().toLocaleTimeString().slice(0, 5),
        };
        addNewMessage(newMessage);
        setMessageText("");
      }
      previewFiles.forEach((file) => {
        const newMessage = {
          sender: "manager",
          author: "Ліза (менеджер)",
          text: file.type.startsWith("image/") ? "Зображення" : file.name,
          avatar: defAvatar,
          time: new Date().toLocaleTimeString().slice(0, 5),
          files: file,
        };
        addNewMessage(newMessage);
      });
      setPreviewFiles([]);
    }
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    const maxFiles = 5;

    if (files.length + previewFiles.length > maxFiles) {
      alert(`Можна завантажити не більше ${maxFiles} файлів`);
      return;
    }

    const newFiles = files.map((file) => ({
      name: file.name,
      type: file.type,
      url: file.type.startsWith("image/") ? URL.createObjectURL(file) : null,
    }));

    setPreviewFiles((prev) => [...prev, ...newFiles]);
  };

  const handleMicClick = async () => {
    if (!isRecording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);

        const audioChunks = [];
        recorder.ondataavailable = (event) => {
          audioChunks.push(event.data);
        };

        recorder.onstop = () => {
          const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
          const newMessage = {
            sender: "manager",
            author: "Ліза (менеджер)",
            text: "Аудіо-повідомлення",
            avatar: defAvatar,
            time: new Date().toLocaleTimeString().slice(0, 5),
            audio: URL.createObjectURL(audioBlob),
          };
          addNewMessage(newMessage);
          setMessageText("");
          setIsRecording(false);
        };

        recorder.start();
        setIsRecording(true);
        setMessageText(" ");
      } catch (error) {
        console.error("Помилка доступу до мікрофона:", error);
      }
    } else {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  const removeImagePreview = (index) => {
    setPreviewFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className={styles.wrapper}>
      <button
        className={styles.btn}
        onClick={() => fileInputRef.current.click()}
      >
        <BsPlusCircleDotted />
      </button>
      {previewFiles.length > 0 && (
        <div className={styles.previewContainer}>
          {previewFiles.map((file, index) => (
            <div key={index} className={styles.previewItem}>
              {file.url ? (
                <img
                  src={file.url}
                  alt={`Preview ${index}`}
                  className={styles.previewImage}
                />
              ) : (
                <p className={styles.fileName}>{file.name}</p>
              )}
              <button
                className={styles.removePreview}
                onClick={() => removeImagePreview(index)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept="image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        multiple
        onChange={handleFileSelect}
      />
      <input
        type="text"
        placeholder="Введіть повідомлення ..."
        className={`${styles.input} ${isRecording ? styles.recording : ""}`}
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        disabled={isRecording}
      />
      {isRecording && (
        <p className={styles.recordingMessage}>
          Йде запис голосового повідомлення
        </p>
      )}
      <button
        className={`${styles.micBtn} ${isRecording ? styles.recording : ""}`}
        onClick={handleMicClick}
      >
        <BsMic />
      </button>

      <button className={styles.sendBtn} onClick={handleSend}>
        <img src={sendIcon} alt="Send" />
      </button>
    </div>
  );
}

export default MessageInput;
