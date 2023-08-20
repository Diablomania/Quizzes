import { useEffect, useState } from "react"
import axiosClient from "../axios-client"
import { useNavigate, useParams } from "react-router-dom"
import { useStateContext } from "../contexts/ContextProvider";
import AnswersQuestionBlockBuilder from "../components/AnswersQuestionBlockBuilder";

export default function QuizForm() {
    const [newComponentCounter, setNewComponentCounter] = useState(null);
    const {id} = useParams()
    const navigate = useNavigate();
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


    const onSubmit = (ev) => {
        ev.preventDefault();
        if (quiz.id) {
            axiosClient.put(`/quizzes/${quiz.id}`, quiz)
            .then(()=>{
                setNotification('Quiz was succesfully updated')
                navigate('/quizzes')
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
            })
        } else {
            axiosClient.post(`/quizzes`, quiz)
            .then(()=>{
                setNotification('Quiz was succesfully created')
                navigate('/quizzes')
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
            })  
        }
    }
    
    const onSubmitQuestion = (ev, question) => {
        ev.preventDefault();
        if (question.id) {
            axiosClient.put(`/question/${question.id}`, question)
            .then(()=>{
                setNotification('Question was succesfully updated')
                navigate(`/quizzes/${id}`)
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
            })
        } else {
            axiosClient.post(`/question`, question)
            .then(()=>{
                setNotification('Question was succesfully created')
                navigate(`/quizzes/${id}`)
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
            })  
        }
    }

    const onSubmitAnswer = (ev, answer) => {
        ev.preventDefault();
        if (answer.id) {
            axiosClient.put(`/answer/${answer.id}`, answer)
            .then(()=>{
                setNotification('Answer was succesfully updated')
                navigate(`/quizzes/${id}`)
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
            })
        } else {
            axiosClient.post(`/answer`, answer)
            .then(()=>{
                setNotification('Answer was succesfully created')
                navigate(`/quizzes/${id}`)
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
            })  
        }
    }

const onChangeQuestion = function(ev, answer) {
    answer.data[0].answer = ev;
    setAnswer({...answer});
}
const onChangeAnswer = function(ev, answer) {
    answer.data[0].answer = ev;
    setAnswer({...answer});
}
const onChangeScore = function(ev, answer) {
    answer.data[0].score = ev;
    setAnswer({...answer});
}

const addQuestion = function () {
    let preid = parseInt(id);
    const questi = {
        quiz_id: preid,
        question: 'Text of new question',
    }
    axiosClient.post(`/question`, questi)
    .then(()=>{
        setNotification('Question was succesfully created')
        setNewComponentCounter(newComponentCounter + 1);
        navigate(`/quizzes/${id}`)
    })
    .catch(err => {
        const response = err.response;
        if (response && response.status === 422) {
            setErrors(response.data.errors);
        }
    }) 
}

const addAnswer = function (ev, q_id) {
    let ques_id = parseInt(q_id);
    const ans = {
        question_id: ques_id,
        answer: 'Write some answer',
        score: 0,
    }
    axiosClient.post(`/answer`, ans)
    .then((res)=>{
        console.log("it's work");
        navigate(`/quizzes/${id}`);
        console.log(res);
        setNewComponentCounter(newComponentCounter + 1);
        setNotification('Answer was succesfully created');
    })
    .catch(err => {
        const response = err.response;
        if (response && response.status === 422) {
            setErrors(response.data.errors);
        }
    }) 
}

let y = 0;
let inc_y = () => {
    y = y + 1;
}

    return (
        <>
        {quiz.id && <h1>Update quiz: {quiz.title}</h1>}
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
                <form className="quiz_block" onSubmit={onSubmit}>
                        <input value={quiz.title} onChange={ev => setQuiz({...quiz, title: ev.target.value})} placeholder="Title" />
                        <input value={quiz.subject} onChange={ev => setQuiz({...quiz, subject: ev.target.value})} placeholder="Subject" />
                        <input value={quiz.about} onChange={ev => setQuiz({...quiz, about: ev.target.value})} placeholder="About" />
                        <button className="btn">Save</button>
                    </form>
                    {question.data.map((quest, i = 0) => {
                        i = i + 1;
                        if (quest.quiz_id == id) {
                        return (<>{inc_y()}<AnswersQuestionBlockBuilder y={y} i={i} addAnswer={addAnswer} setAnswer={setAnswer} setQuestion={setQuestion} onSubmitQuestion={onSubmitQuestion} question={question} mainID={id} id={quest.id} answer={answer} onSubmitAnswer={onSubmitAnswer} />
                                </>)
                                }})}
                                <button onClick={addQuestion} className="btn">Add new question</button>
                                </>}                
            </div>
        </>
    )
}