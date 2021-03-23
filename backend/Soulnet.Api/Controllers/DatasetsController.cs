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
    public class DatasetsController : ControllerBase
    {
        [HttpGet]
        public List<DatasetViewModel> Get()
        {
            return new List<DatasetViewModel> {
                new DatasetViewModel {
                    Id = "0",
                    Name = "zero"
                }
            };
        }
    } 
}