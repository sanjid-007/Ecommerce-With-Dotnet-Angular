using Ecommerce.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Ecommerce.Services
{
    public class CartService
    {
        private readonly IMongoCollection<Cart> _carts;
        
        public CartService(IOptions<MongoDBSettings> settings)
        {
            var client = new MongoClient(settings.Value.ConnectionString);
            var database = client.GetDatabase(settings.Value.DatabaseName);
            _carts = database.GetCollection<Cart>("Carts");

        }
        public async Task CreateCart(Cart cart)
        {

            
            var existingCart = await _carts.Find(c => c.UserName == cart.UserName && c.ProductName == cart.ProductName).FirstOrDefaultAsync();

            if (existingCart != null)
            {
                
                existingCart.Quantity = (int.Parse(existingCart.Quantity) + int.Parse(cart.Quantity)).ToString();

                
                await _carts.ReplaceOneAsync(c => c.Id == existingCart.Id, existingCart);
            }
            else
            {
                
                await _carts.InsertOneAsync(cart);
            }

        }
        public async Task<List<Cart>> GetCart()
        {
            return await _carts.Find(cart => true).ToListAsync();
        }

        public async Task<List<Cart>> GetCartByUser(string userName)
        {

            return await _carts.Find(cart => cart.UserName == userName).ToListAsync();
        }
        public async Task updateCart(Cart cart)
        {
            var existingCart = await _carts.Find(c => c.UserName == cart.UserName && c.ProductName == cart.ProductName).FirstOrDefaultAsync();

            if (existingCart != null)
            {
               
                int updatedQuantity = int.Parse(existingCart.Quantity) + int.Parse(cart.Quantity);

                if (updatedQuantity <= 0)
                {
                   
                    await _carts.DeleteOneAsync(c => c.Id == existingCart.Id);
                   
                }

                existingCart.Quantity = updatedQuantity.ToString();


                await _carts.ReplaceOneAsync(c => c.Id == existingCart.Id, existingCart);
                //var update = Builders<Cart>.Update.Set(c => c.Quantity, updatedQuantity.ToString());
                //await _carts.UpdateOneAsync(c => c.Id == existingCart.Id, update);


            }
            else
            {
                
                cart.Quantity = "1";
                await _carts.InsertOneAsync(cart);
               
            }
        }
        public async Task DeleteCart(string id)
        {
            await _carts.DeleteOneAsync(c => c.Id == id);
        }




    }
}
