import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type SuccessAlertProps = {
    message: string
    show: boolean
    onClose?: () => void
}

const ErrorAlert: React.FC<SuccessAlertProps> = ({ message, show, onClose }) => {
    // Auto-hide after 3 seconds (optional)
    useEffect(() => {
        if (show && onClose) {
            const timer = setTimeout(() => {
                onClose()
            }, 3000)
            return () => clearTimeout(timer)
        }
    }, [show, onClose])

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -100, opacity: 0 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="fixed top-16 left-1/2 transform -translate-x-1/2 bg-red-500 backdrop-blur-3xl text-zinc-50 border px-4 py-2 rounded-full shadow-2xl flex items-center gap-2 z-50"
                >
                    <span className="text-sm font-medium">{message}</span>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default ErrorAlert