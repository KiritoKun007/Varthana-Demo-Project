const ADD_COLOR = `INSERT INTO colors (name, hex_code, is_fav) VALUES($1, $2, FALSE) RETURNING *`;
const GET_ALL_COLORS = `SELECT * FROM colors`;
const GET_FAV_COLORS_ID = `select * from favcolor where user_id = $1`;
const SAVE_FAV_COLORS = `INSERT INTO favcolor (user_id, color_id) VALUES`;

const GET_USER_FROM_EMAIL = `SELECT * FROM users WHERE user_email = $1`
const ADD_USER = `INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *`;
const VERIFY_USER_FROM_TOKEN = `select user_id, user_name, user_email from users where user_id = $1`;

const UPDATE_USER = `UPDATE users SET user_name = $1, user_email = $2 WHERE user_id = $3 RETURNING user_id, user_name, user_email`;
const INACTIVE_USER = `UPDATE users SET is_active = FALSE WHERE user_id = $1`;

module.exports = {
    colors: {
        ADD_COLOR,
        GET_ALL_COLORS,
        GET_FAV_COLORS_ID,
        SAVE_FAV_COLORS },
    auth: {
        GET_USER_FROM_EMAIL,
        ADD_USER,
        VERIFY_USER_FROM_TOKEN
    },
    user: {
        UPDATE_USER,
        INACTIVE_USER
    }
}