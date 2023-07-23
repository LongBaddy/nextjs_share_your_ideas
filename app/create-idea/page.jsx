"use client"
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import Form from '@components/Form';

const CreateIdea = () => {
    const { data:session } = useSession();
    const router = useRouter();

    useEffect(() => {
        // Check if the user is not logged in and redirect to the homepage
        if (!session?.user) {
          router.push('/');
        }
      }, [session, router]);

    const [submitting, setIsSubmitting] = useState(false);
    const [post, setpost] = useState({
        idea:'',
        tag:'',
    });

    const createIdea = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch("/api/idea/new", {
                method: "POST",
                body: JSON.stringify({
                    idea: post.idea,
                    userId: session?.user.id,
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

    }



    return (
        <Form
            type="Create"
            post={post}
            setPost={setpost}
            submitting={submitting}
            handleSubmit={createIdea}
        />
    )
}

export default CreateIdea