import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import Button from '../Button/Button';
import AuthService from "../../services/auth.service";
import avatar from '../../img/avatar.png'

function Expenseslimit() {
    const { userinfo, getUserinfo, addSpendingLimitsDay, addSpendingLimitsMonth, addSpendingLimitsYear, error, setError, expenses } = useGlobalContext();
    const [inputState, setInputState] = useState({
        spending_limit_day: userinfo.spending_limit_day,
        spending_limit_month: userinfo.spending_limit_month,
        spending_limit_year: userinfo.spending_limit_year,
    });

    const { spending_limit_day, spending_limit_month, spending_limit_year} = inputState;
    const handleInput = (name) => (e) => {
        setInputState({ ...inputState, [name]: e.target.value });
        setError('');
    };
    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        await addSpendingLimitsDay(inputState)
        await addSpendingLimitsMonth(inputState)
        await addSpendingLimitsYear(inputState)
        const updatedUserinfo = await getUserinfo();
        
        setInputState({
            spending_limit_day: updatedUserinfo.spending_limit_day,
            spending_limit_month: updatedUserinfo.spending_limit_month,
            spending_limit_year: updatedUserinfo.spending_limit_year,
        });
    };

    return (
        <UserFormStyled>
          {error && <p className="error">{error}</p>}
          <div className="input-control">
            <div className="input-wrapper">
              <label htmlFor="spending_limit_day">Spending Limit Day</label>
              <input
                type="number"
                value={spending_limit_day}
                name="spending_limit_day"
                id="spending_limit_day"
                placeholder="Spending Limit Day"
                onChange={handleInput('spending_limit_day')}
              />
            </div>
          </div>
          <div className="input-control">
            <div className="input-wrapper">
              <label htmlFor="spending_limit_month">Spending Limit Month</label>
              <input
                type="number"
                value={spending_limit_month}
                name="spending_limit_month"
                id="spending_limit_month"
                placeholder="Spending Limit Month"
                onChange={handleInput('spending_limit_month')}
              />
            </div>
          </div>
          <div className="input-control">
            <div className="input-wrapper">
              <label htmlFor="spending_limit_year">Spending Limit Year</label>
              <input
                type="number"
                value={spending_limit_year}
                name="spending_limit_year"
                id="spending_limit_year"
                placeholder="Spending Limit Year"
                onChange={handleInput('spending_limit_year')}
              />
            </div>
          </div>
          <div className="submit-btn">
            <Button
              name={'Update Profile'}
              bPad={'.8rem 1.6rem'}
              bRad={'30px'}
              bg={'var(--color-accent'}
              color={'#fff'}
              onClick={handleProfileUpdate}
            />
          </div>
        </UserFormStyled>
    );
}

const UserFormStyled = styled.form`
    display: flex;
    flex-direction: column;
    gap: 2rem;

    label {
        font-size: 1.3rem;
        margin-right: 0.3rem;
    }

    .input-control {
        display: flex;
        flex-direction: column;
        gap: 1rem; /* Đặt khoảng cách giữa các ô input */
    }
    
    .input-wrapper {
        display: flex;
        align-items: center;
        gap: 1rem; /* Đặt khoảng cách giữa nhãn và ô input */
        width: 500px;
    }
    
    .input-control label {
        flex-basis: 150px; /* Đặt kích thước cố định cho nhãn */
        flex-shrink: 0;
    }
    
    .input-control input,
    .input-control textarea,
    .input-control select {
        flex: 1; /* Mở rộng ô input để lấp đầy phần còn lại của không gian */
    }

    input,
    textarea,
    select {
        font-family: inherit;
        font-size: inherit;
        outline: none;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 5px;
        border: 2px solid #fff;
        background: transparent;
        resize: none;
        box-shadow: 0px 1px 20px rgba(0, 0, 0, 0.06);
        color: rgba(34, 34, 96, 0.9);
        &::placeholder {
            color: rgba(34, 34, 96, 0.4);
        }
        width: 100%;
    }

    .submit-btn {
        margin-top: 0.5rem;
        button {
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            &:hover {
                background: var(--color-green) !important;
            }
        }
    }
    
`;

export default Expenseslimit;
