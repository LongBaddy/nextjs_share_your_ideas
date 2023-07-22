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

    const [submitting, setsubmitting] = useState(false);
    const [post, setpost] = useState({
        idea:'',
        tag:'',
    });

    const createIdea = async (e) => {
        e.preventDefault();
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