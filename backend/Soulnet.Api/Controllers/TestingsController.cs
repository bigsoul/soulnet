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

        [HttpPost]
        public ActionResult<TreeResultViewModel<TestingViewModel>> Post(int dataOffset, int dataLimit, string filter, 
                                                                                        [FromBody]TestingViewModel model)
        {
            var id = new Guid(model.Id);

            if (id != Guid.Empty) {
                throw new ArgumentException("The id field must be empty");
            }

            model.Id = Guid.NewGuid().ToString();
            
            testingRepository.Create(new Testing {
                Id = new Guid(model.Id),
                Version = model.Version,
                Name = model.Name,
                State = model.State,
                IsArchive = model.IsArchive,
                IterationCount = model.IterationCount,
                IterationCurrent = model.IterationCurrent,
                StopLossPercent = model.StopLossPercent,
                StartDeposit = model.StartDeposit,
                EndDeposit = model.EndDeposit,
                DatasetId = new Guid(model.DatasetId),
                DatasetName = model.DatasetName,
                LearningId = new Guid(model.LearningId),
                LearningName = model.LearningName,
            });

            return Ok(new TreeResultViewModel<TestingViewModel> {
                DataOffset = dataOffset,
                DataLimit = dataLimit,
                List = new List<TestingViewModel>() { model }
            });
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
                    LearningName = item.LearningName,
                    DatasetId = item.DatasetId.ToString(),
                    DatasetName = item.DatasetName
                });  
            }

            return Ok(new TreeResultViewModel<TestingViewModel> {
                DataOffset = section.DataOffset,
                DataLimit = section.DataLimit,
                List = result
            });
        }

        [HttpPut]
        public ActionResult<TreeResultViewModel<TestingViewModel>> Put(int dataOffset, int dataLimit, string filter, 
                                                                                [FromBody]TestingViewModel model)
        {
            testingRepository.Update(new Testing {
                    Id = new Guid(model.Id),
                    Version = model.Version,
                    Name = model.Name,
                    State = model.State,
                    IsArchive = model.IsArchive,
                    IterationCount = model.IterationCount,
                    IterationCurrent = model.IterationCurrent,
                    StopLossPercent = model.StopLossPercent,
                    StartDeposit = model.StartDeposit,
                    EndDeposit = model.EndDeposit,
                    LearningId = new Guid(model.LearningId),
                    LearningName = model.LearningName,
                    DatasetId = new Guid(model.DatasetId),
                    DatasetName = model.DatasetName
            });

            return Ok(new TreeResultViewModel<TestingViewModel> {
                DataOffset = dataOffset,
                DataLimit = dataLimit,
                List = new List<TestingViewModel>() { model }
            });
        }

        [HttpDelete]
        public ActionResult Delete(int dataOffset, int dataLimit, string filter)
        {
            var _filter = JsonConvert.DeserializeObject<TestingFilter>(filter);

            if (_filter.Id == null || _filter.Id == Guid.Empty) {
                throw new ArgumentException("The id field must be empty");
            } 
                
            testingRepository.Delete(_filter.Id.Value);  

            return Ok();
        }
    } 
}