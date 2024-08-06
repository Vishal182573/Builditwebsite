"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Image from "next/image";
import { Calendar, User, ArrowRight, Plus, Eye } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";

interface BlogPost {
  _id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  imageUrl?: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/blog");
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }
      const data = await response.json();
      console.log("Fetched data:", data); // Debug log
      setPosts(data.posts || []);
    } catch (error) {
      console.error("Error fetching posts:", error);
      toast({
        title: "Error",
        description: "Failed to load blog posts. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getCloudinaryUrl = (url: string | undefined) => {
    if (!url) return "/placeholder-image.jpg";
    if (!url.includes("cloudinary")) return url;
    return url.replace(/upload\//, "upload/c_scale,w_1200/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-6xl font-bold text-center mb-12 text-blue-800">
          BuildIt Blog
        </h1>
        <div className="flex justify-end mb-8">
          <Link href="/blog/create">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full flex items-center shadow-lg">
              <Plus className="mr-2" size={24} />
              Create New Post
            </Button>
          </Link>
        </div>
        {loading ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, index) => (
              <Skeleton key={index} className="h-[400px] w-full" />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center text-gray-600">No posts found.</div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Card key={post._id} className="overflow-hidden">
                <CardHeader className="p-0 relative">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="default"
                        className="absolute top-2 right-2 z-10"
                      >
                        <Eye className="mr-2" size={16} />
                        View Image
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl">
                      <Image
                        src={getCloudinaryUrl(post.imageUrl)}
                        alt={post.title}
                        width={1200}
                        height={675}
                        className="w-full h-auto object-contain"
                      />
                    </DialogContent>
                  </Dialog>
                  <Image
                    src={getCloudinaryUrl(post.imageUrl)}
                    alt={post.title}
                    width={400}
                    height={200}
                    className="w-full h-60 object-cover"
                  />
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="text-2xl font-bold mb-3 text-blue-800">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 mb-4 line-clamp-3">
                    {post.content}
                  </CardDescription>
                  <div className="flex justify-between text-sm text-gray-500 mb-4">
                    <span className="flex items-center">
                      <User className="mr-1" size={16} />
                      {post.author}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="mr-1" size={16} />
                      {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 transition-colors duration-300">
                    Read More <ArrowRight className="ml-2" size={16} />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
