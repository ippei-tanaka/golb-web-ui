import React from 'react';
import Post from './Post';

const Root = ({posts, settings, nextPage, prevPage, categories}) =>
{
    return (
        <div>
            <header className="module-header">
                <div className="m-hdr-inner-container">
                    <h1 className="m-hdr-heading">
                        <a href="/">{settings.name}</a>
                    </h1>
                </div>
            </header>
            {posts.map((post, index) => (
                <section className="module-post-container" key={post._id}>
                    <Post {...post} categories={categories} />
                </section>
            ))}
            <nav className="module-page-navigation">
                <menu className="m-pnv-menu">
                    {nextPage ? (
                        <li className="m-pnv-next"><a href={`/page/${nextPage}`}>{`< Next`}</a></li>
                    ) : null}
                    {prevPage ? (
                        <li className="m-pnv-prev"><a href={prevPage > 1 ? `/page/${prevPage}` : "/"}>{`Previous >`}</a></li>
                    ) : null}
                </menu>
            </nav>
        </div>
    );
};

export default Root;