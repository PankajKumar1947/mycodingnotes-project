import { createComment, getComments } from '@/Services/operations/comment';
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { FaUserCircle } from "react-icons/fa";

const Comments = ({ pageId }: any) => {
  const [commentData, setCommentData] = useState<any>([]);
  const [refreshComment, setRefreshComment] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm()

  const onSubmit = async (data: any) => {
    await createComment(pageId, data.comment);
    setRefreshComment((prev: boolean) => !prev);
    reset();
  }

  useEffect(() => {
    const fetchComments = async () => {
      const response = await getComments(pageId);
      setCommentData(response?.data);
    }
    fetchComments();
  }, [refreshComment])

  return (
    <>
      <div className="md:max-w-[80%] mx-auto overflow-hidden mt-4 border-t-2 border-blue-600">
        <h1 className='text-2xl font-bold mt-2'>Comments</h1>
        <form onSubmit={handleSubmit(onSubmit)} className='flex justify-between my-2'>
          <input
            {...register('comment', { required: true })}
            type="text" placeholder='Add a comment' className='flex-1 p-2 outline-none text-sm bg-slate-700 text-white px-4 rounded-l-md' />
          <button
            type='submit'
            className=' bg-slate-600 rounded-r-md rounded-l-0 text-sm px-4 py-2'>Add</button>
        </form>
        {errors.comment && <span className='text-red-400'>please add some comment</span>}
        {
          commentData?.length > 0 && commentData.map((comment: any) => {
            return (
              <div
              key={comment?.id}
              className='my-2 mt-4'>
                <div className='flex gap-2 items-center text-indigo-400'>
                  <div>
                    <FaUserCircle className='text-4xl' />
                  </div>
                  <div className='text-sm'>
                    <h3>{comment?.user?.fullname}</h3>
                    <h3 className='text-xs'>{comment?.user?.username}</h3>
                  </div>
                </div>
                <h2 className='ml-8 text-sm'>{comment?.title}</h2>
              </div>
            )
          })
        }
      </div>
    </>
  )
}

export default Comments