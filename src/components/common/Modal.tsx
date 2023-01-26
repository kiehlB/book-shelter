import * as React from 'react';
import { MdClose } from 'react-icons/md';
import { AnimatePresence, motion } from 'framer-motion';
import clsx from 'clsx';

interface ModalProps {
  visible?: boolean;
  onClose?: (visible) => void;
  children?: React.ReactNode;
  className: string;
}

const itemVariants = {
  open: {
    display: 'block',

    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 24,
      duration: 0.6,
      staggerChildren: 0.17,
      delayChildren: 0.2,
    },
  },
  closed: {
    display: 'none',

    transition: {
      type: 'spring',
      staggerChildren: 0.17,
      delayChildren: 0.2,

      staggerDirection: -1,
      when: 'afterChildren',
    },
  },
};

const ulVariants = {
  open: {
    display: 'block',

    transition: {
      staggerChildren: 0.17,
      delayChildren: 0.2,
    },
  },
  closed: {
    display: 'none',
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
      when: 'afterChildren',
    },
  },
};

const liVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const Modal: React.FC<ModalProps> = ({ visible, children, onClose, className }) => {
  return (
    <motion.div
      className={clsx(
        'fixed top-0 left-0 w-full h-full flex items-center justify-center z-10 backdrop-brightness-75',
      )}
      initial={{ display: 'none' }}
      animate={visible ? 'open' : 'closed'}
      variants={ulVariants}>
      <div className="flex items-center justify-center h-full">
        <motion.div variants={liVariants} className={className}>
          <div className="flex-1 flex flex-col shadow-2xl border">
            <div className="flex justify-end  p-[1.5rem]">
              <MdClose
                onClick={() => onClose(!visible)}
                tabIndex={1}
                size={24}
                color="#868E96"
              />
            </div>
            <div className="flex-1 flex flex-col">{children}</div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Modal;
