export default class Err extends Error {
    constructor(name: string, message: string) {
        super(message);
        this.name = name;
    }
}