import { useEffect, useState } from "react"
import axiosClient from "../axios-client"
import { useNavigate, useParams } from "react-router-dom"
import { ContextProvider, useStateContext } from "../contexts/ContextProvider";
import QuizAnswersQuestionBlockBuilder from "../components/QuizAnswersQuestionBlockBuilder";

export default function StartQuiz() {
    const {user, token, notification, setUser, setToken} = useStateContext();
    const [newComponentCounter, setNewComponentCounter] = useState(null);
    const {id} = useParams()
    const navigate = useNavigate();
    const [start, setStart] = useState(false)
    const [score, setScore] = useState(0)
    const [loading, setLoading] = useState(true)
    const [errors, setErrors] = useState(null);
    const {setNotification} = useStateContext();
    const [quiz, setQuiz] = useState({
        id: null,
        title: '',
        subject: '',
        about: '',
        score_max: null,
    })
    const [question, setQuestion] = useState({
        id: null,
        quiz_id: null,
        question: '',
    })
    const [answer, setAnswer] = useState({
        id: null,
        question_id: null,
        answer: '',
        score: null,
    });
    const [result, setResult] = useState({
        id: null,
        quiz_id: null,
        user_id: null,
        result: null,
    })

    if(id) {
        useEffect(()=>{
            axiosClient.get(`/quizzes/${id}`)
                .then(({data})=>{
                    //setLoading(false)
                    setQuiz(data)
                })
                .catch(()=>{
                    setLoading(false)
                })
        }, [newComponentCounter])
        useEffect(()=>{
           // setLoading(true)
            axiosClient.get(`/question`)
                .then(({data})=>{
                   // setLoading(false)
                    setQuestion(data)
                })
                .catch(()=>{
                    setLoading(false)
                })
        }, [newComponentCounter])
        useEffect(()=>{
           // setLoading(true)
            axiosClient.get(`/answer`)
                .then(({data})=>{
                    setLoading(false)
                    setAnswer(data)
                })
                .catch(()=>{
                    setLoading(false)
                })
        }, [newComponentCounter])
    }


    const onSubmit = () => {
        if (result.id) {
            axiosClient.put(`/result/${result.id}`, result)
            .then(()=>{
                navigate(`/start_quiz/${id}`)
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
            })
        } else {
            axiosClient.post(`/result`, result)
            .then(()=>{
                navigate(`/start_quiz/${id}`)
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
            })  
        }
    }
  
let y = 0;
let inc_y = () => {
    y = y + 1;
}

const sendResult = function() {
    result.result = score;
    result.user_id = user.id;
    result.quiz_id = quiz.id;
    setResult({...result});
    onSubmit();
    console.log(result);
    setNotification('Congratulations, your result is: '+score);
    setStart(false);
}

    return (
        <>
        {quiz.id && <h1>{quiz.title}</h1>}
        {result.result && <h1>Your result is: {result.result}</h1>}
            <div className="card animated fadeInDown">
                {loading && (
                    <div className="text-center">Loading...</div>
                )}
                {
                    errors && <div className="alert">
                        {Object.keys(errors).map(key => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                }
                {!loading && <>
                <div className="quiz_block">
                        <h2>Subject: {quiz.subject}</h2>
                        <h2>About: {quiz.about}</h2>
                        <h3>Are you ready? Push start button!</h3>
                    <button onClick={e => {
                        setStart(true);
                        setScore(0);
                        }} className="btn">Start</button>
                    </div>

                    {start && (question.data.map((quest, i = 0) => {
                        i = i + 1;
                        if (quest.quiz_id == id) {
                        return (<>{inc_y()}
                        <QuizAnswersQuestionBlockBuilder score={score} setScore={setScore}
                        quest={quest} y={y} i={i} setAnswer={setAnswer} 
                        question={question} mainID={id} id={quest.id} answer={answer} />
                                </>)
                                }}))}
                                </>}
                    {start && <button onClick={sendResult} className="btn">Answer</button>}                
            </div>
            

        </>
    )
}