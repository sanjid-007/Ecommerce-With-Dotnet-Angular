using Ecommerce.Model;
using Ecommerce.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly ProductService _productService;
        private readonly UserService _userService;
        public ProductController(ProductService productService, UserService userService)
        {
            _productService = productService;
            _userService = userService;
        }

        [HttpGet("all")]
        [Authorize]
        public async Task<IActionResult> GetProducts()
        {
            var products = await _productService.GetProducts();
            return Ok(products);
        }

        [HttpGet("{name}")]
        [Authorize]
        public async Task<IActionResult> GetProduct(string name)
        {
            var product = await _productService.GetProduct(name);
            return Ok(product);
        }

        [HttpGet("Category/{categoryId}")]
        [Authorize]
        public async Task<IActionResult> GetProductByCategory(string categoryId, int page = 1, int pageSize = 10)
        {
            //var product = await _productService.GetProductsByCategory(categoryId,page,pageSize);
            //return Ok(product);
            var (products, totalCount) = await _productService.GetProductsByCategory(categoryId, page, pageSize);

            // Return paginated response
            return Ok(new
            {
                Products = products,
                TotalCount = totalCount,
                CurrentPage = page,
                PageSize = pageSize
            });
        }
        //[HttpPost]
        //[Authorize(Roles = "Admin")]
        //public async Task<IActionResult> CreateProduct([FromBody] Product product)
        //{

        //    await _productService.CreateProduct(product);
        //    return Ok();
        //}
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateProduct([FromForm] Product product, IFormFile image)
        {
            if (image != null)
            {
                using (var memoryStream = new MemoryStream())
                {
                    await image.CopyToAsync(memoryStream);
                    product.Image = memoryStream.ToArray(); 
                }
            }

            await _productService.CreateProduct(product);
            return Ok(new { Message = "Product created successfully!" });
        }
        [HttpPut("{name}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateProduct(string name, [FromBody] Product product)
        {
          
            await _productService.UpdateProduct(name, product);
            return Ok();
        }

        [HttpDelete("{name}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteProduct(string name)
        {
           
            await _productService.DeleteProduct(name);
            return Ok();
        }






    }
}