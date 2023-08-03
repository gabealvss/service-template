import { sign, verify } from 'jsonwebtoken';
import { JwtPayload } from 'jwt-decode';

let privateKey: string;
const createJWT = (payload: Record<string, unknown>, expiration: string) => {
	if (!privateKey) {
		privateKey = process.env.JWT_KEY as string;
	}
	return sign(payload, privateKey, { expiresIn: expiration });
};

const verifyJWT = <Type extends JwtPayload>(token: string) => {
	if (!privateKey) {
		privateKey = process.env.JWT_KEY as string;
	}
	try {
		const result = <Type>verify(token, privateKey);

		return Promise.resolve(result);
	} catch (error) {
		return Promise.reject('Invalid token.');
	}
};

export { createJWT, verifyJWT };
