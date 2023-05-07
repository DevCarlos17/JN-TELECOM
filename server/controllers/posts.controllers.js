import { deleteImage, updaloadImage } from "../libs/cloudinary.js";
import Post from "../models/Post.js";
import fs from "fs-extra"



export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
    res.send(posts)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
};

export const createPost = async (req, res) => {

  const { error } = schemaPost.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message })

  try {
    const { title, description } = req.body;
    let image;

    if (req.files.image) {
      const result = await updaloadImage(req.files.image.tempFilePath);
      await fs.remove(req.files.image.tempFilePath);
      image = {
        url: result.secure_url,
        public_id: result.public_id
      }
    }

    const newPost = new Post({ title, description, image });

    await newPost.save();

    return res.json(newPost)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message })
  }

}

export const updatePosts = async (req, res) => {

  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true })
    return res.send(updatedPost)
  } catch (error) {
    return res.status(500).json({ message: error.message })

  }
}

export const deletePosts = async (req, res) => {
  try {
    const postRemoved = await Post.findByIdAndDelete(req.params.id);

    if (!postRemoved) return res.status(404);

    if (postRemoved.image.public_id) {
      await deleteImage(postRemoved.image.public_id)
    }

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message })

  }

}

export const getPost = async (req, res) => {

  try {
    const post = await Post.findById(req.params.id);
    if (!post) res.sendStatus(404);
    return res.json(post)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }


}
