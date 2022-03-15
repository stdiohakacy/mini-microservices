import React, { useState } from 'react';
import axios from 'axios';

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ postId }) => {
    const [ content, setContent ] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post(`http://localhost:4001/posts/${postId}/comments`, { content });
        setContent("");
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <div>
                    <label></label>
                    <input 
                        value={content} 
                        onChange={e => setContent(e.target.value)}
                        className="form-control"
                    />
                </div>
                <button className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}