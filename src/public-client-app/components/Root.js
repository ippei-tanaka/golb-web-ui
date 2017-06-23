import React from 'react';
import Post from './Post';

const Root = ({posts, settings}) => {
    return (
        <div>
            <header className="module-header">
                <h1><a href="/">{settings.name}</a></h1>
            </header>
            {posts.map((post, index) => (
                <section key={post._id}>
                    <Post {...post} />
                </section>
            ))}
        </div>
    );
};

export default Root;