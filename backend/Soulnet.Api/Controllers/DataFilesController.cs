using System;
using System.Threading;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;

namespace Soulnet.Api.Controllers
{
    [ApiController]
    [Authorize]
    [Route("[controller]")]
    public class DataFilesController : ControllerBase
    {
        private string pathFiles = Directory.GetCurrentDirectory() + @"\files";

        public DataFilesController(IConfiguration configuration)
        {
            var filesRepository = configuration.GetValue<string>("FilesRepository");

            if (filesRepository != "")
                pathFiles = filesRepository;
        }

        [HttpGet]
        public IActionResult Get(string id, ulong size)
        {
            try
            {
                string _id = id is null 
                                ? Guid.NewGuid().ToString() + "-" + size.ToString()
                                : id + "-" + size.ToString();

                using (var fs = new FileStream(this.pathFiles + "/" + _id, FileMode.OpenOrCreate)) 
                {
                    return StatusCode(200, new {
                        id = _id,
                        totalSize = size,
                        totalReceived = fs.Length
                    });
                }
            }
            catch(Exception ex)
            {
                return StatusCode(500, $"Error. msg: {ex.Message}");
            }
        }
        
        [HttpPost]
        public async Task<IActionResult> Post(string id)
        {
            try
            {
                if (!Directory.Exists(pathFiles)) {
                    Directory.CreateDirectory("files");
                }

                using (var fs = new FileStream(this.pathFiles + "/" + id, FileMode.Open)) 
                {
                    int contentLength = (int)Request.ContentLength;
                    int totalBytesRecived = 0;

                    var buffer = new byte[contentLength];

                    while(contentLength > totalBytesRecived)
                    {
                        int bytesRemaining = contentLength - totalBytesRecived;                    
                        int bytesRecived = await Request.Body.ReadAsync(buffer, totalBytesRecived, bytesRemaining);

                        totalBytesRecived += bytesRecived;

                        System.Diagnostics.Trace.WriteLine("Chunk bytes resived: " + bytesRecived + " of " + bytesRemaining);
                    }
                    
                    fs.Position = fs.Length;
                    await fs.WriteAsync(buffer); 
                    
                    System.Diagnostics.Trace.WriteLine("Total bytes resived: " + totalBytesRecived + " of " + contentLength);
                    System.Diagnostics.Trace.WriteLine("-------------------------------------------");
                }

                return StatusCode(200);
            }
            catch(Exception ex)
            {
                return StatusCode(500, $"Error. msg: {ex.Message}");
            }
        }
    }
}