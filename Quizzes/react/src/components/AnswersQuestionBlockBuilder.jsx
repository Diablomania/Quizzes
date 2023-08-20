import { Link, Navigate, Outlet } from "react-router-dom"
import { useStateContext } from "../contexts/ContextProvider"
import { useEffect } from "react";
import axiosClient from "../axios-client";

export default function AnswersQuestionBlockBuilder(props) {

let d = 0;

let clear_d = function () {
    d = 0;
}
let inc_d = function () {
    d = d + 1;
}

return (<div className="quiz_block"><h1>Question # {props.y}</h1><form className="quiz_form" onSubmit={props.onSubmitQuestion}>
                <input value={props.question.data[props.i - 1].question} onChange={ev => {
                    props.question.data[props.i - 1].question = ev.target.value;
                    let que = props.question;
                    props.setQuestion({...que});}}
                    placeholder="Question" />
                {clear_d()}
                <button className="btn">Save</button>
            </form>
            {props.answer.data.map((answer, i = 0) => {
                i = i + 1;
                return (answer.question_id == props.id) && (
                    <>{inc_d()}
                    <h2>Answer # {d}</h2>
                    <form key={answer.id} className="quiz_form" onSubmit={props.onSubmitAnswer}>
                        <input value={answer.answer} onChange={ev => {
                            props.answer.data[i-1].answer = ev.target.value;
                            answer.answer = ev.target.value;
                            let answ = props.answer;
                            props.setAnswer({...answ});}} 
                            placeholder="Answer" />
                        <input value={answer.score} onChange={ev => {
                            props.answer.data[i-1].score = ev.target.value;
                            answer.score = ev.target.value;
                            let answ = props.answer;
                            props.setAnswer({...answ});}}            
                            placeholder="Score" />
                        <button className="btn">Save</button>
                    </form>
                    </>
                )}      
            )}
            </div>)
}