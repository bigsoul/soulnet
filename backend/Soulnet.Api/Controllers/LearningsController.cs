using System.Data;
using System.Runtime.CompilerServices;
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
    public class LearningsController : ControllerBase
    {
        private LearningRepository learningRepository;
        
        public LearningsController(LearningRepository learningRepository)
        {
            this.learningRepository = learningRepository;
        }

        [HttpPost]
        public ActionResult<TreeResultViewModel<LearningViewModel>> Post(int dataOffset, int dataLimit, string filter, [FromBody]LearningViewModel model)
        {
            var id = new Guid(model.Id);

            if (id != Guid.Empty) {
                throw new ArgumentException("The id field must be empty");
            }

            model.Id = Guid.NewGuid().ToString();

            learningRepository.Create(new Learning {
                Id = new Guid(model.Id),
                Version = model.Version,
                Name = model.Name,
                State = model.State,
                IsArchive = model.IsArchive,
                IterationCount = model.IterationCount,
                IterationCurrent = model.IterationCurrent,
                InputNeuronsCount = model.InputNeuronsCount,
                DeepLayersCount = model.DeepLayersCount,
                DatasetId = new Guid(model.DatasetId),
                DatasetName = model.DatasetName,
            });

            return Ok(new TreeResultViewModel<LearningViewModel> {
                DataOffset = dataOffset,
                DataLimit = dataLimit,
                List = new List<LearningViewModel>() { model }
            });
        }

        [HttpGet]
        public ActionResult<TreeResultViewModel<LearningViewModel>> Get(int dataOffset, int dataLimit, string filter)
        {
            var _filter = JsonConvert.DeserializeObject<LearningFilter>(filter);
            
            var section = learningRepository.ReadSection(dataOffset, dataLimit, _filter);
            
            var result = new List<LearningViewModel>();

            foreach(var item in section.List) {
                result.Add(new LearningViewModel() {
                    Id = item.Id.ToString(),
                    Version = item.Version,
                    Name = item.Name,
                    State = item.State,
                    IsArchive = item.IsArchive,
                    IterationCount = item.IterationCount,
                    IterationCurrent = item.IterationCurrent,
                    InputNeuronsCount = item.InputNeuronsCount,
                    DeepLayersCount = item.DeepLayersCount,
                    DatasetId = item.DatasetId.ToString(),
                    DatasetName = item.DatasetName
                });  
            }

            return Ok(new TreeResultViewModel<LearningViewModel> {
                DataOffset = section.DataOffset,
                DataLimit = section.DataLimit,
                List = result
            });
        }

        [HttpPut]
        public ActionResult<TreeResultViewModel<LearningViewModel>> Put(int dataOffset, int dataLimit, string filter, [FromBody]LearningViewModel model)
        {
            learningRepository.Update(new Learning {
                Id = new Guid(model.Id),
                Version = model.Version,
                Name = model.Name,
                State = model.State,
                IsArchive = model.IsArchive,
                IterationCount = model.IterationCount,
                IterationCurrent = model.IterationCurrent,
                InputNeuronsCount = model.InputNeuronsCount,
                DeepLayersCount = model.DeepLayersCount,
                DatasetId = new Guid(model.DatasetId),
                DatasetName = model.DatasetName,
            });

            return Ok(new TreeResultViewModel<LearningViewModel> {
                DataOffset = dataOffset,
                DataLimit = dataLimit,
                List = new List<LearningViewModel>() { model }
            });
        }

        [HttpDelete]
        public ActionResult Delete(int dataOffset, int dataLimit, string filter)
        {
            var _filter = JsonConvert.DeserializeObject<LearningFilter>(filter);

            if (_filter.Id == null || _filter.Id == Guid.Empty) {
                throw new ArgumentException("The id field must be empty");
            } 
                
            learningRepository.Delete(_filter.Id.Value);            

            return Ok();
        }
    } 
}