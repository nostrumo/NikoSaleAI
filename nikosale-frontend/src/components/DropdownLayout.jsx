import {useState, useRef, useEffect} from 'react';
import {AnimatePresence, motion} from 'framer-motion';

export default function DropdownLayout({trigger, children, position = 'right', openOnHover = false}) {
    const [open, setOpen] = useState(false);
    const containerRef = useRef(null);

    // Закрытие при клике вне
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative"
            onMouseEnter={() => openOnHover && setOpen(true)}
            onMouseLeave={() => openOnHover && setOpen(false)}
        >
            <div onClick={() => !openOnHover && setOpen((prev) => !prev)} className="cursor-pointer">
                {trigger}
            </div>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{opacity: 0, y: -5}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: -5}}
                        transition={{duration: 0.15}}
                        className={`absolute z-50 mt-2 max-w-md rounded-xl shadow-xl bg-white border border-gray-200 overflow-hidden ${
                            position === 'right' ? 'right-0' : 'left-0'
                        }`}
                    >
                        <div className="p-4 text-sm break-words whitespace-normal">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
