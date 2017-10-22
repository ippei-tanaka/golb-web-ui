import React from 'react';
import getOrdinal from "../utilities/get-ordinal";
import getMonthName from "../utilities/get-month-name";
import {convertFromRaw} from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';

const Post = ({
    //author_id,
    category_id,
    content,
    created_date,
    //is_draft,
    //published_date,
    slug,
    //tags,
    title,
    updated_date,
    //_id,
    categories
}) =>
{
    const date = new Date(updated_date || created_date);

    const category = category_id ? categories.find(c => c._id === category_id) : undefined;

    const contentState = convertFromRaw(JSON.parse(content));
    //const editorState = EditorState.createWithContent(contentState);
    //const contentHtml = ReactDOMServer.renderToStaticMarkup(<Editor readOnly={true} editorState={editorState} />);
    const contentHtml = stateToHTML(contentState);

    return (
        <article className="module-post">
            <h1 className="m-pst-title">
                <a href={`/post/${slug}`}>{title}</a>
            </h1>
            <div className="m-pst-meta-container">
            <time className="m-pst-time">{getOrdinal(date.getDate())} {getMonthName(date.getMonth() + 1)}, {date.getFullYear()}</time>
            {category ? (
                <span className="m-pst-category">{category.name}</span>
            ) : null}
            </div>
            <div className="m-pst-content" dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </article>
    );
};

export default Post;