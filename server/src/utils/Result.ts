export class Result<T> {
    code?: number;
    msg?: string | null;
    data?: T | null;

    static success<T>(): Result<T> {
        const result = new Result<T>();
        result.code = 1;
        result.msg = null;
        result.data = null;
        return result;
    }

    static successWithData<T>(data: T): Result<T> {
        const result = new Result<T>();
        result.code = 1;
        result.msg = null;
        result.data = data;
        return result;
    }

    static error<T>(msg: string): Result<T> {
        const result = new Result<T>();
        result.code = 0;
        result.msg = msg;
        result.data = null;
        return result;
    }
}
