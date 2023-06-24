import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Subscription.css';
import Razorpay from 'razorpay';

const Subscription = () => {
    const [selectedPlan, setSelectedPlan] = useState({
        name: 'Free Plan',
        amount: 0,
        description: 'Can post only 1 question a day',
    });
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
    });

    const user = useSelector((state) => state.currentUserReducer); // Retrieve the current user from the currentUserReducer
    const navigate = useNavigate();

    const handlePlanSelection = (plan) => {
        setSelectedPlan(plan);
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleCheckout = () => {
        if (selectedPlan) {
            const userId = user.id; // Use the logged-in user's ID from the Redux store

            const razorpay = new Razorpay({
                key_id: 'YOUR_RAZORPAY_KEY_ID',
                key_secret: 'YOUR_RAZORPAY_KEY_SECRET',
            });

            razorpay.orders.create(
                {
                    amount: selectedPlan.amount * 100,
                    currency: 'INR',
                    receipt: 'receipt_order_123',
                },
                (error, order) => {
                    if (error) {
                        console.log('Razorpay order creation error:', error);
                        return;
                    }

                    const orderId = order.id;

                    razorpay.createPayment({
                        amount: selectedPlan.amount * 100,
                        currency: 'INR',
                        order_id: orderId,
                        customer_id: userId,
                        callback_url: 'YOUR_CALLBACK_URL',
                        notes: {
                            plan: selectedPlan.name,
                            userId: userId,
                        },
                    });
                }
            );

            navigate('/AskQuestion');
        } else {
            navigate('/Subscription');
        }
    };

    const plans = [
        {
            name: 'Free Plan',
            amount: 0,
            description: 'Can post only 1 question a day',
        },
        {
            name: 'Silver Plan',
            amount: 100,
            description: 'Can post 5 questions a day',
        },
        {
            name: 'Gold Plan',
            amount: 1000,
            description: 'Can post unlimited questions',
        },
    ];

    return (
        <div className="subscription-container">
            <h1>Choose a Subscription Plan</h1>
            <div className="plan-container">
                {plans.map((plan) => (
                    <div
                        key={plan.name}
                        className={`plan ${selectedPlan.name === plan.name && 'selected'}`}
                        onClick={() => handlePlanSelection(plan)}
                    >
                        <h2>{plan.name}</h2>
                        <p>{plan.description}</p>
                        {plan.name !== 'Free Plan' && (
                            <button className="purchase-btn" onClick={handleCheckout} disabled={!selectedPlan}>
                                Purchase
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Subscription;
