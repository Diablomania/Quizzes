import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function Quizzes() {
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(false);
    const {setNotification, user} = useStateContext();

    useEffect(()=>{
        getQuizzes();
    },[])

    const onDelete = (q) => {
        if (!window.confirm("Are you sure you want to delete this quiz?")) {
            return
        }
        axiosClient.delete(`/quizzes/${q.id}`)
            .then(()=>{
                setNotification("Quiz was successfully deleted")
                //TODO show notification
                getQuizzes()
            })
    }

    const getQuizzes = ()=>{
        setLoading(true);
        axiosClient.get('/quizzes')
        .then(({data}) => {
            setLoading(false);
            console.log(data);
            setQuizzes(data.data)
        })
        .catch(()=>{
            setLoading(false)
        })
    }

    console.log(user.role);

    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <h1>Quizzes</h1>
                <Link to="/quizzes/new" className="btn-add">Add new</Link>
            </div>
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Subject</th>
                            <th>About</th>
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
                            {quizzes.map(q => (
                                <tr>
                                    <td>{q.id}</td>
                                    <td>{q.title}</td>
                                    <td>{q.subject}</td>
                                    <td>{q.about}</td>
                                    <td>
                                        <Link className="btn-start" to={'/start_quiz/'+q.id}>Start</Link>
                                        &nbsp;
                                        <Link className="btn-edit" to={'/quizzes/'+q.id}>Edit</Link>
                                        &nbsp;
                                        <button onClick={ev => onDelete(q)} className="btn-delete">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    }
                </table>
            </div>
        </div>
    )
}