"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Upload,
  BookOpen,
  User,
  FileText,
  Image as ImageIcon,
} from "lucide-react";

export default function CreateBlogPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Upload failed");
      }
      const data = await response.json();
      setImageUrl(data.imageUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, author, imageUrl }),
      });
      if (response.ok) {
        router.push("/blog");
      } else {
        throw new Error("Failed to create blog post");
      }
    } catch (error) {
      console.error("Error creating blog post:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="max-w-3xl mx-auto px-4">
        <motion.h1
          className="text-5xl font-bold text-center mb-8 text-blue-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Create a New Blog Post
        </motion.h1>

        <motion.form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
              <BookOpen className="inline-block mr-2" size={16} />
              Title
            </label>
            <Input
              id="title"
              type="text"
              placeholder="Enter post title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="shadow-sm"
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="content"
            >
              <FileText className="inline-block mr-2" size={16} />
              Content
            </label>
            <Textarea
              id="content"
              placeholder="Write your blog post content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={6}
              className="shadow-sm"
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="author"
            >
              <User className="inline-block mr-2" size={16} />
              Author
            </label>
            <Input
              id="author"
              type="text"
              placeholder="Enter author name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
              className="shadow-sm"
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="image"
            >
              <ImageIcon className="inline-block mr-2" size={16} />
              Upload Image
            </label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={uploading}
              className="shadow-sm"
            />
            {uploading && (
              <p className="mt-2 text-sm text-blue-600">Uploading...</p>
            )}
            {imageUrl && (
              <div className="mt-4">
                <Image
                  src={imageUrl}
                  alt="Uploaded image"
                  width={200}
                  height={200}
                  className="rounded-md shadow-md"
                />
              </div>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
          >
            <Upload className="mr-2" size={16} />
            Create Post
          </Button>
        </motion.form>
      </div>
    </div>
  );
}
