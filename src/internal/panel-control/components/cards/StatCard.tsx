import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import React from 'react'
import { GoArrowUpRight } from "react-icons/go";


type StatCardProp = {
    icon: React.ReactNode
    content?: string | number
    title: string
    callToAction?: () => void
    visibleButton: boolean
    description: string
}

const StatCard: React.FC<StatCardProp> = ({
    content,
    description,
    icon,
    title,
    callToAction,
    visibleButton
}) => {
    return (
        <Card className="p-4 shadow-sm border border-zinc-200">
            <CardContent className="p-0">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                        <div className="p-2 bg-zinc-900 rounded-xl text-white">
                            {icon}
                        </div>
                        <div>
                            <h5 className="text-sm font-semibold text-zinc-800">{title}</h5>
                            <p className="text-sm text-zinc-500">{description}</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <p className="text-2xl font-medium text-zinc-700">
                            {content}
                        </p>
                        {visibleButton && (
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={callToAction}
                                className="text-xs rounded-2xl"
                            >   
                                <GoArrowUpRight/>
                                Ver
                            </Button>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default StatCard

