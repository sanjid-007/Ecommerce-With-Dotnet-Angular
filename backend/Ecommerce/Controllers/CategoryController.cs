using Ecommerce.Model;
using Ecommerce.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly CategoryService _categoryService;
       
        public CategoryController(CategoryService categoryService)
        {
            _categoryService = categoryService;
           
            
        }
        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetCategories()
        {
            var categories = await _categoryService.GetCategories();
            return Ok(categories);
        }
        [HttpGet("{userName}")]
        [Authorize]
        public async Task<IActionResult> GetCategoriesByPage(string userName,int page = 1, int pageSize = 1)
        {

            var (categories, totalCount) = await _categoryService.GetCategoriesByPage(page,pageSize);
            return Ok(new
            {
                Categories = categories,
                TotalCount = totalCount,
                CurrentPage = page,
                PageSize = pageSize
            });
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateCategory([FromForm] Category category, IFormFile image)
        {
            if (image != null)
            {
                using (var memoryStream = new MemoryStream())
                {
                    await image.CopyToAsync(memoryStream);
                    category.CategoryImage = memoryStream.ToArray();
                }
            }
            await _categoryService.CreateCategory(category);
            return Ok();
        }
        [HttpPut("{name}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateCategory(string name, [FromBody] Category category)
        {
            await _categoryService.UpdateCategory(name, category);
            return Ok();
        }
        [HttpDelete("{name}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteCategory(string name)
        {
            await _categoryService.DeleteCategory(name);
            return Ok();
        }






    }
}
