"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

const EditPrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  const [submitting, setSumbitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  const getPromptDetails = async () => {
    const response = await fetch(`/api/prompt/${promptId}`);
    const data = await response.json();
    setPost({
      prompt: data.prompt,
      tag: data.tag,
    });
  };

  useEffect(() => {
    if (promptId) getPromptDetails();
    console.log(promptId, post);
  }, [promptId]); // Run whenever promptId changes

  const updatePrompt = async (e) => {
    // prevent the page from reloading after submitting
    e.preventDefault();
    setSumbitting(true);

    if (!promptId) return alert("Prompt ID not found");

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSumbitting(false);
    }
  };

  return (
    <>
      <Form
        type="Edit"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={updatePrompt}
      />
    </>
  );
};

export default EditPrompt;
