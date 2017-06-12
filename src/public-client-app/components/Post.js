import React from 'react';
import "./Post.scss";
import getOrdinal from "../utilities/get-ordinal";
import getMonthName from "../utilities/get-month-name";

const Post = ({
    author_id,
    category_id,
    content,
    created_date,
    is_draft,
    published_date,
    slug,
    tags,
    title,
    updated_date,
    _id
}) =>
{
    const date = new Date(updated_date || created_date);

    return (
        <article className="module-post">
            <h1 className="m-pst-title">
                <a href={`/post/${slug}`}>{title}</a>
            </h1>
            <time className="m-pst-time">{getOrdinal(date.getDate())} {getMonthName(date.getMonth() + 1)}, {date.getFullYear()}</time>
            <div className="m-pst-content">{content}</div>
        </article>
    );
};

export default Post;