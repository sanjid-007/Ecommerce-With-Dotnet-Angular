using Ecommerce.Model;
using Ecommerce.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace Ecommerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly CartService _cartService;
        private readonly ProductService _productService;

        public CartController(CartService cartService, ProductService productService)
        {
            _cartService = cartService;
            _productService = productService;
        }

        [HttpPost]
        public async Task<IActionResult> AddToCart([FromBody] Cart productCart)
        {
            var p = 10;
           
            await _cartService.CreateCart(productCart);

            return Ok(new { Message = "Product added to cart successfully!" });
        }
       

        

        [HttpGet("{userName}")]
        public async Task<IActionResult> GetCartByUserName(string userName)
        {
            var carts = await _cartService.GetCartByUser(userName);
            if (carts == null || carts.Count == 0)
            {
                return NotFound(new { Message = "No cart items found for this user." });
            }
            foreach (var cart in carts)
            {
                var product = await _productService.GetProduct(cart.ProductName);
                if (product != null)
                {
                    
                    cart.ProductDetails = product;
                }
            }
            return Ok(carts);
        }

        [HttpPost("cart")]
        public async Task<IActionResult> UpdateCart(Cart cart)
        {
            await _cartService.updateCart(cart);
            return Ok(new { Message = "Product added to cart successfully!" });
        }
        [HttpDelete("{cartid}")]
        public async Task<IActionResult> DeleteCart(string cartid)
        {
            
            await _cartService.DeleteCart(cartid);
            return Ok(new { Message = "Product removed from cart successfully!" });
        }

    }
}
