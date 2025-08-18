import React, { useState } from 'react'
import usePost from '../../../../hooks/usePost'
import { Button } from '@/components/ui/button'
import PostCard from '../cards/PostCard'
import { Post } from '../../models/Post'
import PostDialog from '../dialogs/PostDialog'
import { CiWavePulse1 } from "react-icons/ci";
import { Plus } from 'lucide-react'
import SuccessAlert from '@/components/alerts/SuccessAlert'
import ErrorAlert from '@/components/alerts/ErrorAlert'

const RecentPost: React.FC = () => {

  const [isPostDialogOpen, setPostDialogOpen] = useState<boolean>(false)
  const [editingPost, setEditingPost] = useState<Post | null>(null)

  const {
    post,
    DeletePost,
    showPostAlert,
    onSuccessMsg,
    setShowPostAlert,
    capturedErr,
    isOnErrAlert,
    setOnErrAlert,
    UpdatePost
  } = usePost()

  const HandlePostDialog = () => {
    setEditingPost(null)
    setPostDialogOpen(prev => !prev)
  }

  const handleEdit = (post: Post) => {
    setEditingPost(post)
    setPostDialogOpen(true)
  }

  const handleUpdatePost = async (updatedPost: Post) => {
    UpdatePost(updatedPost)
    setEditingPost(null)
    setPostDialogOpen(false)
  }

  return (
    <div className='flex flex-grow'>
      {/* Crear | Editar post */}
      <PostDialog
        mode={editingPost ? 'edit' : 'create'}
        initialData={editingPost ?? undefined}
        onClose={() => {
          setEditingPost(null)
          setPostDialogOpen(false)
        }}
        open={isPostDialogOpen}
        onEditSubmit={handleUpdatePost}
      />

      <SuccessAlert
        message={onSuccessMsg}
        show={showPostAlert}
        onClose={() => setShowPostAlert(false)}
      />

      <ErrorAlert
        message={capturedErr}
        show={isOnErrAlert}
        onClose={() => setOnErrAlert(false)}
      />

      {/* Gestión de posts */}
      <div className='w-full'>
        <header className="flex items-start gap-3 pt-4 pb-6 flex-wrap justify-between">
          <div className='flex gap-3'>
            <div className="p-2 bg-zinc-900 rounded-lg shadow-sm">
              <CiWavePulse1 size={24} className="text-white" />
            </div>
            <div>
              <h5 className="text-gray-800 text-sm font-semibold">Últimos Posts</h5>
              <p className="text-gray-500 text-sm">Gestiona tus publicaciones recientes</p>
            </div>
          </div>

          <div className=''>
            <Button
              size="sm"
              onClick={HandlePostDialog}
              className="bg-zinc-800 text-white hover:bg-zinc-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nuevo post
            </Button>
          </div>
        </header>



        {Array.isArray(post) && post.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2 w-full">
            {post.map((post, i) => (
              <PostCard
                post_data={post}
                handleDelete={DeletePost}
                handleEdit={handleEdit}
                key={i}
              />
            ))}
          </div>
        ) : (
          <div className='flex justify-center'>
            <p>Al parecer no hay publicaciones recientes.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default RecentPost
