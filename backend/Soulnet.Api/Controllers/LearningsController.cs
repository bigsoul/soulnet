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
        public ActionResult<TreeResultViewModel<LearningViewModel>> Get(int dataOffset, int dataLimit, string filter)
        {
            var filters = JsonConvert.DeserializeObject<LearningFilterViewModel>(filter);

            var section = learningRepository.GetSection(dataOffset, dataLimit, filters.IsArchive);

            var result = new List<LearningViewModel>();

            foreach(var item in section.List) {
                var datasetId = "";

                if (item.DatasetId != Guid.Empty) {
                    datasetId = item.DatasetId.ToString();
                }

                result.Add(new LearningViewModel {
                    Id = item.Id.ToString(),
                    Name = item.Name,
                    State = item.State,
                    IsArchive = item.IsArchive,
                    IterationCount = item.IterationCount,
                    IterationCurrent = item.IterationCurrent,
                    InputNeuronsCount = item.InputNeuronsCount,
                    DeepLayersCount = item.DeepLayersCount,
                    DatasetId = datasetId
                });
            }

  
            return Ok(new TreeResultViewModel<LearningViewModel> {
                DataOffset = section.DataOffset,
                DataLimit = section.DataLimit,
                List = result
            });
        }
    } 
}