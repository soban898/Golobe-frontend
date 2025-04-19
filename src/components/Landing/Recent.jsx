import React from 'react';
import '../../styles/recent.css';
import city1 from '../../assets/img/city1.png';
import city2 from '../../assets/img/city2.png';
import city3 from '../../assets/img/city3.png';
import city4 from '../../assets/img/city4.png';

const Recent = () => {
  return (
<div className="Recent-search">
  <h1>Your recent searches</h1>
  <div className="recent-items">
    <div className="recent-item">
      <img src={city1} alt="Istanbul" />
      <div className="recent-item-text">
        <p><strong>Istanbul, Turkey</strong></p>
        <p className='places'>325 places</p>
      </div>
    </div>
    <div className="recent-item">
      <img src={city2} alt="Sydney" />
      <div className="recent-item-text">
        <p><strong>Sydney, Australia</strong></p>
        <p className='places'>325 places</p>
      </div>
    </div>
    <div className="recent-item">
      <img src={city3} alt="Baku" />
      <div className="recent-item-text">
        <p><strong>Baku, Azerbaijan</strong></p>
        <p className='places'>325 places</p>
      </div>
    </div>
    <div className="recent-item">
      <img src={city4} alt="Malé" />
      <div className="recent-item-text">
        <p><strong>Malé, Maldives</strong></p>
        <p className='places'>325 places</p>
      </div>
    </div>
  </div>
</div>


  );
};

export default Recent;


