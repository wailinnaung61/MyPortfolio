"use client";

import emailjs from "@emailjs/browser";
import { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { settings } from "../../../settings/settings";
import i18next from "i18next";

const ContactForm = () => {
  const currentForm = useRef();
  const [serverSuccess, setServerSuccess] = useState("");
  const [serverError, setServerError] = useState("");
  const [lng, setLng] = useState(i18next.language);

  useEffect(() => {
    const handleLangChange = (lng) => setLng(lng);
    i18next.on("languageChanged", handleLangChange);
    return () => i18next.off("languageChanged", handleLangChange);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    emailjs
      .sendForm(
        settings.emailjs_serviceid,
        settings.emailjs_templateid,
        currentForm.current,
        settings.emailjs_publickey
      )
      .then(
        (result) => {
          if (result.status === 200 && result.text) {
            setServerError(false);
            setServerSuccess(
              lng === "jp"
                ? "メールが正常に送信されました！"
                : "Email successfully sent!"
            );
          }
        },
        (error) => {
          setServerSuccess(false);
          setServerError(
            lng === "jp"
              ? "メッセージ送信中に問題が発生しました！"
              : "Something is wrong while sending the message!"
          );
        }
      );
  };

  return (
    <form
      ref={currentForm}
      className="card -mt-1.5  space-y-4 p-4 md:p-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="inputbox">
        <label htmlFor="name">{lng === "jp" ? "お名前" : "Name"}</label>
        <input
          type="text"
          placeholder={
            lng === "jp" ? "お名前を入力してください..." : "Enter your name..."
          }
          id="name"
          {...register("name", { required: true })}
        />
        {errors.name && (
          <>
            {errors.name.type === "required" && (
              <p className="bg-red-500 bg-opacity-5 text-center text-sm text-red-500">
                {lng === "jp" ? "お名前は必須です！" : "Name is required!"}
              </p>
            )}
          </>
        )}
      </div>
      <div className="inputbox">
        <label htmlFor="email">{lng === "jp" ? "メール" : "Email"}</label>
        <input
          type="email"
          placeholder={
            lng === "jp"
              ? "メールアドレスを入力してください..."
              : "Enter your email..."
          }
          id="email"
          {...register("email", {
            required: true,
            pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          })}
        />
        {errors.email && (
          <>
            {errors.email.type === "required" && (
              <p className="bg-red-500 bg-opacity-5 text-center text-sm text-red-500">
                {lng === "jp" ? "メールは必須です！" : "Email is required!"}
              </p>
            )}
            {errors.email.type === "pattern" && (
              <p className="bg-red-500 bg-opacity-5 text-center text-sm text-red-500">
                {lng === "jp"
                  ? "無効なメールアドレスです！"
                  : "Invalid email address!"}
              </p>
            )}
          </>
        )}
      </div>
      <div className="inputbox">
        <label htmlFor="subject">{lng === "jp" ? "件名" : "Subject"}</label>
        <input
          type="text"
          placeholder={
            lng === "jp" ? "件名を入力してください..." : "Enter subject..."
          }
          id="subject"
          {...register("subject", { required: true })}
        />
        {errors.subject && (
          <>
            {errors.subject.type === "required" && (
              <p className="bg-red-500 bg-opacity-5 text-center text-sm text-red-500">
                {lng === "jp" ? "件名は必須です！" : "Subject is required!"}
              </p>
            )}
          </>
        )}
      </div>
      <div className="inputbox">
        <label htmlFor="message">
          {lng === "jp" ? "メッセージ" : "Message"}
        </label>
        <textarea
          placeholder={
            lng === "jp"
              ? "メッセージを入力してください..."
              : "Enter you message..."
          }
          cols="1"
          rows="5"
          id="message"
          {...register("message", { required: true })}
        />
        {errors.message && (
          <>
            {errors.message.type === "required" && (
              <p className="bg-red-500 bg-opacity-5 text-center text-sm text-red-500">
                {lng === "jp"
                  ? "メッセージは必須です！"
                  : "Message is required!"}
              </p>
            )}
          </>
        )}
      </div>
      {!serverSuccess && serverError && (
        <p className="bg-red-500 bg-opacity-5 text-center text-sm text-red-500">
          {serverError}
        </p>
      )}
      {!serverError && serverSuccess && (
        <p className="bg-green-500 bg-opacity-5 text-center text-sm text-green-500">
          {serverSuccess}
        </p>
      )}
      <button type="submit" className="btn">
        <span>{lng === "jp" ? "送信" : "Send Mail"}</span>
      </button>
    </form>
  );
};

export default ContactForm;
