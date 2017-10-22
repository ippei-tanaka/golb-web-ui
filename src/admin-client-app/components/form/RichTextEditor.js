import React from 'react';
import PropTypes from 'prop-types';
import FormElement from './FormElement';
import {generate} from '../../helpers/random-string-generator';
import {Editor, EditorState, RichUtils, convertToRaw, convertFromRaw} from 'draft-js';

class RichTextEditor extends FormElement
{
    constructor (props)
    {
        super(props);

        const {initialValue} = props;

        this.state = {
            editorState: initialValue
                ? EditorState.createWithContent(convertFromRaw(JSON.parse(initialValue)))
                : EditorState.createEmpty(),
            error: []
        };
    }

    onFormSubmit ()
    {
        return JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()));
    }

    onFormSubmitFailed (error)
    {
        this.setState({error: error || []});
    }

    focus ()
    {
        this.refs.editor.focus();
    }

    onChange (editorState)
    {
        this.setState({editorState});
    }

    handleKeyCommand (command)
    {
        const {editorState} = this.state;
        const newState = RichUtils.handleKeyCommand(editorState, command);

        if (newState)
        {
            this.onChange(newState);
            return true;
        }

        return false;
    }

    onTab (e)
    {
        const maxDepth = 4;
        this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
    }

    toggleBlockType (blockType)
    {
        this.onChange(
            RichUtils.toggleBlockType(
                this.state.editorState,
                blockType
            )
        );
    }

    toggleInlineStyle (inlineStyle)
    {
        this.onChange(
            RichUtils.toggleInlineStyle(
                this.state.editorState,
                inlineStyle
            )
        );
    }

    render ()
    {
        const {editorState, error} = this.state;

        // If the user changes block type before entering any text, we can
        // either style the placeholder or hide it. Let's just hide it now.

        const {
            name,
            label = "",
            disabled = false,
            placeholder = ""
        } = this.props;

        let className = 'RichEditor-editor';
        const contentState = editorState.getCurrentContent();

        if (!contentState.hasText())
        {
            if (contentState.getBlockMap().first().getType() !== 'unstyled')
            {
                className += ' RichEditor-hidePlaceholder';
            }
        }

        const randomString = generate();

        return (
        <div className="module-form-element">

            <label
                htmlFor={`rich-text-editor-${randomString}`}
                className="m-fel-label"
            >{label}</label>

            <div className="RichEditor-root m-fel-element m-fel-html-editor-element">
                <BlockStyleControls
                    editorState={editorState}
                    onToggle={this.toggleBlockType.bind(this)}
                />
                <InlineStyleControls
                    editorState={editorState}
                    onToggle={this.toggleInlineStyle.bind(this)}
                />
                <div className={className} onClick={this.focus.bind(this)}>
                    <Editor
                        id={`rich-text-editor-${randomString}`}
                        blockStyleFn={getBlockStyle}
                        customStyleMap={styleMap}
                        editorState={editorState}
                        handleKeyCommand={this.handleKeyCommand.bind(this)}
                        onChange={this.onChange.bind(this)}
                        onTab={this.onTab.bind(this)}
                        placeholder={placeholder}
                        ref="editor"
                        spellCheck={true}
                        readOnly={disabled}
                    />
                </div>
            </div>

            {error.length > 0 ? (
                <ul className="m-fel-error-message-list">
                    {error.map((message, index) => (
                        <li
                            className="m-fel-error-message-list-item"
                            key={index}
                        >{message}</li>
                    ))}
                </ul>
            ) : null}
        </div>
        );
    }
}

// Custom overrides for "code" style.
const styleMap = {
    CODE: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
        fontSize: 16,
        padding: 2,
    },
};

const getBlockStyle = (block) =>
{
    switch (block.getType())
    {
        case 'blockquote':
            return 'RichEditor-blockquote';
        default:
            return null;
    }
};

const StyleButton = ({active, label, style, onToggle}) =>
{
    let className = 'RichEditor-styleButton';

    if (active)
    {
        className += ' RichEditor-activeButton';
    }

    return (
        <span className={className} onMouseDown={e => {
            e.preventDefault();
            onToggle(style);
        }}>{label}</span>
    );
};

const BLOCK_TYPES = [
    {label: 'H1', style: 'header-one'},
    {label: 'H2', style: 'header-two'},
    {label: 'H3', style: 'header-three'},
    {label: 'H4', style: 'header-four'},
    {label: 'H5', style: 'header-five'},
    {label: 'H6', style: 'header-six'},
    {label: 'Blockquote', style: 'blockquote'},
    {label: 'UL', style: 'unordered-list-item'},
    {label: 'OL', style: 'ordered-list-item'},
    {label: 'Code Block', style: 'code-block'},
];

const BlockStyleControls = (props) =>
{
    const {editorState} = props;
    const selection = editorState.getSelection();
    const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();
    return (
        <div className="RichEditor-controls">
            {BLOCK_TYPES.map((type) =>
                <StyleButton
                    key={type.label}
                    active={type.style === blockType}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                />
            )}
        </div>
    );
};

const INLINE_STYLES = [
    {label: 'Bold', style: 'BOLD'},
    {label: 'Italic', style: 'ITALIC'},
    {label: 'Underline', style: 'UNDERLINE'},
    {label: 'Monospace', style: 'CODE'},
];

const InlineStyleControls = (props) =>
{
    const currentStyle = props.editorState.getCurrentInlineStyle();
    return (
        <div className="RichEditor-controls">
            {INLINE_STYLES.map(type =>
                <StyleButton
                    key={type.label}
                    active={currentStyle.has(type.style)}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                />
            )}
        </div>
    );
};

RichTextEditor.propTypes = Object.assign({
    label: PropTypes.string,
    disabled: PropTypes.bool,
    placeholder: PropTypes.string,
    initialValue: PropTypes.string
}, FormElement.propTypes);

export default RichTextEditor;