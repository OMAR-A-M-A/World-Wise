// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUrlPosition } from "../hooks/useUrlPosition";
import { useCity } from "../contexts/CityProvider";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./Form.module.css";
import DatePicker from "react-datepicker";
import Button from "./Button";
import ButtonBack from "./ButtonBack";
import Spinner from "./Spinner";
import Message from "./Message";

function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}
const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";
function Form() {
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [emoji, setEmoji] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [lat, lng] = useUrlPosition();
  const { createCity, isLoading } = useCity();
  const navigate = useNavigate();
  useEffect(
    function () {
      if (!lat && !lng) return;
      async function fetchCityData() {
        try {
          setIsLoadingForm(true);
          setErrMessage("");
          const res = await fetch(
            `${BASE_URL}?latitude=${lat}&longitude=${lng}`,
          );

          const data = await res.json();
          console.log(data);
          if (!data.countryCode) throw new Error("try to click on right land");
          setCityName(data.city || data.locality || "");
          setCountry(data.countryName);
          setEmoji(convertToEmoji(data.countryCode));
        } catch (error) {
          setErrMessage(error.message);
        } finally {
          setIsLoadingForm(false);
        }
      }
      fetchCityData();
    },
    [lat, lng],
  );
  async function handleSubmition(e) {
    e.preventDefault();
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };
    await createCity(newCity);
    navigate("/app/cities");
  }

  if (isLoadingForm) return <Spinner></Spinner>;
  if (!lat && !lng)
    return (
      <Message message={"start by clicking on somewhere on the map"}></Message>
    );
  if (errMessage) return <Message message={errMessage}></Message>;
  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmition}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag} style={{ color: "#000" }}>
          {emoji}
        </span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat={"dd/MM/YY"}
        ></DatePicker>
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type={"primary"}>Add</Button>
        <ButtonBack></ButtonBack>
      </div>
    </form>
  );
}

export default Form;
