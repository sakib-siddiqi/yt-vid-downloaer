import axios from "axios";
import { useRef, useState } from "react";

export default function share(params) {
  const file_ref = useRef();
  const form_ref = useRef();
  const [src, setVideoSrc] = useState(null);
  async function onSubmit(e) {
    e.preventDefault();
    try {
      const file = file_ref?.current?.files?.[0];
      const form = new FormData();
      form.append("file", file);
      // const base64 = await getBase64(file);
      const { data } = await axios.post(
        "https://yt15.vercel.app/api/upload",
        form_ref.current,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setVideoSrc(data);
    } catch (error) {
      setVideoSrc(null);
      console.log(error);
    }
  }
  return (
    <main>
      <section>
        <div className="container">
          <form
            onSubmit={onSubmit}
            ref={form_ref}
            encType="multipart/form-data"
          >
            <input
              ref={file_ref}
              type="file"
              name="file"
              className="input"
              accept="video/*"
            />
            <button type="submit" className="btn">
              send
            </button>
          </form>
          {src && (
            <video
              src={"data:video/webm;base64," + src}
              controls
              autoPlay
            ></video>
          )}
        </div>
      </section>
    </main>
  );
}
