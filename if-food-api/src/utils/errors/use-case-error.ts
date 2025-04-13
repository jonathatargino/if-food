import { ErrorCodesEnum } from "./codes";

type UseCaseErrorMetadata = {
    ptBr: string;
    code?: ErrorCodesEnum;
    [key: string]: unknown;
};

export class UseCaseError extends Error {
    public readonly context: string;
    public readonly metadata: UseCaseErrorMetadata;

    constructor(message: string, context: string, metadata: UseCaseErrorMetadata) {
        super(message);
        this.context = context;
        this.metadata = metadata;
    }
}
