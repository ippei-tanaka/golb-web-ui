import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {generate} from '../../helpers/random-string-generator';
import {Editor, EditorState, RichUtils, convertToRaw} from 'draft-js';

class RichEditorExample extends Component
{
    constructor (props)
    {
        super(props);
        this.state = {editorState: EditorState.createEmpty()};

        //this.focus = () => this.refs.editor.focus();
        //this.onChange = (editorState) => this.setState({editorState});
        //this.handleKeyCommand = (command) => this._handleKeyCommand(command);
        //this.onTab = (e) => this._onTab(e);
        //this.toggleBlockType = (type) => this._toggleBlockType(type);
        //this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
    }

    focus ()
    {
        this.refs.editor.focus();
    }

    onChange (editorState)
    {
        const {
            entries,
            update,
            errorMessages = {}
        } = this.context;

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
        const {editorState} = this.state;

        // If the user changes block type before entering any text, we can
        // either style the placeholder or hide it. Let's just hide it now.
        let className = 'RichEditor-editor';
        const contentState = editorState.getCurrentContent();

        if (!contentState.hasText())
        {
            if (contentState.getBlockMap().first().getType() !== 'unstyled')
            {
                className += ' RichEditor-hidePlaceholder';
            }
        }

        const {
            name,
            label = "",
            disabled = false,
            //children
        } = this.props;

        const {
            entries,
            update,
            errorMessages = {}
        } = this.context;

        const messages = errorMessages[name] || [];

        //const randomString = generate();

        console.log(convertToRaw(editorState.getCurrentContent()));

        return (
        <div className="module-form-element">

            <label
                //htmlFor={`select-${randomString}`}
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
                        blockStyleFn={getBlockStyle}
                        customStyleMap={styleMap}
                        editorState={editorState}
                        handleKeyCommand={this.handleKeyCommand.bind(this)}
                        onChange={this.onChange.bind(this)}
                        onTab={this.onTab.bind(this)}
                        placeholder="Tell a story..."
                        ref="editor"
                        spellCheck={true}
                    />
                </div>
            </div>

            {messages.length > 0 ? (
                <ul className="m-fel-error-message-list">
                    {messages.map((message, index) => (
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

function getBlockStyle (block)
{
    switch (block.getType())
    {
        case 'blockquote':
            return 'RichEditor-blockquote';
        default:
            return null;
    }
}

class StyleButton extends React.Component {
    constructor ()
    {
        super();
        this.onToggle = (e) =>
        {
            e.preventDefault();
            this.props.onToggle(this.props.style);
        };
    }

    render ()
    {
        let className = 'RichEditor-styleButton';
        if (this.props.active)
        {
            className += ' RichEditor-activeButton';
        }
        return (
            <span className={className} onMouseDown={this.onToggle}>
              {this.props.label}
            </span>
        );
    }
}

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

class Select extends Component {
    render ()
    {
        const {
            name,
            label = "",
            disabled = false,
            children
        } = this.props;

        const {
            entries,
            update,
            errorMessages = {}
        } = this.context;

        const messages = errorMessages[name] || [];

        const randomString = generate();

        return (
            <div className="module-form-element">
                <label
                    htmlFor={`select-${randomString}`}
                    className="m-fel-label"
                >{label}</label>
                <select
                    id={`select-${randomString}`}
                    className="m-fel-element m-fel-select-element"
                    name={name}
                    value={entries[name] || ""}
                    onChange={e => update(name, e.target.value)}
                    disabled={disabled}
                >{children}</select>
                {messages.length > 0 ? (
                    <ul className="m-fel-error-message-list">
                        {messages.map((message, index) => (
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

RichEditorExample.propTypes =
{
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    disabled: PropTypes.bool
};

RichEditorExample.contextTypes =
{
    update: PropTypes.func.isRequired,
    entries: PropTypes.object.isRequired,
    errorMessages: PropTypes.object
};

export default RichEditorExample;