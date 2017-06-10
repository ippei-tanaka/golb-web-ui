import React from "react";
import Base from './components/Base';
import { renderToStaticMarkup } from 'react-dom/server';

const DOCTYPE = "<!doctype html>";

export const render = ({posts, settings}) =>
{
    return DOCTYPE + renderToStaticMarkup(
        <Base title={settings.name} />
        );
};