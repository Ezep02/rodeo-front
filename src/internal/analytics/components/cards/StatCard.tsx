

import { Card, CardContent } from '@/components/ui/card'

import React from 'react'


type StatCardProps = {
    content_text: number | string
    icon?: React.ReactElement
    title_text: string
}

const StatCard:React.FC<StatCardProps> = ({content_text, title_text, icon}) => {
    return (
        <Card className='p-4 bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-colors'>
            <CardContent className="p-4">
                <div className="flex items-center gap-2">
                    {
                        icon && (
                            <i className='px-3'>
                                {icon}
                            </i>
                        )
                    }
                    <div>
                        <p className="text-sm text-muted-foreground text-zinc-50">{title_text}</p>
                        <p className="text-xl font-bold text-zinc-50">{content_text}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default StatCard
