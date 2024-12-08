"use client";

import { useState, useEffect } from "react";
import emailjs from "emailjs-com";

const Notification = () => {
  const [subscribedAccounts, setSubscribedAccounts] = useState([]);
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetch('/api/getSubscribedAccounts')
      .then((res) => res.json())
      .then((data) => {
        setSubscribedAccounts(data.data)
        setIsLoading(false)
      })
  }, [])

  useEffect(() => {
    console.log(subscribedAccounts);
  }, [subscribedAccounts])

  const sendEmails = async () => {
    if (!message.trim()) {
      alert("Please enter a message.");
      return;
    }

    setIsLoading(true);
    try {
      for (const account of subscribedAccounts) {
        // Adjust the EmailJS parameters as necessary
        const templateParams = {
            studentName: account.student_name,
            studentEmail: account.student_email,
            subject: subject,
            message: message,
        };

        await emailjs.send(
          "service_ewtewwz",
          "template_u77yiya",
          templateParams,
          "9sPMrWqWkn5H2dXmH"
        );
      }
      setSuccessMessage("Emails sent successfully!");
    } catch (error) {
      console.error("Error sending emails:", error);
    } finally {
        setSubject("");
        setMessage("");
        setIsLoading(false);
    }
  };

  return (
    <div>
      <h3 className="mb-10 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
            Sent Notification
        </h3>
    <div className="mb-8">
    <label
        htmlFor="subject"
        className="block mb-5 font-medium text-gray-700 dark:text-gray-200"
    >
        Email Subject
    </label>
    <input
        name="subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder="Write your subject here"
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black dark:bg-black dark:border-dark dark:focus:ring-yellow_bright"
        required
    />
    </div>
    <div className="mb-8">
    <label
        htmlFor="message"
        className="block mb-5 font-medium text-gray-700 dark:text-gray-200"
    >
        Email Message
    </label>
    <textarea
        name="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={5}
        placeholder="Write your message here"
        className=" resize-none w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black dark:bg-black dark:border-dark dark:focus:ring-yellow_bright"
        required
    />
    
    </div>

    <button onClick={sendEmails} disabled={isLoading} className="py-2 px-5 mb-8 text-white dark:text-black font-semibold bg-black dark:bg-yellow_bright rounded-md hover:bg-black/50 dark:hover:bg-yellow_bright/50 duration-300 ease-in-out">
        {isLoading ? "Sending..." : "Send"}
      </button>
      
    </div>
  );
};

export default Notification;
