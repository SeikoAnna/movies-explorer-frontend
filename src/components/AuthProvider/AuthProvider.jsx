import {createContext, useState, useContext, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import Preloader from "../Preloader/Preloader";
import mainApi from "../../utils/api/MainApi";

const AuthContext = createContext(undefined);

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const navigation = useNavigate();

    const fetchUserData = async () => {
        try {
            const data = await mainApi.getCurrentUserInfo();
            setUserData(data);
            setIsLoggedIn(true);
        } catch (error) {
            setIsLoggedIn(false);
            navigation('/');
        }
    };

    useEffect(() => {
            fetchUserData().finally(() => {
                setIsLoading(false);
            });
    }, []);

    const login = async (email, password) => {
        try {
            const { jwt } = await mainApi.authorize(email, password).catch(() => {
                alert('Неправильный логин или пароль')
            });

            if(jwt) {
                setIsLoggedIn(true);
                const user = await mainApi.getCurrentUserInfo(jwt).then(res => {
                    return res
                });
                setUserData(user);

                return true;
            }
        } catch (error) {
            console.error('Ошибка авторизации: ', error);
        }
    }

    const logout = () => {
        mainApi.logOut().then(() => {
            setIsLoggedIn(false);
            setUserData(null);
            localStorage.removeItem('shorts')
            localStorage.removeItem('movies')
            localStorage.removeItem('searchFilm')
        }).catch((err) => {
            alert('Ошибка при попытке выйти из аккаунта')
            console.log(err);
        });
    };


    return (
        <AuthContext.Provider value={{ isLoggedIn, userData, login, logout }}>
            {isLoading ? <Preloader /> : children}
        </AuthContext.Provider>
    );
};
