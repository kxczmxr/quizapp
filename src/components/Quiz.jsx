import {useState, useCallback} from "react";
import QUESTIONS from "../questions";
import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers.jsx";
import completeImg from "../assets/quiz-complete.png";
export default function Quiz() {
    const [answerState, setAnswerState] = useState('');
    const [userAnswers, setUserAnswers] = useState([]);

    const activeQuestionIndex = answerState === '' ? userAnswers.length : userAnswers.length - 1;
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
        setAnswerState('answered')
        setUserAnswers((prevUserAnswer)=>{
            return [...prevUserAnswer, selectedAnswer];
        });

        setTimeout(() => {
            if(selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]){
                setAnswerState('correct');
            }else{
                setAnswerState('wrong');
            }

            setTimeout(() => {
                setAnswerState('');
            },2000)
        }, 1000)
    }, [activeQuestionIndex]);

    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);

    if(quizIsComplete) {
        return (
            <div id={'summary'}>
                <img src={completeImg} alt="complete"/>
                    <h2>Quiz is complete!</h2>
            </div>
        )
    }

    return (
        <div id={'quiz'}>
            <div id={'question'}>
                <QuestionTimer
                    timeout={10000}
                    onTimeOut={handleSkipAnswer}
                    key={activeQuestionIndex}
                />
                <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
                <Answers
                         key={activeQuestionIndex}
                         answers={QUESTIONS[activeQuestionIndex].answers}
                         selectedAnswer={userAnswers[userAnswers.length - 1]}
                         answerState={answerState}
                         onSelect={handleSelectAnswer}
                />
            </div>
        </div>
    );
}