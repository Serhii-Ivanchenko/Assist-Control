import { useRef, useState } from "react";
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

          setIsRecording(false);
          setMessageText("");
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

  const adjustHeight = (element) => {
    element.style.height = "auto";
    element.style.height = `${Math.min(element.scrollHeight, 6 * 24)}px`;

    if (setInputHeight) setInputHeight(element.offsetHeight);
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
                      ({file.type.split("/")[1]})
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
        accept="image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        multiple
        onChange={handleFileSelect}
      />

      <div
        className={`${styles.inputContainer} ${
          isRecording ? styles.recording : ""
        }`}
      >
        <div className={styles.textInputWrapper}>
          <textarea
            placeholder="Введіть повідомлення ..."
            className={styles.input}
            value={messageText}
            onChange={(e) => {
              setMessageText(e.target.value);
              adjustHeight(e.target);
            }}
            rows={1}
            disabled={isRecording}
          />

          <div className={styles.audioInsideInput}>
            {previewFiles.map(
              (file, index) =>
                file.url &&
                file.type.startsWith("audio/") && (
                  <>
                    <AudioPlayer
                      key={index}
                      audio={file.url}
                      size="small"
                      audioDuration="00:00"
                      className={styles.audioPreviewInInput}
                    />
                    <button
                      className={styles.removePreviewDoc}
                      onClick={() => removeImagePreview(index)}
                    >
                      ✕
                    </button>
                  </>
                )
            )}
          </div>
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
