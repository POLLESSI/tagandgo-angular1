import { Roles } from "src/app/constants/roles-constants";

export interface TokenDecoded {
    email: string;
    role: Roles;
    userId: string;
}