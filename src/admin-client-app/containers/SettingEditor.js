import React, {Component} from 'react';
import {connect} from 'react-redux';
import Header from './Header';
import {Text, TextArea, Select, Form} from '../components/form';
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
            <div>
                <Header/>
                <section>
                    <h2>Edit Settings</h2>
                    {Object.keys(settings).length > 0 ? (
                    <Form
                        initialEntries={settings}
                        onSubmit={values => editSettings(values)}
                        onSubmissionSucceed={() => this.setState({flushMessage: "The settings saved successfully."})}>
                        <Text name="name" label="Blog Name" />
                        <Select name="posts_per_page" label="Posts per page">
                            <option key="0" value="">(None)</option>
                            <option key="1" value={1}>1</option>
                            <option key="2" value={2}>2</option>
                            <option key="3" value={3}>3</option>
                            <option key="5" value={5}>5</option>
                            <option key="10" value={10}>10</option>
                        </Select>
                        <button>Save</button>
                    </Form>
                    ) : (
                        <div>loading...</div>
                    )}

                    {flushMessage ? (
                        <div>{flushMessage}</div>
                    ) : null}
                </section>
            </div>
        );
    }
};

SettingEditor = connect(s => s, actionCreators)(SettingEditor);

export default SettingEditor;