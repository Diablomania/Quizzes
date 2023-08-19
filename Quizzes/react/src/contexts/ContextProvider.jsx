import { createContext, useContext, useState } from "react";

const StateContext = createContext({
    currentQuiz: null,
    currentUser: null,
    token: null,
    notification: null,
    setQuiz: () => {},
    setUser: () => {},
    setToken: () => {},
    setNotification: () => {},
});

export const ContextProvider = ({children}) => {
    const [user, setUser] = useState({});
    const [quiz, setQuiz] = useState({});
    const [notification, _setNotification] = useState('');
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));

    const setNotification = (message)=>{
        _setNotification(message);
        setTimeout(()=>{
            _setNotification('')
        }, 5000)
    }

    const setToken = (token) => {
        _setToken(token)
        if (token) {
            localStorage.setItem('ACCESS_TOKEN', token);
        } else {
            localStorage.removeItem('ACCESS_TOKEN');
        }
    }

    return (
        <StateContext.Provider value={{
            user,
            quiz,
            token,
            setUser,
            setQuiz,
            setToken,
            notification,
            setNotification
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)