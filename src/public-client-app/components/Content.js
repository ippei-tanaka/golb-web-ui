import React from 'react';
import {convertFromRaw} from 'draft-js';
import Prism from 'prismjs';

//var Prism = require('prismjs');

// The code snippet you want to highlight, as a string
//var code = "var data = 1;";

// Returns a highlighted HTML string
//var html = Prism.highlight(code, Prism.languages.javascript);

//import {stateToHTML} from 'draft-js-export-html';
//import {generate} from '../../admin-client-app/helpers/random-string-generator';

/*
const renderInlineElement = (style, children) => {
    switch (style) {
        case "BOLD":
            return <strong key={generate()}>{children}</strong>;
        case "ITALIC":
            return <em key={generate()}>{children}</em>;
        case "UNDERLINE":
            return <span key={generate()} className="underline">{children}</span>;
        default:
            return children;
    }
};

const getInlineContentList = (findStyleRangesFn, text) => {
    const inlineContentList = [];
    let styles = [];
    findStyleRangesFn(
        (charMetaData) => {
            const _styles = charMetaData.getStyle();
            styles = _styles.count() > 0 ? _styles : [];
            return true;
        },
        (start, end) => {
            let element = text.substring(start, end);
            for (let style of styles) {
                element = renderInlineElement(style, element);
            }
            inlineContentList.push(element);
        });
    return inlineContentList;
};

const renderBlockElement = (type, children, props) => {

    if (Array.isArray(children)) {
        switch (type) {
            case 'unordered-list-item':
                return (
                    <li {...props}>{children[0]}
                        <ul>{children[1]}</ul>
                    </li>
                );
            case 'ordered-list-item':
                return (
                    <li {...props}>{children[0]}
                        <ol>{children[1]}</ol>
                    </li>
                );
        }
    }

    switch (type) {
        case 'unordered-list-item':
        case 'ordered-list-item':
            return <li {...props}>{children}</li>;
        case 'code-block':
            return <code {...props}>{children}</code>;
        case 'unstyled':
        default:
            return <div {...props}>{children}</div>;
    }
};

function* renderBlockElements(nestedBlocks) {

    const length = nestedBlocks.length;
    let prev;

    for (let index = 0; index < length; index++) {
        const block = nestedBlocks[index];
        const {self, children} = block;
        const type = self.getType();
        const text = self.getText();
        const depth = self.getDepth();

        if (type === 'unordered-list-item') {
            if (!children) {
                yield <li>{text}</li>;
            } else {
                yield (
                    <ul>
                        <li>
                            {text}
                            {[...renderBlockElements(children)]}
                        </li>
                    </ul>
                );
            }
        } else if (type === 'ordered-list-item') {
            if (!children) {
                yield <li>{text}</li>;
            } else {
                yield (
                    <ol>
                        <li>
                            {text}
                            {[...renderBlockElements(children)]}
                        </li>
                    </ol>
                );
            }
        } else if (type === 'code-block') {
            yield <code dangerouslySetInnerHTML={{__html: Prism.highlight(text, Prism.languages.javascript)}}/>;
        } else {
            yield <div>{text}</div>;
        }

        prev = block;
    }
}

const createNestedBlocksBasedOnDepths = (blocks, baseDepth = 0) => {
    const newBlocks = [];
    let parentBlock = null;
    let descendantBlocks = [];
    const length = blocks.length;

    for (let index = 0; index < length; index++) {
        const block = blocks[index];
        const nextBlock = (index + 1) < length ? blocks[index + 1] : null;
        const depth = block.getDepth();
        const nextBlockDepth = nextBlock ? nextBlock.getDepth() : null;

        if (depth < baseDepth) {
            console.error("[nestBlocksBasedOnDepths] method doesn't expect this structure of blocks. (type1)");
            continue;
        }

        if (index === 0 && depth > baseDepth) {
            console.error("[nestBlocksBasedOnDepths] method doesn't expect this structure of blocks. (type2)");
            continue;
        }

        if (depth === baseDepth && parentBlock) {
            newBlocks.push({
                self: parentBlock,
                children: createNestedBlocksBasedOnDepths(descendantBlocks, baseDepth + 1)
            });
            parentBlock = null;
            descendantBlocks = [];
        }

        if (depth === baseDepth && !nextBlock) {
            newBlocks.push({
                self: block,
                children: null
            });
            continue;
        }

        if (depth === baseDepth && nextBlockDepth === baseDepth) {
            newBlocks.push({
                self: block,
                children: null
            });
            continue;
        }

        if (depth === baseDepth && nextBlockDepth > baseDepth) {
            parentBlock = block;
            continue;
        }

        if (depth > baseDepth) {
            descendantBlocks.push(block);
            //continue;
        }
    }

    if (parentBlock) {
        newBlocks.push({
            self: parentBlock,
            children: createNestedBlocksBasedOnDepths(descendantBlocks, baseDepth + 1)
        });
    }

    return newBlocks;
};
*/

