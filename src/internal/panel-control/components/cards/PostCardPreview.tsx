import React from 'react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar } from 'lucide-react'
import { GiBullHorns } from 'react-icons/gi'

type Props = {
  title: string
  description: string
   imageUrl?: string
}

const PostPreviewCard: React.FC<Props> = ({ title, description, imageUrl }) => {
  return (
    <Card className="overflow-hidden shadow-md border border-zinc-200">
      {imageUrl && (
        <div className="aspect-video overflow-hidden bg-zinc-100">
          {imageUrl !== "" ? (
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex justify-center items-center h-full">
              <GiBullHorns size={54} className="text-rose-500" />
            </div>
          )}
        </div>
      )}

      <CardHeader className="pb-3">
        <div className="space-y-1">
          <CardTitle className="text-lg leading-tight">{title}</CardTitle>
          <div className="flex items-center gap-2">
            <Badge>
              Publicado
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <CardDescription className="line-clamp-2 mb-4">
          {description}
        </CardDescription>

        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="w-4 h-4 mr-1" />
          {new Date().toLocaleDateString("es-AR", {
            day:"numeric",
            month:"short",
            year:"numeric"
          })}
        </div>
      </CardContent>
    </Card>
  )
}

export default PostPreviewCard
