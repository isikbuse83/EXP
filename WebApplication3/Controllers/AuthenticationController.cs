﻿using Expenses.Core;
using Expenses.Core.CustomExceptions;
using Expenses.Core.DTO;
using Expenses.DB;
using Microsoft.AspNet.Identity;
using Microsoft.AspNetCore.Mvc;

namespace WebApplication3.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class AuthenticationController : ControllerBase
    {
        private readonly IUserService _userService;

        public AuthenticationController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("signup")]

        public async Task<IActionResult> SignUp([FromBody] User user)
        {
            try
            {
                var result = await _userService.SignUp(user);

                return Created("", result);
            }
            catch (UsernameAlreadyExistsException e)
            {
                return StatusCode(409, e.Message);
            }
        }

        [HttpPost("signin")]

        public async Task<IActionResult> SignIn([FromBody] LoginUserDto user)
        {
            try

            {
                var result = await _userService.SignIn(user);
                Console.WriteLine(result);
                return Ok(result);

            }
            catch (InvalidUsernamePasswordException e)
            {
                return StatusCode(401, e.Message);
            }

        }

    }
}

