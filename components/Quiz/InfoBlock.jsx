'use client';

import React from 'react';

const InfoBlock = ({ info, onNext }) => {
  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', marginBottom: '20px', backgroundColor: '#f9f9f9' }}>
      <p>{info.text}</p>
      <button onClick={onNext} style={{ marginTop: '10px', padding: '10px 20px', borderRadius: '5px', border: '1px solid #ccc', cursor: 'pointer' }}>Следующий шаг</button>
    </div>
  );
};

export default InfoBlock;