using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Ecommerce.Model
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        public string Name { get; set; }

        public string? Password { get; set; }

        public string? Email { get; set; }  // New Field

        public string? Address { get; set; }  // New Field

        public string? Phone { get; set; }  // New Field

        public string? Role { get; set; }
    }
}