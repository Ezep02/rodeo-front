import { Scissors } from 'lucide-react'
import React from 'react'
import useCloudVideos from '../../hooks/useCloudVideos'

const HeroImageSection:React.FC = () => {

    const {
        cloudinaryVideos
    } = useCloudVideos()


    return (
        <div className="relative">
            <div className=" rounded-2xl overflow-hidden p-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {cloudinaryVideos.map((src, index) => (
                        <div key={index} className="relative aspect-square overflow-hidden rounded-xl">
                            <video
                                src={src.secure_url}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-cover"
                                aria-hidden="true"
                            />
                        </div>
                    ))}
                </div>

                {/* Overlay UI Elements */}
                <div className="absolute top-6 left-6">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center space-x-2 shadow">
                        <Scissors className="w-4 h-4 text-gray-600" />
                        <span className="text-sm font-medium text-gray-800">/ Podes ser el siguiente</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroImageSection
