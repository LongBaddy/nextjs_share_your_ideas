"use client"
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Form from '@components/Form';

const CreateIdea = () => {
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