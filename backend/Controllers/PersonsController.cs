using AutoMapper;
using AutoMapper.QueryableExtensions;
using Connectify.Data;
using Connectify.DTOs;
using Connectify.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net.Mail;
using System.Reflection;
using System.Security.Cryptography;
using System.Text;

namespace Connectify.Controllers
{
    //[Authorize]
    public class PersonsController : BaseApiController
    {
        private readonly string _uploadFolder = Path.Combine(Directory.GetCurrentDirectory(), "Uploads");

        private readonly DataContext _context;
        public PersonsController(DataContext context)
        {
            _context = context;

            if (!Directory.Exists(_uploadFolder))
            {
                Directory.CreateDirectory(_uploadFolder);
            }
        }

        [HttpGet("GetPersons")]
        public async Task<ActionResult<List<PersonDto>>> GetPersons()
        {
            var users = await GetPersonsAsync();
            return Ok(users);
        }

        private async Task<List<PersonDto>> GetPersonsAsync()
        {
            var query = _context.Persons.AsNoTracking().Select(p => new PersonDto()
            {
                Id = p.Id,
                FirstName = p.FirstName,
                LastName = p.LastName,
                EmailAddress = p.EmailAddress,
                PhoneNumber = p.PhoneNumber,
                DateOfBirth = p.DateOfBirth,
                Gender = p.Gender,
                Photo = p.Photo,
                Created = p.Created
            });

            return await query.ToListAsync();
        }

        [HttpPost("CreatePerson")]
        public async Task<ActionResult<PersonDto>> CreatePerson(PersonDto personDto)
        {
            var person = new AppPerson
            {
                FirstName = personDto.FirstName,
                LastName = personDto.LastName,
                EmailAddress = personDto.EmailAddress,
                Gender = personDto.Gender,
                DateOfBirth = personDto.DateOfBirth,
                PhoneNumber = personDto.PhoneNumber,
                Photo = personDto.Photo ?? ""
            };

            _context.Persons.Add(person);

            await _context.SaveChangesAsync();

            return personDto;
        }

        [HttpPut("UpdatePerson/{id}")]
        public async Task<ActionResult> UpdatePerson(int id, PersonDto model)
        {
            var person = await _context.Persons.FirstOrDefaultAsync(x => x.Id == id);

            if (person == null) return BadRequest("Could not find person");

            person.FirstName = model.FirstName;
            person.LastName = model.LastName;
            person.EmailAddress = model.EmailAddress;
            person.Gender = model.Gender;
            person.DateOfBirth = model.DateOfBirth;
            person.PhoneNumber = model.PhoneNumber;
            person.Photo = model.Photo;

            _context.Persons.Update(person);
            await _context.SaveChangesAsync(); // Save changes to the database

            return NoContent();
        }

        [HttpGet("GetPerson/{id}")]
        public async Task<ActionResult<PersonDto>> GetPerson(int id)
        {
            var person = await _context.Persons.AsNoTracking()
                .Select(p => new PersonDto
                {
                    Id = p.Id,
                    FirstName = p.FirstName,
                    LastName = p.LastName,
                    EmailAddress = p.EmailAddress,
                    PhoneNumber = p.PhoneNumber,
                    DateOfBirth = p.DateOfBirth,
                    Gender = p.Gender,
                    Photo = p.Photo,
                    Created = p.Created
                })
                .FirstOrDefaultAsync(p => p.Id == id);

            if (person == null) return NotFound("Could not find person");

            return Ok(person);
        }

        [HttpDelete("DeletePerson/{id}")]
        public async Task<ActionResult> DeletePerson(int id)
        {
            var person = await _context.Persons.FirstOrDefaultAsync(x => x.Id == id);

            if (person == null) return NotFound("Could not find person");

            _context.Persons.Remove(person);
            await _context.SaveChangesAsync(); // Save changes to the database

            return NoContent();
        }

        [HttpPost("{userId}/upload-photo")]
        public async Task<IActionResult> UploadPhoto(string userId, IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("No file uploaded.");

            var fileExtension = Path.GetExtension(file.FileName);
            var fileName = $"{userId}{fileExtension}"; // Store file as userId.extension
            var filePath = Path.Combine(_uploadFolder, fileName);

            // Delete any existing files with the same userId but different extensions
            var existingFiles = Directory.GetFiles(_uploadFolder, $"{userId}.*");
            foreach (var existingFile in existingFiles)
            {
                System.IO.File.Delete(existingFile);
            }

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            // Update the person's photo path in the database
            var person = await _context.Persons.FirstOrDefaultAsync(x => x.Id == int.Parse(userId));
            if (person == null)
                return NotFound("Could not find person");
            var request = HttpContext.Request;
            var url = $"{request.Scheme}://{request.Host}/api/Persons/{userId}/Photo";
            person.Photo = url;
            _context.Persons.Update(person);
            await _context.SaveChangesAsync();

            // Ideally, save the file path or URL in the database for this user

            return Ok(new { message = "Upload successful!", fileUrl = $"Persons/{userId}/Photo" });
        }

        [HttpGet("{userId}/Photo")]
        public IActionResult GetUserPhoto(string userId)
        {
            var filePath = Directory.GetFiles(_uploadFolder, $"{userId}.*").FirstOrDefault();

            if (filePath == null)
                return NotFound("User photo not found.");

            var fileBytes = System.IO.File.ReadAllBytes(filePath);
            var contentType = GetContentType(filePath);

            return File(fileBytes, contentType);
        }

        private string GetContentType(string path)
        {
            var types = new Dictionary<string, string>
            {
                { ".jpg", "image/jpeg" },
                { ".jpeg", "image/jpeg" },
                { ".png", "image/png" }
            };

            var ext = Path.GetExtension(path).ToLower();
            return types.ContainsKey(ext) ? types[ext] : "application/octet-stream";
        }
    }
}