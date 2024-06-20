import React, { useState, useEffect } from "react";
import axios from "axios";
import "./converter.css";

const CurrencyConverter = () => {
  // State variables
  const [inputAmount, setInputAmount] = useState();
  const [sourceCurrency, setSourceCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [exchangeRate, setExchangeRate] = useState(null);
  const [availableCurrencies, setAvailableCurrencies] = useState([]);
  const [selectedDate, setSelectedDate] = useState("2021-01-01");

  const API_KEY = process.env.REACT_APP_API_KEY;

  // Fetch exchange rates and available currencies when the component mounts or target currency changes
  useEffect(() => {
    axios
      .get(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`)
      .then((response) => {
        const data = response.data.conversion_rates;
        setAvailableCurrencies(Object.keys(data)); // Set available currencies from API data
        setExchangeRate(data[toCurrency]); // Set initial exchange rate for the target currency
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [toCurrency, inputAmount]);

  // Fetch historical exchange rate whenever the sourceCurrency, toCurrency, or selectedDate changes
  useEffect(() => {
    const fetchHistoricalRate = async () => {
      const [year, month, day] = selectedDate.split("-");
      try {
        const response = await axios.get(
          `https://v6.exchangerate-api.com/v6/${API_KEY}/history/${sourceCurrency}/${year}/${month}/${day}`
        );
        console.log("Historical Rate Response:", response);
        const data = response.data.conversion_rates;
        setExchangeRate(data[toCurrency]);
      } catch (error) {
        console.error("Error fetching historical rate:", error);
      }
    };

    fetchHistoricalRate();
  }, [sourceCurrency, toCurrency, selectedDate, inputAmount]);

  // Function to convert the input amount based on the current exchange rate
  const convertCurrency = () => {
    if (!exchangeRate) return 0; // Return 0 if exchange rate is not available
    return (inputAmount * exchangeRate).toFixed(2); // Return converted amount rounded to 2 decimal places
  };

  return (
    <div className="currency-converter">
      <h2>Currency Converter</h2>
      <div>
        <label>Amount: </label>
        <input
          type="number"
          placeholder="Please Enter Amount"
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
            <option key={currency} value={currency} style={{ height: "50px" }}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>To: </label>
        <select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)} // Update target currency state
        >
          {availableCurrencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Date: </label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          min="2021-01-01"
          max={new Date().toISOString().split("T")[0]}
        />
      </div>
      <div>
        {inputAmount && (
          <h3>
            {inputAmount} {sourceCurrency} is equal to {convertCurrency()}
            {toCurrency}
          </h3>
        )}
      </div>
    </div>
  );
};

export default CurrencyConverter;
