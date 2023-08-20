import { useEffect, useState } from "react"
import axiosClient from "../axios-client"
import { useNavigate, useParams } from "react-router-dom"
import { useStateContext } from "../contexts/ContextProvider";

export default function NewQuizForm() {
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

    const onSubmit = (ev) => {
        ev.preventDefault();
        setLoading(true);
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
    
    
    return (
        <>
            <h1>New quiz</h1>
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
                {!loading && <form className="quiz_block" onSubmit={onSubmit}>
                        <h1>Title</h1>
                        <input value={quiz.title} onChange={ev => setQuiz({...quiz, title: ev.target.value})} placeholder="Title" />
                        <h1>Subject</h1>
                        <input value={quiz.subject} onChange={ev => setQuiz({...quiz, subject: ev.target.value})} placeholder="Subject" />
                        <h1>About quiz</h1>
                        <input value={quiz.about} onChange={ev => setQuiz({...quiz, about: ev.target.value})} placeholder="About" />
                        <button className="btn">Create</button>
                    </form>}
            </div>
        </>
    )
}