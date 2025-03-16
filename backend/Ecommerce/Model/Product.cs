using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Ecommerce.Model
{
    public class Product
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        public string CategoryName { get; set; }

        public string Name { get; set; }

        public string price { get; set; }

        [BsonElement("Image")]
        public byte[]? Image { get; set; }
    }
}