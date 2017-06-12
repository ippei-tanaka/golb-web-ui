import React from 'react';
import Post from './Post';

const Root = ({posts, settings}) => {
    return (
        <div>
            <header>
                <h1>{settings.name}</h1>
            </header>
            {posts.posts.map((post, index) => (
                <Post key={post._id} {...post} />
            ))}
        </div>
    );
};

export default Root;