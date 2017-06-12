import React from 'react';

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
        <article>
            <h1>{title}</h1>
            <time>{getOrdinal(date.getDate())} {monthNames[date.getMonth()]}, {date.getFullYear()}</time>
            <div>{content}</div>
        </article>
    );
};

export default Post;