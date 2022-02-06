const Users = require('./models');
const users = [];

const addUser = ({id, name, room}) => {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    const userExist = users.find((user) => user.room === room && user.name === name);
    if(userExist){
        return {error: 'Username is taken'};
    }
    const user = {id, name, room};
    users.push(user);

    return user;
};

const getUser = (id) => users.find((user) => user.id === id);

const getUserInRooms = (room) => {
    users.filter((user) => user.room === room);

};

module.exports = {addUser, getUser, getUserInRooms};