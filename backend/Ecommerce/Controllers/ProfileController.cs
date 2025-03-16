using Ecommerce.Model;
using Ecommerce.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Ecommerce.Controllers
{
    
    [Route("api/profile")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        private readonly UserService _userService;

        public ProfileController(UserService userService)
        {
            _userService = userService;
        }

        // Get user profile by username
        [HttpGet("{username}")]
        public async Task<IActionResult> GetProfile(string username)
        {
            var user = await _userService.GetUserByNameAsync(username);
            if (user == null) return NotFound("User not found.");

            return Ok(user);
        }

        // Update user profile by username
        [HttpPut("{username}")]
        public async Task<IActionResult> UpdateProfile(string username, [FromBody] User updatedUser)
        {
            try
            {
                var result = await _userService.UpdateUserByNameAsync(username, updatedUser);
                return result
                    ? Ok("Profile updated successfully.")
                    : BadRequest("Failed to updateghg profile.");
            }
            catch (Exception ex)
            {
                // Log the exception as needed
                return StatusCode(500, "An error occurred: " + ex.Message);
            }
        }



    }
}
