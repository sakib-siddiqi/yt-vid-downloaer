import ytdl from "ytdl-core";

const COMMON = "https://www.youtube.com/watch?v=";
function getYtID(url = "") {
  url = url.trim();
  return url?.split(COMMON)?.[1];
}
function validURL(str) {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
}

export default async function handler(req, res) {
  try {
    const yt_url = req.query.yt;
    if (!validURL(yt_url)) {
      throw new Error("Invalid url.");
    }
    const yt_id = getYtID(yt_url);
    if(!ytdl.validateID(yt_id)){
      throw new Error("Invalid ID")
    }
    const info = await ytdl.getInfo(yt_id,{ filter: format => format.container === 'mp4' });
    const formets = info?.formats
      ?.filter((ele) => !!ele.hasVideo)
      ?.map((item) => ({
        url: item?.url,
        hasAudio: item?.hasAudio,
        quality: item?.qualityLabel,
        type: item?.container,
        size : item?.bitrate,
      }))
      ?.sort((a, b) => b.hasAudio - a.hasAudio);
    const vid_info = {
      title: info?.player_response?.videoDetails?.title,
      id: info?.player_response?.videoDetails?.videoId,
      length: +info?.player_response?.videoDetails?.lengthSeconds,
      keywords: info?.player_response?.videoDetails?.keywords || [],
      desc: info?.player_response?.videoDetails?.shortDescription || "",
      thumbnail:
        info?.player_response?.videoDetails?.thumbnail?.thumbnails?.[
          info?.player_response?.videoDetails?.thumbnail?.thumbnails.length - 1
        ]?.url,
      formets,
    };
    return res.status(200).json(vid_info);
  } catch (error) {
    return res.status(500).json({
      error: error?.message || "server error",
    });
  }
}
