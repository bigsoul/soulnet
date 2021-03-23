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
    public class LearningsController : ControllerBase
    {
        [HttpGet]
        public List<LearningViewModel> Get()
        {
            return new List<LearningViewModel> {
                new LearningViewModel {
                    Id = "0",
                    Name = "zero"
                }
            };
        }
    } 
}