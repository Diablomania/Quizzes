import { useEffect, useState } from "react"
import axiosClient from "../axios-client"
import { useNavigate, useParams } from "react-router-dom"
import { useStateContext } from "../contexts/ContextProvider";
import AnswersQuestionBlockBuilder from "../components/AnswersQuestionBlockBuilder";

export default function QuizForm() {

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
           // setLoading(true)
            axiosClient.get(`/quizzes/${id}`)
                .then(({data})=>{
                    //setLoading(false)
                    setQuiz(data)
                })
                .catch(()=>{
                    setLoading(false)
                })
        }, [])
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
        }, [])
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
        }, [])
    }

    const onSubmit = (ev) => {
        ev.preventDefault();
        if (quiz.id) {
            axiosClient.put(`/quizzes/${quiz.id}`, quiz)
            .then(()=>{
                //TODO show notification
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
                //TODO show notification
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
    
    const onSubmitQuestion = (ev) => {
        ev.preventDefault();
        if (question.id) {
            axiosClient.put(`/question/${question.id}`, question)
            .then(()=>{
                //TODO show notification
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
                //TODO show notification
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

    const onSubmitAnswer = (ev) => {
        ev.preventDefault();
        if (answer.id) {
            axiosClient.put(`/answer/${answer.id}`, answer)
            .then(()=>{
                //TODO show notification
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
                //TODO show notification
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
    console.log(ev);
    console.log(question.data[0].answer);
    answer.data[0].answer = ev;
    setAnswer({...answer});
}
const onChangeAnswer = function(ev, answer) {
    console.log(ev);
    console.log(answer.data[0].answer);
    answer.data[0].answer = ev;
    setAnswer({...answer});
}
const onChangeScore = function(ev, answer) {
    console.log(ev);
    console.log(answer.data[0].answer);
    answer.data[0].score = ev;
    setAnswer({...answer});
}

let y = 0;

    return (
        <>
            {quiz.id && <h1>Update quiz: {quiz.title}</h1>}
            {!quiz.id && <h1>New quiz</h1>}
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
                {!loading && 
                <>
                    <form className="quiz_block" onSubmit={onSubmit}>
                        <input value={quiz.title} onChange={ev => setQuiz({...quiz, title: ev.target.value})} placeholder="Title" />
                        <input value={quiz.subject} onChange={ev => setQuiz({...quiz, subject: ev.target.value})} placeholder="Subject" />
                        <input value={quiz.about} onChange={ev => setQuiz({...quiz, about: ev.target.value})} placeholder="About" />
                        <button className="btn">Save</button>
                    </form>
                    {question.data.map((quest, i = 0) => {
                        i = i + 1;
                        y = y + 1;
                        if (quest.quiz_id == id) {
                        return (<AnswersQuestionBlockBuilder y={y} i={i} setAnswer={setAnswer} setQuestion={setQuestion} onSubmitQuestion={onSubmitQuestion} question={question} mainID={id} id={quest.id} answer={answer} onSubmitAnswer={onSubmitAnswer} />)
                    }})}

                </>
                }
            </div>
        </>
    )
}