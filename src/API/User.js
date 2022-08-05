export const users = [
    { username: "user", password: "test1234" },
    { username: "user2", password: "pass1234" },
    { username: "michael", password: "tengganus" },
    { username: "t", password: "t" }
]


export const User = ({ match, location }) => {
    const arrLocation = location.pathname.split('/');
    if (arrLocation.length < 4) {
        return null;
    }

    const selectedUser = users.filter(e => { return e.username === arrLocation[2] });
    if (selectedUser[0].password === arrLocation[3]) {

        const items = JSON.parse(localStorage.getItem(selectedUser[0].username));
        let response = {
            username: selectedUser[0].username,
            favorited: items
        }

        return JSON.stringify(response);
    }

    return null;
}