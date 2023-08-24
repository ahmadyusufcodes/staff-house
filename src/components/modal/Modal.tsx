import React from 'react'
import { XCircleIcon } from '@heroicons/react/20/solid' 

interface ModalProps { 
    children: React.ReactNode, 
    open: boolean, 
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    blur?: boolean
}

export default function Modal({ children, open, setOpen, blur }: ModalProps) {
    return (
        <div className={`fixed z-10 inset-0 overflow-y-auto ${open ? 'block' : 'hidden'} ${blur ? 'backdrop-blur backdrop-brightness-75 backdrop-opacity-50' : ''}`}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={() => setOpen(false)}></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="relative px-10 pt-10 inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
                <button onClick={() => setOpen(false)} className="absolute right-3 top-3">
                    <XCircleIcon className='h-5 w-5' />
                </button>
            {children}
            </div>
        </div>
        </div>
    )
    }