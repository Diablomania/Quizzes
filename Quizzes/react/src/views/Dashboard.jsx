import { useEffect, useState } from "react"
import axiosClient from "../axios-client"
import { Link, useNavigate, useParams } from "react-router-dom"
import { ContextProvider, useStateContext } from "../contexts/ContextProvider";

export default function Dashboard() {
    const {user, token, notification, setUser, setToken} = useStateContext();
    const [newComponentCounter, setNewComponentCounter] = useState(null);
    const navigate = useNavigate();
    const [start, setStart] = useState(false)
    const [score, setScore] = useState(0)
    const [currQ, setCurrQ] = useState(0)
    const [currA, setCurrA] = useState(0)
    const [timer, setTimer] = useState(0)
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
        result_sec: null,
    })

    let trigger = null;

    if(!trigger) {
        useEffect(()=>{
            console.log("Start1");
            axiosClient.get(`/quizzes`)
                .then(({data})=>{
                    //setLoading(false)
                    setQuiz(data)
                })
                .catch(()=>{
                    setLoading(false)
                })
        }, [])
        useEffect(()=>{
            console.log("Start2");
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
            console.log("Start3");
           // setLoading(true)
            axiosClient.get(`/answer`)
                .then(({data})=>{
                    setAnswer(data)
                })
                .catch(()=>{
                    setLoading(false)
                })
        }, [])
        useEffect(()=>{
            console.log("Start4");
            // setLoading(true)
             axiosClient.get(`/result`)
                 .then(({data})=>{
                     setResult(data)
                    setLoading(false);
                    trigger = 1;
                 })
                 .catch(()=>{
                     setLoading(false)
                 })
         }, [])
    }
    


let y = 0;
let inc_y = () => {
    y = y + 1;
}

let resultMap = [];

const resultCounter = function() {
    if (result.data) {
        result.data.map((resi) => {
            if (resi.user_id == user.id) {
                resultMap.push(resi.id);
            }
        })
    }
    console.log(resultMap);
}

if(!loading){
resultCounter();}

    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <h1>Hello {user.name} here is your results:</h1>
                <Link to="/quizzes/new" className="btn-add">Add new quiz</Link>
                &nbsp;
                <Link to="/quizzes" className="btn-add">All quizzes</Link>
                &nbsp;
            </div>
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Quiz title</th>
                            <th>Score</th>
                            <th>Time (sec)</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {loading && 
                        <tbody>
                            <tr>
                                <td colSpan="5" className="text-center">Loading...</td>
                            </tr>
                        </tbody>
                    }
                    {!loading &&
                        <tbody>
                            {result.data.map(res => (
                                <>{inc_y()}
                                <tr>
                                    <td>{y}</td>
                                    <td>{quiz.data.map(quiz => 
                                        (quiz.id == res.quiz_id) &&
                                        (quiz.title)
                                        )}</td>
                                    <td>{res.result}</td>
                                    <td>{res.result_sec}</td>
                                    <td>
                                        &nbsp;
                                        <Link className="btn-edit" to={'/start_quiz/'+res.quiz_id}>Start again</Link>
                                    </td>
                                </tr>
                                </>))}
                        </tbody>
                    }
                </table>
            </div>
        </div>
    )
}