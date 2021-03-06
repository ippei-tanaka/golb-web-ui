import React, {Component} from 'react';
import {connect} from 'react-redux';
import Root from '../components/Root';
import {Text, Select, Button, Form} from '../components/form';
import actionCreators from '../action-creators'

let SettingEditor = class extends Component
{
    constructor (props)
    {
        super(props);

        this.state = {
            flushMessage: ""
        }
    }

    componentWillMount ()
    {
        const {settings, loadSettings} = this.props;

        if (Object.keys(settings).length === 0)
        {
            loadSettings();
        }
    }

    render ()
    {
        const {settings, editSettings} = this.props;
        const {flushMessage} = this.state;

        return (
            <Root>
                <div className="module-content">
                    <h1 className="m-ctt-title">Edit Settings</h1>
                    <section className="m-ctt-section">
                        {Object.keys(settings).length > 0 ? (
                            <Form
                                onSubmit={values => editSettings(values)}
                                onSubmissionSucceed={() => this.setState({flushMessage: "The settings saved successfully."})}>
                                <Text name="name" label="Blog Name" initialValue={settings.name} />
                                <Select name="posts_per_page" label="Posts per page" initialValue={settings.posts_per_page}>
                                    <option key="0" value="">(None)</option>
                                    <option key="1" value={1}>1</option>
                                    <option key="2" value={2}>2</option>
                                    <option key="3" value={3}>3</option>
                                    <option key="5" value={5}>5</option>
                                    <option key="10" value={10}>10</option>
                                </Select>
                                <Button>Save</Button>
                            </Form>
                        ) : (
                            <div>loading...</div>
                        )}
                    </section>
                    {flushMessage ? (
                        <section className="m-ctt-section">
                            <p>{flushMessage}</p>
                        </section>
                    ) : null}
                </div>
            </Root>
        );
    }
};

SettingEditor = connect(s => s, actionCreators)(SettingEditor);

export default SettingEditor;