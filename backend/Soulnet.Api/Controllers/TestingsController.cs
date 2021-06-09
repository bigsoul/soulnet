using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Soulnet.Api.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Soulnet.Data.Repositories;
using Newtonsoft.Json;
using Soulnet.Model.Entity;

namespace Soulnet.Api.Controllers
{
    [ApiController]
    [Authorize]
    [Route("[controller]")]
    public class TestingsController : ControllerBase
    {
        private TestingRepository testingRepository;

        public TestingsController(TestingRepository testingRepository)
        {
            this.testingRepository = testingRepository;
        }

        [HttpGet]
        public ActionResult<TreeResultViewModel<TestingViewModel>> Get(int dataOffset, int dataLimit, string filter)
        {
            var _filter = JsonConvert.DeserializeObject<TestingFilter>(filter);

            var section = testingRepository.ReadSection(dataOffset, dataLimit, _filter);

            var result = new List<TestingViewModel>();

            foreach(var item in section.List) {
                result.Add(new TestingViewModel() {
                    Id = item.Id.ToString(),
                    Version = item.Version,
                    Name = item.Name,
                    State = item.State,
                    IsArchive = item.IsArchive,
                    IterationCount = item.IterationCount,
                    IterationCurrent = item.IterationCurrent,
                    StopLossPercent = item.StopLossPercent,
                    StartDeposit = item.StartDeposit,
                    EndDeposit = item.EndDeposit,
                    LearningId = item.LearningId.ToString(),
                    DatasetId = item.DatasetId.ToString()
                });  
            }

            return Ok(new TreeResultViewModel<TestingViewModel> {
                DataOffset = section.DataOffset,
                DataLimit = section.DataLimit,
                List = result
            });
        }
    } 
}