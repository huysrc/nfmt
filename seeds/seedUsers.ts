// import mongoose from 'mongoose';
// import dbConnect from '../packages/api/src/lib/db';
// import User from '../packages/api/src/models/User';
//
// async function seedUsers() {
//     await dbConnect();
//
//     const users = [
//         { firstName: "Huy", lastName: "Nguyen", email: "huynguyen@gmail.com", password: "000000" },
//         { firstName: "John", lastName: "Doe", email: "john@doe.com", password: "123456" },
//         { firstName: "Jackson", lastName: "Kate", name: 'Jackson Kate', email: 'jackson@kate.com', password: 'password123' },
//         { firstName: "Jane", lastName: "Smith", name: 'Jane Smith', email: 'jane@example.com', password: 'password123' },
//         // Add more users as needed
//     ];
//
//     await User.insertMany(users);
//     console.log('Users seeded successfully');
//     mongoose.connection.close();
// }
//
// export default seedUsers;
