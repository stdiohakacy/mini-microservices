import React from 'react';
import PostCreated from './PostCreated';
import PostList from './PostList';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    return (
        <div className='container'>
            <h1>CreatePost</h1>
            <PostCreated/>
            <hr/>
            <h1>Posts</h1>
            <PostList />
        </div>
    )
}