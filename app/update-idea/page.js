"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from 'next-auth/react';

import Form from "@components/Form";

const UpdateIdea = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const ideaId = searchParams.get("id");
  const { data:session } = useSession();


  useEffect(() => {
    // Check if the user is not logged in and redirect to the homepage.
    // This is used to when user logged out during editing, and the page will stay at the editing page.
    if (!session?.user) {
      router.push('/');
    }
  }, [session, router]);


  const [post, setPost] = useState({ idea: "", tag: "", });
  const [submitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getIdeaDetails = async () => {
      const response = await fetch(`/api/idea/${ideaId}`);
      const data = await response.json();

      setPost({
        idea: data.idea,
        tag: data.tag,
      });
    };

    if (ideaId) getIdeaDetails();
  }, [ideaId]);

  const updateIdea = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!ideaId) return alert("Missing IdeaId!");

    try {
      const response = await fetch(`/api/idea/${ideaId}`, {
        method: "PATCH",
        body: JSON.stringify({
          idea: post.idea,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type='Edit'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updateIdea}
    />
  );
};

export default UpdateIdea;