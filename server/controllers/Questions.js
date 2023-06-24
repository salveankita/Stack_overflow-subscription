import Questions from '../models/Questions.js'
import mongoose from 'mongoose'


export const AskQuestion = (questionData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.postQuestion(questionData);

        // Assuming the response includes the error message in the `message` field
        if (typeof data === 'string') {
            console.log(data); // Log the error message
            return; // Stop execution if there's an error
        }

        dispatch({ type: 'POST_QUESTION', payload: data });
        dispatch(fetchAllQuestions());
        navigate('/');
    } catch (error) {
        console.log(error); // Log the error

        if (error.code === 'ERR_NETWORK') {
            console.log('A network error occurred');
            // Dispatch an action or handle the network error accordingly
        } else {
            console.log('An error occurred while processing the request');
            // Dispatch an action or handle the error accordingly
        }
    }
}


export const getAllQuestions = async (req, res) => {
    try {
        const questionList = await Questions.find();
        res.status(200).json(questionList);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
} 
export const deleteQuestion = async (req, res) => {
    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('question unavailable...');
    }

    try {
        await Questions.findByIdAndRemove(_id);
        res.status(200).json({ message: "successfully deleted..." })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}
export const deleteAnswer = (id, answerId, noOfAnswers) => async (dispatch) => {
    try {
        await api.deleteAnswer(id, answerId, noOfAnswers)
        dispatch(fetchAllQuestions())
    } catch (error) {
        console.log(error)
    }
} 
export const voteQuestion = async (req, res) => {
    const { id: _id } = req.params;
    const { value, userId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('question unavailable...');
    }

    try {
        const question = await Questions.findById(_id)
        const upIndex = question.upVote.findIndex((id) => id === String(userId))
        const downIndex = question.downVote.findIndex((id) => id === String(userId))
        if (value === 'upVote') {
            if (downIndex !== -1) {
                question.downVote = question.downVote.filter((id) => id !== String(userId))
            }
            if (upIndex === -1) {
                question.upVote.push(userId)
            } else {
                question.upVote = question.upVote.filter((id) => id !== String(userId))
            }
        }
        else if (value === 'downVote') {
            if (upIndex !== -1) {
                question.upVote = question.upVote.filter((id) => id !== String(userId))
            }
            if (downIndex === -1) {
                question.downVote.push(userId)
            } else {
                question.downVote = question.downVote.filter((id) => id !== String(userId))
            }
        }
        await Questions.findByIdAndUpdate(_id, question)
        res.status(200).json({ message: "voted successfully..." })

    } catch (error) {
        res.status(404).json({ message: "id not found" })
    }
}