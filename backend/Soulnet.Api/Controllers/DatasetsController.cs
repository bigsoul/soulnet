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
    public class DatasetsController : ControllerBase
    {
        private DatasetRepository datasetRepository;
        
        public DatasetsController(DatasetRepository datasetRepository)
        {
            this.datasetRepository = datasetRepository;
        }

        [HttpPost]
        public ActionResult<TreeResultViewModel<DatasetViewModel>> Post(int dataOffset, int dataLimit, 
                                                    string filter, [FromBody]DatasetViewModel model)
        {
            var id = new Guid(model.Id);

            if (id != Guid.Empty) {
                throw new ArgumentException("The id field must be empty");
            }

            datasetRepository.Create(new Dataset {
                Id = new Guid(model.Id),
                Version = model.Version,
                Name = model.Name,
                Description = model.Description,
            });

            return Ok(new TreeResultViewModel<DatasetViewModel> {
                DataOffset = dataOffset,
                DataLimit = dataLimit,
                List = new List<DatasetViewModel>() { model }
            });
        }

        [HttpGet]
        public ActionResult<TreeResultViewModel<DatasetViewModel>> Get(int dataOffset, int dataLimit, string filter)
        {
            var _filter = JsonConvert.DeserializeObject<DatasetFilter>(filter);

            var section = datasetRepository.ReadSection(dataOffset, dataLimit, _filter);

            var result = new List<DatasetViewModel>();

            foreach(var item in section.List) {
                result.Add(new DatasetViewModel() {
                    Id = item.Id.ToString(),
                    Version = item.Version,
                    Name = item.Name,
                    IsLoaded = item.IsLoaded
                });  
            }

            return Ok(new TreeResultViewModel<DatasetViewModel> {
                DataOffset = section.DataOffset,
                DataLimit = dataLimit,
                List = result
            });
        }

        [HttpPut]
        public ActionResult<TreeResultViewModel<DatasetViewModel>> Put(int dataOffset, int dataLimit, 
                                                    string filter, [FromBody]DatasetViewModel model)
        {
            datasetRepository.Update(new Dataset {
                Id = new Guid(model.Id),
                Version = model.Version,
                Name = model.Name,
                Description = model.Description,
            });

            return Ok(new TreeResultViewModel<DatasetViewModel> {
                DataOffset = dataOffset,
                DataLimit = dataLimit,
                List = new List<DatasetViewModel>() { model }
            });
        }

        [HttpDelete]
        public ActionResult Delete(int dataOffset, int dataLimit, string filter)
        {
            var _filter = JsonConvert.DeserializeObject<DatasetFilter>(filter);

            if (_filter.Id == null || _filter.Id == Guid.Empty) {
                throw new ArgumentException("The id field must be empty");
            }   

            datasetRepository.Delete(_filter.Id.Value);     

            return Ok();
        }
    } 
}