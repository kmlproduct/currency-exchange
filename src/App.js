import { useEffect, useState } from "react";

// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`
function App() {
  const [amount, setAmount] = useState(1);
  const [amountFrom, setAmountFrom] = useState("EUR");
  const [amountTo, setAmountTo] = useState("USD");
  const [outPut, setOutPut] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(
    function () {
      async function getCurrencyData() {
        setIsLoading(true);
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${amountFrom}&to=${amountTo}`
        );
        const data = await res.json();

        setOutPut(data.rates[amountTo]);
        setIsLoading(false);
      }
      if (amountFrom === amountTo) return setOutPut(amount);
      getCurrencyData();
    },
    [amount, amountFrom, amountTo]
  );

  return (
    <div className="container">
      <div className="box">
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          disabled={isLoading}
        />

        <select
          value={amountFrom}
          onChange={(e) => setAmountFrom(e.target.value)}
          disabled={isLoading}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>
        <select
          value={amountTo}
          onChange={(e) => setAmountTo(e.target.value)}
          disabled={isLoading}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>
        <p>
          <span>{amountFrom}</span>= <span>{outPut} </span>
          <span>{amountTo}</span>
        </p>
      </div>
    </div>
  );
}

export default App;
