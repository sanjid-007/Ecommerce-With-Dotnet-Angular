using Ecommerce.Model;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Ecommerce.Services
{
    public class ProductService
    {
        private readonly IMongoCollection<Product> _products;
        private readonly CategoryService _categories;
        public ProductService(IOptions<MongoDBSettings> settings, CategoryService categoryService)
        {
            var client = new MongoClient(settings.Value.ConnectionString);
            var database = client.GetDatabase(settings.Value.DatabaseName);
            _products = database.GetCollection<Product>("Products");
            _categories = categoryService;

        }
        public async Task CreateProduct(Product product)
        {
            var category = await _categories.GetCategory(product.CategoryName);
            if (category == null)
            {
                throw new Exception("Category not found");
            }
            await _products.InsertOneAsync(product);
        }
        public async Task<List<Product>> GetProducts()
        {
            return await _products.Find(p => true).ToListAsync();
        }
        public async Task<Product> GetProduct(string name)
        {
            return await _products.Find(p => p.Name == name).FirstOrDefaultAsync();
        }
        public async Task UpdateProduct(string name, Product product)
        {
            await _products.ReplaceOneAsync(p => p.Name == name, product);
        }
        public async Task DeleteProduct(string name)
        {
            await _products.DeleteOneAsync(p => p.Name == name);
        }

        //public async Task<List<Product>> GetProductsByCategory(string categoryName)
        //{
        //    return await _products.Find(p => p.CategoryName == categoryName).ToListAsync();
        //}
        public async Task<(List<Product>, long)> GetProductsByCategory(string categoryName, int page, int pageSize)
        {
            var skip = (page - 1) * pageSize;
            var products = await _products.Find(p => p.CategoryName == categoryName)
                .Skip(skip)
                .Limit(pageSize)
                .ToListAsync();

            var totalCount = await _products.CountDocumentsAsync(p => p.CategoryName == categoryName);
            return (products, totalCount);
        }

    }
}