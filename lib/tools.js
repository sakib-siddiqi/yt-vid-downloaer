export async function getBase64(file) {
  const promise = new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64String = reader.result;
      resolve(base64String);
    };
    reader.onerror = () => {
      reject(new Error("File to convert file " + file.name));
    };
  });
  return promise;
}
