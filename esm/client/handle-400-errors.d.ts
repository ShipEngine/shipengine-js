declare type StructuredError = {
    request_id: string;
    errors: [
        {
            error_source: string;
            error_type: string;
            error_code: string;
            message: string;
        }
    ];
};
export declare function isNetworkStructuredError(error: any): error is StructuredError;
export declare function handle400Errors(body: StructuredError): unknown;
export {};
