import jwt from 'jsonwebtoken'
import { db } from '../Utils/admin';

export const currentUser = async (req, res, next) => {
    console.log(req.session);
    if (!req.session?.access_token) {
        return next()
    }

    try {
        const payload = jwt.verify(
            req.session.access_token,
            process.env.JSON_WEB_TOKEN
        )


        const usersDb = db.collection("users");
        const currentUser = await usersDb.doc(payload.id).get();

        req.currentUser = currentUser;
    } catch (err) {
        console.log(err)
    }

    next()
}