const createListChunk = (blockArray) => {
    const length = blockArray.length;

    if (length === 0) {
        return [];
    }

    const result = [];
    const baseDepth = blockArray[0].getDepth();
    let currentRoot = null;
    let temp = [];

    for (let i = 0; i < length; i++) {
        const block = blockArray[i];
        const depth = block.getDepth();

        if (currentRoot && baseDepth === depth) {
            result.push({
                self: currentRoot,
                children: temp.length > 0 ? temp : null
            });

            currentRoot = null;
            temp = [];
        }

        if (baseDepth === depth) {
            currentRoot = block;
            continue;
        }

        if (baseDepth < depth) {
            temp.push(block);
        }
    }

    if (currentRoot) {
        result.push({
            self: currentRoot,
            children: temp.length > 0 ? temp : null
        });
    }

    return result;
};

const createChunk = (blockArray) => {
    const length = blockArray.length;

    if (length === 0) {
        return [];
    }

    const chunk = [];
    const headOfChunk = blockArray[0];
    const typeOfChunk = headOfChunk.getType();
    const depthOfChunk = headOfChunk.getDepth();

    if (typeOfChunk === 'unordered-list-item'
        || typeOfChunk === 'ordered-list-item') {
        for (let i = 0; i < length; i++) {
            const block = blockArray[i];
            const depth = block.getDepth();
            if (depth < depthOfChunk) {
                break;
            }
            if (depth === depthOfChunk && block.getType() !== typeOfChunk) {
                break;
            }
            chunk.push(block);
        }
    } else if (typeOfChunk === 'code-block') {
        for (let i = 0; i < length; i++) {
            const block = blockArray[i];
            if (block.getType() !== typeOfChunk) {
                break;
            }
            chunk.push(block);
        }
    } else {
        chunk.push(headOfChunk);
    }

    return chunk;
};

const renderBlockArray = (blockArray) => {
    const length = blockArray.length;

    if (length === 0) {
        return [];
    }

    const output = [];
    const chunk = createChunk(blockArray);
    const chunkHeadBlock = chunk[0];
    const chunkType = chunkHeadBlock.getType();

    if (chunkType === 'unordered-list-item') {
        const nestedChunk = createListChunk(chunk);
        output.push(
            <ul key={chunkHeadBlock.getKey() + chunk.length}>
                {nestedChunk.map(obj => (
                    <li key={obj.self.getKey()}>
                        {obj.self.getText()}
                        {obj.children ? renderBlockArray(obj.children) : null}
                    </li>
                ))}
            </ul>
        );
    } else if (chunkType === 'ordered-list-item') {
        const listChunk = createListChunk(chunk);
        output.push(
            <ol key={chunkHeadBlock.getKey() + chunk.length}>
                {listChunk.map(obj => (
                    <li key={obj.self.getKey()}>
                        {obj.self.getText()}
                        {obj.children ? renderBlockArray(obj.children) : null}
                    </li>
                ))}
            </ol>
        );
    } else if (chunkType === 'code-block') {
        const text = chunk.map(bl => Prism.highlight(bl.getText(), Prism.languages.javascript)).join("<br>");
        output.push(
            <code
                key={chunkHeadBlock.getKey()}
                dangerouslySetInnerHTML={{__html: text}}
            />
        );
    } else {
        chunk.forEach(block => {
            output.push(
                <div key={block.getKey()}>{block.getText()}</div>
            );
        });
    }

    return output.concat(renderBlockArray(blockArray.slice(chunk.length)));
};

const Content = ({content}) => {
    const contentState = convertFromRaw(JSON.parse(content));

    return (
        <div>
            {renderBlockArray(contentState.getBlocksAsArray())}
        </div>
    );
};

export default Content;