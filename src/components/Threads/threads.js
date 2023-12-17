import React, { useState } from "react";

const Threads = () => {
    const [reply, setReply] = useState("");

    const handleSubmitReply = (e) => {
        e.preventDefault();
        console.log({ reply });
        setReply("");
    };

    return (
        <main className='threads'>
            <form className='modal__content' onSubmit={handleSubmitReply}>
                <label htmlFor='reply'>Reply to the thread</label>
                <textarea
                    rows={5}
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    type='text'
                    name='reply'
                    className='modalInput'
                />
                <button className='modalBtn'>SEND</button>
            </form>
        </main>
    );
};

export default Threads;