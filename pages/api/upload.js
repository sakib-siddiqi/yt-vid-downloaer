import formidable from "formidable";
import fs from "fs";
import nextConnect from "next-connect";

const route = nextConnect({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});
route.post(async (req, res) => {
  try {
    const form = new formidable.IncomingForm({
      maxFileSize: 3009715200,
    });
    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error(err);
        res.status(500).send("An error occurred while processing the form.");
        return;
      }

      const file = files.file;
      const fileData = fs.readFileSync(file.filepath);
      const base64 = Buffer.from(fileData || "").toString("base64");

      res.status(200).send(base64);
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
});

export default route;
//940098525
export const config = {
  api: {
    bodyParser: false,
  },
};
