import { DataTypes, Model } from "https://deno.land/x/denodb/mod.ts";

class User extends Model {
    static table = "users";
    static fields = {
        id: {
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        userID: {
            type: DataTypes.STRING,
            unique: true
        },
        username: {
            type: DataTypes.STRING
        },
        host: {
            type: DataTypes.STRING
        },
        publicKey: {
            type: DataTypes.STRING
        }
    }
}