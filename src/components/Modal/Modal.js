import { useEffect} from "react";
import PropTypes from 'prop-types';
import { createPortal } from "react-dom";

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ onClose, largeImage }) { 
    
    useEffect(() => { 

        window.addEventListener('keydown', handleKeyDown);
        return () => { window.removeEventListener('keydown',handleKeyDown);};
    });

    const handleKeyDown = e => { 
            console.log(e.code);
            if (e.code === 'Escape') { 
                onClose();
            };
        };

   const handleBackDropClick = e => { 
        console.log('backDrop click');
        if (e.currentTarget === e.target) { 
            onClose();
        };
        console.log(e.currentTarget);
        console.log(e.target);
    };

    console.log(largeImage);
    
    return createPortal(
        <div className="Overlay" onClick={handleBackDropClick}>
            <div className="Modal">
                <img src={largeImage} alt='#' />
            </div>
        </div>,
        modalRoot
    );
};

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    largeImage:PropTypes.string.isRequired,
};