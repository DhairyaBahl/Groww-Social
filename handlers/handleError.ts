export function handleError(statusCode: number): Error {
    let message = 'Oops! Something went wrong.';

    switch (statusCode) {
        case 400:
            message = 'Oops! Bad request.';
            break;
        case 401:
            message = 'Oops! Unauthorized.';
            break;
        case 403:
            message = 'Oops! Forbidden.';
            break;
        case 404:
            message = 'Oops! Resource not found.';
            break;
        case 500:
            message = 'Oops! Something went wrong.';
            break;
        default:
            break;
    }

    const error = new Error(message);
    return error;
}