import React, { Suspense } from 'react'
import MinimalLoader from '../components/common/Loader'

const PostManager = React.lazy(() => import("../components/sections/PostManager"))
const ServiceManagment = React.lazy(() => import("../components/sections/ServiceManagment"))
const CloudManager = React.lazy(() => import('../components/sections/CloudManager'))
const Stats = React.lazy(() => import('../components/sections/Stats'))

const PanelControlPage = () => {
    return (
        <div className='w-full p-6'>
            <div className="border-b border-gray-100 flex items-center justify-between pb-4">
                <h1 className="text-2xl font-semibold text-gray-900">Panel de control</h1>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
                <div
                    className='md:col-span-2 bg-white border border-slate-200 shadow-md rounded-2xl flex-1 pb-4 px-4 overflow-auto'
                >
                    <Suspense fallback={
                        <div className='min-h-[80vh] flex justify-center items-center'>
                            <MinimalLoader text='' />
                        </div>
                    }>
                        <CloudManager />
                        <Stats />
                        <PostManager />
                    </Suspense>
                </div>
                <Suspense fallback={
                    <div className='min-h-[80vh] flex justify-center items-center bg-white'>
                        <MinimalLoader text='' />
                    </div>
                }>
                    <ServiceManagment />
                </Suspense>
            </div>
        </div>
    )
}

export default PanelControlPage
