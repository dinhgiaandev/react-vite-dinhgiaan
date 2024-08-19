import { Button, Result } from "antd";
import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();

    return (
        <Result
            status="403"
            title="Sorry, this page did not work. Please return to homepage!"
            subTitle={error.statusText || error.message}
            extra={
                <Button type="primary">
                    <Link to="/">
                        <span>
                            Back to homepage
                        </span>
                    </Link>
                </Button>}
        />
    );
}