import Link from "next/link";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{type} Post</span>
      </h1>
      <p className='desc text-left max-w-md'>
        {type} and share your idea about my Next.js 13 page
      </p>

      <form
        onSubmit={handleSubmit}
        className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
      >
        <label>
          <span className='font-satoshi font-semibold text-base blue_gradient'>
            Your Idea
          </span>

          <textarea
            value={post.idea}
            onChange={(e) => setPost({ ...post, idea: e.target.value })}
            placeholder='Write your post here'
            required
            className='form_textarea '
          />
        </label>

        <label>
          <span className='font-satoshi font-semibold text-base blue_gradient'>
            Field of Idea{" "}
            <span className='font-normal'>
              (#Color, #Font, #Layout, etc.)
            </span>
          </span>
          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            type='text'
            placeholder='#Tag'
            required
            className='form_input'
          />
        </label>

        <div className='flex-end mx-3 mb-5 gap-4'>
          <Link href='/' className='text-gray-700 text-sm'>
            Cancel
          </Link>

          <button
            type='submit'
            disabled={submitting}
            className='px-5 py-1.5 text-sm bg-violet-500 rounded-lg text-white'
          >
            {submitting ? `${type}ing...` : type}
          </button>
        </div>

      </form>

    </section>
  )
}

export default Form