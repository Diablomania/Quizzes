import { useEffect, useState } from "react"
import axiosClient from "../axios-client"
import { useNavigate, useParams } from "react-router-dom"
import { useStateContext } from "../contexts/ContextProvider";

export default function QuizForm() {

    const {id} = useParams()
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState(null);
    const {setNotification} = useStateContext();
    const [quiz, setQuiz] = useState({
        id: null,
        title: '',
        subject: '',
        about: '',
        score_max: null,
    })

    if(id) {
        useEffect(()=>{
            setLoading(true)
            axiosClient.get(`/quizzes/${id}`)
                .then(({data})=>{
                    setLoading(false)
                    setQuiz(data)
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
                    <form onSubmit={onSubmit}>
                        <input value={quiz.title} onChange={ev => setQuiz({...quiz, title: ev.target.value})} placeholder="Title" />
                        <input value={quiz.subject} onChange={ev => setQuiz({...quiz, subject: ev.target.value})} placeholder="Subject" />
                        <input value={quiz.about} onChange={ev => setQuiz({...quiz, about: ev.target.value})} placeholder="About" />
                        <button className="btn">Save</button>
                    </form>
                }
            </div>
        </>
    )
}