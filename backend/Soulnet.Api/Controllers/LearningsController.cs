using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Soulnet.Api.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Soulnet.Data.Repositories;

namespace Soulnet.Api.Controllers
{
    [ApiController]
    [Authorize]
    [Route("[controller]")]
    public class LearningsController : ControllerBase
    {
        private LearningRepository learningRepository;
        
        public LearningsController(LearningRepository learningRepository)
        {
            this.learningRepository = learningRepository;
        }

        [HttpGet]
        public ActionResult<List<LearningViewModel>> Get(int startFrom, int pageSize)
        {
            var result = learningRepository.GetSection(startFrom, pageSize);

            return Ok(result);
        }
    } 
}