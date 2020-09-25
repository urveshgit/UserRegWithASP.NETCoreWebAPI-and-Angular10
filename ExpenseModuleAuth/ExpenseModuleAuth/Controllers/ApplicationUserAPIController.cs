using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ExpenseModuleAuth.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace ExpenseModuleAuth.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApplicationUserAPIController : ControllerBase
    {
        // In order to work with User Regitratration and Authentication, use two classes from idenity core 
        // User manager and sign in manager
        private UserManager<ApplicationUser> _userManager;
        private SignInManager<ApplicationUser> _signInManager;

        public ApplicationUserAPIController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpPost]
        [Route("UserRegister")]
        //POST : /api/ApplicationUserAPI/UserRegister

        public async Task<Object> AppUser(ApplicationUserModel model)
        {
            var applicationUser = new ApplicationUser()
            {
                FirstName = model.FirstName,
                LastName = model.LastName,
                UserName = model.UserName,
                Email = model.Email
            };

            try
            {
                var result = await _userManager.CreateAsync(applicationUser, model.Password);
                return Ok(result);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
    }
}