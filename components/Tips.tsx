'use client';
import { useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const Tips = () => {
  const fetchAndShowTip = async () => {
    try {
      const response = await axios.get('https://drai.pythonanywhere.com/api/daily-tip/');
      const tip = response.data;
      
      toast.custom((t) => (
        <div
          className={`${t.visible ? 'animate-enter' : 'animate-leave'}`}
          style={{
            background: 'white',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            padding: '16px',
            maxWidth: '400px',
            position: 'relative',
            direction: 'rtl'
          }}
        >
          <div style={{ color: 'black' }}>
            💡 {tip.content}
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '3px',
              background: '#e2e8f0',
              borderBottomLeftRadius: '8px',
              borderBottomRightRadius: '8px',
              overflow: 'hidden'
            }}
          >
            <div
              style={{
                height: '100%',
                background: '#10b981',
                animationName: 'shrink',
                animationDuration: '5s',
                animationTimingFunction: 'linear',
                animationFillMode: 'forwards'
              }}
            />
          </div>
        </div>
      ), {
        duration: 5000,
        position: 'bottom-right',
      });
    } catch (error) {
      console.error('Error fetching tip:', error);
    }
  };

  useEffect(() => {
    // Show first tip immediately
    fetchAndShowTip();

    // Set up interval to show tip every minute
    const interval = setInterval(fetchAndShowTip, 60000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style jsx global>{`
        @keyframes shrink {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
        
        .animate-enter {
          animation: slideIn 0.2s ease-out;
        }
        
        .animate-leave {
          animation: slideOut 0.2s ease-in forwards;
        }
        
        @keyframes slideIn {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes slideOut {
          from {
            transform: translateY(0);
            opacity: 1;
          }
          to {
            transform: translateY(100%);
            opacity: 0;
          }
        }
      `}</style>
      <Toaster />
    </>
  );
};

export default Tips;