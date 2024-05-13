import axios from "axios";
import queryString from "query-string";
import {
  BASE_URL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  PORT,
} from "../index.js";
import { catchAsync } from "../utils/catchAsync.js";
import { findUserByEmailService } from "../services/usersServices.js";
import HttpError from "../utils/HttpError.js";

export const googleAuthMiddleware = (req, res, next) => {
  const stringifiedParams = queryString.stringify({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: `${BASE_URL}:${PORT}/api/v1/auth/google-redirect`,
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ].join(" "),
    response_type: "code",
    access_type: "offline",
    prompt: "consent",
  });

  req.params = { stringifiedParams };
  next();
};

export const googleRedirectMiddleware = catchAsync(async (req, res, next) => {
  const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;

  const urlObj = new URL(fullUrl);

  const urlParams = queryString.parse(urlObj.search);

  const { code } = urlParams;

  const tokenData = await axios({
    url: `https://oauth2.googleapis.com/token`,
    method: "post",
    data: {
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      redirect_uri: `${BASE_URL}:${PORT}/api/v1/auth/google-redirect`,
      grant_type: "authorization_code",
      code,
    },
  });

  const userData = await axios({
    url: "https://www.googleapis.com/oauth2/v2/userinfo",
    method: "get",
    headers: {
      Authorization: `Bearer ${tokenData.data.access_token}`,
    },
  });

  console.log("userData", userData);

  const user = await findUserByEmailService(userData.data.email);

  if (!user) return next(HttpError(401));

  await user.createToken();
  await user.createRefreshToken();
  await user.save();

  req.user = user;

  next();
});
