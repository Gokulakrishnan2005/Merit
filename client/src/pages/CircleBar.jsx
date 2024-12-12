import React, { useEffect, useState } from 'react';

const QuizResult = ({ userScore, totalQuestions, subject }) => {
  const [progressValue, setProgressValue] = useState(0);

  useEffect(() => {
    let progressStartValue = 0;
    let progressEndValue = (userScore / totalQuestions) * 100;
    let speed = 20;

    let progress = setInterval(() => {
      progressStartValue++;
      setProgressValue(progressStartValue);

      if (progressStartValue >= progressEndValue) {
        clearInterval(progress);
      }
    }, speed);

    return () => clearInterval(progress);
  }, [userScore, totalQuestions, subject]);
 
  return (
    <div className="percentage-container" style={{ width: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '20px 0 40px' }}>
      
      <div className="w-40 h-40 relative">
        <div className="w-40 h-40 rounded-full p-5 shadow-[6px_6px_10px_-1px_rgba(0,0,0,0.15),-6px_-6px_10px_-1px_rgba(255,255,255,0.7)]">
          <div className="w-[120px] h-[120px] rounded-full flex items-center justify-center shadow-[inset_4px_4px_6px_-1px_rgba(0,0,0,0.2),inset_-4px_-4px_6px_-1px_rgba(255,255,255,0.7),-0.5px_-0.5px_0px_rgba(255,255,255,1),0.5px_0.5px_0px_rgba(0,0,0,0.15),0px_12px_10px_-10px_rgba(0,0,0,0.05)]">
            <div id="number" className="font-semibold text-[#555]">
              {progressValue}%
            </div>
          </div>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          width="160px"
          height="160px"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <defs>
            <linearGradient id="GradientColor">
              <stop offset="0%" stopColor="#e91e63" />
              <stop offset="100%" stopColor="#673ab7" />
            </linearGradient>
          </defs> 
          <circle
            cx="80"
            cy="80"
            r="70"
            strokeLinecap="round"
            className="fill-none stroke-[url(#GradientColor)] stroke-[20px]"
            style={{
              strokeDasharray: 472,
              strokeDashoffset: 472 - (472 * progressValue) / 100,
              transition: 'stroke-dashoffset 0.1s linear',
            }}
          />
        </svg>
      </div>
      <div className="score-text" style={{ fontSize: '16px', fontWeight: '600', marginTop: '20px' }}>
        {subject} is {userScore} out of {totalQuestions}
      </div>
    </div>
  );
};

export default QuizResult;