import { useState, useEffect } from 'react'

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <span className="text-sm opacity-70">
      {time.toLocaleString()}
    </span>
  );
};

export default Clock