using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Soulnet.Api.ViewModels;
using Microsoft.AspNetCore.Authorization;

namespace Soulnet.Api.Controllers
{
    [ApiController]
    [Authorize]
    [Route("[controller]")]
    public class TestingsController : ControllerBase
    {
        [HttpGet]
        public List<TestingViewModel> Get()
        {
            return new List<TestingViewModel> {
                new TestingViewModel {
                    Id = "0",
                    Name = "zero"
                }
            };
        }
    } 
}