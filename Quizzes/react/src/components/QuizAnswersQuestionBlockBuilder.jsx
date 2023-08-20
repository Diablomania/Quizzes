import { Link, Navigate, Outlet } from "react-router-dom"
import { useStateContext } from "../contexts/ContextProvider"
import { useEffect } from "react";
import axiosClient from "../axios-client";

export default function QuizAnswersQuestionBlockBuilder(props) {

let d = 0;

let clear_d = function () {
    d = 0;
}
let inc_d = function () {
    d = d + 1;
}

return (<div className="quiz_block"><h1>Question # {props.y}</h1>
            <form className="quiz_form">
                <h1>{props.quest.question}</h1>
                {clear_d()}
            {props.answer.data.map((answer) => 
                (answer.question_id == props.id) &&
                (
                    <>{inc_d()}
                    <h2>Answer # {d} :</h2>
                    <h2>{answer.score}</h2>
                    <h2>{answer.answer}</h2>
                        <input style={{width : 10,}} className="left_input" name="answer" onChange={ev => {
                            ev.target.checked ?
                            props.setScore(parseInt(props.score) + parseInt(answer.score))
                            :
                            props.setScore(parseInt(props.score) - parseInt(answer.score))
                        }} 
                            placeholder={answer.answer} type="checkbox" />
                    </>
                )      
            )}
            
            </form></div>)
}