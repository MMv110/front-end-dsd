<<<<<<< HEAD
import { React } from 'react'
import { useRouteError } from "react-router-dom";

export default function ErrorPage(){
    const error = useRouteError()
    console.error(error)

    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>Lo siento, un error ha ocurrido.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    )
=======
import { React } from 'react'
import { useRouteError } from "react-router-dom";

export default function ErrorPage(){
    const error = useRouteError()
    console.error(error)

    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>Lo siento, un error ha ocurrido.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    )
>>>>>>> 21bf2b28a18cf0353dda5616c812a24c5ae43b31
}