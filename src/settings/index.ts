const initializePort = (portVal: string): any => {

    const parsedPort = parseInt(portVal, 10);

    if (isNaN(parsedPort)) {
        return portVal;
    }

    if (parsedPort >= 0) {
        return parsedPort;
    }

    return false;

}

export const port = initializePort(process.env.PORT || "8888");