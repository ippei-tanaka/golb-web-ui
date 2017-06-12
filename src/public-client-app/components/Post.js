import React from 'react';
import "./Post.css";

const getOrdinal = (number) =>
{
    if (11 <= number && number <= 19)
    {
        return number + "th";
    } else
    {
        const rest = number % 10;

        switch (rest)
        {
            case 1:
                return number + "st";
            case 2:
                return number + "nd";
            case 3:
                return number + "rd";
            default:
                return number + "th";
        }
    }
};

const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

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
            <h1 className="m-pst-title">{title}</h1>
            <time className="m-pst-time">{getOrdinal(date.getDate())} {monthNames[date.getMonth()]}, {date.getFullYear()}</time>
            <div className="m-pst-content">{content}</div>
        </article>
    );
};

export default Post;