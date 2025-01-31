// Перетворення файлів у Base64

export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    if (!(file instanceof Blob)) {
      reject(new Error("Invalid file type. Expected a Blob or File."));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const base64Data = reader.result.split(",")[1]; // Видаляємо "data:image/png;base64,"
        resolve(base64Data);
      } catch (error) {
        reject(new Error(`Failed to parse Base64: ${error.message}`));
      }
    };
    reader.onerror = (error) =>
      reject(new Error(`FileReader error: ${error.message}`));
    reader.readAsDataURL(file);
  });
};
