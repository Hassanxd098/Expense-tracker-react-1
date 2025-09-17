import React, { useState } from "react";

const Home = () => {
  const [balance, setBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [name, setName] = useState("");
  const [type, setType] = useState("income");
  const [amount, setAmount] = useState("");

  
  const addTransaction = () => {
    if (!name || !amount) return;

    const transaction = {
      id: Date.now(),
      name,
      type,
      amount: parseInt(amount),
    };

    setTransactions([transaction, ...transactions]);

    if (type === "income") {
      setIncome(income + transaction.amount);
      setBalance(balance + transaction.amount);
    } else {
      setExpense(expense + transaction.amount);
      setBalance(balance - transaction.amount);
    }

    
    setName("");
    setAmount("");
    setType("income");
  };

  
  const deleteTransaction = (id, tType, tAmount) => {
    setTransactions(transactions.filter((t) => t.id !== id));

    if (tType === "income") {
      setIncome(income - tAmount);
      setBalance(balance - tAmount);
    } else {
      setExpense(expense - tAmount);
      setBalance(balance + tAmount);
    }
  };

  return (
    <div className=" bg-gray-200 flex justify-center items-center min-h-[100vh] w-full ">
      <div className="flex flex-col items-center justify-center w-full">
        <h1 className="text-blue-600 text-2xl font-bold mb-4">Expenses Tracker</h1>

        <div className="bg-white p-8 rounded-xl shadow-lg max-w-4xl w-full flex justify-around gap-5">
        
          <div className="w-2/5">
            <p className="text-lg font-bold pl-9">
              Balance: ₹ <span className="text-green-600">{balance}</span>
            </p>

          
            <div className="flex  justify-center gap-2 mb-6 mt-4 w-[100%]">
              <div className="bg-gray-100  p-4  h-[8vh] rounded shadow text-center">
                <p className="text-green-600  font-bold">Income: ₹{income}</p>
              </div>
              <div className="bg-gray-100 p-4   h-[8vh]rounded shadow text-center">
                <p className="text-red-600 font-bold">Expenses: ₹{expense}</p>
              </div>
            </div>


            
            <div className="text-center mb-6 font-bold text-lg">
              <pre className="mb-2">New Transaction</pre>

              <input
                type="text"
                placeholder="Notes"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-[100%] border border-gray-300 rounded p-1.5 mb-2"
              />

              <div className="flex flex-row W-[100%] items-center gap-2 ml-8">
                <label htmlFor="type" className="mb-1 text-[15px] ">
                  Choose any option
                </label>
                <select
                  id="type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className=" border text-[15px] px-3 border-gray-300 rounded mb-2"
                >
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>

              <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-[100%] border border-gray-300 rounded p-1.5 mb-2"
              />

              <button
                onClick={addTransaction}
                className="bg-blue-500  w-[100%] text-white font-bold py-1.5 px-5 rounded mt-2 hover:bg-blue-600"
              >
                ADD TRANSACTION
              </button>
            </div>
          </div>

          
          <div className="w-2/5 ">
            <h3 className="text-lg font-bold mb-3 border-b ms-4 px-13">Transaction History</h3>
            <ul className="list-none p-0 m-0">
              {transactions.map((t) => (
                <li
                  key={t.id}
                  className={`flex items-center justify-between px-3 py-2 mb-2 rounded font-medium text-white ${t.type === "income" ? "bg-green-600" : "bg-red-600"
                    }`}
                >
                  <button
                    className="bg-transparent border-none text-white text-lg mr-2"
                    onClick={() => deleteTransaction(t.id, t.type, t.amount)}
                  >
                    🗑
                  </button>
                  <span className="flex-1 ml-8">{t.name}</span>
                  <span className="min-w-[80px] text-right">₹ {t.amount}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
