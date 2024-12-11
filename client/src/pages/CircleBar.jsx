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
      <div className="circular-progress" style={{ position: 'relative', width: '150px', height: '150px', background: `conic-gradient(#c40094 ${progressValue * 3.6}deg, rgba(255, 255, 255, .1) 0deg)`, borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="progress-value" style={{ position: 'relative', fontSize: '30px', fontWeight: '600' }}>{`${progressValue}%`}</div>
        <div style={{ content: '', position: 'absolute', width: '110px', height: '110px', background: '#56359e', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '30px', fontWeight: '600' }}>{progressValue}%</div>
      </div>
      <div className="score-text" style={{ fontSize: '16px', fontWeight: '600', marginTop: '20px' }}>
        {subject} is {userScore} out of {totalQuestions}
      </div>
    </div>
  );
};

export default QuizResult;