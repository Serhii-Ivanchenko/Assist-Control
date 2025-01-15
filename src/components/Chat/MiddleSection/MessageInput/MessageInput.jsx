import { useEffect, useRef, useState } from "react";
import sendIcon from "../../../../assets/send.svg";
import { BsMic, BsStopCircle, BsPlusCircleDotted } from "react-icons/bs";
import { IoDocumentAttachOutline } from "react-icons/io5";
import defAvatar from "../../../../assets/images/avatar_default.png";
import AudioPlayer from "../AudioPlayer/AudioPlayer";
import styles from "./MessageInput.module.css";

function MessageInput({ addNewMessage, setInputHeight }) {
  const [messageText, setMessageText] = useState("");
  const [previewFiles, setPreviewFiles] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const textAreaRef = useRef(null);
  const timerRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleSend = () => {
    if (messageText.trim() || previewFiles.length) {
      const newMessage = {
        sender: "manager",
        author: "Ліза (менеджер)",
        text: messageText.trim(),
        avatar: defAvatar,
        time: new Date().toLocaleTimeString().slice(0, 5),
        files: previewFiles.length
          ? previewFiles.map(({ name, type, file, url }) => ({
              name,
              type,
              file,
              url,
            }))
          : undefined,
      };

      addNewMessage(newMessage);
      setMessageText("");
      setPreviewFiles([]);

      if (textAreaRef.current) {
        textAreaRef.current.style.height = "auto";
        if (setInputHeight) setInputHeight(textAreaRef.current.offsetHeight);
      }
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
      file,
    }));

    setPreviewFiles((prev) => [...prev, ...newFiles]);
  };

  const handleMicClick = async () => {
    if (previewFiles.some((file) => file.type.startsWith("audio/"))) {
      alert("Ви вже додали аудіозапис. Видаліть його, щоб записати новий.");
      return;
    }

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
          const audioURL = URL.createObjectURL(audioBlob);

          const newFile = {
            name: "Записане аудіо",
            type: "audio/wav",
            url: audioURL,
            file: audioBlob,
          };
          setPreviewFiles((prev) => [...prev, newFile]);

          clearInterval(timerRef.current);
          setRecordingTime(0);
          setIsRecording(false);
          setMessageText("");
        };

        recorder.start();
        setIsRecording(true);
        setMessageText(" ");

        timerRef.current = setInterval(() => {
          setRecordingTime((prev) => prev + 1);
        }, 1000);
      } catch (error) {
        console.error("Помилка доступу до мікрофона:", error);
      }
    } else {
      mediaRecorder.stop();
      clearInterval(timerRef.current);
      setRecordingTime(0);
      setIsRecording(false);
    }
  };

  const formatTime = (time) => {
    const mins = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const secs = (time % 60).toString().padStart(2, "0");
    return `${mins}: ${secs}`;
  };

  const removeImagePreview = (index) => {
    setPreviewFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const adjustHeight = (element) => {
    element.style.height = "auto";
    element.style.height = `${Math.min(element.scrollHeight, 5 * 24)}px`;

    if (setInputHeight) setInputHeight(element.offsetHeight);
  };

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  const mimeToExtensionMap = {
    "application/pdf": "pdf",
    "application/msword": "doc",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      "docx",
    "application/vnd.ms-excel": "xls",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
    "application/x-rar-compressed": "rar",
    "application/zip": "zip",
    "application/x-zip-compressed": "zip",
    "application/x-7z-compressed": "7z",
    "text/plain": "txt",
  };

  return (
    <div className={styles.wrapper}>
      <button
        className={styles.btn}
        onClick={() => fileInputRef.current.click()}
      >
        <BsPlusCircleDotted size={24} />
      </button>
      {previewFiles.length > 0 && (
        <div className={styles.previewContainer}>
          {previewFiles.map((file, index) => (
            <div key={index} className={styles.previewItem}>
              {file.url ? (
                file.type.startsWith("image/") && (
                  <>
                    <img
                      src={file.url}
                      alt={`Preview ${index}`}
                      className={styles.previewImage}
                    />
                    <button
                      className={styles.removePreviewDoc}
                      onClick={() => removeImagePreview(index)}
                    >
                      ✕
                    </button>
                  </>
                )
              ) : (
                <>
                  <div className={styles.previewDoc}>
                    <IoDocumentAttachOutline
                      style={{ transform: "scale(1.4)" }}
                    />
                    <p className={styles.fileName}>
                      {file.name.length > 5
                        ? `${file.name.slice(0, 5)}...`
                        : file.name}{" "}
                      {mimeToExtensionMap[file.type] || file.type.split("/")[1]}
                    </p>
                  </div>
                  <button
                    className={styles.removePreviewDoc}
                    onClick={() => removeImagePreview(index)}
                  >
                    ✕
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      )}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept="image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/x-rar-compressed,application/zip,application/x-zip-compressed,application/x-7z-compressed"
        multiple
        onChange={handleFileSelect}
      />

      <div
        className={`${styles.inputContainer} ${
          isRecording ? styles.recording : ""
        }`}
      >
        <div className={styles.textInputWrapper}>
          {isRecording ? (
            <textarea
              placeholder="Запис триває..."
              className={styles.input}
              value={formatTime(recordingTime)}
              rows={1}
              disabled
            />
          ) : previewFiles.some((file) => file.type.startsWith("audio/")) ? (
            <div className={styles.audioInsideInput}>
              {previewFiles.map(
                (file, index) =>
                  file.type.startsWith("audio/") && (
                    <div key={index}>
                      <AudioPlayer
                        audio={file.url}
                        size="small"
                        className={styles.audioPreviewInInput}
                      />
                      <button
                        className={styles.removePreviewDoc}
                        onClick={() => removeImagePreview(index)}
                      >
                        ✕
                      </button>
                    </div>
                  )
              )}
            </div>
          ) : (
            <textarea
              ref={textAreaRef}
              placeholder="Введіть повідомлення ..."
              className={styles.input}
              value={messageText}
              onChange={(e) => {
                setMessageText(e.target.value);
                adjustHeight(e.target);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              rows={1}
            />
          )}
        </div>
      </div>

      {!isRecording ? (
        <BsMic className={styles.micBtn} onClick={handleMicClick} />
      ) : (
        <BsStopCircle
          className={`${styles.micBtn} ${styles.recording}`}
          onClick={handleMicClick}
        />
      )}

      <button className={styles.sendBtn} onClick={handleSend}>
        <img src={sendIcon} alt="Send" />
      </button>
    </div>
  );
}

export default MessageInput;
