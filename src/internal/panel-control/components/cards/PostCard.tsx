import React from 'react'
import { Post } from '../../models/Post'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, Edit, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { GiBullHorns } from 'react-icons/gi'

type PostProps = {
    post_data: Post
    handleEdit: (post: Post) => void
    handleDelete: (id: number) => void
}

const PostCard: React.FC<PostProps> = ({ post_data, handleEdit, handleDelete }) => {
    return (
        <Card key={post_data.id} className="overflow-hidden">
            {post_data.preview_url && (
                <div className="aspect-video overflow-hidden">
                    {
                        post_data.preview_url != "" ? <img src={post_data.preview_url} alt={post_data.title} className="w-full h-full object-cover" /> : <div className='flex justify-center items-center h-full'><GiBullHorns size={54} className='text-rose-500' /></div>
                    }
                </div>
            )}
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <div className="space-y-1">
                        <CardTitle className="text-lg leading-tight">{post_data.title}</CardTitle>
                        <div className="flex items-center gap-2">
                            <Badge variant={post_data.is_published ? "default" : "secondary"}>
                                {post_data.is_published ? "Published" : "Draft"}
                            </Badge>
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="pt-0">
                <CardDescription className="line-clamp-2 mb-4">{post_data.description}</CardDescription>

                <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(post_data.created_at).toLocaleDateString()}
                    </div>

                    <div className="flex items-center gap-1">
                        <Button size="sm" variant="ghost" onClick={() => handleEdit(post_data)}>
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
                                    <AlertDialogTitle>Eliminar Post</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Estas segudo de querer eliminar "{post_data.title}"?. Esta accion no se puede deshacer.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleDelete(post_data.id)}>Delete</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default PostCard
