//using Ecommerce.Model;
//using Microsoft.Extensions.Options;
//using MongoDB.Driver;

//namespace Ecommerce.Services
//{
//    public class UserService
//    {
//        private readonly IMongoCollection<User> _users;
//        public UserService(IOptions<MongoDBSettings> settings)
//        {
//            var client = new MongoClient(settings.Value.ConnectionString);
//            var database = client.GetDatabase(settings.Value.DatabaseName);
//            _users = database.GetCollection<User>("Users");
//        }
//        public async Task CreateUser(User user)
//        {
//            if (await _users.Find(u => u.Name == user.Name).FirstOrDefaultAsync() != null)
//            {
//                throw new Exception("User already exists");
//            }

//            await _users.InsertOneAsync(user);
//        }
//        public async Task<User> GetUser(string username, string password)
//        {
//            return await _users.Find(u => u.Name == username && u.Password == password).FirstOrDefaultAsync();
//        }
//        public async Task<List<User>> GetUsers()
//        {
//            return await _users.Find(u => true).ToListAsync();
//        }


//    }
//}

using Ecommerce.Model;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Ecommerce.Services
{
    public class UserService
    {
        private readonly IMongoCollection<User> _users;

        public UserService(IOptions<MongoDBSettings> settings)
        {
            var client = new MongoClient(settings.Value.ConnectionString);
            var database = client.GetDatabase(settings.Value.DatabaseName);
            _users = database.GetCollection<User>("Users");
        }

        public async Task CreateUser(User user)
        {
            if (await _users.Find(u => u.Name == user.Name).FirstOrDefaultAsync() != null)
            {
                throw new Exception("User already exists");
            }

            await _users.InsertOneAsync(user);
        }
        public async Task<User> GetUser(string username, string password)
        {
            return await _users.Find(u => u.Name == username && u.Password == password).FirstOrDefaultAsync();
        }
        public async Task<List<User>> GetUsers()
        {
            return await _users.Find(u => true).ToListAsync();
        }


        //Get user by username
        public async Task<User> GetUserByNameAsync(string username)
        {
            return await _users.Find(u => u.Name == username).FirstOrDefaultAsync();
        }

        // Update user profile by username
        public async Task<bool> UpdateUserByNameAsync(string username, User updatedUser)
        {
            var update = Builders<User>.Update
                .Set(u => u.Email, updatedUser.Email)
                .Set(u => u.Address, updatedUser.Address)
                .Set(u => u.Phone, updatedUser.Phone);

            var result = await _users.UpdateOneAsync(u => u.Name == username, update);
            return result.ModifiedCount > 0;
        }

        // Change user password by username
        public async Task<bool> ChangePasswordByNameAsync(string username, string newPassword)
        {
            var user = await _users.Find(u => u.Name == username).FirstOrDefaultAsync();
            if (user == null)
                return false;

            var update = Builders<User>.Update.Set(u => u.Password, newPassword);
            var result = await _users.UpdateOneAsync(u => u.Name == username, update);
            return result.ModifiedCount > 0;
        }
    }
}

