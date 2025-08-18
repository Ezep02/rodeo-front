import React from 'react'

type Props = {
    text: string
}

const MinimalLoader: React.FC<Props> = ({ text }) => {
    return (
        <div className="flex items-center justify-center py-6">
            <div className="flex items-center gap-2 text-zinc-500">
                <div className="w-4 h-4 border-2 border-t-transparent border-zinc-400 rounded-full animate-spin" />
                <span className="text-sm">{text}</span>
            </div>
        </div>
    )
}

export default MinimalLoader
