using Ecommerce.Model;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Ecommerce.Services
{
    public class CategoryService
    {
        private readonly IMongoCollection<Category> _categories;
        public CategoryService(IOptions<MongoDBSettings> settings)
        {
            var client = new MongoClient(settings.Value.ConnectionString);
            var database = client.GetDatabase(settings.Value.DatabaseName);
            _categories = database.GetCollection<Category>("Categories");
        }
        public async Task CreateCategory(Category category)
        {
            var existingCategory = await _categories.Find(c => c.Name == category.Name).FirstOrDefaultAsync();
            if (existingCategory != null)
            {
                throw new Exception("Category already exists");
            }
            await _categories.InsertOneAsync(category);
        }
        public async Task<List<Category>> GetCategories()
        {
            return await _categories.Find(c => true).ToListAsync();
        }

        public async Task<(List<Category>, long)> GetCategoriesByPage( int page, int pageSize)
        {
            var skip = (page - 1) * pageSize;
            var category = await _categories.Find(p => true)
                .Skip(skip)
                .Limit(pageSize)
                .ToListAsync();

            var totalCount = await _categories.CountDocumentsAsync(p => true);
            return (category, totalCount);
        }


        public async Task<Category> GetCategory(string name)
        {
            return await _categories.Find(c => c.Name == name).FirstOrDefaultAsync();
        }
        public async Task UpdateCategory(string name, Category category)
        {
            await _categories.ReplaceOneAsync(c => c.Name == name, category);
        }
        public async Task DeleteCategory(string id)
        {
            await _categories.DeleteOneAsync(c => c.Id == id);
        }
    }
}