import { isRouteErrorResponse, useNavigate, useRouteError } from "react-router";
import Button from "../Button";

const RootErrorElement = () => {
    const error = useRouteError();
    let errorMessage: string;
    const navigate = useNavigate()

    if (isRouteErrorResponse(error)) {
        errorMessage = error.statusText;
    } else if (error instanceof Error) {
        errorMessage = error.message;
    } else if (typeof error === 'string') {
        errorMessage = error;
    } else {
        errorMessage = 'An unknown error occurred';
    }

    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center gap-4 p-4">
            <h1 className="text-2xl font-bold">Oops! Something went wrong.</h1>
            <p className="text-red-500"><i>{errorMessage}</i></p>
            <Button onClick={() => navigate('/')}>Go to Homepage</Button>
        </div>
    );
};

export default RootErrorElement