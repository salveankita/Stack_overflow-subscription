import React, { useState } from 'react';
import './Subscription.css'
const Subscription = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handlePlanSelection = (plan) => {
    setSelectedPlan(plan);
  };

  const handleCheckout = () => {
    // Implement the logic to proceed with the payment using the selected plan
  };

  return (
    <div className="subscription-container">
      <h1>Choose a Subscription Plan</h1>
      <div className="plan-container">
        <div className={`plan ${selectedPlan === 'free' && 'selected'}`} onClick={() => handlePlanSelection('free')}>
          <h2>Free Plan</h2>
          <p>Can post 1 question a day</p>
          <p>Price: Free</p>
        </div>
        <div className={`plan ${selectedPlan === 'silver' && 'selected'}`} onClick={() => handlePlanSelection('silver')}>
          <h2>Silver Plan</h2>
          <p>Can post 5 questions a day</p>
          <p>Price: Rs.100/month</p>
        </div>
        <div className={`plan ${selectedPlan === 'gold' && 'selected'}`} onClick={() => handlePlanSelection('gold')}>
          <h2>Gold Plan</h2>
          <p>Can post unlimited questions</p>
          <p>Price: Rs.1000/month</p>
        </div>
      </div>
      <button className="checkout-btn" onClick={handleCheckout} disabled={!selectedPlan}>
        Proceed to Checkout
      </button>
    </div>
  );
};

export default Subscription;
