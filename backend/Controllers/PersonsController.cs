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

        private readonly DataContext _context;
        public PersonsController(DataContext context)
        {
            _context = context;
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
    }
}