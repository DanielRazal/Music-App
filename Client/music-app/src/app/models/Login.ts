import User from "./User";

export default class Login {
    userLogin!: User;
    token: string = "";
    message: string = "";
    statusCode: number = -1;
}