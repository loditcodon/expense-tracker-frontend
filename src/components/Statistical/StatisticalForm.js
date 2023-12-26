import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import Chart from 'react-apexcharts';

function StatisticalForm() {
  const { error, setError, expenses, incomes } = useGlobalContext();

  const [chartType, setChartType] = useState('month'); // 'month' or 'year'
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth()+1); // Default to current month
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [chartKey, setChartKey] = useState(0);

  const totalExpensesCategoryMonth = (category, targetMonth, targetYear) => {
    const categoryExpenses = expenses.filter((expense) => {
      const expenseDate = new Date(expense.date);
      return (
        expense.category === category &&
        expenseDate.getMonth() === targetMonth - 1 && // Giảm 1 vì tháng trong JavaScript bắt đầu từ 0
        expenseDate.getFullYear() === targetYear
      );
    });
  
    return calculateTotal(categoryExpenses);
  };
  
  const totalExpensesCategoryYear = (category, targetYear) => {
    const categoryExpenses = expenses.filter((expense) => {
      const expenseDate = new Date(expense.date);
      return expense.category === category && expenseDate.getFullYear() === targetYear;
    });
  
    return calculateTotal(categoryExpenses);
  };
  
  const totalIncomesCategoryMonth = (category, targetMonth, targetYear) => {
    const categoryIncomes = incomes.filter((income) => {
      const incomeDate = new Date(income.date);
      return (
        income.category === category &&
        incomeDate.getMonth() === targetMonth - 1 && // Giảm 1 vì tháng trong JavaScript bắt đầu từ 0
        incomeDate.getFullYear() === targetYear
      );
    });
  
    return calculateTotal(categoryIncomes);
  };
  
  const totalIncomesCategoryYear = (category, targetYear) => {
    const categoryIncomes = incomes.filter((income) => {
      const incomeDate = new Date(income.date);
      return income.category === category && incomeDate.getFullYear() === targetYear;
    });
  
    return calculateTotal(categoryIncomes);
  };
  const calculateTotal = (expenses) => {
    let total = 0;
    expenses.forEach((expense) => {
      total += expense.amount;
    });
    return total;
  };

  const handleChartTypeChange = (type) => {
    setChartType(type);
    setChartKey((prevKey) => prevKey + 1); // Incrementing the key to force re-render
  };

  const handleMonthChange = (month) => {
    setSelectedMonth(parseInt(month, 10)); // Chuyển đổi thành số với hệ cơ số 10
    setChartKey((prevKey) => prevKey + 1);
  };

  const handleYearChange = (year) => {
    setSelectedYear(parseInt(year, 10));
    setChartKey((prevKey) => prevKey + 1); // Incrementing the key to force re-render
  };

  useEffect(() => {
    const monthNumber = parseInt(selectedMonth, 10);
  }, [chartType, selectedMonth, selectedYear]);


  const generateChart = () => {
    if (chartType === 'month') {
      const options = { labels: ["Education", "Groceries", "Health", "Subscriptions", "Takeaways", "Clothing", "Travelling", "Other"] };
      const expenseSeries = [
        totalExpensesCategoryMonth('education', selectedMonth, selectedYear),
        totalExpensesCategoryMonth('groceries', selectedMonth, selectedYear),
        totalExpensesCategoryMonth('health', selectedMonth, selectedYear),
        totalExpensesCategoryMonth('subscriptions', selectedMonth, selectedYear),
        totalExpensesCategoryMonth('takeaways', selectedMonth, selectedYear),
        totalExpensesCategoryMonth('clothing', selectedMonth, selectedYear),
        totalExpensesCategoryMonth('travelling', selectedMonth, selectedYear),
        totalExpensesCategoryMonth('other', selectedMonth, selectedYear),
      ];
      const optionsincomes = { labels: ["Salary", "Freelancing", "Investments", "Stocks", "Bitcoin", "Bank", "Youtube", "Other"] };
      const incomeSeries = [
        totalIncomesCategoryMonth('money', selectedMonth, selectedYear),
        totalIncomesCategoryMonth('freelancing', selectedMonth, selectedYear),
        totalIncomesCategoryMonth('investments', selectedMonth, selectedYear),
        totalIncomesCategoryMonth('stocks', selectedMonth, selectedYear),
        totalIncomesCategoryMonth('bitcoin', selectedMonth, selectedYear),
        totalIncomesCategoryMonth('bank', selectedMonth, selectedYear),
        totalIncomesCategoryMonth('youtube', selectedMonth, selectedYear),
        totalIncomesCategoryMonth('other', selectedMonth, selectedYear),
        // Thêm các danh mục thu nhập khác tương tự
      ];
  
      return (
        <div className="chart-wrapper">
          <div className="chart-container">
            <Chart options={options} series={expenseSeries} type="donut" width="400" key={chartKey} />
            <div className="center-text">Expense</div>
          </div>
          <div className="chart-container">
            <Chart options={optionsincomes} series={incomeSeries} type="donut" width="400" key={chartKey + 1} />
            <div className="center-text">Income</div>
          </div>
        </div>
      );
    } else if (chartType === 'year') {
      // Tương tự cho năm
      const options = { labels: ["Education", "Groceries", "Health", "Subscriptions", "Takeaways", "Clothing", "Travelling", "Other"] };
      const expenseSeries = [
        totalExpensesCategoryYear('education', selectedYear),
        totalExpensesCategoryYear('groceries', selectedYear),
        totalExpensesCategoryYear('health', selectedYear),
        totalExpensesCategoryYear('subscriptions', selectedYear),
        totalExpensesCategoryYear('takeaways', selectedYear),
        totalExpensesCategoryYear('clothing', selectedYear),
        totalExpensesCategoryYear('travelling', selectedYear),
        totalExpensesCategoryYear('other', selectedYear),
      ];
      const optionsincomes = { labels: ["Salary", "Freelancing", "Investments", "Stocks", "Bitcoin", "Bank", "Youtube", "Other"] };
      const incomeSeries = [
        totalIncomesCategoryYear('money', selectedYear),
        totalIncomesCategoryYear('freelance', selectedYear),
        totalIncomesCategoryYear('investments', selectedYear),
        totalIncomesCategoryYear('stocks', selectedYear),
        totalIncomesCategoryYear('bitcoin', selectedYear),
        totalIncomesCategoryYear('bank', selectedYear),
        totalIncomesCategoryYear('youtube', selectedYear),
        totalIncomesCategoryYear('other', selectedYear),
        // Thêm các danh mục thu nhập khác tương tự
      ];
  
      return (
        <div className="chart-wrapper">
          <div className="chart-container">
            <Chart options={options} series={expenseSeries} type="donut" width="400" key={chartKey} />
            <div className="center-text">Expense</div>
          </div>
          <div className="chart-container">
            <Chart options={optionsincomes} series={incomeSeries} type="donut" width="400" key={chartKey + 1} />
            <div className="center-text">Income</div>
          </div>
        </div>
      );
    }
  };

  return (
    <UserFormStyled>
      {error && <p className="error">{error}</p>}
      <div className="dropdowns">
        <label>
          Chart Type:
          <select value={chartType} onChange={(e) => handleChartTypeChange(e.target.value)}>
            <option value="month">Month</option>
            <option value="year">Year</option>
          </select>
        </label>
        {chartType === 'month' && (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <div>
      <label>
        Month:
        <select value={selectedMonth} onChange={(e) => handleMonthChange(e.target.value)}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((month) => (
            <option key={month} value={month}>{month}</option>
          ))}
        </select>
      </label>
    </div>
    <div style={{ marginLeft: '10px' }}>
      <label>
        Year:
        <select value={selectedYear} onChange={(e) => handleYearChange(e.target.value)}>
          {[2020, 2021, 2022, 2023, 2024].map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </label>
    </div>
  </div>
)}

        {chartType === 'year' && (
          <label>
            Year:
            <select value={selectedYear} onChange={(e) => handleYearChange(e.target.value)}>
              {[2020, 2021, 2022, 2023, 2024].map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </label>
        )}
      </div>
      <div className="donut-chart">
        {generateChart()}
      </div>
    </UserFormStyled>
  );
}

const UserFormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  .chart-wrapper {
    display: flex;
    justify-content: space-around; /* or space-between based on your preference */
    gap: 20px; /* Add the desired gap between charts */
  }
  
  .chart-container {
    position: relative;
  }
  
  .center-text {
    position: absolute;
    top: 47%;
    left: 35%;
    transform: translate(-50%, -50%);
    font-size: 1.5rem; /* Cỡ chữ có thể điều chỉnh theo ý muốn */
  }
  .dropdowns {
    display: flex;
    gap: 1rem;
  }

  .donut-chart {
    /* Add any necessary styling for the chart container */
  }

  label {
    display: flex;
    flex-direction: column;
  }

  select {
    /* Add any necessary styling for the select dropdown */
    padding: 8px;
    margin-top: 4px;
  }
`;

export default StatisticalForm;
