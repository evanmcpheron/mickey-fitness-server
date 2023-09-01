import jwt from 'jsonwebtoken';
import { success, error } from '../../Utils/responseAPI.util';
import { firebaseAuth, db } from '../../Utils/admin';

module.exports = {
    signin: async (req, res) => {
        const { id_token } = req.body;
        const rememberMe = false;
        try {
            const decodedToken = await firebaseAuth
                .verifyIdToken(id_token)
            const { uid } = decodedToken;

            const usersDb = db.collection("users");
            const currentUser = await usersDb.doc(uid).get();

            req.currentUser = currentUser.data();

            // Generate JWT
            const userJwt = jwt.sign(
                currentUser.data(),
                process.env.JSON_WEB_TOKEN,
                { expiresIn: rememberMe ? '14d' : '24h' }
            )


            // Store it on session object
            req.session.access_token = userJwt;

            const payload = jwt.verify(
                req.session.access_token,
                process.env.JSON_WEB_TOKEN
            )

            console.log(payload);

            console.log(req.session);

            req.session.save();

            res.status(200).send(success("successfully logged in", res.statusCode, uid))
        } catch (err) {
            console.log(err);
            res.status(400).send(error("Something went wrong!", res.statusCode, err));
        }

    }
}


