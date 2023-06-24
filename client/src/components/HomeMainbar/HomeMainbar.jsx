import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './HomeMainbar.css';
import QuestionsList from './QuestionsList';

const HomeMainbar = () => {
    const location = useLocation();
    const user = useSelector(state => state.user); // Assuming user is stored in the Redux state
    const navigate = useNavigate();

    const questionsList = useSelector(state => state.questionsReducer);
    const selectedPlan = useSelector(state => state.selectedPlan);

    useEffect(() => {
        checkAuth();
    }, [user, selectedPlan]);

     
    const checkAuth = () => {
        if (user === null) {
              alert("login or singup to ask a question")
              navigate('/Auth')
        } else {
            navigate('/AskQuestion')
        }
      //  navigate('/')
    }
    return (
        <div className="main-bar">
            <div className="main-bar-header">
                {location.pathname === '/' ? <h1>Top Questions</h1> : <h1>All Questions</h1>}
                <button onClick={checkAuth} className='ask-btn'>Ask Question</button>
            </div>
            <div>
                {questionsList.data === null ? (
                    <h1>Loading....</h1>
                ) : (
                    <>
                        <p>{questionsList.data.length} questions</p>
                        <QuestionsList questionsList={questionsList.data} />
                    </>
                )}
            </div>
        </div>
    );
};

export default HomeMainbar;
