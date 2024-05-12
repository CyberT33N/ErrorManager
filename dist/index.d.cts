declare const ErrorManager: {
    new (req?: object, res?: object): {
        req: object;
        res: object;
        sendError: Function;
    };
    instance: any;
    middleware: (req: object, res: object) => void;
};
declare const BaseError: {
    new (title: string, e: Error): {
        title: string;
        e: Error;
        httpStatus: number;
        name: string;
        req: object;
        res: object;
        sendError: Function;
    };
    instance: any;
    middleware: (req: object, res: object) => void;
};
declare const ValidationError: {
    new (title: string, e: Error, data: object): {
        title: string;
        e: Error;
        data: object;
        httpStatus: number;
        name: string;
        req: object;
        res: object;
        sendError: Function;
    };
    instance: any;
    middleware: (req: object, res: object) => void;
};
declare const RuntimeError: {
    new (title: string, e: Error, httpStatus?: number): {
        title: string;
        e: Error;
        httpStatus: number;
        name: string;
        req: object;
        res: object;
        sendError: Function;
    };
    instance: any;
    middleware: (req: object, res: object) => void;
};
declare const ResourceNotFoundError: {
    new (title: string, data: object, e: Error): {
        title: string;
        e: Error;
        data: object;
        httpStatus: number;
        name: string;
        req: object;
        res: object;
        sendError: Function;
    };
    instance: any;
    middleware: (req: object, res: object) => void;
};

export { BaseError, ErrorManager, ResourceNotFoundError, RuntimeError, ValidationError };
