import { useEffect } from 'react';

export default function Overlay({ hideOverlay, children }: { hideOverlay: () => void, children: React.ReactNode }) {

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          // "Escape" key pressed, hide overlay
          hideOverlay()
        }
      };
    
      useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
    
        return () => {
          window.removeEventListener('keydown', handleKeyDown);
        };
      }, []);

    const handleClickOverlay = (e: React.FormEvent) => {
      e.preventDefault()
      const target = e.target as HTMLElement; 

      if (target.className.length > 0) {
        if (target.className.includes('overlay-wrapper')){
          hideOverlay()
        }
      }
    }
  
    return (
      <div className='overlay-wrapper' onClick={e =>handleClickOverlay(e)}>
        <div className='overlay-wrapper-inner'>
          {children}
        </div>
      </div>
    )
  }