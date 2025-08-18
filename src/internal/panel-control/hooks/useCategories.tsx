import { useContext, useEffect, useState } from "react"
import { Category } from "../models/Category"
import { Update, Create, List, Delete } from "../services/categories"
import { PanelControlContext } from "@/context/PanelControlContext"


const useCategories = () => {


    const {
        categories,
        setCategories
    } = useContext(PanelControlContext)!


    const [onSuccess, setOnSuccess] = useState(false)
    const [onSuccessMsg, setOnSuccessMsg] = useState("")

    const [isOnErrAlert, setIsOnErrAlert] = useState(false)
    const [capturedErr, setCapturedErr] = useState("")

    const HandleSuccessAlert = () => {
        setOnSuccess(true)
    }

    const HandleErrAlert = () => {
        setIsOnErrAlert(true)
    }

 
    // Crear una categoria
    const CreateCategory = async (category: Category) => {
        // Implementar la lógica para crear una categoría
        try {
            const res = await Create(category)
            if (res) {
                HandleSuccessAlert()
                setOnSuccessMsg("Categoría creada correctamente")
            }

        } catch (error) {
            HandleErrAlert()
            setCapturedErr("Error al crear la categoría")
        }
    }

    // Actualizar una categoria
    const UpdateCategory = async (category: Category) => {
        // Implementar la lógica para crear una categoría
        try {
            const res = await Update(category)
            if (res) {
                HandleSuccessAlert()
                setOnSuccessMsg("Categoría creada correctamente")

                // actualizar la lista de categorias
                setCategories(prev => prev.map(cat => cat.id === category.id ? category : cat))   
            }
        } catch (error) {
            HandleErrAlert()
            setCapturedErr("Error al actualizar la categoría")
        }
    }

    // Eliminar una categoria
    const DeleteCategory = async (id: number) => {
        // Implementar la lógica para eliminar una categoría
        try {
            const res = await Delete(id)
            if (res) {
                HandleSuccessAlert()
                setOnSuccessMsg("Categoría eliminada correctamente")

                // actualizar la lista de categorias
                setCategories(prev => prev.filter(cat => cat.id !== id))
            }
        } catch (error) {
            HandleErrAlert()
            setCapturedErr("Error al eliminar la categoría")
        }
    }


    // Obtener una lista de las categorias
    useEffect(() => {
        const fetchCategories = async () => {

            try {
                const res = await List()
                if (res) {
                    console.log("Categorias obtenidas: ", res.categories)
                    setCategories(res.categories)
                }
            } catch (error) {
                HandleErrAlert()
                setCapturedErr("Error al obtener las categorías")
            }
        }
        fetchCategories()
    }, [])

    return {
        onSuccess,
        setOnSuccess,
        onSuccessMsg,
        setOnSuccessMsg,
        isOnErrAlert,
        setIsOnErrAlert,
        capturedErr,
        setCapturedErr,
        UpdateCategory,
        CreateCategory,
        DeleteCategory,
        categories
    }
}

export default useCategories
