"use client";

import styles from "./styles.module.css";
import { addTraining } from "@/app/lib/actions";
import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const AddTrainingForm = () => {
  const Today = new Date();
  const [date, setDate] = useState(Today);

  return (
    <form action={addTraining}>
      <div>
        <label htmlFor="trainingDate" className={styles.label}>
          日付
        </label>
        <ReactDatePicker
          name="trainingDate"
          dateFormat="yyyy/MM/dd"
          selected={date}
          onChange={(selectedDate) => {
            setDate(selectedDate || Today);
          }}
        />
      </div>
      <div>
        <label htmlFor="trainingMenu" className={styles.label}>
          種目
        </label>
        <select name="trainingMenu">
          <option value="" disabled>
            選択してください
          </option>
          <optgroup label="GIG3">
            <option value="ベンチプレス">ベンチプレス</option>
            <option value="スクワット">スクワット</option>
            <option value="デッドリフト">デッドリフト</option>
          </optgroup>
          <optgroup label="胸">
            <option value="チェストプレス">チェストプレス</option>
          </optgroup>
          <optgroup label="背中">
            <option value="ラットプルダウン">ラットプルダウン</option>
            <option value="シーテッドローイング">シーテッドローイング</option>
          </optgroup>
          <optgroup label="肩">
            <option value="ショルダープレス">ショルダープレス</option>
            <option value="サイドレイズ">サイドレイズ</option>
          </optgroup>
        </select>
      </div>
      <div>
        <label htmlFor="times" className={styles.label}>
          回数
        </label>
        <input type="number" name="times" />
      </div>
      <div>
        <label htmlFor="comment" className={styles.label}>
          めも
        </label>
        <textarea name="comment" />
      </div>

      <button type="submit">Add Training</button>
    </form>
  );
};
