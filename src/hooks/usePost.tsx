import { useEffect, useState } from "react"
import { Post } from "../internal/panel-control/models/Post"
import { Delete, List, Update } from "../internal/panel-control/services/post"


const usePost = () => {

  const [post, setPost] = useState<Post[] | []>([])
  const [postOffset, setPostOffset] = useState<number>(0)


  // Se encarga de manejar el estado de la alerta del post
  const [onSuccessMsg, setOnSuccessMsg] = useState<string>("")
  const [showPostAlert, setShowPostAlert] = useState<boolean>(false)
  const HandleSuccessAlert = () => {
    setShowPostAlert(true)
  }

  // Se encarga de manejar el estado de la alerta de error
  const [capturedErr, setCapturedErr] = useState<string>("")
  const [isOnErrAlert, setOnErrAlert] = useState<boolean>(false)
  const HandleErrAlert = () => {
    setOnErrAlert(true)
  }


  // Funcion para manejar el offset de posts
  const MovePostOffset = () => {
    setPostOffset((prev) => prev + 10)
  }

  // 1. Consultar posts
  useEffect(() => {

    const fetchPost = async () => {

      try {
        let res = await List(postOffset)
        if (res) {
          setPost(res.posts)
          MovePostOffset()
        }
      } catch (error) {
        console.warn(error)
      }
    }

    fetchPost()
  }, [])


  const DeletePost = async (id: number) => {
    try {
      const deleteRes = await Delete(id)
      if (deleteRes) {
        setPost((prev) => prev.filter((existing) => existing.id !== id))

        HandleSuccessAlert()
        setOnSuccessMsg("Post eliminado correctamente")
      }
    } catch (error) {
      HandleErrAlert()
      setCapturedErr("Algo no fue bien eliminado el post")
    }
  }

  const UpdatePost = async (post: Post) => {
    try {
      const updateRes = await Update(post)
      if (updateRes) {
        setPost((prev) =>
          prev.map((existing) =>
            existing.id === post.id ? { ...existing, ...post } : existing
          )
        )

        HandleSuccessAlert()
        setOnSuccessMsg("Post actualizado correctamente")
      }
    } catch (error) {
      HandleErrAlert()
      setCapturedErr("Algo no salió bien al actualizar el post")
    }
  }


  return {
    post,
    DeletePost,
    capturedErr,
    showPostAlert,
    onSuccessMsg,
    isOnErrAlert,
    setShowPostAlert,
    setOnErrAlert,
    UpdatePost
  }
}

export default usePost
