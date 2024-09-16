import React, { useEffect, useState } from 'react';

interface ProgressBarProps {
  timer: number; // Time in milliseconds
  className?: string; // Optional class name for custom colors
}

const ProgressBar: React.FC<ProgressBarProps> = ({ timer, className = '' }) => {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev < 100) {
            return prev + 100 / (timer / 1000);
          }
          clearInterval(interval);
          return 100;
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [timer]);

  return (
    <div className="w-full h-1 bg-gray-100 rounded">
      <div className={`h-full rounded ${className}`} style={{ width: `${progress}%` }}></div>
    </div>
  );
};

export default ProgressBar;
