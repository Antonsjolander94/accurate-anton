const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const Post = require("../models/Post");
const AWS = require("aws-sdk");
const ffprobe = require("ffprobe");
const ffprobeInstaller = require("@ffprobe-installer/ffprobe");
const ffmpeg = require("fluent-ffmpeg");
const multer = require("multer");
const multerS3 = require("multer-s3");
const { uuid } = require("uuidv4");

ffprobe.FFPROBE_PATH = ffprobeInstaller.path;

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET,
});

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(400).json({ error: error.toString() });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const post = await Post.findById(id);
    res.json(post);
  } catch (error) {
    res.status(400).json({ error: error.toString() });
  }
});
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const post = await Post.findById(id);
    res.json(post);
  } catch (error) {
    res.status(400).json({ error: error.toString() });
  }
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    acl: "public-read",
  }),
});

router.post("/", upload.single("file"), async (req, res, next) => {
  try {
    if (req && req.file) {
      const title = req.body.title;
      const fileInfo = path.parse(req.file.originalname);
      const fileName = formatText(fileInfo.name);

      const fileNameWithExtension = formatText(fileInfo.base);
      const filePath = "uploads/" + fileNameWithExtension;

      const fileThumbnailName = fileName + ".jpg";
      const fileThumbnailPath = "uploads/" + fileName + ".jpg";

      console.log("FFMPEG: Convert and create thumbnail.");
      ffmpeg(req.file.location)
        .setFfmpegPath(process.env.FFMPEG_WINDOWS_PATH)
        .output(filePath)
        .screenshots({
          timestamps: ["50%"],
          filename: `${fileName}.jpg`,
          folder: "uploads/",
          size: "200x200",
        })
        .on("end", async function () {
          console.log("FFMPEG: Convert and create thumbnail done.");
          const resVid = await uploadVideo(filePath, fileNameWithExtension);
          const resImg = await uploadImage(
            fileThumbnailPath,
            fileThumbnailName
          );
          const post = await createPost(
            title,
            resVid.video.video_url,
            resVid.video.ETag,
            resImg.image.img_url,
            resImg.image.ETag,
            resVid.metadata
          );
          res.send({
            post: post,
          });
        });
    } else {
      throw new Error("No file!");
    }
  } catch (error) {
    res.status(400).json({ error: error.toString() });
  }
});

const createPost = async (
  title,
  video_url,
  video_ETag,
  img_url,
  img_ETag,
  metadata
) => {
  return new Promise(async (resolve, reject) => {
    const post = new Post({
      title,
      video_url,
      video_ETag,
      img_url,
      img_ETag,
      metadata,
    });
    try {
      const savedPost = await post.save();
      resolve(savedPost);
    } catch (error) {
      reject(error);
    }
  });
};

const uploadImage = (path, name) => {
  console.log({ uploadImagePath: path });
  return new Promise((resolve, reject) => {
    try {
      fs.readFile(path, (err, data) => {
        const params = {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: formatText(uuid() + "_" + name),
          Body: data,
          ContentType: "jpg",
          ACL: "public-read",
        };
        s3.upload(params, (err, data) => {
          if (!err) {
            fs.unlink(path, (err) => {
              if (!err) {
                resolve({ image: { img_url: data.Location, ETag: data.ETag } });
              }
            });
          }
        });
      });
    } catch (error) {
      reject({ uploadImageError: error });
    }
  });
};
const uploadVideo = (path, name) => {
  console.log({ uploadVideoPath: path });
  return new Promise((resolve, reject) => {
    try {
      console.log("FFMPEG: Reading metadata.");
      ffmpeg.ffprobe(path, (err, data) => {
        const metadata = data;
        console.log("FFMPEG: Reading metadata done.");
        if (!err) {
          fs.readFile(path, (err, data) => {
            const params = {
              Bucket: process.env.AWS_BUCKET_NAME,
              Key: formatText(uuid() + "_" + name),
              Body: data,
              ContentType: "video/mp4",
              ACL: "public-read",
            };
            console.log("S3: Uploading...");
            s3.upload(params, (err, data) => {
              if (!err) {
                console.log({ "S3: Upload done.": data });
                fs.unlink(path, (err) => {
                  if (!err) {
                    resolve({
                      metadata: metadata,
                      video: { video_url: data.Location, ETag: data.ETag },
                    });
                  }
                });
              }
            });
          });
        }
      });
    } catch (error) {
      reject({ uploadVideoError: error });
    }
  });
};

const formatText = (text) => text.replace(/\s+/g, "-").toLowerCase();

module.exports = router;
