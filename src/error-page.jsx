import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <div id="error-page">
            <h1>Hello my friend!</h1>
            <p>Sorry, this link did not work, please turn back!</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    );
}