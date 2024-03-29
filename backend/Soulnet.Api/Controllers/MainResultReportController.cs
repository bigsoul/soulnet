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
    public class MainResultReportController : ControllerBase
    {
        private MainResultReportRepository mainResultReportRepository;

        public MainResultReportController(MainResultReportRepository mainResultReportRepository)
        {
            this.mainResultReportRepository = mainResultReportRepository;
        }

        [HttpGet]
        public ActionResult<TreeResultViewModel<MainResultReport>> Get(int dataOffset, int dataLimit, string filter)
        {
            var _filter = JsonConvert.DeserializeObject<MainResultReportFilter>(filter);

            var section = mainResultReportRepository.ReadSection(dataOffset, dataLimit, _filter);

            var result = new List<MainResultReportViewModel>();

            var id = section.DataOffset;

            foreach(var item in section.List) {
                result.Add(new MainResultReportViewModel() {
                    Id = id.ToString(),
                    Version = item.Version,
                    LearningName = item.LearningName,
                    TestingName = item.TestingName,
                    DatasetLearningName = item.DatasetLearningName,
                    DatasetTestingName = item.DatasetTestingName,
                    StartDeposit = item.StartDeposit,
                    EndDeposit = item.EndDeposit,
                    Margin = item.Margin
                });  
                id++;
            }

            return Ok(new TreeResultViewModel<MainResultReportViewModel> {
                DataOffset = section.DataOffset,
                DataLimit = section.DataLimit,
                List = result
            });
        }
    }
}