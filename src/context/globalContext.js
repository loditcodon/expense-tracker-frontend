import React, { useContext, useState } from "react";
import axios from 'axios';
import AuthService from "../services/auth.service";

const BASE_URL = "http://localhost:5000/api/v1/";
const GlobalContext = React.createContext();
const formatNumberWithCommas = (number) => {
    return number.toLocaleString(); 
}
export const GlobalProvider = ({ children }) => {
    const currentUser = AuthService.getCurrentUser();
    const accessToken = AuthService.getAccessToken();
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [userinfo, setUserinfo] = useState([]);
    const [error, setError] = useState(null);
    // console.log(currentUser);
    // calculate incomes
    const addIncome = async (income) => {
        try {
            const response = await axios.post(`${BASE_URL}${currentUser}/add-income`, income, {
                headers: {
                    'token': accessToken
                }
            });
            // console.log(response);
    
            getIncomes();
        } catch (err) {
            setError(err.response.data.message);
        }
    }

    const getIncomes = async () => {
        const response = await axios.get(`${BASE_URL}${currentUser}/get-incomes`, {
            headers: {
                'token': accessToken
            }
        });
        setIncomes(response.data);
        // console.log(response.data);
    }

    const deleteIncome = async (id) => {
        const res = await axios.delete(`${BASE_URL}${currentUser}/delete-income/${id}`, {
            headers: {
                'token': accessToken
            }
        });
        getIncomes();
    }

    const totalIncome = () => {
        let totalIncome = 0;
        incomes.forEach((income) => {
            totalIncome = totalIncome + income.amount;
        })

        return totalIncome;
    }

    // calculate expenses
    const addExpense = async (expense) => {
        const response = await axios.post(`${BASE_URL}${currentUser}/add-expense`, expense, {
            headers: {
                'token': accessToken
            }
        }).catch((err) => {
            setError(err.response.data.message);
        });
        getExpenses();
    }

    const getExpenses = async () => {
        const response = await axios.get(`${BASE_URL}${currentUser}/get-expenses`, {
            headers: {
                'token': accessToken
            }
        });
        setExpenses(response.data);
        // console.log(response.data);
    }

    const deleteExpense = async (id) => {
        const res = await axios.delete(`${BASE_URL}${currentUser}/delete-expense/${id}`, {
            headers: {
                'token': accessToken
            }
        });
        getExpenses();
    }

    const totalExpenses = () => {
        let totalExpense = 0;
        expenses.forEach((expense) => {
            totalExpense = totalExpense + expense.amount;
        })

        return totalExpense;
    }

    const totalBalance = () => {
        return totalIncome() - totalExpenses();
    }

    const transactionHistory = () => {
        const history = [...incomes, ...expenses];
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        })

        return history.slice(0, 3);
    }
    const getUserinfo = async () => {
        const response = await axios.get(`${BASE_URL}${currentUser}/getUserProfile`, {
            headers: {
                'token': accessToken
            }
        });
        setUserinfo(response.data);
        
    }
    const editUserinfo = async (userinfo) => {
        try{
            const response = await axios.post(`${BASE_URL}${currentUser}/editUserProfile`, userinfo, {
                headers: {
                    'token': accessToken
                }
                });
                
                if (response.data && response.data.errMessaging) {
                    setError(response.data.errMessaging);
                    setTimeout(() => {
                        setError(null);
                    }, 3000);
                }
        } catch (err) {
            setError(err.response.data.errMessaging);
            setTimeout(() => {
                setError(null);
            }, 3000);
        }
    };
    const editPassword = async (passwordinfo) => {
        try {
            const response = await axios.put(`${BASE_URL}editpassword/${currentUser}`, passwordinfo, {
                headers: {
                    'token': accessToken
                }
            });
            
            if (response.data && response.data.error) {
                setError(response.data.error);
                setTimeout(() => {
                    setError(null);
                }, 3000);
            }
        } catch (err) {
            setError(err.response.data.error);
            setTimeout(() => {
                setError(null);
            }, 3000);
        }
    };
    const addSpendingLimitsDay = async (expenseslimitday) => {
        try {
            const response = await axios.post(`${BASE_URL}${currentUser}/add-spending-limit-day`, expenseslimitday, {
                headers: {
                    'token': accessToken
                }
            });
            
            if (response.data && response.data.error) {
                setError(response.data.error);
                setTimeout(() => {
                    setError(null);
                }, 3000);
            }
        } catch (err) {
            setError(err.response.data.error);
            setTimeout(() => {
                setError(null);
            }, 3000);
        }
    };
    const addSpendingLimitsMonth = async (expenseslimitmonth) => {
        try {
            const response = await axios.post(`${BASE_URL}${currentUser}/add-spending-limit-mouth`, expenseslimitmonth, {
                headers: {
                    'token': accessToken
                }
            });
            
            if (response.data && response.data.error) {
                setError(response.data.error);
                setTimeout(() => {
                    setError(null);
                }, 3000);
            }
        } catch (err) {
            setError(err.response.data.error);
            setTimeout(() => {
                setError(null);
            }, 3000);
        }
    };
    const addSpendingLimitsYear = async (expenseslimityear) => {
        try {
            const response = await axios.post(`${BASE_URL}${currentUser}/add-spending-limit-year`, expenseslimityear, {
                headers: {
                    'token': accessToken
                }
            });
            
            if (response.data && response.data.error) {
                setError(response.data.error);
                setTimeout(() => {
                    setError(null);
                }, 3000);
            }
        } catch (err) {
            setError(err.response.data.error);
            setTimeout(() => {
                setError(null);
            }, 3000);
        }
    };
    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            expenses,
            addExpense,
            getExpenses,
            deleteExpense,
            totalIncome: () => formatNumberWithCommas(totalIncome()),
            totalExpenses: () => formatNumberWithCommas(totalExpenses()),
            totalBalance: () => formatNumberWithCommas(totalBalance()),
            transactionHistory,
            error,
            setError,
            getUserinfo,
            editUserinfo,
            userinfo,
            editPassword,
            addSpendingLimitsDay,
            addSpendingLimitsMonth,
            addSpendingLimitsYear
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(GlobalContext);
}
