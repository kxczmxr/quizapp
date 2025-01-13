import {useState, useCallback} from "react";
import QUESTIONS from "../questions";
import QuestionTimer from "./QuestionTimer";
import completeImg from "../assets/quiz-complete.png";
export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([]);

    const activeQuestionIndex = userAnswers.length;
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
        setUserAnswers((prevUserAnswer)=>{
            return [...prevUserAnswer, selectedAnswer];
        });
    }, []);

    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);

    if(quizIsComplete) {
        return (
            <div id={'summary'}>
                <img src={completeImg} alt="complete"/>
                    <h2>Quiz is complete!</h2>
            </div>
        )
    }

    const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
    shuffledAnswers.sort(() => Math.random() - 0.5);


    return (
        <div id={'quiz'}>
            <div id={'question'}>
                <QuestionTimer timeout={10000} onTimeOut={handleSkipAnswer} key={activeQuestionIndex}/>
                <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
                <ul id={'answers'}>
                    {shuffledAnswers.map((answer) => (
                        <li key={answer} className={'answer'}>
                            <button onClick={() => handleSelectAnswer(answer)}>{answer}</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}