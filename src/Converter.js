import React, { useState, useEffect } from "react";
import axios from "axios";

const CurrencyConverter = () => {
  // State variables to hold input amount, selected currencies, exchange rate, and available currencies
  const [inputAmount, setInputAmount] = useState(1);
  const [sourceCurrency, setSourceCurrency] = useState("USD");
  const [targetCurrency, setTargetCurrency] = useState("INR");
  const [exchangeRate, setExchangeRate] = useState(null);
  const [availableCurrencies, setAvailableCurrencies] = useState([]);

  // Fetch exchange rates and available currencies when the component mounts or target currency changes
  useEffect(() => {
    axios
      .get("https://open.er-api.com/v6/latest/USD")
      .then((response) => {
        const data = response.data.rates;
        setAvailableCurrencies(Object.keys(data)); // Set available currencies from API data
        setExchangeRate(data[targetCurrency]); // Set initial exchange rate for the target currency
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [targetCurrency]);

  // Function to convert the input amount based on the current exchange rate
  const convertCurrency = () => {
    if (!exchangeRate) return 0; // Return 0 if exchange rate is not available
    return (inputAmount * exchangeRate).toFixed(2); // Return converted amount rounded to 2 decimal places
  };

  return (
    <div>
      <h2>Currency Converter</h2>
      <div>
        <label>Amount: </label>
        <input
          type="number"
          value={inputAmount}
          onChange={(e) => setInputAmount(e.target.value)} // Update input amount state
        />
      </div>
      <div>
        <label>From: </label>
        <select
          value={sourceCurrency}
          onChange={(e) => setSourceCurrency(e.target.value)} // Update source currency state
        >
          {availableCurrencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>To: </label>
        <select
          value={targetCurrency}
          onChange={(e) => setTargetCurrency(e.target.value)} // Update target currency state
        >
          {availableCurrencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      <div>
        <h3>
          {inputAmount} {sourceCurrency} is equal to {convertCurrency()}{" "}
          {targetCurrency}
        </h3>
      </div>
    </div>
  );
};

export default CurrencyConverter;
