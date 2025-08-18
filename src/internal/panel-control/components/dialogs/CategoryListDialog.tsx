import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Edit, Trash2 } from 'lucide-react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Category } from '../../models/Category'
import CategoryDialog from './CategoryDialog' // Asegurate de que el path sea correcto

type Props = {
    open: boolean
    onClose: () => void
    categories: Category[]
    onEdit: (category: Category) => Promise<void>
    onDelete: (id: number) => void
}

const CategoryListDialog: React.FC<Props> = ({
    open,
    onClose,
    categories,
    onEdit,
    onDelete,
}) => {
    const [editingCategory, setEditingCategory] = useState<Category | null>(null)

    const handleEditClose = () => {
        setEditingCategory(null)
    }

    return (
        <>
            {/* Dialog principal */}
            <Dialog open={open} onOpenChange={onClose}>
                <DialogContent className="md:max-w-md max-w-sm p-6 rounded-3xl shadow-2xl bg-white">
                    <DialogHeader className="mb-4">
                        <DialogTitle className="text-lg font-semibold text-zinc-800">
                            Listado de Categorías
                        </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
                        {categories.length > 0 ? (
                            categories.map((category) => (
                                <div
                                    key={category.id}
                                    className="flex items-center justify-between bg-zinc-100 rounded-xl px-4 py-2"
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="w-8 h-8 rounded-full"
                                            style={{ backgroundColor: category.color }}
                                        />
                                        <div className="text-sm text-zinc-800 font-medium">{category.name}</div>
                                    </div>

                                    <div className="flex items-center gap-1">
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={() => setEditingCategory(category)}
                                        >
                                            <Edit className="w-4 h-4" />
                                        </Button>

                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button size="sm" variant="ghost">
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Eliminar Categoría</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        ¿Seguro que querés eliminar <strong>"{category.name}"</strong>? Esta acción no se puede deshacer.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                    <AlertDialogAction onClick={() => onDelete(category.id!)}>
                                                        Eliminar
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-sm text-zinc-500 text-center py-4">
                                No hay categorías activas.
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>

            {/* Dialog para editar */}
            {editingCategory && (
                <CategoryDialog
                    open={true}
                    mode="edit"
                    initialData={editingCategory}
                    onClose={handleEditClose}
                    onEditSubmit={async (updated) => {
                        await onEdit(updated)
                        handleEditClose()
                    }}
                />
            )}
        </>
    )
}

export default CategoryListDialog
